// Much of this code is borrowed from
// https://github.com/shanet/WebRTC-Example/blob/master/server/server.js

const WebSocketServer = require('ws').Server

exports = module.exports = function (server) {
  // Create a server for handling websocket calls
  const wss = new WebSocketServer({server: server})
  // TODO: delete old ids after clients have been matched
  var gameIDs = {}

  wss.on('connection', function (ws) {
    ws.on('message', function (message) {
      // Broadcast any received message to all clients
      console.log('received: %s', message)
      var signal = JSON.parse(message)
      switch (signal.flag) {
        case 'init':
          if(!gameIDs[signal.gameID]) gameIDs[signal.gameID] = {}

          if(!gameIDs[signal.gameID][signal.uuid]) {
            gameIDs[signal.gameID][signal.uuid] = ws
          }

          if(Object.keys(gameIDs[signal.gameID]).length >= 2) {
            console.log(gameIDs)
            ws.send(JSON.stringify({
              'flag': 'init',
              'uuid': signal.uuid,
            }))
          }
          break
        default:
          for(var uuid in gameIDs[signal.gameID]) {
            if(gameIDs[signal.gameID].hasOwnProperty(uuid)) {
              gameIDs[signal.gameID][uuid].send(message)
            }
          }

      }
    })

    // This is to prevent the server crashing on lost clients
    ws.on('error', (err) => {})
  })

  wss.broadcast = function (data) {
    this.clients.forEach((client, i) => {
      this.clients[i].send(data)
    })
  }
}
