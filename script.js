var boxSize = 50;

var canvas = document.getElementById('canv');
var ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

function GridSquare(x,y) {
  this.x = x;
  this.y = y;
  this.r = 255 - Math.round((this.x / innerWidth) * 255);
  this.g = 255 - Math.round((this.y / innerHeight) * 255);
  this.b = 255;
  this.rDir = 1;
  this.gDir = 1;
  this.bDir = 1;
  this.drawSelf = function() {
    ctx.fillStyle = 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
    ctx.fillRect(this.x,this.y,this.x + boxSize, this.y + boxSize);
  };
  this.updateColor = function() {
    if (this.r <= 0 ||this.r >= 255) {
      this.rDir *= -1;
    }
    if (this.g <= 0 || this.g >= 255) {
      this.gDir *= -1;
    }
    if (this.b <= 0 || this.b >= 255) {
      this.bDir *= -1;
    }
    this.r += this.rDir;
    this.g += this.gDir;
    this.b += this.bDir;
  }
}

var gridArray = [];

for (var i = 0; i < innerWidth; i += boxSize) {
  for (var j = 0; j < innerHeight; j += boxSize) {
    var newSquare = new GridSquare(i,j);
    gridArray.push(newSquare);
  }
}

window.onresize = function() {
  canvas.width = innerWidth;
	canvas.height = innerHeight;
  if (innerWidth % boxSize == 0) {
    gridArray = [];

    for (var i = 0; i < innerWidth; i += boxSize) {
      for (var j = 0; j < innerHeight; j += boxSize) {
        var newSquare = new GridSquare(i,j);
        gridArray.push(newSquare);
      }
    }
  }
};

let currentTime = Date.now();

function draw() {
  let frameTime = Date.now();
  if (frameTime - currentTime < 16) {
    window.requestAnimationFrame(draw);
    return;
  }
  currentTime = frameTime;

  ctx.clearRect(0,0,innerWidth,innerHeight);
	for (var k = 0; k < gridArray.length; k++) {
    gridArray[k].drawSelf();
    gridArray[k].updateColor();
  }
  window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);