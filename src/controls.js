function Controls(player) {
  this.player = player;
  this.changePlayerPostion = function (direction, x, y) {
    this.player.setDirection(direction);
    this.player.setPosition(x, y);
  };

  this.update = function (event) {
    if (event.key) {
      event.preventDefault();
      event.stopPropagation();
      if (event.key.toLowerCase() == "a") {
        this.changePlayerPostion(
          "left",
          this.player.position.x - 1,
          this.player.position.y
        );
      }

      if (event.key.toLowerCase() == "d") {
        this.changePlayerPostion(
          "right",
          this.player.position.x + 1,
          this.player.position.y
        );
      }

      if (event.key.toLowerCase() == "w") {
        this.changePlayerPostion(
          this.player.direction,
          this.player.position.x,
          this.player.position.y - 1
        );
      }

      if (event.key.toLowerCase() == "s") {
        this.changePlayerPostion(
          this.player.direction,
          this.player.position.x,
          this.player.position.y + 1
        );
      }

      if (event.key == " ") {
        this.player.attack()
      }

      console.log(this.player.position.x, this.player.position.y);
    }
  };
}
