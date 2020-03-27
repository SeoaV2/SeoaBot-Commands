const Command = require('../../classes/Command')
const { MessageEmbed } = require('discord.js')

class BotInfoCommand extends Command {
  constructor () {
    super()

    this.name = 'botinfo'
    this.aliases = ['봇정보']
  }

  async run (seoa, msg, _query, locale) {
    const embed = new MessageEmbed()
      .setTitle(seoa.locale.t('commands.botinfo.title:Information of **Seoa**', locale))
      .setThumbnail(seoa.user.avatarURL())
      .addFields(
        { name: seoa.locale.t('commands.botinfo.content.discordTag:Discord Tag', locale), value: seoa.user.tag, inline: true },
        { name: seoa.locale.t('commands.botinfo.content.commands:Commands', locale), value: seoa.commands._commands.size, inline: true },
        { name: seoa.locale.t('commands.botinfo.content.aliases:Command Aliases', locale), value: seoa.commands._aliases.size, inline: true },
        { name: seoa.locale.t('commands.botinfo.content.servers:Servers which I joined', locale), value: seoa.guilds.cache.size, inline: true },
        { name: seoa.locale.t('commands.botinfo.content.channels:Channels that I can see', locale), value: seoa.channels.cache.size, inline: true },
        { name: seoa.locale.t('commands.botinfo.content.users:Users that I can recognize', locale), value: seoa.users.cache.size, inline: true },
        { name: seoa.locale.t('commands.botinfo.content.createdAt:Seoa is created at...', locale), value: new Date(seoa.user.createdAt), inline: true },
        { name: seoa.locale.t('commands.botinfo.content.readyAt:Seoa is running since...', locale), value: seoa.readyAt, inline: true }
      )

    return await msg.channel.send(embed)
  }
}

module.exports = BotInfoCommand
