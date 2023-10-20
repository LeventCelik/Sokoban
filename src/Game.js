import { gameConfig, levels } from "./config.js";
import utils from "./utils.js";

export class Game extends Phaser.Scene {
	// preload(), create(), and update() are necessary methods. Rest are organization.
	preload() {
		this.load.spritesheet('tiles', gameConfig.assets.file, {
			frameWidth: gameConfig.assets.factor,
			frameHeight: gameConfig.assets.factor,
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
		var layers = gameConfig.game_objects;

		// Read the level data from config and parse it
		const parsed_data = utils.level_parser(levels[gameConfig.currentLevel].data);

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
			layers[obj_name] = utils.create_layer(tilemaps[obj_name]);
		}
		this.walls = layers.walls.createFromTiles(gameConfig.assets.wall, 0, {key: 'tiles', frame: gameConfig.assets.wall})
						.map(wall => wall.setOrigin(0, 0));
		this.boxes = layers.boxes.createFromTiles(gameConfig.assets.box, 0, {key: 'tiles', frame: gameConfig.assets.box})
						.map(box => box.setOrigin(0, 0));
		
	}

	createCharacter() {
		const ban = levels[gameConfig.currentLevel].ban;
		this.player = this.add.sprite(ban.x, ban.y, 'tiles', gameConfig.assets.ban.down);
		this.player.setOrigin(0, 0);
	}

	addKeys() {
		// TODO: Config file for keys
		const player = this.player;
		const boxes = this.boxes;
		const walls = this.walls;
		const scene = this.scene;

		function moveAction(event, dir) {
			utils.update_model(player, dir);
			if (utils.check_world(player.x, player.y, dir)) return;
			if (utils.check_obstacles(player.x, player.y, dir, walls)) return;
			const box = utils.check_obstacles(player.x, player.y, dir, boxes);
			if (!box) {
				utils.move_sprite(player, dir);
				return;
			}
			// Box in the way
			if (utils.check_world(box.x, box.y, dir)) return;
			if (utils.check_obstacles(box.x, box.y, dir, walls)) return;
			if (utils.check_obstacles(box.x, box.y, dir, boxes)) return;

			utils.move_sprite(player, dir);
			utils.move_sprite(box, dir);
		}

		function resetAction(event) {
			scene.restart();
		}

		this.left_key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // For 'A' key
		this.left_key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); // For 'LEFT_ARROW' key
		this.right_key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); // For 'D' key
		this.right_key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); // For 'RIGHT' key
		this.up_key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // For 'W' key
		this.up_key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP); // For 'UP_ARROW' key
		this.down_key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S); // For 'S' key
		this.down_key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN); // For 'DOWN_ARROW' key
		
		this.reset_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R); // For 'R' key


		// Add a dir event listener to both keys, assigning the same function.
		this.left_key1.on('down', (event) => {moveAction(event, 'LEFT')});
		this.left_key2.on('down', (event) => {moveAction(event, 'LEFT')});
		this.right_key1.on('down', (event) => {moveAction(event, 'RIGHT')});
		this.right_key2.on('down', (event) => {moveAction(event, 'RIGHT')});
		this.up_key1.on('down', (event) => {moveAction(event, 'UP')});
		this.up_key2.on('down', (event) => {moveAction(event, 'UP')});
		this.down_key1.on('down', (event) => {moveAction(event, 'DOWN')});
		this.down_key2.on('down', (event) => {moveAction(event, 'DOWN')});
		
		this.reset_key.on('down', resetAction);
	}
}


