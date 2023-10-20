import { gameConfig, levels } from "./config.js";

export class Game extends Phaser.Scene {
	preload() {
		this.load.spritesheet('tiles', '../assets/tiles/sokoban_tilesheet.png', {
			frameWidth: 64,
			frameHeight: 64,
			startFrame: 0
		});
	}
	// Remember, avoid hard coding as much as possible!
	create() {
		// Pull the level data from config.js
		const level = gameConfig.currentLevel;

		// Tilemaps and layers will be stored in these containers, respectively
		// We will overwrite the values, and only use the keys
		const tilemaps = JSON.parse(JSON.stringify(gameConfig.game_objects)); // Deep copy of gameConfig.game_objects
		const layers = JSON.parse(JSON.stringify(gameConfig.game_objects)); // Deep copy of gameConfig.game_objects

		// Create a Tilemap for each layer of objects
		for (const obj_name in tilemaps) {
			tilemaps[obj_name] = this.make.tilemap({
				data: levels[level][obj_name],
				tileWidth: 64,
				tileHeight: 64
			});
		}

		// Create a Layer from each Tilemap
		// After this for loop, game objects are displayed on screen.
		for (const obj_name in layers) {
			layers[obj_name] = create_layer(tilemaps[obj_name]);
		}
	}
}

/**
 * To easily create a layer from a Tilemap.
 * @param {Phaser.Tilemaps.Tilemap} tilemap 
 * @return {Phaser.Tilemaps.TilemapLayer}
 */
function create_layer(tilemap) {
	const tiles = tilemap.addTilesetImage('tiles');
	const layer = tilemap.createLayer(0, tiles, 0, 0);
	return layer;
}