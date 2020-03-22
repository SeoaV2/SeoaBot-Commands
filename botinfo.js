const Command = require('../classes/Command')
const { MessageEmbed } = require('discord.js')

class BotInfoCommand extends Command {
  constructor() {
    super()

    this.name = 'botinfo'
    this.aliases = ['봇정보']
  }

  run(_seoa, msg, args) {
    const embed = new MessageEmbed()
    .setTitle('Information of **Seoa**')
    .addFields(
      { name: 'Discord Tag', value: _seoa.user.tag, inline: true },
      { name: 'Command Aliases', value: _seoa.commands._commands.size }
    )

    return msg.channel.send(embed)
  }
}

module.exports = BotInfoCommand
