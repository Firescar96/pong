import React from 'react'
require('../../sass/home.scss')

let navbar = (
  <nav>
    <h1>Just some Pong clone</h1>
  </nav>
)

var Home = React.createClass({
  getInitialState () {
    return {gameID: ''}
  },
  playPong () {
    window.location = this.state.gameID
  },
  setGameID (event) {
    this.setState({gameID: event.target.value})
  },
  render () {
    return (
      <div>
        {navbar}

        <main>
          <h2>Enter a game identifier and have your opponent enter the same one</h2>
          <input id="gameid" placeholder="your id goes here"
            onChange={this.setGameID} value={this.state.gameID}/>
          <button id="play" onClick={this.playPong}>Play Pong</button>
        </main>

      </div>
    )
  },
})

export default Home