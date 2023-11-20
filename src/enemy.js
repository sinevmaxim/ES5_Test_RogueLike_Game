class Enemy extends Human {
  constructor(x, y, mapGenerator) {
    super(x, y, mapGenerator);
  }

  randomMove = function () {
    if (this.isDead) return;
    var directionMove = Math.ceil(Math.random() * 4);
    if (directionMove == 1) {
      this.setPosition(this.position.x, this.position.y - 1);
    }
    if (directionMove == 2) {
      this.setDirection('right')
      this.setPosition(this.position.x + 1, this.position.y);
    }
    if (directionMove == 3) {
      this.setPosition(this.position.x, this.position.y + 1);
    }
    if (directionMove == 4) {
      this.setDirection('left')
      this.setPosition(this.position.x - 1, this.position.y);
    }
  };
}
