function Enemy() {
  this.canvas = document.getElementById("canvas");
  this.painter = this.canvas.getContext("2d");
  this.sprite = new Image();
  this.sprite.src = "images/enemy.png";
  this.speed = 5;
  this.damage = 2;
  this.width;
  this.height;
  this.direction = "left";
  this.counter = 0;
  this.isMoving = true;
  this.x = this.canvas.width;
  this.y = this.canvas.height - 266;
  this.hp = 100;
  this.drawEnemy = function() {
    this.painter.drawImage(this.sprite, this.x, this.y, this.sprite.width / 3, this.sprite.height / 3);
    this.width = this.sprite.width / 3;
  }

  this.move = function() {
    if (this.isMoving) {
      switch (this.direction) {
        case "left":
          this.x -= this.speed;
          break;
        case "right":
          this.x += this.speed;
          break;
      }
    }
  }

  this.follow = function(object){
    if(object.x >= this.x + this.sprite.width/3){
      this.sprite.src = "images/enemy-rev.png";
      this.direction = "right";
    } else {
      this.sprite.src = "images/enemy.png";
      this.direction = "left";
    }
  }

  this.attack = function(object) {
    if(this.counter == 17){
      object.hp -= this.damage;
      this.counter = 0;
    }
  }
}
