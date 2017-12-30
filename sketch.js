let step = 0;
let t;
let graphs = [];
let m = 3, n = 3;

function setup() { 
  createCanvas(windowWidth, windowHeight - 80);
  background(255);
  colorMode(HSB, 100);
  noFill();
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < m; i++) {
      graphs.push(new Graph(120 + width * i / m, 120 + height * j / n));
    }
  }
} 

function draw() {
  graphs.forEach(g => {
    g.display();
  });
}

function Graph(centerX, centerY) {
  this.centerX = centerX;
  this.centerY = centerY;
  this.ang = 0;
  this.R = Math.floor(random(90, 120));
  this.r = Math.floor(random(20, this.R - 20));
  this.p = Math.floor(random(10, this.r - 10));
  this.k = this.r / this.R;
  this.l = this.p / this.r;

  this.display = function() {
    if (step < 30000) {  
      push();
      translate(this.centerX, this.centerY);
      t = radians(step);
      this.ang = ((this.l - this.k) / this.k) * t;
  
      this.x = this.R * ((1 - this.k) * Math.cos(t) + ((this.l * this.k) * Math.cos(this.ang)));
      this.y = this.R * ((1 - this.k) * Math.sin(t) - ((this.l * this.k) * Math.sin(this.ang)));
      
      let h = Math.floor((((step / 150 + this.centerX))) % 100);
      stroke(h, 60, 80);
      line(this.prevX, this.prevY, this.x, this.y,);
      pop();
      step += 1;
      this.prevX = this.x;
      this.prevY = this.y;
    }
  }
}