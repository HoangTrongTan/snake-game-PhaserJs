var config = {
    width: 500,
    height: 300,
    backgroundColor: "#A3EBA5",
    scene: [Scene1, Scene2],
    physics:{
        default: "arcade",
        arcade:{
            debug: false
        }
    }
};

var game = new Phaser.Game(config);