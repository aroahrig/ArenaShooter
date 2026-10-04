import { _decorator, Camera, Component, EventKeyboard, EventMouse, input, Input, KeyCode, log, math, Node, Vec2, Vec3 } from 'cc';
import { IInputSystem } from './IInputSystem';
const { ccclass, property } = _decorator;

@ccclass('PlayerInputSystem')
export class PlayerInputSystem extends Component implements IInputSystem {
    

    private camera: Camera | null = null;
    private targetAngle: number = 0;
    private moveDir: Vec2 = new Vec2;
    
    public isShooting: boolean = false;
    private singleShotQueued: boolean = false;

    private isUp: boolean = false;
    private isDown: boolean = false;
    private isLeft: boolean = false;
    private isRight: boolean = false;

    protected onLoad(): void {
        input.on(Input.EventType.KEY_DOWN, this.handleKeyDown, this)
        input.on(Input.EventType.KEY_UP, this.handleKeyUp, this)
        input.on(Input.EventType.MOUSE_DOWN, this.handleMouseDown, this)
        input.on(Input.EventType.MOUSE_UP, this.handleMouseUp, this)
        input.on(Input.EventType.MOUSE_MOVE, this.handleMouseMove, this)
    }

    public initialize(camera: Camera) {
        this.camera = camera;
    }

    protected onDestroy(): void {
        input.off(Input.EventType.KEY_DOWN, this.handleKeyDown, this)
        input.off(Input.EventType.KEY_UP, this.handleKeyUp, this)
        input.off(Input.EventType.MOUSE_DOWN, this.handleMouseDown, this)
        input.off(Input.EventType.MOUSE_UP, this.handleMouseUp, this)
        input.off(Input.EventType.MOUSE_MOVE, this.handleMouseMove, this)
    }

    public handleKeyDown(event: EventKeyboard): void {
        switch (event.keyCode) {
            case KeyCode.KEY_W:
            case KeyCode.ARROW_UP:
                this.isUp = true;
                //log("Input System recieved: Up");
                break;
            case KeyCode.KEY_S:
            case KeyCode.ARROW_DOWN:
                this.isDown = true;
                //log("Input System recieved: Down");
                break;
            case KeyCode.KEY_A:
            case KeyCode.ARROW_LEFT:
                this.isLeft = true;
                //log("Input System recieved: Left");
                break;
            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT:
                this.isRight = true;
                //log("Input System recieved: Right");
                break;
            case KeyCode.DIGIT_1:
                this.node.emit('WeaponSelect', 1);
                break;
            case KeyCode.DIGIT_2:
                this.node.emit('WeaponSelect', 2);
                break;
            case KeyCode.DIGIT_3:
                this.node.emit('WeaponSelect', 3);
                break;
            case KeyCode.DIGIT_4:
                this.node.emit('WeaponSelect', 4);
                break;
        }

        this.calculateMoveDirection();
    };
    public handleKeyUp(event: EventKeyboard): void {
        switch (event.keyCode) {
            case KeyCode.KEY_W:
            case KeyCode.ARROW_UP:
                this.isUp = false;
                break;
            case KeyCode.KEY_S:
            case KeyCode.ARROW_DOWN:
                this.isDown = false;
                break;
            case KeyCode.KEY_A:
            case KeyCode.ARROW_LEFT:
                this.isLeft = false;
                break;
            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT:
                this.isRight = false;
                break;
        }

        this.calculateMoveDirection();
    };
    public handleMouseMove(event: EventMouse) {
        this.calculateRotationAngle(event);
    };
    public handleMouseDown(event: EventMouse): void {
        if (event.getButton() === 0) {
            this.isShooting = true;
            this.singleShotQueued = true;
            //log("Input System recieved: Trigger pulled");
        }
    };
    public handleMouseUp(event: EventMouse): void {
        if (event.getButton() === 0) {
            this.isShooting = false;
            //log("Input System recieved: Trigger released");
        }
    };

    public getMoveDirection(): Vec2 {
        return this.moveDir;
    }

    getRotationAngle(): number {
        return this.targetAngle;
    }

    public calculateMoveDirection() {
        this.moveDir.x = (this.isRight ? 1 : 0) - (this.isLeft ? 1 : 0);
        this.moveDir.y = (this.isUp ? 1 : 0) - (this.isDown ? 1 : 0);
        this.moveDir.normalize();
    }

    public calculateRotationAngle(event: EventMouse) {
        if (!this.camera) return;

        let mouseScreenPos = event.getLocation();
        let mouseWorldPos = new Vec3;
        this.camera.screenToWorld(new Vec3(mouseScreenPos.x, mouseScreenPos.y, 0), mouseWorldPos);
        let currentPos = this.node.worldPosition;
        let dx = mouseWorldPos.x - currentPos.x;
        let dy = mouseWorldPos.y - currentPos.y;

        this.targetAngle = math.toDegree(Math.atan2(dy, dx));
    }

    public getSingleShotIntent(): boolean {
        if (this.singleShotQueued) {
            this.singleShotQueued = false;
            return true;
        }
        return false;
    }
}


