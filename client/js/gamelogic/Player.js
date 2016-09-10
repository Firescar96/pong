import Paddle from './Paddle'

function Player (_game) {
  Paddle.call(this, _game)

  this.x = 20

  this.speed = 15
}

Player.prototype = Object.create(Paddle.prototype)
Player.prototype.constructor = Player

Player.prototype.update = function () {
  if(this.game.keyPressed.up) {
    this.yVelocity = -this.speed
  } else if(this.game.keyPressed.down) {
    this.yVelocity = this.speed
  } else {
    this.yVelocity = 0
  }

  Paddle.prototype.update.apply(this, arguments)
}

export default Player