function mutate(x) {
  if (random(1) < mutationRate) {
    let offset = randomGaussian(0, 1);
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}

function nextGeneration(speciesList){
  resetSketch();
  newSpeciesList = generate(speciesList);
  generationNum += 1;
  genTxt.html(generationNum);
  return newSpeciesList;
}


function generate(oldSpeciesList){
  let newSpeciesList = [];

  for(let i = 0; i < oldSpeciesList.length; i++){
    let species = oldSpeciesList[i];
    if(species.food >= 2){
      let counter = 1;
      for(let j = 1; j <= species.food; j += 2){
        newSpeciesList.push(species.copy());
        counter += 1;
      }
      species.reset();
      newSpeciesList.push(species);
    }
    else if(species.food == 1){
      species.reset();
      newSpeciesList.push(species);
    }
  }
  return newSpeciesList;
}
