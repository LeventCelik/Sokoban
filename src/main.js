import { Game } from "./Game.js";
import { gameConfig, levels } from "./config.js";

const config = {
	type: Phaser.AUTO,
	width: levels[gameConfig.currentLevel].width,
	height: levels[gameConfig.currentLevel].height,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 0 }
		}
	},
	scene: [Game]
};

export default new Phaser.Game(config);
