const Command = require('../classes/Command')

class ReloadCommand extends Command {
  constructor () {
    super()

    this.name = 'reload'
    this.description = 'reloads a command'
    this.ownerOnly = true
  }

  run (seoa, msg, args) {
    if (args.args.length < 1) {
      return msg.reply('Usage:```\n' +
    seoa.prefix + 'reload <command>\n```')
    }

    const input = args.args[0]
    const cmd = seoa.commands.get(input)
    if (!cmd) return msg.reply('Command `' + input + '` not found.')

    cmd.reload(seoa)
    return msg.reply('Reloaded `' + cmd.name + '` command.')
  }
}

module.exports = ReloadCommand
