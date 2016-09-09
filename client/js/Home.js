import React from 'react'
require('../sass/home.scss')

let navbar = (
  <nav>
    <h1>Just some Pong clone</h1>
  </nav>
)

var Home = React.createClass({
  render () {
    return (
      <div>
        {navbar}

        <main>
          <canvas tabIndex="1" width="640" height="480"></canvas>
        </main>

      </div>
    )
  },
})

export default Home