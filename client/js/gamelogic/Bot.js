import Paddle from './Paddle'

class Bot extends Paddle {
  constructor (_game) {
    super(_game)

    this.x = this.game.width - this.width - 20
    this.name = 'bot'

    this.speed = 5
  }

  update () {
    // Follow the ball
    if(this.y < this.game.ball.y) {
      this.yVelocity = this.speed
    } else {
      this.yVelocity = -this.speed
    }

    super.update(arguments)
  }
}
export default Bot