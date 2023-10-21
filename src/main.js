import { Playground } from "./Scenes/Playground.js";
import { Menu } from "./Scenes/Menu.js";
import { gameConfig, levels } from "./config.js";


const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene: [Menu, Playground]
};

export default new Phaser.Game(config);
