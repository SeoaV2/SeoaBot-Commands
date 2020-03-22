const ping = require('ping').promise.probe
const Command = require('../classes/Command')

class PingCommand extends Command {
  constructor () {
    super()

    this.name = 'ping'
    this.aliases = ['핑']
  }

  run (_seoa, msg, query) {
    const limit = isNaN(parseInt(query.args[0])) ? 6 : parseInt(query.args[0])
    const pings = []
    let count = 1

    msg.channel.send('Idle: ' + (limit / 10) + 's')
      .then((m) => {
        const interval = setInterval(pinging, 100)
        function pinging () {
          ping('discordapp.com')
            .then(pingThen)
            .catch(console.log)
        }

        function pingThen (res) {
          count++
          pings.push(res.time)
          if (count > limit) {
            clearInterval(interval)
            let sum = 0
            pings.sort((left, right) => left - right)
            pings.forEach((p) => { sum = Math.round((sum + p) * 100) / 100 })

            const min = Math.round(pings[0] * 100) / 100
            const max = pings[pings.length - 1]
            const avg = Math.round(sum / pings.length * 100) / 100

            m.edit('sum/min/avg/max: ' + [sum, min, avg, max].join('/'))
          }
        }
      })
  }
}

module.exports = PingCommand
