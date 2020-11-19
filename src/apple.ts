export default class Apple {
	gridSize: number
	gridScale: number

	x: number
	y: number
	
	constructor(gridSize, gridScale) {
		this.gridSize = gridSize
		this.gridScale = gridScale

		this.random()
	}

	random() {
		this.x = Math.floor(Math.random() * this.gridSize)
		this.y = Math.floor(Math.random() * this.gridSize)
	}

	render(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = '#cc3333'
		ctx.fillRect(this.x * this.gridScale, this.y * this.gridScale, this.gridScale, this.gridScale)
	}
}