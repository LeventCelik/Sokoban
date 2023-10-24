const wFactor = 64;
const hFactor = 64;

const e = 0;
const g = 13*7-3;
const r = 13*7-1;
const w = 13*7-6;
const t = 13*4-1;
const b = 5;
const banDown = 13*4;
const banUp = 13*4+3;
const banLeft = 13*6+3;
const banRight = 13*6;

const folder_path = 'assets/';

export const gameConfig = {
	assets: {
		folder_path: folder_path,
		tiles: {
			file: folder_path + 'tiles/sokoban_tilesheet.png',
			factor: 64,
			empty: e,
			grass: g,
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
			char_mappings: {
				'e': e,
				'r': r,
				'w': w,
				't': t,
				'b': b,
				'g': g
			},
		},
		fonts: {
			file: folder_path + 'fonts/love-glitch/LoveGlitchPersonalUseRegular.ttf',
			name: 'MyCustomFont'
		},
		keys: {
			filepath: 'assets/keys/SimpleKeys/Jumbo/Light/Single PNGs/',
			left1: 'A.png',
			left2: 'ARROWLEFT.png',
			right1: 'D.png',
			right2: 'ARROWRIGHT.png',
			up1: 'W.png',
			up2: 'ARROWUP.png',
			down1: 'S.png',
			down2: 'ARROWDOWN.png',
			reset: 'R.png',
			next: 'N.png',
			previous: 'B.png',
			undo: 'U.png'
		},
		end_screen_background_file: folder_path + 'images/pixel-brick-wall.jpg',
	},
	levels: {
		filepath: folder_path + 'levels/',
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
			grass: g,
			road: r,
			walls: w,
			targets: t,
			boxes: b
		}
	},
	wFactor: wFactor,
	hFactor: hFactor
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
	reset: Phaser.Input.Keyboard.KeyCodes.R,
	next: Phaser.Input.Keyboard.KeyCodes.N,
	previous: Phaser.Input.Keyboard.KeyCodes.B,
	undo: Phaser.Input.Keyboard.KeyCodes.U
};