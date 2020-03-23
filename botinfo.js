const Command = require('../classes/Command')
const { MessageEmbed } = require('discord.js')

class BotInfoCommand extends Command {
  constructor () {
    super()

    this.name = 'botinfo'
    this.aliases = ['봇정보']
  }

  run (seoa, msg, _args) {
    const embed = new MessageEmbed()
      .setTitle('Information of **Seoa**')
      .setThumbnail(seoa.user.avatarURL())
      .addFields(
        { name: 'Discord Tag', value: seoa.user.tag, inline: true },
        { name: 'Command Aliases', value: seoa.commands._commands.size, inline: true },
        { name: 'Servers which I joined', value: seoa.guilds.cache.size, inline: true },
        { name: 'Channels that I can see', value: seoa.channels.cache.size, inline: true },
        { name: 'Users that I can recognize', value: seoa.users.cache.size, inline: true }
      )

    return msg.channel.send(embed)
  }
}

module.exports = BotInfoCommand
