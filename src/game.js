function Game() {
  this.constants = new Constants();
  this.mapGenerator = new MapGenerator(40, 24);
  this.map = this.mapGenerator.generateMap();
  this.swords = this.mapGenerator.getSwords();
  this.healtPotions = this.mapGenerator.getHealtPotions();
  this.enemiesGenerator = new EnemiesGenerator(this.mapGenerator, this.map);
  this.enemies = this.enemiesGenerator.generateEnemies(10);
  this.playerStartingPosiotion = this.mapGenerator.getRandomFloor();
  this.player = new Player(
    this.playerStartingPosiotion.x,
    this.playerStartingPosiotion.y,
    this.mapGenerator,
    this.enemies
  );
  this.controls = new Controls(this.player);

  this.drawMap = function () {
    $(".field").empty();
    for (var i = 0; i < this.mapGenerator.width; i++) {
      for (var j = 0; j < this.mapGenerator.height; j++) {
        var tile = $('<div class="tile"></div>');
        if (this.map[i][j] == this.constants.WALL) {
          tile.addClass("tileW");
        }
        if (this.map[i][j] == this.constants.SWORD) {
          tile.addClass("tileSW");
        }
        if (this.map[i][j] == this.constants.HEALTH_POTION) {
          tile.addClass("tileHP");
        }
        if (i == this.player.position.x && j == this.player.position.y) {
          tile.addClass("tileP " + this.player.direction);
          tile.append(this.addHpElement(this.player.hp));
        }
        for (var k = 0; k < this.enemies.length; k++) {
          if (
            this.enemies[k].position.x == i &&
            this.enemies[k].position.y == j
          ) {
            tile.addClass("tileE " + this.enemies[k].direction);
            tile.append(this.addHpElement(this.enemies[k].hp));
            console.log(this.enemies[k].hp);
            if (this.enemies[k].isDead) tile.addClass("red-tint");
            break;
          }
        }
        tile.css({ left: i * 25, top: j * 25 });
        $(".field").append(tile);
      }
    }
  };

  this.run = function () {
    this.drawMap();
  };

  this.addHpElement = function (hp) {
    var health = $('<div class="health"></div>');
    health.css("width", hp + "%");
    return health;
  };

  this.checkPlayerCollisions = function () {
    if (this.isPlayerOnSword()) {
      this.player.buffAttack();
      this.tileToFloor(this.player.position.x, this.player.position.y);
    }

    if (this.isPlayerOnHealthPotion()) {
      this.player.regenerateHp();
      this.tileToFloor(this.player.position.x, this.player.position.y);
    }

    if (this.isPlayerCollidingWithWall()) {
      this.player.setPosition(
        this.player.previousPosition.x,
        this.player.previousPosition.y
      );
    }

    if (this.isPlayerCollidingWithEnemy()) {
      this.player.takeDamage(this.enemies[0].damage);
    }
  };

  this.isPlayerOnSword = function () {
    return this.isPlayerOnObject(this.swords);
  };

  this.tileToFloor = function (x, y) {
    this.map[x][y] = this.constants.FLOOR;
  };

  this.isPlayerOnObject = function (objectArray) {
    for (var i = 0; i < objectArray.length; i++) {
      if (
        this.player.position.x == objectArray[i].x &&
        this.player.position.y == objectArray[i].y
      ) {
        return true;
      }
    }
    return false;
  };

  this.isPlayerOnHealthPotion = function () {
    return this.isPlayerOnObject(this.healtPotions);
  };

  this.isPlayerCollidingWithWall = function () {
    return (
      this.map[this.player.position.x][this.player.position.y] ==
      this.constants.WALL
    );
  };

  this.isPlayerCollidingWithEnemy = function () {
    for (var i = 0; i < this.enemies.length; i++) {
      if (
        this.player.position.x == this.enemies[i].position.x &&
        this.player.position.y == this.enemies[i].position.y &&
        !this.enemies[i].isDead
      ) {
        return true;
      }
    }
    return false;
  };

  this.isPlayerDead = function () {
    return this.player.isDead;
  };

  this.moveEnemies = function () {
    for (var i = 0; i < this.enemies.length; i++) {
      this.enemies[i].randomMove();
      if (
        this.map[this.enemies[i].position.x][this.enemies[i].position.y] ==
        this.constants.WALL
      ) {
        this.enemies[i].setPosition(
          this.enemies[i].previousPosition.x,
          this.enemies[i].previousPosition.y
        );
      }
    }
  };

  this.endGame = function () {
    $(document).off("keydown");
  };

  $(document).keydown(
    function (event) {
      this.controls.update(event);
      this.checkPlayerCollisions();
      if (this.isPlayerDead()) {
        this.endGame();
      }
      this.moveEnemies();
      this.drawMap();
    }.bind(this)
  );
}
