const Command = require('../../classes/Command')
const path = require('path')

class LoadCommand extends Command {
  constructor () {
    super()

    this.name = 'load'
    this.description = 'Loads a command.'
    this.ownerOnly = true
  }

  async run (seoa, msg, args, locale) {
    try {
      if (args.args.length < 1) {
        return await msg.reply(seoa.locale.t('commands.load.usage:Usage: ```\n%1$sload <command>\n```' , locale, seoa.prefix))
      }

      const input = args.args[0]

      let cmd
      try {
        cmd = require(path.join(seoa._path, input + '.js'))
      } catch (err) { return await msg.reply(seoa.locale.t('commands.load.cannotfind:Cannot find Command `%1$s`.', locale, input)) }
      seoa.commands.register(cmd)

      return await msg.reply(seoa.locale.t('commands.load.added:Loaded `%1$s` command.', locale, input))
    } catch (err) {
      console.error(err.stack)
      return await msg.reply(seoa.locale.t('commands.load.error:An Error occured when loading the command: ```\n%1$s\n```', locale, err.message))
    }
  }
}

module.exports = LoadCommand
