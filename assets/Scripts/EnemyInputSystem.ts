import { _decorator, Component, Node, Vec2 } from 'cc';
import { SeekBehavior } from './SeekBehavior';
import { WanderBehavior } from './WanderBehavior';
import { IInputSystem } from './IInputSystem';
const { ccclass, property } = _decorator;

@ccclass('EnemyInputSystem')
export class EnemyInputSystem extends Component implements IInputSystem{
    //private seek: SeekBehavior = new SeekBehavior();
    private wander: WanderBehavior = new WanderBehavior();
    //private targetNode: Node | null = null;

    public initialize(wayPoints: Vec2[]) {
        this.wander.setWayPoints(wayPoints);
    }

    public getMoveDirection(): Vec2 {
        //if (!this.targetNode) return Vec2.ZERO;

        let currentPos = new Vec2(this.node.worldPosition.x, this.node.worldPosition.y);
        //let targetPos = new Vec2(this.targetNode.worldPosition.x, this.targetNode.worldPosition.y);

        if (this.wander.hasArrived(currentPos)) {
            this.wander.pickNewWanderPoint();
        }

        return this.wander.getDesiredVelocity(currentPos);
    }

    public getRotationAngle(): number {
        return null;
    }
}


