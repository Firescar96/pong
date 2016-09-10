import React from 'react'
import classnames from 'classnames';

import Game from '../gamelogic/Game.js'
import Ball from '../gamelogic/Ball.js'
import Player from '../gamelogic/Player.js'
import Bot from '../gamelogic/Bot.js'
import PeerConnection from '../gamelogic/PeerConnection.js'

require('../../sass/pong.scss')

let navbar = (
  <nav>
    <h1>Just some Pong clone</h1>
  </nav>
)

var Pong = React.createClass({
  getInitialState () {
    return {
      waiting: true
    }
  },
  render () {
    return (
      <div>
        {navbar}

        <main>
          <h2 className={classnames({hidden: !this.state.waiting})}>Waiting for a challenger...</h2>
          <canvas tabIndex="1" width="768" height="576"></canvas>
        </main>

      </div>
    )
  },
  componentDidMount () {
    this.setState({gameID: this.props.params.gameID})
  },
  componentDidUpdate () {
    // Initialize and start the game

    var game = new Game(this.props.params.gameID, $('canvas')[0])

    function Background () {}
    Background.prototype.draw = function (context) {
      context.fillStyle = '#000'
      context.fillRect(0, 0, game.width, game.height)

      // Print scores
      context.fillStyle = '#fff'
      context.font = '40px monospace'
      context.fillText(game.player1.score, game.width * 3 / 8, 50)
      context.fillText(game.player2.score,    game.width * 5 / 8, 50)
    }

    // Load the game entities
    game.entities = [
      new Background(),
      game.ball = new Ball(game),
      game.player1 = new Player(game),
      game.player2 = new Bot(game),
    ]

    game.start()
    $('canvas')[0].focus()
  }
})

export default Pong