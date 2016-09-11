import React from 'react'
import classnames from 'classnames';

import Game from '../gamelogic/Game.js'

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
          <canvas tabIndex="1" width="768" height="512"></canvas>
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

    game.start()
    $('canvas')[0].focus()
  }
})

export default Pong