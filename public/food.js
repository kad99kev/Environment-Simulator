class Food {
  constructor(){
    this.pos = createVector(floor(random(25, canvasWidth - 25)), floor(random(25, canvasHeight - 25)));
  }

  display() {
    noStroke();
    fill('green');
    ellipse(this.pos.x, this.pos.y, 3, 3);
  }
}
