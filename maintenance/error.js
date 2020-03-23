const Command = require('../../classes/Command')

class ErrorCommand extends Command {
  constructor () {
    super()

    this.name = 'error'
    this.deacription = 'Error Test'
    this.aliases = ['에러']
    this.ownerOnly = true
  }

  run (_seoa, _msg, _args) {
    throw new Error('Test Error')
  }
}

module.exports = ErrorCommand
