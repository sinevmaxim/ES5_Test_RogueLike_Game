function EnemiesGenerator(mapGenerator, map) {
  this.enemies = [];
  this.map = map;
  this.mapGenerator = mapGenerator;

  this.generateEnemies = function (enemiesCount) {
    for (var i = 0; i < enemiesCount; i++) {
      var position = this.mapGenerator.getRandomFloor();
      var enemy = new Enemy(position.x, position.y, this.mapGenerator);
      this.enemies.push(enemy);
    }
    return this.enemies;
  };
}
