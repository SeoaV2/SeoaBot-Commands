const Command = require('../../classes/Command.js')

class InviteCommand extends Command {
  constructor () {
    super()

    this.name = 'invite'
    this.description = 'invite bot'
    this.aliases = ['invitelink', '초대', '봇초대', '초대링크', '봇초대링크']
  }

  async run (seoa, msg, _args, locale) {
    return await msg.reply(seoa.locale.t('commands.invite.msg:You can invite **SeoaBot** with this link: \n%1$s', locale, 'https://discordapp.com/oauth2/authorize?client_id=569453314551578644&permissions=3072&scope=bot'))
  }
}

module.exports = InviteCommand
