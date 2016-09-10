import Home from './react/Home.js'
import Pong from './react/Pong.js'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

render((
  <Router history={browserHistory}>
    <Route path="/:gameID" component={Pong}/>
    <Route path="*" component={Home}/>
  </Router>
), document.getElementById('root'))