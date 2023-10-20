import { gameConfig, levels } from "./config.js";
import { level_parser } from "./utils.js";

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
		// Tilemaps and layers will be stored in these containers, respectively
		// We will overwrite the values, and only use the keys
		const tilemaps = gameConfig.game_objects; // Copy of gameConfig.game_objects, safe to change
		const layers = gameConfig.game_objects;

		// Read the level data from config and parse it
		const parsed_data = level_parser(levels[gameConfig.currentLevel].data);

		// Create a Tilemap for each layer of objects
		for (const obj_name in tilemaps) {
			tilemaps[obj_name] = this.make.tilemap({
				data: parsed_data[obj_name],
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