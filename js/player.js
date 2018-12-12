function Player() {
  this.canvas = document.getElementById("canvas");
  this.painter = this.canvas.getContext("2d");
  this.name = "";
  this.score = 0;
  this.speed = 50;
  this.isDead = false;
  this.canvas = canvas;
  this.direction = "right";
  this.isMoving = false;
  this.x = 0;
  this.y = this.canvas.height - 253;
  this.width;
  this.hp = 100;
  this.mp = 100;
  this.sprite = new Image();
  this.sprite.src = "images/knight.png";
  this.drawSprite = function(canvas, painter) {
    this.checkDeath();
    if (this.isDead == false) {
      painter.drawImage(this.sprite, this.x, this.y, this.sprite.width / 5, this.sprite.height / 5);
    } else if (this.isDead) {
      this.sprite.src = "images/knight-dead.png";
      painter.drawImage(this.sprite, this.x, this.y, this.sprite.width / 5, this.sprite.height / 5);
    }

    this.width = this.sprite.width / 5;
  }

  this.checkDeath = function() {
    if (this.hp <= 0) {
      this.isDead = true;
    }
  }

  this.move = function() {
    if (this.isMoving == true) {
      switch (this.direction) {
        case "left":
          this.x -= this.speed;
          this.sprite.src = "images/knight-rev.png";
          break;
        case "right":
          this.sprite.src = "images/knight.png";
          this.x += this.speed;
          break;
      }
    }
  }

  this.manaRegen = function() {
    if (this.mp <= 100) {
      this.mp += 0.2;
    }
  }

  this.heal = function() {
    if (this.hp < 100 && this.mp > 0) {
      this.sprite.src = "images/knight_heal.png";
      this.hp += 5;
      this.mp -= 10;
    } else if (this.hp >= 100) {
      this.sprite.src = "images/knight.png";
      this.heroSay("У меня полное здоровье!");
    } else if (this.mp <= 0) {
      this.sprite.src = "images/knight.png";
      this.heroSay("У меня кончилась мана!");
    }
  }

  this.drawGUI = function() {
    this.painter.fillStyle = "crimson";
    this.painter.fillRect(30, 30, this.hp * 2, 15);
    this.painter.fillStyle = "violet";
    this.painter.fillRect(30, 50, this.mp <= 0 ? 0 : this.mp * 2, 15)
  }

  this.heroSay = function(message) {
    this.painter.font = "30px Roboto";
    this.painter.textAlign = "center";
    this.painter.fillStyle = "white";
    this.painter.fillText(message, this.x + this.width / 2, this.y);
  }

  this.drawDeath = function() {
    this.painter.fillStyle = "rgba(255, 0, 0, 0.3)";
    this.painter.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.painter.font = "70px Roboto";
    this.painter.textAlign = 'center';
    this.painter.fillStyle = "white";
    this.painter.fillText("ВЫ ПОГИБЛИ", this.canvas.width / 2, this.canvas.height / 2);
    this.painter.font = "50px Roboto";
    this.painter.textAlign = 'center';
    this.painter.fillStyle = "white";
    this.painter.fillText("Счет: " + this.score, this.canvas.width / 2, this.canvas.height / 1.7);
    $(".restart").show();
  }
}
