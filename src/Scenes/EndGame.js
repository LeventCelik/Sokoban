/**
 * This class is practically a placeholder. It is ugly, but it serves its purpose.
 * TODO: Make this look better, and remove all this hard coded stuff.
 */

import { gameConfig } from "../config.js";
import utils from "../utils.js";

export class EndGame extends Phaser.Scene {
	constructor() {
		super({key: "EndGame"});
	}

	init(data) {
		this.level = data.level;
		this.moves = data.moves;
		console.log(this.level);
		console.log(this.moves);
	}

	preload() {
		this.load.image('bg', gameConfig.assets.end_screen_background_file);
	}

	create() {
		this.scale.resize(500, 500);
		const width = this.scale.width;
		const height = this.scale.height;
		this.add.image(width * 0.5, height * 0.5, 'bg');
		this.add.text(width * 0.5, height * 0.4, 'Level Complete!', {
			fontFamily: 'PixelEmulator',
			color: '#ffffff',
			fontSize: 36
		}).setOrigin(0.5);

		this.add.text(width * 0.5, height * 0.5, `Completed in ${this.moves} moves`, {
			fontFamily: 'PixelEmulator',
			color: '#ffffff',
		}).setOrigin(0.5);

		this.createButton('Next Level', 0x159638, width * 0.32, height * 0.6, width * 0.3, height * 0.1, this.next_level_action);
		this.createButton('Play Again', 0x159638, width * 0.68, height * 0.6, width * 0.3, height * 0.1, this.restart_action);
	}
	
	createButton(text, color, x, y, width, height, action) { // Does not check width height for small screens
		const button = this.add.rectangle(x, y, width, height, color).setOrigin(0.5);
		const button_text = this.add.text(x, y, text, { fontFamily: 'PixelEmulator', color: '#ffffff' });
		Phaser.Display.Align.In.Center(button_text, button);
		button.setInteractive();
		button.on('pointerup', () => action(this));	
		button.on('pointerover', () => { button.setAlpha(0.5); button_text.setAlpha(1);});
		button.on('pointerout', () => { button.setAlpha(1); button_text.setAlpha(1);});
		return button;
	}

	next_level_action(game) {
		console.log('HERE');
		console.log(game.level);
		game.scene.start('Playground', {level: utils.get_next_level(game.level)});
	}

	restart_action(game) {
		game.scene.start('Playground', {level: game.level});
	}

}