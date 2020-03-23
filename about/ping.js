const Command = require('../../classes/Command')

class PingCommand extends Command {
  constructor () {
    super()

    this.name = 'ping'
    this.aliases = ['핑']
  }

  run (seoa, msg) {
    msg.channel.send('Pinging...')
      .then(sendThen)

    function sendThen (m) {
      const wsPing = 'WebSocket: ' + Math.round(seoa.ws.ping) + 'ms'
      const msgPing = 'Message: ' + Math.round(m.createdTimestamp - msg.createdTimestamp) + 'ms'
      m.edit(wsPing + '\n' + msgPing)
    }
  }
}

module.exports = PingCommand
