import Apple from './apple'

export default class Snake {
	constructor(gridSize) {
		this.nextX = 0
		this.nextY = 0

		this.segments = []
		this.size = 3

		this.x = this.y = 10
		this.gridSize = gridSize

		this.apple = new Apple(gridSize)
	}

	keydown(e) {
		switch (e.keyCode) {
		case 37:
			this.nextX = -1
			this.nextY = 0
			break
		case 38:
			this.nextX = 0
			this.nextY = -1
			break
		case 39:
			this.nextX = 1
			this.nextY = 0
			break
		case 40:
			this.nextX = 0
			this.nextY = 1
			break
		}
	}

	update() {
		// Increment position
		this.x += this.nextX
		this.y += this.nextY

		// World exit
		if (this.x < 0) {
			this.x = this.gridSize - 1
		}
		if (this.x > this.gridSize - 1) {
			this.x = 0;
		}
		if (this.y < 0) {
			this.y = this.gridSize - 1
		}
		if (this.y > this.gridSize - 1) {
			this.y = 0
		}

		// Apple check
		if (this.x === this.apple.x && this.y === this.apple.y) {
			this.size++
			this.apple.random()
		}
	}

	/**
	 * Render the snake
	 * @param {CanvasRenderingContext2D} ctx The canvas rendering context
	 */
	render(ctx) {
		ctx.fillStyle = '#eeeeee'

		this.segments.forEach(segment => {
			ctx.fillRect()
		})
	}
}