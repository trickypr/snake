import Apple from './apple'

interface Segment {
	x: number
	y: number
}

enum World {
	BLANK = 0,
	SNAKE_SEGMENT = 0.25,
	SNAKE_HEAD = 0.5,
	APPLE = 0.75
}

export default class Snake {
	nextX: number
	nextY: number

	segments: Segment[]
	size: number = 1

	x: number = 5
	y: number = 5
	gridSize: number
	tileSize: number

	apple: Apple

	dead = false

	constructor(gridSize, tileSize) {
		this.nextX = 0
		this.nextY = 1

		this.segments = []
		this.size = 3

		this.x = this.y = 10
		this.gridSize = gridSize
		this.tileSize = tileSize

		this.apple = new Apple(gridSize, tileSize)
	}

	keydown(e: KeyboardEvent) {
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
		if (this.dead) return

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
			do {
				this.apple.random()
			} while (this.collidesWithApple())
		}

		this.segments.forEach(segment => {
			if (segment.x === this.x && segment.y === this.y) {
				this.dead = true
			}
		})

		this.segments.push({ x: this.x, y: this.y })
		while (this.segments.length > this.size) {
			this.segments.shift()
		}
	}

	collidesWithApple(): boolean {
		let collide = false

		this.segments.forEach(s => {
			if (s.x === this.apple.x && s.y === this.apple.y) collide = true
		})

		return collide
	}

	render(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = '#eeeeee'

		this.segments.forEach(segment => {
			ctx.fillRect(
				segment.x * this.tileSize,
				segment.y * this.tileSize,
				this.tileSize,
				this.tileSize,
			)
		})
	}

	worldInterface(): number[][] {
		const world = []

		for (let x = 0; x < this.gridSize; x++) {
			world.push(Array.apply(null, { length: this.gridSize }).map(i => World.BLANK))
		}

		this.segments.forEach(s => world[s.y][s.x] = World.SNAKE_SEGMENT)

		world[this.y][this.x] = World.SNAKE_HEAD
		world[this.apple.y][this.apple.x]  = World.APPLE

		return world
	}
}