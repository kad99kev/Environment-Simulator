class Traits {
  constructor(sight, mass, speed){
    if(sight instanceof Traits){
      let traits = sight;
      this.sight = traits.sight;
      this.mass = traits.mass;
      this.speed = traits.speed;
    }
    {
      this.sight = sight;
      this.mass = mass;
      this.speed = speed;
    }
  }

  copy(){
    return new Traits(this.sight, this.mass, this.speed);
  }

  mutate(func){
    this.sight = func(this.sight);
    this.mass = func(this.mass);
    this.speed = func(this.speed);
  }
}
