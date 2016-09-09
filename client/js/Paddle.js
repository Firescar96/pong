import Entity from './Entity'

function Paddle (_game) {
  Entity.call(this)

  this.width = 20
  this.height = 100
  this.game = _game

  this.y = this.game.height / 2 - this.height / 2

  this.score = 0
}

Paddle.prototype = Object.create(Entity.prototype)
Paddle.prototype.constructor = Paddle

Paddle.prototype.update = function () {
  Entity.prototype.update.apply(this, arguments)

  // Keep the paddle within the screen
  this.y = Math.min(Math.max(this.y, 0), this.game.height - this.height)
}

export default Paddle