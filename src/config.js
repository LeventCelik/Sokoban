import { level_parser } from "./utils.js";

const wFactor = 64;
const hFactor = 64;

const box = 5;
const road = 13*7-1;
const wall = 13*7-6;
const ban = 13*4;
const target = 13*4-1;

export const gameConfig = {
	currentLevel: "level1",
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
};



export const levels = {
	// Levels should have multiple layers, this is just a start
	test: {
			width: 6*wFactor,
			height: 5*hFactor,
			map: [[wall, wall, wall, wall, wall, null],
			[wall, road, road, road, wall, wall],
			[wall, road, box, target, wall],
			[wall, road, road, road, wall],
			[wall, wall, wall, wall, wall]]
		},
	"level1": {
		width: wFactor * 11,
		height: hFactor * 9,
		ban: {
			x: 1*wFactor,
			y: 4*hFactor
		},
		// TODO: Add a parser to make this easier
		background: [[null, null, null, null, road, road, road, null, null, null, null],
			[null, null, null, null, road, road, road, road, road, null, null],
			[null, null, null, null, road, road, road, road, road, null, null],
			[road, road, road, road, road, road, road, road, road, road, road],
			[road, road, road, road, road, road, road, road, road, road, road],
			[road, road, road, road, road, road, road, road, road, road, road],
			[null, null, null, null, road, road, road, null, null, null, null],
			[null, null, null, null, road, road, road, null, null, null, null],
			[null, null, null, null, road, road, road, null, null, null, null]],
		walls: [[null, null, null, null, wall, wall, wall, null, null, null, null],
			[null, null, null, null, wall, null, wall, wall, wall, null, null],
			[null, null, null, null, wall, null, null, null, wall, null, null],
			[wall, wall, wall, wall, wall, null, wall, null, wall, wall, wall],
			[wall, null, null, null, null, null, null, null, null, null, wall],
			[wall, wall, wall, wall, wall, null, wall, wall, wall, wall, wall],
			[null, null, null, null, wall, null, wall, null, null, null, null],
			[null, null, null, null, wall, null, wall, null, null, null, null],
			[null, null, null, null, wall, wall, wall, null, null, null, null]],
		boxes: [[null, null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, box, null, null, null, null, null],
			[null, null, box, null, null, null, null, null, box, null, null],
			[null, null, null, null, null, box, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null, null]],
		targets: [[null, null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, target, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, target, null, null, null, target, null],
			[null, null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null, null],
			[null, null, null, null, null, target, null, null, null, null, null],
			[null, null, null, null, null, null, null, null, null, null, null]],
		},
};