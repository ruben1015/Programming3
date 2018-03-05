var matrix = [];
var side = 30;
var w = 28;
var h = w;
var grassArr = [];
var xotakerArr = [];
var gishatichArr = [];
var amenakerArr = [];
var hreshArr = [];

function fillMatrix(width, height) {
  var m = [];
  for (var y = 0; y < width; y++) {
    m.push([]);
    for (var x = 0; x < height; x++) {
      var a = Math.floor(Math.random() * 101);
      if (a < 2) {
        m[y].push(4);
      }
      else if (a < 5) {
        m[y].push(3);
      }
      else if (a < 50) {
        m[y].push(2);
      }
      else if (a < 90) {
        m[y].push(1);
      }
      else if (a < 92) {
        m[y].push(5);
      }
      else {
        m[y].push(0);
      }
    }
  }
  return m;
}

function createObjects(mtx=matrix) {
  grassArr = [];
  xotakerArr = [];
  gishatichArr = [];
  for (var y = 0; y < mtx.length; y++) {
    for (var x = 0; x < mtx[y].length; x++) {
      if (mtx[y][x] == 1) {
        grassArr.push(new Grass(x, y));
      }
      else if (mtx[y][x] == 2) {
        xotakerArr.push(new Xotaker(x, y));
      }
      else if (mtx[y][x] == 3) {
        gishatichArr.push(new Gishatich(x, y));
      }
      else if (mtx[y][x] == 4) {
        amenakerArr.push(new Amenaker(x, y));
      }
      else if (mtx[y][x] == 5) {
        hreshArr.push(new Hresh(x, y));
      }
    }
  }
}

function drawGrid(mtx=matrix) {
  for (var y = 0; y < mtx.length; y++) {
    for (var x = 0; x < mtx[y].length; x++) {
      //noStroke();
      if (mtx[y][x] == 0) {
        fill('#acacac');
        rect(x * side, y * side, side, side);
      }
      else if (mtx[y][x] == 1) {
        fill('green');
        rect(x * side, y * side, side, side);
      }
      else if (mtx[y][x] == 2) {
        fill('yellow');
        rect(x * side, y * side, side, side);
      }
      else if (mtx[y][x] == 3) {
        fill('red');
        rect(x * side, y * side, side, side);
      }
      else if (mtx[y][x] == 4) {
        fill('black ');
        rect(x * side, y * side, side, side);
      }
      else {
        fill('purple');
        rect(x * side, y * side, side, side);
      }
    }
  }
}

function populate() {
  for (var i in grassArr) {
    grassArr[i].evolve();
  }
  for (var i in xotakerArr) {
    xotakerArr[i].hunt();
  }
  for (var i in gishatichArr) {
    gishatichArr[i].hunt();
  }
  for (var i in amenakerArr) {
    amenakerArr[i].hunt();
  }
  for (var i in hreshArr) {
    hreshArr[i].hunt();
  }
  drawGrid();
}
