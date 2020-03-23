const Command = require('../../classes/Command')

class UnloadCommand extends Command {
  constructor () {
    super()

    this.name = 'unload'
    this.description = 'Unloads a command.'
    this.ownerOnly = true
  }

  async run (seoa, msg, args) {
    try {
      if (args.args.length < 1) {
        return await msg.reply('Usage: ```\n' +
    seoa.prefix + 'unload <command>\n' +
    '```')
      }

      const input = args.args[0]
      const cmd = seoa.commands.get(input)
      if (!cmd) return await msg.reply('Command `' + input + '` not found.')

      cmd.unload(seoa)
      return await msg.reply('Unloaded `' + input + '` command.')
    } catch (err) {
      console.error(err.stack)
      return await msg.reply('An Error occured while unloading the command: ```\n' + err.message + '\n```')
    }
  }
}

module.exports = UnloadCommand
