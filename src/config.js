const wFactor = 64;
const hFactor = 64;

const e = 13*7-3;
const r = 13*7-1;
const w = 13*7-6;
const t = 13*4-1;
const b = 5;
const banDown = 13*4;
const banUp = 13*4+3;
const banLeft = 13*6+3;
const banRight = 13*6;

export const gameConfig = {
	assets: {
		// Asset choices
		file: 'assets/tiles/sokoban_tilesheet.png',
		factor: 64,
		empty: e,
		road: r,
		wall: w,
		target: t,
		box: b,
		ban: {
			down: banDown,
			up: banUp,
			left: banLeft,
			right: banRight
		},
		mappings: {
			'e': e,
			'r': r,
			'w': w,
			't': t,
			'b': b
		}
	},
	playerSettings: {
		// Player related stuff

	},
	levels: {
		filepath: 'assets/levels/'
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
	wFactor : wFactor,
	hFactor : hFactor
};

export const keys = {
	left1: Phaser.Input.Keyboard.KeyCodes.A,
	left2: Phaser.Input.Keyboard.KeyCodes.LEFT,
	right1: Phaser.Input.Keyboard.KeyCodes.D,
	right2: Phaser.Input.Keyboard.KeyCodes.RIGHT,
	up1: Phaser.Input.Keyboard.KeyCodes.W,
	up2: Phaser.Input.Keyboard.KeyCodes.UP,
	down1: Phaser.Input.Keyboard.KeyCodes.S,
	down2: Phaser.Input.Keyboard.KeyCodes.DOWN,
	reset: Phaser.Input.Keyboard.KeyCodes.R
};