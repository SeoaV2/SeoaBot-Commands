const Command = require('../classes/Command')

class PingCommand extends Command {
  constructor () {
    super()

    this.name = 'ping'
    this.aliases = ['핑']
  }

  async run (_seoa, msg, query) {
    const m = await msg.channel.send('Pinging...')
    return m.edit(`API: ${Math.round(_seoa.ws.ping)}ms\nComu: ${Math.round(m.createdTimestamp - msg.createdTimestamp)}ms`)
  }
}

module.exports = PingCommand
