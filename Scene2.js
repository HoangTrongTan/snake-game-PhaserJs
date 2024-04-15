class Scene2 extends Phaser.Scene {
  constructor() {
    super("PlayGame");

    this.x = 8;

    this.y = 8;

    this.headPosition = new Phaser.Geom.Point(this.x, this.y);

    this.alive = true;

    this.speed = 100;

    this.moveTime = 0;

    this.tail = new Phaser.Geom.Point(this.x, this.y);

    this.heading = "right";

    this.direction = "right";
    this.score = 0;

    
    this.second = 5;

    this.eated = 0;

    this.setCountDown = null;
  }
  taoDiem(){
    var graphics = this.add.graphics();
    graphics.fillStyle("#5DC2C9" , 1);
    graphics.beginPath();
    graphics.moveTo(0 , 0);
    graphics.lineTo( config.width, 0 );
    graphics.lineTo( config.width, 20 );
    graphics.lineTo( 0, 20 );
    graphics.lineTo( 0, 0 );
    graphics.closePath();
    graphics.fillPath();

    this.scoreLabel = this.add.text( 2 , 2 , "Điểm của bạn: " ).setOrigin(0);

    this.countDownText = this.add.text( config.width - 2, 2  , "").setOrigin(1,0);

  }
  giftFood(){
    this.gift.play("food_gray");
    this.gift.setScale(2);

    let x = Phaser.Math.Between(0, game.config.width - 10);
    let y = Phaser.Math.Between(20, game.config.height - 10);

    this.gift.setPosition(x, y);
  }
  create() {

    this.gift = this.physics.add.sprite(0 , 0 , "food");
    this.gift.setPosition(-20, -20);

    this.taoDiem();
    this.food = this.physics.add.sprite(0, 0, "food");
    this.food.play("food_red");
    this.food.setScale(0.7);
    this.food.setSize(
      Math.round(this.food.width / 2),
      Math.round(this.food.height / 2)
    );

    this.spawnfood();

    this.body = this.physics.add.group();

    this.head = this.body.create(this.x * 16, this.y * 16, "player");

    this.head.setOrigin(0); // Đặt điểm neo

    this.head.setScale(0.5);

    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.physics.add.overlap(this.head, this.food, this.mum, null, this);

    this.physics.add.overlap( this.gift , this.head , (ite1 , it2) => {
        clearInterval(this.setCountDown);
        this.score *= 2;
        this.gift.setPosition(-20, -20);
    } , null, this );

    this.btnResest = new CustomButton(
      this,
      game.config.width / 2,
      game.config.height / 2,
      "Click me !",
      0.1
    );
    this.btnResest.setInteractive();

    this.btnResest.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, (e) => {
      window.location = "index.html"; 
    });

    this.btnResest.alpha = 0;

  }
  countDown(){
    var iu = this.second;
    this.setCountDown = setInterval( () => {
      iu--;
      if(iu < 0){
        this.countDownText.text = ``;
        this.gift.setPosition(-20, -20);
        return;
      }
      this.countDownText.text = `${iu}`;
    } ,1000);
  }
  endGame() {
    // console.log(this.head.x, "-----", this.food.x);
    var tween = this.tweens.add({
      targets: this.btnResest,
      y: game.config.height / 2,
      ease: "Power1",
      duration: 700,
      repeat: 0,
      onComplete: () => {
        this.btnResest.alpha = 1;
        this.btnResest.setActive(true);
      },
      callbackScope: this,
    });
  }
  mum(head, food) {
    this.score += 2;
    if( (this.score % 5 ) === 0){
      this.giftFood();
      this.countDown();
    }
    this.scoreLabel.text = `Điểm của bạn: ${this.score}`;
    this.grow();
    this.spawnfood();
  }
  update(time, delta) {
    // console.log(this.btnResest.acive);
    if (!this.alive) {
      this.endGame();
      return;
    }
    if (time >= this.moveTime) {
      this.move(time);
    }
    this.directionInput();
  }
  directionInput() {
    if (this.cursorKeys.up.isDown) {
      this.direction = "up";
    } else if (this.cursorKeys.down.isDown) {
      this.direction = "down";
    } else if (this.cursorKeys.left.isDown) {
      this.direction = "left";
    } else if (this.cursorKeys.right.isDown) {
      this.direction = "right";
    }
  }
  move(time) {
    switch (this.direction) {
      case "left":
        this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, 31); // giá trị lớn max thì sẽ là min ngược lại
        break;
      case "right":
        this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, 31);
        break;
      case "up":
        this.headPosition.y = Phaser.Math.Wrap(
          this.headPosition.y - 1,
          0,
          18.5
        );
        break;
      case "down":
        this.headPosition.y = Phaser.Math.Wrap(
          this.headPosition.y + 1,
          0,
          18.5
        );
        break;
    }
    // this.direction = this.heading;
    Phaser.Actions.ShiftPosition(
      this.body.getChildren(),
      this.headPosition.x * 16,
      this.headPosition.y * 16,
      1,
      this.tail
    ); //Cập nhật các phân đoạn cơ thể và đặt tọa độ cuối cùng vào this.tail

    this.moveTime = time + this.speed;

    var hitBody = Phaser.Actions.GetFirst(
      this.body.getChildren(),
      { x: this.head.x, y: this.head.y },
      1
    );
    if (hitBody) {
      console.log("thua");
      this.alive = false;
    }
  }
  grow() {
    var newPart = this.body.create(this.tail.x, this.tail.y, "player");
    newPart.setOrigin(0);
    newPart.setScale(0.5);
  }
  spawnfood() {
    let x = Phaser.Math.Between(0, game.config.width - 10);
    let y = Phaser.Math.Between(20, game.config.height - 10);

    this.food.setPosition(x, y);
  }
}
