<template>
<div>
  <nav>
    <h1>Just some Pong clone</h1>
  </nav>

  <main>
    <h2 :class="{hidden: !this.waiting}">Waiting for a challenger...</h2>
    <canvas
      ref="canvas" 
      @keyup="onKeyPress"
      @keydown="onKeyPress"
      tabIndex="1" width="768" height="512"
     ></canvas>
  </main>

</div>
</template>

<script>

import Component from 'vue-class-component';
import Game from '../gamelogic/Game.js'

export default
@Component()
class Pong {
  data () {
    return {
      waiting: true,
    }
  }
  stopWaiting () {
    this.waiting=false;
  }
  onKeyPress(e) {
    console.log('adsa')
    if(!this.game)return;
    this.game.onKeyPress(e);
  }
  mounted() {
    console.log('mounted', this, this.$route.params)
    // Initialize and start the game
    this.game = new Game(this.$route.params.gameID, this.$refs.canvas, this.stopWaiting.bind(this))

    this.game.start()
    this.$refs.canvas.focus()
  }
}
</script>

<style>
.hidden {
  display: none;
}
</style>