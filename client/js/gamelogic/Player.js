import Paddle from './Paddle'

class Player {
  constructor (_game) {
    super(_game)

    this.x = 20

    this.speed = 15
  }

  update () {
    if(this.game.keyPressed.up) {
      this.yVelocity = -this.speed
    } else if(this.game.keyPressed.down) {
      this.yVelocity = this.speed
    } else {
      this.yVelocity = 0
    }

    super.update(arguments)
  }
}
export default Player