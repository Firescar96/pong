import Paddle from './Paddle'

function Bot (_game) {
  Paddle.call(this, _game)

  this.x = this.game.width - this.width - 20

  this.speed = 5
}

Bot.prototype = Object.create(Paddle.prototype)
Bot.prototype.constructor = Bot

Bot.prototype.update = function () {
  // Follow the ball
  if(this.y < this.game.ball.y) {
    this.yVelocity = this.speed
  } else {
    this.yVelocity = -this.speed
  }

  Paddle.prototype.update.apply(this, arguments)
}

export default Bot