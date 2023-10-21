export class Menu extends Phaser.Scene {
	constructor() {
		super({key: "Menu"});
	}
	create() {
		this.scene.start("Playground", { level: "level1"});
	}
}