import { gameConfig, levels } from "./config.js";
import { level_parser } from "./utils.js";

var press = false; // TODO: Get rid of global variables
export class Game extends Phaser.Scene {
	// preload(), create(), and update() are necessary methods. Rest are organization.
	preload() {
		this.load.spritesheet('tiles', gameConfig.assets.file, {
			frameWidth: 64,
			frameHeight: 64,
			startFrame: 0
		});
	}
	// Remember, avoid hard coding as much as possible!
	create() {
		this.createWorld();
		this.createCharacter();
		this.addKeys();
	}

	createWorld() {
		// Tilemaps and layers will be stored in these containers, respectively
		// We will overwrite the values, and only use the keys
		const tilemaps = gameConfig.game_objects; // Copy of gameConfig.game_objects, safe to change
		this.layers = gameConfig.game_objects;

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
		for (const obj_name in this.layers) {
			this.layers[obj_name] = create_layer(tilemaps[obj_name]);
		}
	}

	createCharacter() {
		const ban = levels[gameConfig.currentLevel].ban;
		this.player = this.add.sprite(ban.x, ban.y, 'tiles', gameConfig.assets.ban);
	}

	addKeys() {
		// TODO: Config file for keys
		const player = this.player;
		const scene = this.scene;
		this.left_key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // For 'A' key
		this.left_key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); // For 'LEFT_ARROW' key
		this.right_key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); // For 'D' key
		this.right_key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); // For 'RIGHT' key
		this.up_key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // For 'W' key
		this.up_key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP); // For 'UP_ARROW' key
		this.down_key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S); // For 'S' key
		this.down_key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN); // For 'DOWN_ARROW' key
		this.reset_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R); // For 'R' key

		function leftAction(event) {
			const new_x = player.x - gameConfig.move_x;
			if(!checkWorld(new_x, player.y)) return;
			player.x = new_x;
		}
		function rightAction(event) {
			const new_x = player.x + gameConfig.move_x;
			if(!checkWorld(new_x, player.y)) return;
			player.x = new_x;
		}
		function upAction(event) {
			const new_y = player.y - gameConfig.move_y;
			if(!checkWorld(player.x, new_y)) return;
			player.y = new_y;
		}
		function downAction(event) {
			const new_y = player.y + gameConfig.move_y;
			if(!checkWorld(player.x, new_y)) return;
			player.y = new_y;
		}
		function resetAction(event) {
			// TODO: Reset the level
			scene.restart();
		}

		// Add a 'left' event listener to both keys, assigning the same function.
		this.left_key1.on('down', leftAction);
		this.left_key2.on('down', leftAction);
		this.right_key1.on('down', rightAction);
		this.right_key2.on('down', rightAction);
		this.up_key1.on('down', upAction);
		this.up_key2.on('down', upAction);
		this.down_key1.on('down', downAction);
		this.down_key2.on('down', downAction);
		this.reset_key.on('down', resetAction);
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

/**
 * To check world bounds
 */
function checkWorld(x, y){
	if(x < 0) return false;
	if(y < 0) return false;
	if(x > levels[gameConfig.currentLevel].width) return false;
	if(y > levels[gameConfig.currentLevel].height) return false;
	return true;
}