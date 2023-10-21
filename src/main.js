import { Playground } from "./Scenes/Playground.js";
import { Menu } from "./Scenes/Menu.js";

const config = {
	type: Phaser.AUTO,
	scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
		parent: 'gameContainer',
        width: '100%',
        height: '100%'
    },
	scene: [Menu, Playground]
};

export default new Phaser.Game(config);
