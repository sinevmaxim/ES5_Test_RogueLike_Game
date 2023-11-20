class Player extends Human {
  constructor(x, y, mapGenerator, enemies) {
    super(x, y, mapGenerator);
    this.enemies = enemies;
  }

  buffAttack = function () {
    this.damage *= 2;
  };

  regenerateHp = function () {
    this.hp = Math.min(100, this.hp + 50);
  };

  attack = function () {
    if (this.direction == "right") {
      for (var i = 0; i < this.enemies.length; i++) {
        if (
          (this.enemies[i].position.x == this.position.x + 1 &&
            this.enemies[i].position.y == this.position.y) ||
          (this.enemies[i].position.x == this.position.x + 1 &&
            this.enemies[i].position.y == this.position.y - 1) ||
          (this.enemies[i].position.x == this.position.x + 1 &&
            this.enemies[i].position.y == this.position.y + 1) ||
          (this.enemies[i].position.x == this.position.x &&
            this.enemies[i].position.y == this.position.y - 1) ||
          (this.enemies[i].position.x == this.position.x &&
            this.enemies[i].position.y == this.position.y + 1)
        ) {
          this.enemies[i].takeDamage(this.damage);
        }
      }
    }
    if (this.direction == "left") {
      for (var i = 0; i < this.enemies.length; i++) {
        for (var i = 0; i < this.enemies.length; i++) {
          if (
            (this.enemies[i].position.x == this.position.x - 1 &&
              this.enemies[i].position.y == this.position.y) ||
            (this.enemies[i].position.x == this.position.x - 1 &&
              this.enemies[i].position.y == this.position.y - 1) ||
            (this.enemies[i].position.x == this.position.x - 1 &&
              this.enemies[i].position.y == this.position.y + 1) ||
            (this.enemies[i].position.x == this.position.x &&
              this.enemies[i].position.y == this.position.y - 1) ||
            (this.enemies[i].position.x == this.position.x &&
              this.enemies[i].position.y == this.position.y + 1)
          ) {
            this.enemies[i].takeDamage(this.damage);
          }
        }
      }
    }
  };
}
