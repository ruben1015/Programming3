function setup() {
  frameRate(5);
  matrix = fillMatrix(28, 28);
  createCanvas(matrix[0].length * side, matrix.length * side);
  background('#acacac');
  createObjects();
  drawGrid();
}

function draw() {
  populate();
}
