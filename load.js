const Command = require('../classes/Command')
const path = require('path')

class LoadCommand extends Command {
  constructor () {
    super()

    this.name = 'load'
    this.description = 'Loads a command.'
    this.ownerOnly = true
  }

  async run (seoa, msg, args) {
    try {
      if (args.args.length < 1) {
        return await msg.reply('Usage: ```\n' +
    seoa.prefix + 'load <command>\n' +
    '```')
      }

      const input = args.args[0]
      const cmd = require(path.join(seoa._path, input + '.js'))
      seoa.commands.register(cmd)

      return await msg.reply('Loaded `' + input + '` command.')
    } catch (err) {
      console.error(err.stack)
      return await msg.reply('An Error occured when loading the command: ```\n' + err.message + '\n```')
    }
  }
}

module.exports = LoadCommand
