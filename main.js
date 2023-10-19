class Example extends Phaser.Scene {
	preload() {
		this.load.image('sky', 'assets/space3.png');
		this.load.image('logo', 'assets/phaser3-logo.png');
		this.load.image('red', 'assets/red.png');
	}
	create() {
		this.add.image(400, 300, 'sky');
		const particles = this.add.particles(0, 0, 'red', {
			speed: 100,
			scale: { start: 1, end: 0 },
			blendMode: 'ADD'
		});
		const logo = this.physics.add.image(400, 100, 'logo');
		logo.setVelocity(100, 200);
		logo.setBounce(1, 1);
		logo.setCollideWorldBounds(true);
		particles.startFollow(logo);
	}
}

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene: Example,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 400 }
		}
	},
};

const game = new Phaser.Game(config);
