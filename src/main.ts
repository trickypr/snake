import { initNetwork } from './ai'
import Snake from './snake'

const gridSize = 20
const scale    = 20

let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D

const canvasVision = document.getElementById('snakeVision') as HTMLCanvasElement
const snakeVision = canvasVision.getContext('2d')

let render = []
let runUpdate = []

const interval = 8
let snake: Snake

init()

setInterval(update, 1000 / interval)
draw()

function init() {
	canvas = document.getElementById('canvas') as HTMLCanvasElement
	ctx    = canvas.getContext('2d') as CanvasRenderingContext2D

	snake = new Snake(gridSize, scale)

	canvas.width = canvas.height = canvasVision.width = canvasVision.height = gridSize * scale

	render = []
	runUpdate = []

	render.push(snake)
	render.push(snake.apple)
	runUpdate.push(snake)

	document.addEventListener('keydown', e => snake.keydown(e))

	initNetwork(gridSize)
}

let segment = true

function update() {
	runUpdate.forEach(el => el.update())

	if (snake.dead) init()
	if (segment) {
		snake.worldInterface()
		segment = false
	}
}

function draw() {
	const size = gridSize * scale

	ctx.clearRect(0, 0, size, size)

	ctx.fillStyle = '#333333'
	ctx.fillRect(0, 0, size, size)

	render.forEach(el => el.render(ctx))

	snakeVision.clearRect(0, 0, size, size)

	const world = snake.worldInterface()

	world.forEach((e, y) => {
		e.forEach((s, x) => {
			snakeVision.fillStyle = `hsl(0, 0%, ${s * 100}%)`
			snakeVision.fillRect(
				x * scale,
				y * scale,
				scale,
				scale
			)
		})
	})

	requestAnimationFrame(draw)
}
