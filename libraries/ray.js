class Ray{
  constructor(pos, angle){
    this.pos = pos;
    this.angle = angle;
    this.dir = p5.Vector.fromAngle(angle);
  }

  display(){
    stroke('red');
    push();
    translate(this.pos.x, this.pos.y);
    line(0, 0, this.dir.x, this.dir.y);
    pop();
  }

  rotate(offset){
    this.dir = p5.Vector.fromAngle(this.angle + offset);
  }

  lookAt(x, y){
    this.dir.x = x - this.pos.x;
    this.dir.y = y - this.pos.y;
    this.dir.normalize();
  }

  cast(wall){
    const x1 = wall.a.x;
    const y1 = wall.a.y;
    const x2 = wall.b.x;
    const y2 = wall.b.y;

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    const den = (x1 - x2)*(y3 - y4) - (y1 - y2)*(x3 - x4);
    if(den == 0){
      return;
    }

    const t = ((x1 - x3)*(y3 - y4) - (y1 - y3)*(x3 - x4))/den;
    const u = -((x1 - x2)*(y1 - y3) - (y1 - y2)*(x1 - x3))/den;

    if(t > 0 && t < 1 && u > 0){
      const pt = createVector();
      pt.x = x1 + t*(x2 - x1);
      pt.y = y1 + t*(y2 - y1);
      return pt;
    }
    else{
      return;
    }
  }

  search(food){
    const x1 = this.pos.x;
    const y1 = this.pos.y;
    const x2 = this.pos.x + this.dir.x;
    const y2 = this.pos.y + this.dir.y;
    const x = food.pos.x;
    const y = food.pos.y;
    const yden = y - y1;
    const ynum = y2 - y;
    const xden = x - x1;
    const xnum = x2 - x;
    if( floor(ynum / yden) == floor(xnum / xden) ){
      return food.pos;
    }
    else{
      return;
    }
  }
}
