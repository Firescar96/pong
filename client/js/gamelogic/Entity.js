// The game is composed of entities

class Entity {
  constructor () {
    // A game entity has ...

    // A position
    this.x = 0
    this.y = 0

    // Dimensions
    this.width = 0
    this.height = 0

    // A velocity: speed with direction
    this.xVelocity = 0
    this.yVelocity = 0

    // A name
    this.name = ''
  }

  // On each update, we apply the velocity to the current position.
  // This makes the entity move.
  // Entities are expected to override this method.
  update () {
    this.x += this.xVelocity
    this.y += this.yVelocity
  }

  // The entity knows how to draw itself.
  // All entities of our game will be white rectangles.
  draw (context) {
    context.fillStyle = '#fff'
    context.fillRect(this.x, this.y, this.width, this.height)
  }

  // Basic bounding box collision detection.
  // Returns `true` if the entity intersect with another one.
  intersect (other) {
    return this.y + this.height > other.y &&
    this.y               < other.y + other.height &&
    this.x + this.width  > other.x &&
    this.x               < other.x + other.width
  }

  setState (state) {
    this.x = state.x
    this.y = state.y
    this.width = state.width
    this.height = state.height
    this.xVelocity = state.xVelocity
    this.yVelocity = state.yVelocity
  }

  getState () {
    return {
      x:         this.x,
      y:         this.y,
      width:     this.width,
      height:    this.height,
      xVelocity: this.xVelocity,
      yVelocity: this.yVelocity,
    }
  }
}

export default Entity