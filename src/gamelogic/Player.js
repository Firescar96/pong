import Paddle from './Paddle'

class Player extends Paddle {
  constructor (_game, _id, _controllable) {
    super(_game)

    this.id = _id
    this.controllable = _controllable
    switch (_id) {
      case 1:
        this.x = 20
        this.name = 'player1'
        break
      case 2:
        this.x = this.game.width - this.width - 20
        this.name = 'player2'
        break
      default:
    }

    this.speed = 15
  }

  update () {
    if(this.controllable) {
      if(this.game.keyPressed.up) this.yVelocity = -this.speed
      else if(this.game.keyPressed.down) this.yVelocity = this.speed
      else this.yVelocity = 0
    }

    super.update(arguments)
  }
}
export default Player