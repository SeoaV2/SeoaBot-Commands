const Command = require('../../classes/Command')
const { table } = require('table')
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
      const embed = new MessageEmbed()
        .setColor(0xff09b0)
        .setTitle(seoa.locale.t('commands.codequiz.leaderboard.title:Code Quiz Leaderboard', locale))
        .setTimestamp(new Date())

      let myrank
      const temp = []
      const option = { columns: [{ alignment: 'right' }, { alignment: 'left', width: 12 }, { alignment: 'center' }, { alignment: 'center' }] }

      e.forEach((v, i) => {
        const user = seoa.users.resolve(v.id)
        if (v.id === msg.author.id) myrank = i + 1
        temp.push(['#' + (i + 1), (user.username.length > 12 ? user.username.substring(0, 11) + '-' : user.username), v.score + ' score', v.solved + ' quizs'])
      })

      embed.setDescription('```fix\n' + table(temp, option) + '```' + (myrank ? 'My rank is `#' + myrank + '`' : ''))

      msg.channel.send(embed)
    })
  }
}

module.exports = LeaderBoardCommand
