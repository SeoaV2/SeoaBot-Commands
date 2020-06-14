const Command = require('../../classes/Command')

class gameCommand extends Command {
  constructor () {
    super()

    this.name = 'socketgame'
    this.deacription = '소켓게임을 시작해요'
    this.aliases = ['소켓게임']
    this.ownerOnly = false
  }

  run (seoa, msg, _args) {
    const socketGame = seoa.extensions.get('SocketGame')
    if (!socketGame) return

    msg.channel.send('로딩중...')
      .then((m) => { socketGame.load(m, msg) })
  }
}

module.exports = gameCommand
