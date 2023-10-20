import { gameConfig, levels } from "./config.js";
/**
 * To generate several layers from a single 2D straight array.
 * @param {Array<Array<number>>} location_data Containing where everything goes, e.g.:
 * [[wall, wall, wall, wall, wall, null],
 *  [wall, road, road, road, wall, wall],
 *  [wall, road, box, target, wall, null],
 *  [wall, road, road, road, wall, null],
 *  [wall, wall, wall, wall, wall, null]]
 * @return {JSON<Array>} Containing individual object data
 */
function level_parser(location_data) {


	// First, extract the unique object values from the location_data
	const game_objects = gameConfig.game_objects;
	const values = [];

	for (const obj_name in game_objects) {
		values.push(game_objects[obj_name]);
	}

	// Prepare the resulting object of 2D arrays
	let result = gameConfig.game_objects; // We need the keys
	
	for (let obj_name in game_objects) {
		// Create a new 2D array filled with nulls, but with the same dimensions as the input array
		let newArray = location_data.map(row => row.map(() => null));

		// Place the uniqueValue in the appropriate positions
		for (let rowIndex = 0; rowIndex < location_data.length; rowIndex++) {
			for (let colIndex = 0; colIndex < location_data[rowIndex].length; colIndex++) {
				if (location_data[rowIndex][colIndex] === game_objects[obj_name]) {
					newArray[rowIndex][colIndex] = game_objects[obj_name];
					if (location_data[rowIndex][colIndex] !== game_objects.road
						&& location_data[rowIndex][colIndex] !== game_objects.empty) {
						result.road[rowIndex][colIndex] = game_objects.road;
					}
				}
			}
		}
		// Add this 2D array to the result
		result[obj_name] = newArray;
	}

	return result;
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
 * Checks whether the next move from the given coordinates would
 * stay within the world.
 * @param {number} x coordinate
 * @param {number} y coordinate
 * @param {string} dir direction
 * @return {boolean}
 */
function check_world(x, y, dir) {
	const updated = new_coordinates(x, y, dir);
	x = updated.x;
	y = updated.y;
	if (x < 0) return true;
	if (y < 0) return true;
	if (x >= levels[gameConfig.currentLevel].width) return true;
	if (y >= levels[gameConfig.currentLevel].height) return true;
	return false;
}

/**
 * Checks whether the next move from the given coordinates would
 * stay hit a box. Returns the box if so, false otherwise.
 * @param {number} x coordinate
 * @param {number} y coordinate
 * @param {string} dir direction
 * @param {Array<Phaser.GameObjects.Sprite>} obstacles boxes or walls
 */
function check_obstacles(x, y, dir, obstacles) {
	const updated = new_coordinates(x, y, dir);
	x = updated.x;
	y = updated.y;
	for (let obstacle of obstacles) {
		if (x === obstacle.x && y === obstacle.y) {
			return obstacle;
		}
	}
	return false;
}

/**
 * Calculates the next coordinates from the sprite's position.
 * @param {number} x coordinate
 * @param {number} y coordinate
 * @param {string} dir direction
 * @returns {number, number} new coordinates
 */
function new_coordinates(x, y, dir) {
	var north_or_west = false; // To determine + or - direction
	var east_or_west = false; // To determine x or y direction
	switch (dir) {
		case 'LEFT':
			east_or_west = true;
			north_or_west = true;
			break;
		case 'UP':
			north_or_west = true;
			break;
		case 'RIGHT':
			east_or_west = true;
			break;
		case 'DOWN':
			break;
	}

	x += (north_or_west ? -1 : 1) * (east_or_west ? gameConfig.move_x : 0);
	y += (north_or_west ? -1 : 1) * (east_or_west ? 0 : gameConfig.move_y);
	return {x: x, y: y};
}

/**
 * Updates the coordinates of a sprite.
 * @param {Phaser.GameObjects.Sprite} sprite
 * @param {number} dir direction
 * @return {void}
 */
function move_sprite(sprite, dir) {
	const updated = new_coordinates(sprite.x, sprite.y, dir);
	sprite.x = updated.x;
	sprite.y = updated.y;
}

/**
 * Updates the texture model to 'animate' the player.
 * @param {Phaser.GameObjects.Sprite} player 
 * @param {number} dir direction
 */
function update_model(player, dir) {
	switch (dir) {
		case 'LEFT':
			player.setTexture('tiles', gameConfig.assets.ban.left);
			break;
		case 'UP':
			player.setTexture('tiles', gameConfig.assets.ban.up);
			break;
		case 'RIGHT':
			player.setTexture('tiles', gameConfig.assets.ban.right);
			break;
		case 'DOWN':
			player.setTexture('tiles', gameConfig.assets.ban.down);
			break;
	}
}

export default {
	level_parser,
	create_layer,
	check_world,
	check_obstacles,
	move_sprite,
	update_model
};