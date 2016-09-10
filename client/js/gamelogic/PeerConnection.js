// Significant code reuse from https://github.com/shanet/WebRTC-Example/blob/master/client/webrtc.js

class PeerConnection {
  constructor (_gameID) {
    this.uuid = this.generateUUID()
    this.serverConnection = new WebSocket('wss://' + window.location.hostname + ':3443')
    this.serverConnection.onopen = () => {
      this.serverConnection.send(JSON.stringify({
        'flag':   'init',
        'uuid':   this.uuid,
        'gameID': _gameID,
      }))
    }

    this.peerConnection = new RTCPeerConnection({
      'iceServers': [
        {'urls': 'stun:stun.services.mozilla.com'},
        {'urls': 'stun:stun.l.google.com:19302'},
      ],
    }, null)
    this.peerChannel = this.peerConnection.createDataChannel('sendDataChannel', {reliable: true})
    window.peerConnection = this.peerConnection
    window.peerChannel = this.peerChannel
    this.peerConnection.onicecandidate = this.gotIceCandidate.bind(this)
    this.peerConnection.ondatachannel = this.gotRemoteDataChannel.bind(this)

    this.serverConnection.onmessage = this.gotMessageFromServer.bind(this)
    this.gameID = _gameID
  }

  createOffer () {
    this.peerConnection.createOffer()
    .then(this.createdDescription.bind(this)).catch(this.errorHandler)
  }

  gotMessageFromServer (message) {
    var signal = JSON.parse(message.data)
    console.log(signal)
    switch (signal.flag) {
      case 'init':
        // Double check this message is for us
        if(signal.uuid.localeCompare(this.uuid) !== 0) return
        this.createOffer()
        break
      case 'sdp':
        // Ignore messages from ourself
        if(signal.uuid.localeCompare(this.uuid) === 0) return
        this.peerConnection.setRemoteDescription(new RTCSessionDescription(signal.sdp))
        .then(() => {
          // Only create answers in response to offers
          if(signal.sdp.type == 'offer') {
            this.peerConnection.createAnswer().then(this.createdDescription.bind(this))
            .catch(this.errorHandler)
          }
        }).catch(this.errorHandler)
        break
      case 'ice':
        // Ignore messages from ourself
        if(signal.uuid.localeCompare(this.uuid) === 0) return
        this.peerConnection.addIceCandidate(new RTCIceCandidate(signal.ice))
        .catch(this.errorHandler)
        break
      default:
        break
    }
  }

  gotIceCandidate (event) {
    if(event.candidate !== null) {
      this.serverConnection.send(JSON.stringify({
        'flag': 'ice',
        'uuid': this.uuid,
        'ice':  event.candidate,
        'gameID': this.gameID,
      }))
    }
  }

  createdDescription (description) {
    console.log('got description')

    this.peerConnection.setLocalDescription(description).then(() => {
      this.serverConnection.send(JSON.stringify({
        'flag':   'sdp',
        'uuid':   this.uuid,
        'sdp':    this.peerConnection.localDescription,
        'gameID': this.gameID,
      }))
    }).catch(this.errorHandler)
  }

  gotRemoteDataChannel (event) {
    console.log('got a remote data channel')
    event.channel.onmessage = (message) => {
      console.log(message)
    }
  }

  errorHandler (error) {
    console.log(error)
  }

  // Taken from http://stackoverflow.com/a/105074/515584
  // Strictly speaking, it's not a real UUID, but it gets the job done here
  generateUUID () {
    function s4 () {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
  }
}

export default PeerConnection