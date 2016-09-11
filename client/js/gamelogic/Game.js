import Ball from './Ball.js'
import Player from './Player.js'
import Bot from './Bot.js'
import PeerConnection from './PeerConnection.js'
import Background from './Background.js'

class Game {
  constructor (_gameID, _canvas) {
    var self = this

    this.context = _canvas.getContext('2d')
    this.width = _canvas.width
    this.height = _canvas.height
    this.pc = new PeerConnection(_gameID, this.onPCReady.bind(this), this.onPCMessage.bind(this))

    // Keep track of key states
    // Eg.:
    //   game.keyPressed.up === true  // while UP key is pressed)
    //   game.keyPressed.up === false // when UP key is released)
    this.keyPressed = {}

    $(_canvas).on('keydown keyup', function (e) {
      // Convert key code to key name
      var keyName = Game.keys[e.which]

      if(keyName) {
        // eg.: `self.keyPressed.up = true` on keydown
        // Will be set to `false` on keyup
        self.keyPressed[keyName] = e.type === 'keydown'
        e.preventDefault()
      }
    })

    // Load the game entities
    this.background = new Background(this)
    this.ball = new Ball(this, true)
    this.player1 = new Player(this, 1, true)
    this.player2 = new Bot(this)
    this.entities = [
      this.background,
      this.ball,
      this.player1,
      this.player2,
    ]
  }

  update () {
    this.entities.forEach((entity) => {
      if(entity.update) entity.update()
    })

    let state = {}
    this.entities
    .filter((entity) => entity.getState !== undefined)
    .forEach((entity) => {
      state[entity.name] = entity.getState()
    })
    if(this.pc.ready) this.pc.sendMessageToPeer(JSON.stringify(state))
  }

  draw () {
    var self = this

    this.entities.forEach(function (entity) {
      if(entity.draw) entity.draw(self.context)
    })
  }

  onPCReady () {
    switch (this.pc.playerID) {
      case 1:
        this.player1 = new Player(this, 1, true)
        this.player2 = new Player(this, 2, false)
        this.ball = new Ball(this, true)
        break
      case 2:
        this.player1 = new Player(this, 1, false)
        this.player2 = new Player(this, 2, true)
        this.ball = new Ball(this, false)
        break
      default:
    }
    this.entities = [
      this.background,
      this.ball,
      this.player1,
      this.player2,
    ]
  }

  onPCMessage (message) {
    let state = JSON.parse(message.data)
    switch (this.pc.playerID) {
      case 1:
        this.player2.setState(state.player2)
        break
      case 2:
        this.player1.setState(state.player1)
        this.ball.setState(state.ball)
        break
      default:
    }
  }

  // Instead of relying on a timer, we use a special browser function called
  // `requestAnimationFrame(callback)`. It calls the `callback` at interval
  // synced with the display refresh rate.
  // More info at:
  // https:// developer.mozilla.org/en/docs/Web/API/window.requestAnimationFrame
  _onFrame (callback) {
    if(window.requestAnimationFrame) {
      requestAnimationFrame(() => {
        callback()
        // requestAnimationFrame only calls our callback once, we need to
        // schedule the next call ourself.
        this._onFrame(callback)
      })
    } else {
      // requestAnimationFrame is not supported by all browsers. We fall back to
      // a timer.
      var fps = 60
      setInterval(callback, 1000 / fps)
    }
  }

  // Here is a real game loop. Similar to the ones you'll find in most games.
  start () {
    var self = this

    this.lastUpdateTime = new Date().getTime()

    // The loop
    this._onFrame(function () {
      // A turn in the loop is called a step.
      // Two possible modes:
      self.fixedTimeStep()
      // or
      // self.variableTimeStep()
    })
  }


  // With fixed time steps, each update is done at a fixed interval.
  fixedTimeStep () {
    var fps = 60
    var interval = 1000 / fps
    var updated = false

    // While we're not up to date ...
    while(this.lastUpdateTime < new Date().getTime()) {
      this.update()
      updated = true
      // We jump at fixed intervals until we catch up to the current time.
      this.lastUpdateTime += interval
    }

    // No need to draw if nothing was updated
    if(updated) this.draw()
    updated = false
  }

  // With a variable time steps, update are done whenever we need to draw.
  // However we do partial updates. Only updating a percentage of what a fixed
  // time step would normally do.
  variableTimeStep () {
    var currentTime = new Date().getTime()
    var fps = 60
    var interval = 1000 / fps
    var timeDelta = currentTime - this.lastUpdateTime
    var percentageOfInterval = timeDelta / interval

    // NOTE: This requires changing the update function
    // to support partial updating.
    //
    // Eg.:
    //
    //   Entity.prototype.update = function(percentage) {
    //     this.x += this.xVelocity * percentage
    //     this.y += this.yVelocity * percentage
    //   }
    //
    // Also don't forget to pass that argument in Game.prototype.update.
    this.update(percentageOfInterval)
    this.draw()

    this.lastUpdateTime = new Date().getTime()
  }
}

// Some key code to key name mappings
Game.keys = {
  32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
}

export default Game