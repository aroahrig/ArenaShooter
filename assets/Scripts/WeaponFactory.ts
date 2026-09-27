import { _decorator, Component, Node, Prefab } from 'cc';
import { WeaponConfig } from './WeaponConfig';
import { Weapon } from './Weapon';
const { ccclass, property } = _decorator;

@ccclass('WeaponFactory')
export class WeaponFactory extends Component {
    
    public static createWeapon(config: WeaponConfig, bulletPrefab: Prefab, playerNode: Node, bulletContainer: Node) {
        let weaponNode = new Node(config.name);
        weaponNode.setParent(playerNode);
        let weaponComp = weaponNode.addComponent(Weapon);
        weaponComp.initialize(config, bulletPrefab, bulletContainer);
        return weaponNode;
    }
}


