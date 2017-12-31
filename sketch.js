let graphs = [];
const m = 3, n = 3;
let speedBtn, resetBtn, colorBtn, aboutText, speedSlider;
let colorful = true;

function setup() { 
  createCanvas(windowWidth * 3 / 4, windowHeight);
  background(255);
  colorMode(HSB, 100);
  noFill();
  initGraphs();
  speedBtn = createP('SPEED');
  resetBtn = createP('RESET');
  colorBtn = createP('COLOR');
  resetBtn.style('position', windowWidth - windowWidth / 8, 50);
  colorBtn.style('position', windowWidth - windowWidth / 8, 100);
  speedBtn.style('position', windowWidth - windowWidth / 8, 150);
  resetBtn.mouseClicked(reset);
  colorBtn.mouseClicked(toggleColor);
  aboutText = select('.about-text');
  aboutText.style('position', windowWidth / 8, windowHeight);
  speedSlider = createSlider(1, 20, 8);
  speedSlider.style('position', windowWidth - windowWidth / 8, 200);
  // speedSlider.style('width', '20px');
}

function initGraphs() {
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < m; i++) {
      graphs.push(new Graph(windowWidth / 8 + width * i / m, 120 + height * j / n));
    }
  }
}

function reset() {
  background(255);
  graphs = [];
  initGraphs();
}

function toggleColor() {
  colorful = !colorful;
  reset();
}

function draw() {
  graphs.forEach(g => {
    g.display();
  });
}

class Graph {
  constructor(centerX, centerY) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.step = 0;
    this.R = Math.floor(random(90, 120));
    this.r = Math.floor(random(20, this.R - 20));
    this.p = Math.floor(random(10, this.r - 10));
  }

  display() {
    if (this.step < 40000) {
      push();
      translate(this.centerX, this.centerY);
      let t = radians(this.step);
      let k = this.r / this.R;
      let l = this.p / this.r;
      let ang = ((l - k) / k) * t;
  
      this.x = this.R * ((1 - k) * Math.cos(t) + ((l * k) * Math.cos(ang)));
      this.y = this.R * ((1 - k) * Math.sin(t) - ((l * k) * Math.sin(ang)));
      
      let h = Math.floor((((this.step / 150 + this.centerX))) % 100);
      if (colorful) stroke(h, 60, 80);
      else stroke(30);
      line(this.prevX, this.prevY, this.x, this.y);
      pop();
      this.step += speedSlider.value();
      this.prevX = this.x;
      this.prevY = this.y;
    }
  }
}