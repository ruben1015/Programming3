class Hresh {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.index = 5;
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x    , this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x + 1, this.y    ],
      [this.x + 1, this.y + 1],
      [this.x    , this.y + 1],
      [this.x - 1, this.y + 1],
      [this.x - 1, this.y    ],
    ];
    this.energy = 80;
  }
  getNewCoordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x    , this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x + 1, this.y    ],
      [this.x + 1, this.y + 1],
      [this.x    , this.y + 1],
      [this.x - 1, this.y + 1],
      [this.x - 1, this.y    ],
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
    var target = random(this.chooseNearFieldsByIndex(4));
    if (target) {
      matrix[this.y][this.x] = 0;
      this.x = target[0];
      this.y = target[1];
      matrix[this.y][this.x] = this.index;
      for (var i in xotakerArr) {
        if (xotakerArr[i].x == target[0] && xotakerArr[i].y == target[1]) {
          xotakerArr.splice(i, 1);
          this.energy++;
          return true;
        }
      }
    }
    target = random(this.chooseNearFieldsByIndex(1));
    if (target) {
      matrix[this.y][this.x] = 0;
      this.x = target[0];
      this.y = target[1];
      matrix[this.y][this.x] = this.index;
      for (var i in grassArr) {
        if (grassArr[i].x == target[0] && grassArr[i].y == target[1]) {
          grassArr.splice(i, 1);
          return true;
        }
      }
    }
    this.energy--;
    return false;
  }
  hunt() {
    if (!this.die()) {
      if (!this.evolve()) {
        if (!this.eat()) {
          !this.move();
        }
      }
    }
  }
  die() {
    if (this.energy <= 0) {
      matrix[this.y][this.x] = 0;
      for (var i in gishatichArr) {
        if (gishatichArr[i].x == this.x && gishatichArr[i].y == this.y) {
          gishatichArr.splice(i, 1);
          delete this;
          return true;
        }
      }
    }
    return false;
  }
  evolve() {
    if (this.energy == 90) {
      this.energy = 30;
      var field = random(this.chooseNearFieldsByIndex(0));
      if (field) {
        matrix[field[1]][field[0]] = this.index;
        gishatichArr.push(new Gishatich(field[0], field[1]));
        return true;
      }
      field = random(this.chooseNearFieldsByIndex(1));
      if (field) {
        for (var i in grassArr) {
          if (grassArr[i].x == field[0] && grassArr[i].y == field[1]) {
            grassArr.splice(i, 1);
            return true;
          }
        }
        matrix[field[1]][field[0]] = this.index;
        gishatichArr.push(new Gishatich(field[0], field[1]));
      }
      field = random(this.chooseNearFieldsByIndex(2));
      if (field) {
        for (var i in xotakerArr) {
          if (xotakerArr[i].x == field[0] && xotakerArr[i].y == field[1]) {
            xotakerArr.splice(i, 1);
            return true;
          }
        }
        matrix[field[1]][field[0]] = this.index;
        gishatichArr.push(new Gishatich(field[0], field[1]));
      }
    }
  }
}
