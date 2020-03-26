const Command = require('../../classes/Command')

class PingCommand extends Command {
  constructor () {
    super()

    this.name = 'ping'
    this.aliases = ['핑']
  }

  async run (seoa, msg, _args, locale) {

    msg.channel.send(seoa.locale.t('commands.ping.pinging:Pinging...', locale))
      .then(sendThen)

    function sendThen (m) {
      const wsPing = seoa.locale.t('commands.ping.websocketPing:WebSocket: %1$sms', locale, Math.round(seoa.ws.ping))
      const msgPing = seoa.locale.t('commands.ping.msgPing:Message: %1$sms', locale, Math.round(m.createdTimestamp - msg.createdTimestamp))
      m.edit(wsPing + '\n' + msgPing)
    }
  }
}

module.exports = PingCommand
