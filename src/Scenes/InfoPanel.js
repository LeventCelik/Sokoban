import { gameConfig, keys } from "../config.js";

export class InfoPanel extends Phaser.Scene {
	constructor() {
		super({key: "InfoPanel"});
	}

	preload () {
		this.key_names = ['left1', 'left2', 'right1', 'right2', 'up1',
		'up2', 'down1', 'down2', 'reset', 'next', 'previous', 'undo'];
		for (const key of this.key_names) {
			this.load.image(key, gameConfig.assets.keys.filepath + gameConfig.assets.keys[key]);
		}
	}

	create () {

		const images = new Map();

		const width = this.textures.get('up1').getSourceImage().width * 2;
		const height = this.textures.get('up1').getSourceImage().height * 2;
		

		
		// Add WASD
		var x = 64;
		var y = 40;
		this.add.text(x - width, y-5, 'Movement', { fontFamily: 'PixelEmulator', fontSize: 20, color: '#ffffff' }).setOrigin(0, 1);
		var key_name = 'up2';
		images[key_name] = this.addKey(x, y, key_name);
		key_name = 'left2';
		images[key_name] = this.addKey(x -= width, y += height, key_name);
		key_name = 'down2';
		images[key_name] = this.addKey(x += width, y, key_name);
		key_name = 'right2';
		images[key_name] = this.addKey(x += width, y, key_name);
		// Add Arrow Keys
		x -= width;
		y += 2 * height;
		this.add.text(x - width, y - height, 'Alternate\nMovement', { fontFamily: 'PixelEmulator', fontSize: 20, color: '#ffffff', align: 'center' }).setOri;
		key_name = 'up1';
		images[key_name] = this.addKey(x, y, key_name);
		key_name = 'left1';
		images[key_name] = this.addKey(x -= width, y += height, key_name);
		key_name = 'down1';
		images[key_name] = this.addKey(x += width, y, key_name);
		key_name = 'right1';
		images[key_name]= this.addKey(x += width, y, key_name);
		// Add Undo and Reset
		x -= 2 * width;
		y += 2 * height;
		this.add.text(x + width * 2, y-5, 'Undo/Restart', { fontFamily: 'PixelEmulator', fontSize: 20, color: '#ffffff' }).setOrigin(0.5, 1);
		key_name = 'undo';
		images[key_name] = this.addKey(x, y, key_name);
		key_name = 'reset';
		images[key_name]= this.addKey(x += 2 * width, y, key_name);
		// Add Next and Previous
		x -= 2 * width;
		y += 2 * height;
		this.add.text(x + width * 1.5, y-5, 'Prev/Next', { fontFamily: 'PixelEmulator', fontSize: 20, color: '#ffffff' }).setOrigin(0.5, 1);
		key_name = 'previous';
		images[key_name] = this.addKey(x, y, key_name);
		key_name = 'next';
		images[key_name] = this.addKey(x += 2 * width, y, key_name);

		this.images = images;

		this.keys = new Map();

		for (const key_name of this.key_names) {
			this.keys[key_name] = this.input.keyboard.addKey(keys[key_name]);
		}

		this.cameras.main.setViewport(0, 0, 300, 600);
	}

	update () {
		for (const name of this.key_names) {
			this.images[name].setAlpha((this.keys[name].isDown) ? 0.5 : 1);
		}
		
	}

	addKey(x, y, name) {
		const texture = this.textures.get(name);
		if (!texture) {
			console.warn(`Texture ${name} not found!`)
			return;
		}

		const image = this.add.image(x, y, name);
		image.setOrigin(0);
		image.setScale(2);

		return image;
	}

}

// create () {
// 	const images = new Map();
// 	var x = 10;
// 	var y = 50;
// 	for (const key of this.key_names) {
// 		const texture = this.textures.get(key);
// 		if (!texture) {
// 			console.warn(`Texture ${key} not found!`)
// 			continue;
// 		}
// 		const width = texture.getSourceImage().width;
// 		const height = texture.getSourceImage().height;
// 		images[key] = this.add.image(x, y+=height, key).setOrigin(0);
// 	}
	
// 	this.keys = new Map();

// 	for (const key_name of this.key_names) {
// 		this.keys[key_name] = this.input.keyboard.addKey(keys[key_name]);
// 	}

// 	this.images = images;

// 	this.cameras.main.setViewport(0, 0, 300, 600);
// }

// update () {
// 	for (const key_name of this.key_names) {
// 		this.images[key_name].setAlpha((this.keys[key_name].isDown) ? 1 : 0.2);
// 	}
	
// }