import { gameConfig, levels } from "./config.js";

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

		const background = this.make.tilemap({
			data: levels.level1.background,
			tileWidth: 64,
			tileHeight: 64
		});

		const objects = this.make.tilemap({
			data: levels.level1.objects,
			tileWidth: 64,
			tileHeight: 64
		});

		const bg_tiles = background.addTilesetImage('tiles');
		const bg_layer = background.createLayer(0, bg_tiles, 0, 0);
		const object_tiles = objects.addTilesetImage('tiles');
		const object_layer = objects.createLayer(0, object_tiles, 0, 0);
	}
}
