import { math, Vec2 } from "cc";
import { ISteeringBehavior } from "./ISteeringBehavior";
import { MovementConfig } from "./EnemyConfig";
import { EnemyMovementSystem } from "./EnemyMovementSystem";
import { AvoidBehavior } from "./AvoidBehavior";

export class TacticalSteeringBehavior implements ISteeringBehavior {

    private movementConfig: MovementConfig;
    private currentHitNormals: Vec2[] = [];
    private brain: EnemyMovementSystem;
    private avoidBehavior: AvoidBehavior;

    constructor(movementConfig: MovementConfig, enemyMovementSystem: EnemyMovementSystem) {
        this.movementConfig = movementConfig;
        this.brain = enemyMovementSystem;
        this.avoidBehavior = new AvoidBehavior(enemyMovementSystem, movementConfig.whiskers);
    }

    getDesiredVelocity(currentPosition: math.Vec2, targetPosition?: Readonly<math.Vec2>): math.Vec2 {
        let totalTacticalForce = new Vec2;

        if (this.movementConfig.avoidWeight > 0) {
            let avoidForce = this.avoidBehavior.getDesiredVelocity(currentPosition);

            avoidForce.multiplyScalar(this.movementConfig.avoidWeight);
            totalTacticalForce.add(avoidForce);
        }

        if(this.movementConfig.flocking.seperationWeight > 0) {

        }

        if(this.movementConfig.flocking.alignmentWeight > 0) {
            
        }

        if(this.movementConfig.flocking.cohesionWeight > 0) {
            
        }

        if(totalTacticalForce.lengthSqr() > 1.0) {
            totalTacticalForce.normalize();
        }

        return totalTacticalForce;
    }

}