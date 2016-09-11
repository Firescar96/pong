class Background {
  constructor (_game) {
    this.game = _game
  }

  draw (context) {
    context.fillStyle = '#000'
    context.fillRect(0, 0, this.game.width, this.game.height)

    // Print scores
    context.fillStyle = '#fff'
    context.font = '40px monospace'
    context.fillText(this.game.player1.score, this.game.width * 3 / 8, 50)
    context.fillText(this.game.player2.score,    this.game.width * 5 / 8, 50)
  }
}

export default Background