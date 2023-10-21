import { gameConfig, keys } from "../config.js";
import utils from "../utils.js";

export class Playground extends Phaser.Scene {
	// init(), preload(), create(), and update() are necessary methods. Rest are organization.
	constructor() {
		super({key: "Playground"});
	}
	
	init(data) {
		if (!data.level) {
			data = {level: "level1"}
		}
		this.level = data.level;
	}
	
	preload() {
		this.load.spritesheet('tiles', gameConfig.assets.file, {
			frameWidth: gameConfig.assets.factor,
			frameHeight: gameConfig.assets.factor,
			startFrame: 0
		});
		this.load.json('levelData' + this.level, gameConfig.levels.filepath + this.level + '.json');
		this.load.on('loaderror', function (file, error) {
			console.log('ERROR')
			if (file.key === 'levelData' + this.level) {
				console.log('No more levels to play');
				// TODO: End game screen
			}
		});
	}
	// Remember, avoid hard coding as much as possible!
	create() {
		this.createWorld();
		this.createCharacter();
		this.addKeys();
		this.scale.resize(this.level_data.width * gameConfig.wFactor, this.level_data.height * gameConfig.hFactor);
	}

	createWorld() {
		// Tilemaps and layers will be stored in these containers, respectively
		// We will overwrite the values, and only use the keys
		const tilemaps = gameConfig.game_objects; // Copy of gameConfig.game_objects, safe to change
		var layers = gameConfig.game_objects;

		// Read the level data from config and parse it
		this.level_data = this.cache.json.get('levelData' + this.level);
		const parsed_data = utils.level_parser(this.level_data.locations);

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
		const ban = this.level_data.ban;
		this.player = this.add.sprite(ban.x * gameConfig.wFactor, ban.y * gameConfig.hFactor, 'tiles', gameConfig.assets.ban.down);
		this.player.setOrigin(0, 0);
		this.move_count = 0;
		this.move_text = this.add.text(16, 16, 'Moves: 0', { fontSize: '32px', fill: '#000' });
		this.last_move = null;
		this.last_moved_objects = [];
	}

	addKeys() {
		const game = this;
		function move_action(event, dir) {
			utils.update_model(game.player, dir);
			game.move_text.setText('Moves: ' + ++game.move_count);
			game.last_move = 'STOP';
			game.last_moved_objects = [];
			if (utils.check_world(game.player.x, game.player.y, dir, game.level_data)) return;
			if (utils.check_obstacles(game.player.x, game.player.y, dir, game.walls)) return;
			const box = utils.check_obstacles(game.player.x, game.player.y, dir, game.boxes);
			if (!box) {
				utils.move_sprite(game.player, dir);
				game.last_move = dir;
				game.last_moved_objects = [game.player];
				return;
			}
			// Box in the way
			if (utils.check_world(box.x, box.y, dir, game.level_data)) return;
			if (utils.check_obstacles(box.x, box.y, dir, game.walls)) return;
			if (utils.check_obstacles(box.x, box.y, dir, game.boxes)) return;

			utils.move_sprite(game.player, dir);
			utils.move_sprite(box, dir);
			game.last_move = dir;
			game.last_moved_objects = [game.player, box];
			if (utils.check_targets(game.boxes, game.targets)) game.next_level();
		}

		function reset_action(event) {
			game.scene.restart();
		}

		function undo_action() {
			const last_move = game.last_move;
			game.last_move = null;
			if (!last_move) return;
			game.move_text.setText('Moves: ' + --game.move_count);
			if (last_move == 'STOP') return;
			for (const sprite of game.last_moved_objects) {
				utils.move_sprite(sprite, utils.opposite_direction(last_move));
			}
		}

		// Define keys and add listeners to them
		this.input.keyboard.addKey(keys.left1).on('down', (event) => {move_action(event, 'LEFT')});
		this.input.keyboard.addKey(keys.left2).on('down', (event) => {move_action(event, 'LEFT')});
		this.input.keyboard.addKey(keys.right1).on('down', (event) => {move_action(event, 'RIGHT')});
		this.input.keyboard.addKey(keys.right2).on('down', (event) => {move_action(event, 'RIGHT')});
		this.input.keyboard.addKey(keys.up1).on('down', (event) => {move_action(event, 'UP')});
		this.input.keyboard.addKey(keys.up2).on('down', (event) => {move_action(event, 'UP')});
		this.input.keyboard.addKey(keys.down1).on('down', (event) => {move_action(event, 'DOWN')});
		this.input.keyboard.addKey(keys.down2).on('down', (event) => {move_action(event, 'DOWN')});
		this.input.keyboard.addKey(keys.reset).on('down', reset_action);
		this.input.keyboard.addKey(keys.next).on('down', (event) => {this.next_level()});
		this.input.keyboard.addKey(keys.previous).on('down', (event) => {this.previous_level()});
		this.input.keyboard.addKey(keys.undo).on('down', undo_action);
	}

	next_level() {
		this.scene.start("Playground", {level: utils.get_next_level(this.level)});
	}

	previous_level() {
		this.scene.start("Playground", {level: utils.get_previous_level(this.level)});
	}

}


