class Human {
  constructor(x, y, mapGenerator) {
    this.hp = 100;
    this.mapGenerator = mapGenerator;
    this.isDead = false;
    this.direction = "right";
    this.damage = 15;
    this.position = { x: x, y: y };
    this.previousPosition = { x: null, y: null };
  }

  setDirection = function (direction) {
    if (this.isDead) return;
    this.direction = direction;
  };

  setPosition = function (x, y) {
    if (this.isDead) return;
    this.previousPosition.x = this.position.x;
    this.previousPosition.y = this.position.y;
    this.position.x = Math.min(this.mapGenerator.width - 1, Math.max(x, 0));
    this.position.y = Math.min(this.mapGenerator.height - 1, Math.max(y, 0));
  };

  takeDamage = function (damage) {
    this.hp = Math.max(0, this.hp - damage);
    this.isDead = this.hp == 0;
  };
}
