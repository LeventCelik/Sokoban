import { Playground } from "./Scenes/Playground.js";
import { Menu } from "./Scenes/Menu.js";
import { InfoPanel } from "./Scenes/InfoPanel.js";
import { EndGame } from "./Scenes/EndGame.js";

await document.fonts.load('10pt "PixelEmulator"');

const config = {
	type: Phaser.AUTO,
	scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
		parent: 'gameContainer',
        width: '100%',
        height: '100%'
    },
	scene: [Menu, Playground, InfoPanel, EndGame]
};
export default new Phaser.Game(config);
