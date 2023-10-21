import { gameConfig, levels, keys } from "../config.js";
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
	}
	// Remember, avoid hard coding as much as possible!
	create() {
		this.scale.resize(levels[this.level].width, levels[this.level].height);
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
		const parsed_data = utils.level_parser(levels[this.level].data);

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
		const ban = levels[this.level].ban;
		this.player = this.add.sprite(ban.x, ban.y, 'tiles', gameConfig.assets.ban.down);
		this.player.setOrigin(0, 0);
	}

	addKeys() {
		const game = this;
		function move_action(event, dir) {
			utils.update_model(game.player, dir);
			if (utils.check_world(game.player.x, game.player.y, dir, game.level)) return;
			if (utils.check_obstacles(game.player.x, game.player.y, dir, game.walls)) return;
			const box = utils.check_obstacles(game.player.x, game.player.y, dir, game.boxes);
			if (!box) {
				utils.move_sprite(game.player, dir);
				return;
			}
			// Box in the way
			if (utils.check_world(box.x, box.y, dir, game.level)) return;
			if (utils.check_obstacles(box.x, box.y, dir, game.walls)) return;
			if (utils.check_obstacles(box.x, box.y, dir, game.boxes)) return;

			utils.move_sprite(game.player, dir);
			utils.move_sprite(box, dir);
			if (utils.check_targets(game.boxes, game.targets)) game.next_level();

		}

		function reset_action(event) {
			game.scene.restart();
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
		this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N).on('down', (event) => {this.next_level()});
	}

	next_level() {
		const next_level = utils.get_next_level(this.level);
		if (!levels[next_level]) {
			console.log('No more levels to play');
			// TODO: End screen
			return;
		}
		this.scene.start("Playground", { level: next_level});
	}

}


