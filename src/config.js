import { level_parser } from "./utils.js";

const wFactor = 64;
const hFactor = 64;

const e = 13*7-3;
const r = 13*7-1;
const w = 13*7-6;
const t = 13*4-1;
const b = 5;
const ban = 13*4;

export const gameConfig = {
	currentLevel: "level2",
	assets: {
		// Asset choices
		file: '../assets/tiles/sokoban_tilesheet.png',
		empty: e,
		road: r,
		wall: w,
		target: t,
		box: b,
		ban: ban
	},
	playerSettings: {
		// Player related stuff

	},
	/**
	 * This special syntax is called a "getter".
	 * It allows us to access game_objects without the parentheses.
	 * The function itself allows us to return a different value each time,
	 * so that we do not need to deep copy the object each time.
	 */
	get game_objects() {
		return {
			// Rendered in order so that the last one is on top
			empty: e,
			road: r,
			walls: w,
			targets: t,
			boxes: b
		}
	},
	move_x : wFactor,
	move_y : hFactor
};

export const levels = {
	// Levels should have multiple layers, this is just a start
	test: {
			width: 6*wFactor,
			height: 5*hFactor,
			map: [
			[w, w, w, w, w, e],
			[w, r, r, r, w, w],
			[w, r, b, t, w],
			[w, r, r, r, w],
			[w, w, w, w, w]
		],
	},
	"level1": {
		width: wFactor * 11,
		height: hFactor * 9,
		ban: {
			x: 1*wFactor + wFactor/2,
			y: 4*hFactor + hFactor/2
		},
		data: [
			[e, e, e, e, w, w, w, e, e, e, e],
			[e, e, e, e, w, t, w, w, w, e, e],
			[e, e, e, e, w, r, r, r, w, e, e],
			[w, w, w, w, w, b, w, r, w, w, w],
			[w, r, b, r, r, t, r, r, b, t, w],
			[w, w, w, w, w, b, w, w, w, w, w],
			[e, e, e, e, w, r, w, e, e, e, e],
			[e, e, e, e, w, t, w, e, e, e, e],
			[e, e, e, e, w, w, w, e, e, e, e]
		],
	},
	"level2": {
		width: wFactor * 12,
		height: hFactor * 12,
		ban: {
			x: 6*wFactor + wFactor/2,
			y: 3*hFactor + hFactor/2
		},
		data: [
			[e, w, w, w, w, w, w, w, w, w, e, e],
			[e, w, t, t, t, t, t, t, t, w, w, w],
			[w, w, b, b, b, b, b, b, b, b, t, w],
			[w, t, b, r, r, r, r, r, r, b, t, w],
			[w, t, b, r, w, w, w, w, r, b, t, w],
			[w, t, b, r, w, e, e, w, r, b, t, w],
			[w, t, b, r, w, e, e, w, r, b, t, w],
			[w, t, b, r, w, w, w, w, r, b, t, w],
			[w, t, b, r, r, r, r, r, r, b, t, w],
			[w, t, b, b, b, b, b, b, b, b, w, w],
			[w, w, w, t, t, t, t, t, t, t, w, e],
			[e, e, w, w, w, w, w, w, w, w, w, e],
		],
	},
};