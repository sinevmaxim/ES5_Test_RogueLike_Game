function MapGenerator(width, height) {
  this.width = 40 || width;
  this.height = 24 || height;

  this.map = [];
  this.swords = [];
  this.healtPotions = [];

  this.constants = new Constants();

  for (var i = 0; i < this.width; i++) {
    this.map[i] = [];
    for (var j = 0; j < this.height; j++) {
      this.map[i][j] = this.constants.WALL;
    }
  }

  this.generateRooms = function (roomsCount) {
    var roomsCount = roomsCount || Math.round(5 + Math.random() * 5);
    for (var room = 0; room <= roomsCount; room++) {
      var roomWidth = Math.floor(Math.random() * 6) + 3;
      var roomHeight = Math.floor(Math.random() * 6) + 3;
      var roomX = Math.floor(Math.random() * (40 - roomWidth));
      var roomY = Math.floor(Math.random() * (24 - roomHeight));
      for (var i = roomY; i < roomY + roomHeight; i++) {
        for (var j = roomX; j < roomX + roomWidth; j++) {
          this.map[i][j] = this.constants.FLOOR;
        }
      }
    }
  };

  this.generateRows = function (rowsCount) {
    var rowsCount = rowsCount || Math.round(3 + Math.random() * 2);
    for (var i = 0; i < rowsCount; i++) {
      var row = Math.round(Math.random() * (this.height - 1));
      for (var j = 0; j < this.width; j++) {
        this.map[j][row] = this.constants.FLOOR;
      }
    }
  };

  this.generateColumns = function (columnsCount) {
    var columnsCount = columnsCount || Math.round(3 + Math.random() * 2);
    for (var i = 0; i < columnsCount; i++) {
      var column = Math.round(Math.random() * (this.width - 1));
      for (var j = 0; j < this.height; j++) {
        this.map[column][j] = this.constants.FLOOR;
      }
    }
  };

  this.getRandomFloor = function () {
    var x = null;
    var y = null;
    var generationLimit = 1000;
    var currentGeneration = 0;
    do {
      x = Math.round(Math.random() * (this.width - 1));
      y = Math.round(Math.random() * (this.height - 1));
      currentGeneration++;
    } while (
      this.map[x][y] != this.constants.FLOOR &&
      currentGeneration < generationLimit
    );
    return { x: x, y: y };
  };

  this.generateObjectsOnFloor = function (object, count, objArray) {
    for (var i = 0; i < count; i++) {
      var place = this.getRandomFloor();
      this.map[place.x][place.y] = object;
      objArray.push({ x: place.x, y: place.y });
    }
  };
  this.generateSwords = function (swordCount = 2) {
    this.generateObjectsOnFloor(this.constants.SWORD, swordCount, this.swords);
  };

  this.generateHealtPotions = function (healthPotionCount = 10) {
    this.generateObjectsOnFloor(
      this.constants.HEALTH_POTION,
      healthPotionCount,
      this.healtPotions
    );
  };

  this.generateMap = function () {
    this.generateRooms();
    this.generateRows();
    this.generateColumns();
    this.generateSwords();
    this.generateHealtPotions();
    return this.map;
  };

  this.getSwords = function () {
    return this.swords;
  };

  this.getHealtPotions = function () {
    return this.healtPotions;
  };
}
