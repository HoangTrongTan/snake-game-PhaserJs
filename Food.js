class Food extends Phaser.GameObjects.Sprite{
    constructor(scene, x , y, type){
        super(scene,  x, y , "food");

        // existing
        scene.add.existing(this);
        scene.physics.world.enableBody(true);
        this.play(type);

        //scene.children.add(this);// Thêm Food vào danh sách các đối tượng của scene. Điều này làm cho Food được quản lý bởi scene, và sẽ được cập nhật và hiển thị theo chu kỳ game loop của Phaser.
    }
}