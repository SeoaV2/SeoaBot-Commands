const Command = require('../../classes/Command')
const { MessageEmbed } = require('discord.js')

class QuizCommand extends Command {
  constructor () {
    super()
    this.name = 'quiz'
    this.deacription = 'generate a new quiz'
    this.aliases = ['quiz', 'cq', 'codequiz', '퀴즈', '코드퀴즈']
  }

  /**
   * @param {import('../../classes/Querys')} query
   */
  run (seoa, msg, query, locale) {
    /**
     * @type {import('../../extensions/CodeQuiz/index')}
     */
    const cqExt = seoa.extensions.get('CodeQuiz')
    const quiz = cqExt.getQuiz(query.args[0])
    if (!quiz) return msg.reply(seoa.locale.t('commands.codequiz.cannotfind:Cannot find Quiz #%1$s', locale, query.args[0]))

    const embed = new MessageEmbed()
      .setColor(0xff09b0)
      .setImage(quiz.image)
      .setDescription('[Request a new quiz • Report quiz error](%1$s)', locale, 'https://github.com/SeoaV2/SeoaBot-CodeQuiz/issues/new/choose')
      .addField(seoa.locale.t('commands.codequiz.quiztitle:Q%1$s. about %2$s', locale, quiz.id, quiz.language), quiz.question.split('{username}').join('<@' + msg.author.id + '>'))

    msg.channel.send(embed)
      .then(detect)

    /**
     * @param {import('discord.js').Message} msg
     */
    function detect (m) {
      const validReactions = ['⭕', '❌']
      m.createReactionCollector((r, u) => validReactions.includes(r.emoji.name) && u.id === msg.author.id, { max: 1, time: 30000 })
        .on('end', (c) => {
          m.reactions.removeAll()
          if (!c.first()) return m.edit(embed.setColor(0xff0000).setTitle(seoa.locale.t('commands.codequiz.timeup:Time Over! (20s)', locale)))
          if (quiz.answer !== (c.first().emoji.name === '⭕')) return m.edit(embed.setColor(0xff0000).addField('A.', quiz.explanation).setTitle(seoa.locale.t('commands.codequiz.incorrect:Incorrect!', locale)))
          else {
            cqExt.addScore(quiz.point, msg.author.id)
            m.edit(embed.setColor(0x00ff00).addField('A.', quiz.explanation).setTitle(seoa.locale.t('commands.codequiz.correct:Correct! Earned %1$s Score!', locale, quiz.point)))
          }
        })

      m.react('⭕')
      m.react('❌')
    }
  }
}

module.exports = QuizCommand
