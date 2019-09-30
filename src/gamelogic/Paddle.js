import Entity from './Entity'

class Paddle extends Entity {
  constructor (_game) {
    super()

    this.width = 20
    this.height = 100
    this.game = _game

    this.y = this.game.height / 2 - this.height / 2

    this.score = 0
  }

  update () {
    super.update(arguments)

    // Keep the paddle within the screen
    this.y = Math.min(Math.max(this.y, 0), this.game.height - this.height)
  }
}

export default Paddle