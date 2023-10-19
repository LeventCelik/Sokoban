const box = 2;
const road = 13*7-1;
const wall = 13*7-6;
const ban = 13*4;
const target = 13*8-1;

export const gameConfig = {
	assets: {
		// Asset choices
		box: box,
		road: road,
		wall: wall,
		ban: ban,
		target: target
	},
	playerSettings: {
		// Player related stuff

	}
	// Other configs
}



export const maps = {
	// Levels should have multiple layers, this is just a start
	test: [[wall, wall, wall, wall, wall, null],
			[wall, road, road, road, wall, wall],
			[wall, road, box, target, wall],
			[wall, road, road, road, wall],
			[wall, wall, wall, wall, wall]],
	level1: [[null, null, null, null, wall, wall, wall, null, null, null, null],
			[null, null, null, null, wall, target, wall, wall, wall, null, null],
			[null, null, null, null, wall, road, road, road, wall, null, null],
			[wall, wall, wall, wall, wall, box, wall, road, wall, wall, wall],
			[wall, ban, box, road, road, target, road, road, box, target, wall],
			[wall, wall, wall, wall, wall, box, wall, wall, wall, wall, wall],
			[null, null, null, null, wall, road, wall, null, null, null, null],
			[null, null, null, null, wall, target, wall, null, null, null, null],
			[null, null, null, null, wall, wall, wall, null, null, null, null]]
}