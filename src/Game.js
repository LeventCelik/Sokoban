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

		// Game objects will be stored in these containers
		const game_objects = { // Full modularity, yay!
			background: null,
			walls: null,
			boxes: null,
			targets: null
		}
		// Game layers will be stored in these containers, using the same keys
		const game_layers = JSON.parse(JSON.stringify(game_objects)); // Deep copy of game_objects

		// Create a Tilemap for each layer of objects
		for (const obj_name in game_objects) {
			game_objects[obj_name] = this.make.tilemap({
				data: levels[level][obj_name],
				tileWidth: 64,
				tileHeight: 64
			});
		}

		// Create a Layer from each Tilemap
		// After this for loop, game objects are displayed on screen.
		for (const obj_name in game_layers) {
			game_layers[obj_name] = create_layer(game_objects[obj_name]);
		}
	}
}


function create_layer(tilemap) {
	const tiles = tilemap.addTilesetImage('tiles');
	const layer = tilemap.createLayer(0, tiles, 0, 0);
	return layer;
}