const Command = require('../../classes/Command')

class ReloadCommand extends Command {
  constructor () {
    super()

    this.name = 'reload'
    this.description = 'reloads a command'
    this.ownerOnly = true
  }

  async run (seoa, msg, query, locale) {
    try {
      if (query.args.length < 1) {
        return msg.reply(seoa.locale.t('commands.reload.usage:Usage:```\n%1$sreload <command>\n```', locale, seoa.prefix))
      }

      const input = query.args[0]
      const cmd = seoa.commands.get(input)
      if (!cmd) return msg.reply(seoa.locale.t('commands.reload.cannotfind:Cannot find command `%1$s`.', locale, input))

      cmd.reload(seoa)
      return msg.reply(seoa.locale.t('commands.reload.reloaded:Reloaded `%1$s` command.', locale, cmd.name))
    } catch (err) {
      console.error(err.stack)
      return await msg.reply(seoa.locale.t('commands.reload.error:An error occured while reloading the command: ```\n%1$s\n```', locale, err.message))
    }
  }
}

module.exports = ReloadCommand
