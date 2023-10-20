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
	}

	update() {
		if (this.cursors.space.isDown && !press) {
			// Restart the scene
			this.scene.restart();
			press = true;
		} else if (this.cursors.left.isDown && !press) {
			console.log(press);
			this.player.x -= gameConfig.move_x;
			press = true;
		} else if (this.cursors.right.isDown && !press) {
			this.player.x += gameConfig.move_x;
			press = true;
		} else if (this.cursors.up.isDown && !press) {
			this.player.y -= gameConfig.move_y;
			press = true;
		}else if (this.cursors.down.isDown && !press) {
			this.player.y += gameConfig.move_y;
			press = true;
		} else {
			press = false;
		}
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
		this.cursors = this.input.keyboard.createCursorKeys();
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
 * 
 * TODO: Create new Key objects for multiple keys.
    this.jumpKey1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // For 'W' key
    this.jumpKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP); // For 'UP_ARROW' key

    // Function to call when a jump key is pressed.
    function jumpAction(event) {
        // This block of code will run when either assigned key is pressed.
        console.log("Jump action triggered!");
    }

    // Add a 'down' event listener to both keys, assigning the same function.
    this.jumpKey1.on('down', jumpAction);
    this.jumpKey2.on('down', jumpAction);
}
 * 
 */