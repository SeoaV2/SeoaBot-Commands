const Command = require('../../classes/Command')

class SupportCommand extends Command {
  constructor() {
    super()

    this.name = 'support'
    this.aliases = ['서포트']
  }

  run(seoa, msg, _args, locale) {
    msg.channel.send(seoa.locale.t('commands.support.text', locale) + '\nhttps://discord.gg/BHS5pw3')
  }
}

module.exports = SupportCommand
