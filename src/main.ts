import Snake from './snake'

const gridSize = 20
const scale    = 30

let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D

let render = []
let runUpdate = []

const interval = 8
let snake

init()

setInterval(update, 1000 / interval)
draw()

function init() {
	canvas = document.getElementById('canvas') as HTMLCanvasElement
	ctx    = canvas.getContext('2d') as CanvasRenderingContext2D

	snake = new Snake(gridSize, scale)

	canvas.width = canvas.height = gridSize * scale

	render = []
	runUpdate = []

	render.push(snake)
	render.push(snake.apple)
	runUpdate.push(snake)

	document.addEventListener('keydown', e => snake.keydown(e))
}

function update() {
	runUpdate.forEach(el => el.update())

	if (snake.dead) init()
}

function draw() {
	const size = gridSize * scale

	ctx.clearRect(0, 0, size, size)

	ctx.fillStyle = '#333333'
	ctx.fillRect(0, 0, size, size)

	render.forEach(el => el.render(ctx))

	requestAnimationFrame(draw)
}
