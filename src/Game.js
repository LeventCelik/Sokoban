import { gameConfig, maps } from "./config.js";

export class Game extends Phaser.Scene {
	preload() {
		this.load.spritesheet('tiles', '../assets/tiles/sokoban_tilesheet.png', {
			frameWidth: 64,
			frameHeight: 64,
			startFrame: 0
		});
	}
	create() {
		const box = gameConfig.assets.box;
		const road = gameConfig.assets.road;
		const wall = gameConfig.assets.wall;

		const map = this.make.tilemap({
			data: maps.level1,
			tileWidth: 64,
			tileHeight: 64
		});

		const tiles = map.addTilesetImage('tiles');
		const layer = map.createLayer(0, tiles, 0, 0);
	}
}
