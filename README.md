# Simulation of Environments
This project uses [p5.js](https://p5js.org/) and [chart.js](https://www.chartjs.org/).

How it works?

- The Counter Limit decides how long your "day" lasts. After each day the next generation of preys is generated. It is generated on the following conditions:
  - If a prey is unable to eat food, it dies.
  - If a prey is able to eat 1 food. It survives.
  - If a prey is able to eat more than 1 food, it survives and generates offspring with some mutation. The amount of offspring generated depends on how much food it consumed. If it consumed 2 food then it has 1 child, if it consumed 4 food then it has 2 children, so on and so forth.

- Prey Settings:
  - The movement of each prey costs energy. If they run out of energy they die. Food provides energy. Each day their energy is reset.
  - Adjusting the mass of the preys will decide how heavy the preys are. The heavier they are, the slower they move. The energy lost is proportional to the cube of the mass.
  - Adjusting the sight of the prey will decide how far they can see. Letting them observe further would mean less time would be spent searching for food.
  - Adjusting the speed of the prey will decide how fast they can move. More speed means quicker movements.

- Predator Settings:
  - The movement of each predator costs energy. If they run out of energy they die. Food provides energy. Each day their energy is reset.
  - Adjusting the mass of the predators will decide how heavy the predators are. The heavier they are, the slower they move. The energy lost is proportional to the cube of the mass.
  - Adjusting the sight of the predator will decide how far they can see. Letting them observe further would mean less time would be spent searching for food.
  - Adjusting the speed of the predator will decide how fast they can move. More speed means quicker movements.

- Food Settings:
  - The decrease food option if set true will reduce the amount of food provided each day until the number of food provided reaches 10.
  - You can also set the amount of food to be made available at the start of each day.
  - Note: Number of food available is the food available for the current generation/day. If decrease food is set to true, you'll notice this decreases. Starting food available is the amount of food available at the very first generation/day (starting value).

- Mutation Settings:
  - Adjusting the mutation rate affects the probability of mutation of the child/children of the preys.

- Show Rays:
  - If set to true, it will display the current item the object is tracking.

- Note: Adding a lot of features could cause your browser to slow down.
