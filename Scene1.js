class Scene1 extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }
    preload(){
        this.load.image("player", "assets/sprite/9.png");
        this.load.spritesheet("food" , "assets/sprite/food.png" , {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.image("btn", "assets/sprite/button.png");
    }
    create(){
        this.scene.start("PlayGame");
        //thức ăn
        this.anims.create({
            key: "food_gray",
            frames: this.anims.generateFrameNumbers("food" , {
                start: 2,
                end: 3
            }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "food_red",
            frames: this.anims.generateFrameNumbers("food" , {
                start: 0,
                end: 1
            }),
            frameRate: 20,
            repeat: -1
        });


    }
}