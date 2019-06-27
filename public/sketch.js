let canvasHeight = 500;
let canvasWidth = 1000;
let preyList = []; let preyNum = 50; let newPreyNum = 50; let eliminatedPrey = [];
let predatorList = []; let predatorNum = 2; let newPredNum = 2;
let foodList = []; let foodNum = 50; let newFoodNum = 50;
let boundaries = [];
let counterLimit = 500; let counter = 0; let newCounterLimit = 500;
let generationNum = 1;
let mutationRate = 0.1;  let newMutationRate = 0.1;
let decreaseFood = false; let newDecreaseFood = false;
let canvasChart;
let showRays = true; let newShowRays = true;
let preyMass = 10; let newPreyMass = 10;
let preySight = 50; let newPreySight = 50;
let preySpeed = 2; let newPreySpeed = 2;

let predatorMass = 10; let newPredMass = 10;
let predatorSight = 50; let newPredSight = 50;
let predatorSpeed = 3; let newPredSpeed = 3;

let speedSlider; let speedSpan;

function setup(){
  createCanvas(canvasWidth, canvasHeight).parent("sketch-holder");

  speedSlider = select('#speedSlider');
  speedSpan = select('#speed');

  countTxt = select('#counter');
  countLimitTxt = select('#counter-limit');
  newCountTxt = select('#new-limit');

  genTxt = select('#gen-num');

  preyMassTxt = select('#prey-mass');
  newPreyMassTxt = select('#new-prey-mass');
  preySightTxt = select('#prey-sight');
  newPreySightTxt = select('#new-prey-sight');
  preySpeedTxt = select('#prey-speed');
  newPreySpeedTxt = select('#new-prey-speed');
  preyTxt = select('#prey-num');
  newPreyTxt = select('#new-prey');

  predMassTxt = select('#pred-mass');
  newPredMassTxt = select('#new-pred-mass');
  predSightTxt = select('#pred-sight');
  newPredSightTxt = select('#new-pred-sight');
  predSpeedTxt = select('#pred-speed');
  newPredSpeedTxt = select('#new-pred-speed');
  predTxt = select('#pred-num');
  newPredTxt = select('#new-pred');

  decFoodTxt = select('#dec-food');
  newDecFoodTxt = select('#new-dec-food');
  foodNumTxt = select('#food-num');
  startFoodTxt = select('#food-start');
  newFoodTxt = select('#new-food');

  mutRateTxt = select('#mut-rate');
  newMuteRateTxt = select('#new-mut');

  showRaysTxt = select('#show-ray');

  switchDecFood = select('#new-dec');
  switchDecFood.mousePressed(() => {
    newDecreaseFood = !newDecreaseFood;
    newDecFoodTxt.html(newDecreaseFood);
    if(newDecreaseFood){
      newDecFoodTxt.style('color', 'green');
    }
    else{
      newDecFoodTxt.style('color', 'red');
    }
  });

  increaseCounterBtn = select('#increase-counter-limit');
  decreaseCounterBtn = select('#decrease-counter-limit');
  increaseCounterBtn.mousePressed(() => {
    newCounterLimit += 10;
    newCountTxt.html(newCounterLimit);
  });
  decreaseCounterBtn.mousePressed(() => {
    if(!isLessThanEqualToZero(newCounterLimit)){
      newCounterLimit -= 10;
    }
    newCountTxt.html(newCounterLimit);
  });

  increasePreyMassBtn = select('#increase-prey-mass');
  decreasePreyMassBtn = select('#decrease-prey-mass');
  increasePreyMassBtn.mousePressed(() => {
    newPreyMass += 1;
    newPreyMassTxt.html(newPreyMass);
  });
  decreasePreyMassBtn.mousePressed(() => {
    if(!isLessThanEqualToZero(newPreyMass)){
      newPreyMass -= 1;
    }
    newPreyMassTxt.html(newPreyMass);
  });

  increasePreySightBtn = select('#increase-prey-sight');
  decreasePreySightBtn = select('#decrease-prey-sight');
  increasePreySightBtn.mousePressed(() => {
    newPreySight += 1;
    newPreySightTxt.html(newPreySight);
  });
  decreasePreySightBtn.mousePressed(() => {
    if(!isLessThanEqualToZero(newPreySight)){
      newPreySight -= 1;
    }
    newPreySightTxt.html(newPreySight);
  });

  increasePreySpeedBtn = select('#increase-prey-speed');
  decreasePreySpeedBtn = select('#decrease-prey-speed');
  increasePreySpeedBtn.mousePressed(() => {
    newPreySpeed += 1;
    newPreySpeedTxt.html(newPreySpeed);
  });
  decreasePreySpeedBtn.mousePressed(() => {
    if(!isLessThanEqualToZero(newPreySpeed)){
      newPreySpeed -= 1;
    }
    newPreySpeedTxt.html(newPreySpeed);
  });

  increasePreyBtn = select('#increase-prey');
  decreasePreyBtn = select('#decrease-prey');
  increasePreyBtn.mousePressed(() => {
    newPreyNum += 1;
    newPreyTxt.html(newPreyNum);
  });
  decreasePreyBtn.mousePressed(() => {
    if(!isLessThanEqualToZero(newPreyNum)){
      newPreyNum -= 1;
    }
    newPreyTxt.html(newPreyNum);
  });

  increasePredMassBtn = select('#increase-pred-mass');
  decreasePredMassBtn = select('#decrease-pred-mass');
  increasePredMassBtn.mousePressed(() => {
    newPredMass += 1;
    newPredMassTxt.html(newPredMass);
  });
  decreasePredMassBtn.mousePressed(() => {
    if(!isLessThanEqualToZero(newPredMass)){
      newPredMass -= 1;
    }
    newPredMassTxt.html(newPredMass);
  });

  increasePredSightBtn = select('#increase-pred-sight');
  decreasePredSightBtn = select('#decrease-pred-sight');
  increasePredSightBtn.mousePressed(() => {
    newPredSight += 1;
    newPredSightTxt.html(newPredSight);
  });
  decreasePredSightBtn.mousePressed(() => {
    if(!isLessThanEqualToZero(newPredSight)){
      newPredSight -= 1;
    }
    newPredSightTxt.html(newPredSight);
  });

  increasePredSpeedBtn = select('#increase-pred-speed');
  decreasePredSpeedBtn = select('#decrease-pred-speed');
  increasePredSpeedBtn.mousePressed(() => {
    newPredSpeed += 1;
    newPredSpeedTxt.html(newPredSpeed);
  });
  decreasePredSpeedBtn.mousePressed(() => {
    if(!isLessThanEqualToZero(newPredSpeed)){
      newPredSpeed -= 1;
    }
    newPredSpeedTxt.html(newPredSpeed);
  });

  increasePredBtn = select('#increase-pred');
  decreasePredBtn = select('#decrease-pred');
  increasePredBtn.mousePressed(() => {
    newPredNum += 1;
    newPredTxt.html(newPredNum);
  });
  decreasePredBtn.mousePressed(() => {
    if(!isLessThanEqualToZero(newPredNum)){
      newPredNum -= 1;
    }
    newPredTxt.html(newPredNum);
  });

  increaseFoodBtn = select('#increase-food');
  decreaseFoodBtn = select('#decrease-food');
  increaseFoodBtn.mousePressed(() => {
    newFoodNum += 1;
    newFoodTxt.html(newFoodNum);
  });
  decreaseFoodBtn.mousePressed(() => {
    if(!isLessThanEqualToZero(newFoodNum)){
      newFoodNum -= 1;
    }
    newFoodTxt.html(newFoodNum);
  });

  increaseMutBtn = select('#increase-mut');
  decreaseMutBtn = select('#decrease-mut');
  increaseMutBtn.mousePressed(() => {
    newMutationRate += 0.01;
    newMuteRateTxt.html(round(newMutationRate * 100) + '%');
  });
  decreaseMutBtn.mousePressed(() => {
    if(!isLessThanEqualToZero(newMutationRate)){
      newMutationRate -= 0.01;
    }
    if(newMutationRate < 0){ newMutationRate = 0; }
    newMuteRateTxt.html(round(newMutationRate * 100) + '%');
  });

  showMutBtn = select('#ray-btn');
  showMutBtn.mousePressed(() => {
    showRays = !showRays;
    showRaysTxt.html(showRays);
    if(showRays){
      showRaysTxt.style('color', 'green');
    }
    else{
      showRaysTxt.style('color', 'red');
    }
  });

  startBtn = select('#start');
  stopBtn = select('#stop');
  restartBtn = select('#restart');
  startBtn.mousePressed(() => { loop(); });
  stopBtn.mousePressed(() => { noLoop(); });
  restartBtn.mousePressed(restartSketch);

  resetSketch();

  for(i = 0; i < preyNum; i++){
    preyList.push(new Prey());
  }

  boundaries.push(new Boundary(-1, 0, canvasWidth, 0));
  boundaries.push(new Boundary(0, 0, 0, canvasHeight));
  boundaries.push(new Boundary(0, canvasHeight - 1, canvasWidth, canvasHeight));
  boundaries.push(new Boundary(canvasWidth - 1, canvasHeight, canvasWidth, -1));

  canvasChart = setupChart();
}

function isLessThanEqualToZero(value){
  if(value <= 0){
    return true;
  }
  return false;
}

function restartSketch(){

  foodNum = newFoodNum;
  counterLimit = newCounterLimit;

  preyNum = newPreyNum;
  preyMass = newPreyMass;
  preySight = newPreySight;
  preySpeed = newPreySpeed;

  predatorNum = newPredNum;
  predatorMass = newPredMass;
  predatorSight = newPredSight;
  predatorSpeed = newPredSpeed;

  decreaseFood = newDecreaseFood;
  mutationRate = newMutationRate;

  countLimitTxt.html(counterLimit);

  preyTxt.html(preyNum);
  preySpeedTxt.html(preySpeed);
  preySightTxt.html(preySight);
  preyMassTxt.html(preyMass);

  predTxt.html(predatorNum);
  predSpeedTxt.html(predatorSpeed);
  predSightTxt.html(predatorSight);
  predMassTxt.html(predatorMass);

  decFoodTxt.html(decreaseFood);
  startFoodTxt.html(foodNum);

  if(decreaseFood){
    decFoodTxt.style('color', 'green');
  }
  else{
    decFoodTxt.style('color', 'red');
  }

  if(showRays){
    showRaysTxt.style('color', 'green');
  }
  else{
    showRaysTxt.style('color', 'red');
  }

  mutRateTxt.html(round(mutationRate * 100) + '%');

  resetSketch();

  for(i = 0; i < preyNum; i++){
    preyList.push(new Prey());
  }

  generationNum = 1;
  genTxt.html(generationNum);
  canvasChart.destroy();
  canvasChart = setupChart();
  loop();

}

function draw(){

  speedSpan.html(speedSlider.value());

  for(let i = 1; i <= speedSlider.value(); i++){
  background(0);
  for(let food of foodList){
    food.display();
  }
  for(let boundary of boundaries){
    boundary.display();
  }
  for(prey of preyList){
    prey.display();
    prey.avoid(predatorList);
    if(!prey.beingChased){
      prey.search(foodList);
    }
    prey.look(boundaries);
    if(prey.dead){
      eliminatedPrey.push(preyList.splice(preyList.indexOf(prey), 1)[0]);
      continue;
    }
    prey.update();
  }
  for(predator of predatorList){
    predator.display();
    predator.search(preyList);
    predator.look(boundaries);
    if(predator.dead){
      predatorList.splice(predatorList.indexOf(predator), 1);
    }
    predator.update();
  }

  counter += 1;
  countTxt.html(counter);


  if(counter >= counterLimit || preyList.length == 0){
    let mergedPrey = preyList.concat(eliminatedPrey);
    let averages = calcAverage(mergedPrey);
    updateChart(generationNum, averages[0], averages[1], averages[2], mergedPrey.length);
    preyList = nextGeneration(preyList);
  }

  if(preyList.length == 0){
    noLoop();
  }
}
}


function resetSketch(){
  foodNumTxt.html(foodNum);

  counter = 0;
  foodList = [];
  for(i = 0; i < foodNum; i++){
    foodList.push(new Food());
  }
  if(decreaseFood && foodNum > 10){
    foodNum -= 1;
  }
  predatorList = [];
  for(i = 0; i < predatorNum; i++){
    predatorList.push(new Predator());
  }
  preyList = [];
  eliminatedPrey = [];
}

function calcAverage(list){
  let massSum = 0;
  let sightSum = 0;
  let speedSum = 0;
  for (let i = 0 ; i < list.length; i++){
    massSum += list[i].traits.mass;
    sightSum += list[i].traits.sight;
    speedSum += list[i].traits.speed;
  }
  return [massSum / list.length, sightSum / list.length, speedSum / list.length];
}
