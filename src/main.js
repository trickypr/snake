import Snake from './snake'

const gridSize = 20

const canvas = document.createElement('canvas')
const ctx    = canvas.getContext('2d')

const interval = 8
const snake    = new Snake(gridSize)

document.addEventListener('keydown', snake.keydown)
setInterval(draw, 1000 / interval)

function draw() {	
	ctx.fillStyle = '#333333'
	ctx.clearRect(0, 0, gridSize, gridSize)
}
