import { gameConfig } from '../config.js';
import { Playground } from './Playground.js'

export class Menu extends Phaser.Scene {
	constructor() {
		super({key: "Menu"});
	}
	create() {
		this.scene.start("Playground", { level: "level1"});
	}
}