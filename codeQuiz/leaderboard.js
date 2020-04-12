const Command = require('../../classes/Command')
const { MessageEmbed } = require('discord.js')

class LeaderBoardCommand extends Command {
  constructor () {
    super()
    this.name = 'leaderboard'
    this.deacription = 'Code Quiz Leaderboards'
    this.aliases = ['leaderboard', '리더보드', 'lb', 'ranking', 'rank', '랭킹']
  }

  /**
   * @param {import('../../classes/SeoaClient')} seoa
   * @param {import('discord.js').Message} msg
   */
  run (seoa, msg, _query, locale) {
    const cqExt = seoa.extensions.get('CodeQuiz')
    cqExt.getLeaderboard().then((e) => {
      const embed = new MessageEmbed().setColor(0xff09b0)
      let temp = '```fix\n'
      e.forEach((v, i) => {
        const surfix = ['st', 'nd', 'rd']

        temp += (i + 1) + (surfix[i] || 'th') + ': ' + seoa.users.resolve(v.id).username + ' (' + v.score + ' score)\n'
      })

      embed.setDescription(temp + '```')

      msg.channel.send(embed)
    })
  }
}

module.exports = LeaderBoardCommand
