import { gameConfig } from "./config.js";
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
export function level_parser(location_data) {


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
