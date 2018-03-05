class Xotaker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.index = 2;
    this.directions = [];
    this.energy = 5;
  }
  getNewCoordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x + 1, this.y],
      [this.x + 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x - 1, this.y + 1],
      [this.x - 1, this.y],
    ];
  }
  chooseNearFieldsByIndex(ch) {
    this.getNewCoordinates();
    var found = [];
    for (var i = 0; i < this.directions.length; i++) {
      var x = this.directions[i][0];
      var y = this.directions[i][1];
      if (matrix[y] && matrix[y][x] == ch) {
        found.push(this.directions[i]);
      }
    }
    return found;
  }
  move() {
    var field = random(this.chooseNearFieldsByIndex(0));
    if (field) {
      matrix[this.y][this.x] = 0;
      this.x = field[0];
      this.y = field[1];
      matrix[this.y][this.x] = this.index;
      this.energy--;
      return true;
    }
    return false;
  }
  eat() {
    var target = random(this.chooseNearFieldsByIndex(1));
    if (target) {
      matrix[this.y][this.x] = 0;
      this.x = target[0];
      this.y = target[1];
      matrix[this.y][this.x] = this.index;
      for (var i in grassArr) {
        if (grassArr[i].x == target[0] && grassArr[i].y == target[1]) {
          grassArr.splice(i, 1);
          this.energy++;
          return true;
        }
      }
    }
    return false;
  }
  hunt() {
    if (this.energy <= 0) {
      matrix[this.y][this.x] = 0;
      for (var i in xotakerArr) {
        if (xotakerArr[i].x == this.x && xotakerArr[i].y == this.y) {
          xotakerArr.splice(i, 1);
          delete this;
          return false;
        }
      }
    }
    if (!this.evolve()) {
      if (!this.eat()) {
        this.move();
      }
    }
  }
  evolve() {
    if (this.energy == 7) {
      this.energy = 5;
      var field = random(this.chooseNearFieldsByIndex(0));
      if (field) {
        matrix[field[1]][field[0]] = this.index;
        xotakerArr.push(new Xotaker(field[0], field[1]));
        return true;
      }
      var field = random(this.chooseNearFieldsByIndex(1));
      if (field) {
        matrix[field[1]][field[0]] = this.index;
        xotakerArr.push(new Xotaker(field[0], field[1]));
        for (var i in grassArr) {
          if (grassArr[i].x == field[0] && grassArr[i].y == field[1]) {
            grassArr.splice(i, 1);
            return true;
          }
        }
      }
    }
  }
}
