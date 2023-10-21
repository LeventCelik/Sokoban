import { gameConfig } from '../config.js';
import { Playground } from './Playground.js'

export class Menu extends Phaser.Scene {
	constructor() {
		super({key: "Menu"});
	}
	create() {
		console.log("Main menu done");
		this.scene.start("Playground", { level: "level1"});
	}
}