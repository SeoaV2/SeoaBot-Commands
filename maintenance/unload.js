const Command = require('../../classes/Command')

class UnloadCommand extends Command {
  constructor () {
    super()

    this.name = 'unload'
    this.description = 'Unloads a command.'
    this.ownerOnly = true
  }

  async run (seoa, msg, args, locale) {
    try {
      if (args.args.length < 1) {
        return await msg.reply(seoa.locale.t('commands.unload.usage:Usage: ```\n%1$sunload <command>\n```', locale, seoa.prefix))
      }

      const input = args.args[0]
      const cmd = seoa.commands.get(input)
      if (!cmd) return await msg.reply(seoa.locale.t('commands.unload.cannotfind:Cannot find command `%1$s`.', locale, input))

      cmd.unload(seoa)
      return await msg.reply(seoa.locale.t('commands.unload.unloaded:Unloaded `%1$s` command.', locale, cmd.name))
    } catch (err) {
      console.error(err.stack)
      return await msg.reply(seoa.locale.t('commands.unload.error:An Error occured while unloading the command: ```\n%1$s\n```', locale, err.message))
    }
  }
}

module.exports = UnloadCommand
