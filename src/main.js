import { Game } from "./Game.js";

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 300 }
		}
	},
	scene: [Game]
};

export default new Phaser.Game(config);
