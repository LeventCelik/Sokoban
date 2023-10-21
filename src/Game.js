import { gameConfig, levels, keys } from "./config.js";
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
		this.targets = layers.targets.createFromTiles(gameConfig.assets.target, 0, {key: 'tiles', frame: gameConfig.assets.target})
						.map(target => target.setOrigin(0, 0));
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
		const game = this;
		function moveAction(event, dir) {
			utils.update_model(game.player, dir);
			if (utils.check_world(game.player.x, game.player.y, dir)) return;
			if (utils.check_obstacles(game.player.x, game.player.y, dir, game.walls)) return;
			const box = utils.check_obstacles(game.player.x, game.player.y, dir, game.boxes);
			if (!box) {
				utils.move_sprite(game.player, dir);
				return;
			}
			// Box in the way
			if (utils.check_world(box.x, box.y, dir)) return;
			if (utils.check_obstacles(box.x, box.y, dir, game.walls)) return;
			if (utils.check_obstacles(box.x, box.y, dir, game.boxes)) return;

			utils.move_sprite(game.player, dir);
			utils.move_sprite(box, dir);
			//utils.check_targets
		}

		function resetAction(event) {
			game.scene.restart();
		}

		this.left_key1 = this.input.keyboard.addKey(keys.left1);
		this.left_key2 = this.input.keyboard.addKey(keys.left2);
		this.right_key1 = this.input.keyboard.addKey(keys.right1);
		this.right_key2 = this.input.keyboard.addKey(keys.right2);
		this.up_key1 = this.input.keyboard.addKey(keys.up1);
		this.up_key2 = this.input.keyboard.addKey(keys.up2);
		this.down_key1 = this.input.keyboard.addKey(keys.down1);
		this.down_key2 = this.input.keyboard.addKey(keys.down2); 
		this.reset_key = this.input.keyboard.addKey(keys.reset);


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


