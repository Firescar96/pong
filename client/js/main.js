import Home from './Home.js'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

import Game from './Game.js'
import Ball from './Ball.js'
import Player from './Player.js'
import Bot from './Bot.js'

$(function () {
  render((
    <Router history={browserHistory}>
      <Route path="*" component={Home}/>
    </Router>
  ), document.getElementById('root'))

  // Initialize and start the game

  var game = new Game($('canvas')[0])

  function Background () {}
  Background.prototype.draw = function (context) {
    context.fillStyle = '#000'
    context.fillRect(0, 0, game.width, game.height)

    // Print scores
    context.fillStyle = '#fff'
    context.font = '40px monospace'
    context.fillText(game.player.score, game.width * 3 / 8, 50)
    context.fillText(game.bot.score,    game.width * 5 / 8, 50)
  }

  // Load the game entities
  game.entities = [
    new Background(),
    game.ball = new Ball(game),
    game.player = new Player(game),
    game.bot = new Bot(game),
  ]

  game.start()
  $('canvas')[0].focus()
})


