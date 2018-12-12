function Game() {
  this.canvas = document.getElementById("canvas");
  this.painter = this.canvas.getContext("2d");
  this.isStarted = false;
  this.playerScore = 0;
  this.isPaused = false;
  this.isComplete = false;
  this.debugMode = true;
  this.enemy = new Enemy();
  this.pressedkey;
  this.player = new Player();
  this.fps = 60;
  this.goal = false;
  this.backgroundX = 0;
  this.backgroundY = 0;
  this.background = new Image();
  this.background.src = "images/bg-game.png";

  this.pause = function() {
    if (this.isPaused == true) {
      $(document).keyup((event) => {
        this.pressedkey = event.key;
        if (event.key === "Escape") {
          this.isPaused = false;
        }
      });
    } else if (this.isPaused == false) {
      $(document).keyup((event) => {
        this.pressedkey = event.key;
        if (event.key === "Escape") {
          this.isPaused = true;
        }
      });
    }
  }

  $(".restart").on("click", () => {
    window.location.reload(true);
  });

  this.debug = function() {
    if (this.debugMode) {
      $(".debug").show();
      $("#playerX .value").html(this.player.x);
      $("#playerY .value").html(this.player.y);
      $("#key .value").html(this.pressedkey);
      $("#playerName .value").html(Menu.username);
      $("#enemyX .value").html(this.enemy.x);
      $("#enemyY .value").html(this.enemy.y);
      $("#objCollision .value").html(this.checkObjectsCollision(game.player, game.enemy));
    }
  }

  this.drawBackground = function() {
    this.painter.drawImage(this.background, this.backgroundX, this.backgroundY, this.background.width, this.canvas.height);
  }

  this.drawPause = function() {
    this.painter.fillStyle = "rgba(0, 0, 0, 0.4)";
    this.painter.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.painter.font = "70px Roboto";
    this.painter.textAlign = 'center';
    this.painter.fillStyle = "white";
    this.painter.fillText("ПАУЗА", this.canvas.width / 2, this.canvas.height / 2);
  }

  this.playerControls = function() {
    $(document).keydown((event) => {
      switch (event.key) {
        case "ArrowLeft":
          this.player.direction = "left";
          this.player.isMoving = true;
          break;
        case "ArrowRight":
          this.player.direction = "right";
          this.player.isMoving = true;
          break;
        case " ":
          this.player.heal();
          break;


      }
    });
    $(document).keyup((event) => {
      if (event.key == "ArrowLeft" || "ArrowRight") {
        this.player.isMoving = false;
      }
    });
  }

  this.checkCollision = function() {
    if (this.player.x < 0) {
      this.player.x = 0;
      this.player.heal();
      var x = "left";
      return x;
    }

    if (this.goal == true) {
      if (this.player.x + this.player.width >= this.canvas.width) {
        this.player.x = this.canvas.width - this.player.width;
        this.endGame();
      }
    } else if(this.goal == false) {
      if (this.player.x + this.player.width >= this.canvas.width / 2) {
        this.player.x = this.canvas.width / 2 - this.player.width - 10;
        var x = "middle";
        return x;
      }
    }
    return false;
  }

  this.checkObjectsCollision = function(object, subject) {
    if (object.x + object.width - 100 >= subject.x && object.x + object.width <= subject.x + subject.width) {
      return true;
    } else if(object.x <= subject.x + subject.width && object.x >= subject.x){
      return true;
    } else {
      return false;
    }
  }

  this.moveBackground = function() {
    if (this.checkCollision() == "middle" && this.player.isMoving && this.backgroundX >= 0 - this.background.width + this.canvas.width) {
      this.backgroundX -= 50;
    } else if(this.backgroundX <= 0 - this.background.width + this.canvas.width){
      this.goal = true;
    }
  }

  this.endGame = function() {
    this.isComplete = true;
    this.drawVictory();
  }

  this.drawVictory = function() {
    this.painter.fillStyle = "rgba(255, 255, 0, 0.4)";
    this.painter.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.painter.font = "70px Roboto";
    this.painter.textAlign = 'center';
    this.painter.fillStyle = "white";
    this.painter.fillText("ВЫ ПОБЕДИЛИ!", this.canvas.width / 2, this.canvas.height / 2);
  }
}

var game = new Game();
game.player.name = Menu.username;

var gameLoop = setInterval(() => {
  if (Menu.isActive == false) {
    game.isStarted = true;
  }
  if (game.isStarted == true) {
    game.pause();
    game.drawBackground();
    game.moveBackground();
    game.player.drawSprite(game.canvas, game.painter);
    game.enemy.drawEnemy();
    if (game.isPaused == false && game.isComplete == false && game.player.isDead == false) {
      game.player.drawGUI(Menu.username);
      game.player.manaRegen();
      game.checkCollision();
      game.player.move();
      game.enemy.move();
      if (game.checkObjectsCollision(game.player, game.enemy)) {
        game.enemy.counter++;
        game.enemy.isMoving = false;
        game.enemy.attack(game.player);
      } else {
        game.enemy.isMoving = true;
        game.enemy.follow(game.player);
      }
    } else if (game.isPaused == true) {
      game.drawPause();
    } else if (game.player.isDead) {
      game.player.drawDeath();
    }
    if (game.debugMode == true) {
      game.debug();
    }
  }
}, game.fps);

game.playerControls();
