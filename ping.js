const Command = require('../classes/Command')

class PingCommand extends Command {
  constructor() {
    super()

    this.name = 'ping'
    this.aliases = ['핑']
  }

  run(seoa, msg, args) {
    msg.channel.send('pong')
  }
}

module.exports = PingCommand
