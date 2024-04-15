class CustomButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, text, size = 0.05) {
    super(scene, x, y);
    this.text = scene.add
      .text(0, 0, text, { fontSize: 10 })

      .setOrigin(0.5);

    this.buttonImage = scene.add.image(0, 0, "btn");
    this.buttonImage.setScale(size);
    this.add(this.buttonImage);
    this.add(this.text);
    this.setSize(this.buttonImage.displayWidth, this.buttonImage.displayHeight);
    scene.add.existing(this);
    this.acive = false;
  }
  setActive(type){
    this.acive = type; 
  }
  setText(newText){
    this.text.text = newText; 
  }
}
