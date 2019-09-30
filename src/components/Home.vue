<template>
  <div>
    <nav>
    <h1>Just some Pong clone</h1>
    </nav>

  <main>
    <h2>Enter a game identifier and have your opponent enter the same one</h2>
    <input id="gameid" placeholder="your id goes here" v-model="gameID"/>
    <button id="play" @click="playPong">Play Pong</button>
  </main>

</div>
</template>
<script>

import Component from 'vue-class-component';

export default
@Component()
class Home {
  data () {
    return {gameID: ''}
  }
  
  playPong () {
    this.$router.push(this.gameID)
  }
}
</script>