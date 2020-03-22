const Command = require('../classes/Command.js')

class InviteCommand extends Command {
  constructor () {
    super()

    this.name = 'invite'
    this.description = 'invite bot'
    this.aliases = ['invitelink', '초대', '봇초대', '초대링크', '봇초대링크']
  }

  run (_seoa, msg, args) {
    msg.channel.send('You can invite **SeoaBot** with this link: \nhttps://discordapp.com/oauth2/authorize?client_id=0000000000&permissions=3072&scope=bot\n(Currently not working)')
  }
}

module.exports = InviteCommand
