class Prey {
  constructor(traits){
    this.pos = createVector(floor(random(canvasWidth)), floor(random(canvasHeight)));
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.fov = 90;
    this.rays = [];
    this.dead = false;
    this.beingChased = false;
    this.energy = 1000;
    this.food = 0;
    for(let a = -this.fov; a < this.fov; a += 36){
      this.rays.push(new Ray(this.pos, radians(a)));
    }

    if(traits instanceof Traits){
      this.traits = traits.copy();
      this.traits.mutate(mutate);
    }
    else{
      this.traits = new Traits(preySight, preyMass, preySpeed);
    }
  }

  copy(){
    return new Prey(this.traits);
  }

  reset(){
    this.energy = 1000;
    this.food = 0;
    this.pos.set(floor(random(canvasWidth)), floor(random(canvasHeight)));
    this.vel = p5.Vector.random2D();
  }

  applyForce(force){
    this.acc.add(force);
  }

  bounds(){
    if(this.pos.x > canvasWidth || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > canvasHeight){
      this.dead = true;
    }
  }

  update(){
    if(!this.dead){
      this.pos.add(this.vel);
      this.vel.add(this.acc);
      this.vel.limit(this.traits.speed);
      this.acc.set(0, 0);
      this.beingChased = false;
      this.energy -= (pow(this.traits.mass, 2) * this.traits.speed) / pow(10, 3);
      for(let i = 0; i < this.rays.length; i++){
        this.rays[i].rotate(this.vel.heading());
      }
    }
    if(this.energy <= 0){
      this.dead = true;
    }
  }

  display(){
    push();
    translate(this.pos.x, this.pos.y);
    const heading = this.vel.heading();
    rotate(heading);
    stroke('white');
    fill(0, 0, 255, 100);
    rectMode(CENTER);
    rect(0, 0, round(this.traits.mass), round(this.traits.mass / 2));
    pop();
  }

  calcForce(closePos, sign){
    let desiredVelocity = closePos.sub(this.pos).normalize().setMag(this.traits.speed);
    const steering = p5.Vector.sub(desiredVelocity, this.vel);
    steering.setMag(sign);
    steering.div(this.traits.mass);
    this.applyForce(steering);
  }

  drawRay(closest){
    if(showRays){
      stroke(200, 200, 250, 100);
      line(this.pos.x, this.pos.y, closest.x, closest.y);
    }
  }

  search(foodList){
    let index;
    let closeDict = {'position': [], 'distance': []};
    for(let i = 0; i < this.rays.length; i++){
      let closest = null;
      let record = this.traits.sight;
      for(let food of foodList){
        let pt = this.rays[i].search(food);
        if(pt){
          let dist = p5.Vector.dist(this.pos, pt);
          if(dist < record && dist < this.traits.sight){
            record = dist;
            closest = pt;
            index = foodList.indexOf(food);
          }
        }
      }

      if(record < 10){
        foodList.splice(index, 1);
        this.energy += 500;
        this.food += 1;
      }

      if(closest){
        closeDict['position'].push(closest);
        closeDict['distance'].push(record);
        this.drawRay(closest);
      }

    }
    const closestIndex = closeDict['distance'].indexOf(min(closeDict['distance']))
    if(closestIndex != -1){
      this.calcForce(closeDict['position'][closestIndex].copy(), 1);
    }
  }


    avoid(predatorList){
      let index;
      let closeDict = {'position': [], 'distance': []};
      for(let i = 0; i < this.rays.length; i++){
        let closest = null;
        let record = this.traits.sight;
        for(let predator of predatorList){
          let pt = this.rays[i].search(predator);
          if(pt){
            let dist = p5.Vector.dist(this.pos, pt);
            if(dist < record && dist < this.traits.sight){
              record = dist;
              closest = pt;
            }
          }
        }

        if(closest){
          closeDict['position'].push(closest);
          closeDict['distance'].push(record);
          this.beingChased = true;
          this.drawRay(closest);
        }

      }
      const closestIndex = closeDict['distance'].indexOf(min(closeDict['distance']))
      if(closestIndex != -1){
        this.calcForce(closeDict['position'][closestIndex].copy(), -1);
      }
    }

  look(boundaries){
    let index;
    let closeDict = {'position': [], 'distance': []};
    for(let i = 0; i < this.rays.length; i++){
      let closest = null;
      let record = this.traits.sight;
      for(let boundary of boundaries){
        let pt = this.rays[i].cast(boundary);
        if(pt){
          let dist = p5.Vector.dist(this.pos, pt);
          if(dist < record && dist < this.traits.sight){
            record = dist;
            closest = pt;
          }
        }
      }

      if(record < 5){
        this.dead = true;
      }

      if(closest){
        closeDict['position'].push(closest);
        closeDict['distance'].push(record);
        this.drawRay(closest);
      }

    }
    const closestIndex = closeDict['distance'].indexOf(min(closeDict['distance']))
    if(closestIndex != -1){
      this.calcForce(closeDict['position'][closestIndex].copy(), -1);
    }
  }
}
