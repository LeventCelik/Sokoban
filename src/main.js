import { Playground } from "./Scenes/Playground.js";
import { Menu } from "./Scenes/Menu.js";

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scale: {
        mode: Phaser.Scale.FIT, // scale to fit the window while maintaining aspect ratio
        autoCenter: Phaser.Scale.CENTER_BOTH, // center the game canvas
    },
	scene: [Menu, Playground]
};

export default new Phaser.Game(config);
