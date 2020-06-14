const Command = require('../../classes/Command.js')
const { MessageEmbed } = require('discord.js')

class HelpCommand extends Command {
  constructor () {
    super()

    this.name = 'help'
    this.description = 'command descriptions'
    this.aliases = ['help', '도움', '도움말', 'cmd', 'cmds', 'book', 'books', '명령어', '명령어들']
  }

  /**
   * @param {import('../../classes/SeoaClient')} seoa
   */
  async run (seoa, msg, _query, _locale) {
    const embed = new MessageEmbed({ title: 'Helps' })
    seoa.commands._commands.forEach((v) => {
      if (!v.ownerOnly) embed.addField(v.name, v.description || 'no description', true)
    })

    return await msg.channel.send(embed)
  }
}

module.exports = HelpCommand
