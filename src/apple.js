export default class Apple {
	constructor(gridSize) {
		this.gridSize = gridSize
		this.random()
	}

	random() {
		this.x = Math.floor(Math.random() * this.gridSize)
		this.y = Math.floor(Math.random() * this.gridSize)
	}

	render(ctx) {
		
	}
}