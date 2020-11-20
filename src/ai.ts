import { Neat, methods, Architect } from 'neataptic'

var PLAYER_AMOUNT     = 100;
var ITERATIONS        = 1000;
var START_HIDDEN_SIZE = 0;
var MUTATION_RATE     = 0.3;
var ELITISM_PERCENT   = 0.1;



let neat

export function initNetwork(worldSize) {
	neat = new Neat(worldSize ** 2, 4, null,
    {
      mutation: methods.mutation.ALL,
      popsize: PLAYER_AMOUNT,
      mutationRate: MUTATION_RATE,
      elitism: Math.round(ELITISM_PERCENT * PLAYER_AMOUNT),
      network: new Architect.Random(
        worldSize ** 2,
        START_HIDDEN_SIZE,
        4
      )
    })
}

export function train() {
	trainer.train(trainingData, {
		rate: 0.0003,
		iterations: 10000,
		shuffle: true
	})
}