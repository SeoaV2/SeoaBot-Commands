const Command = require('../../classes/Command')

class RegisterCommand extends Command {
  constructor () {
    super()
    this.name = 'register'
    this.deacription = 'register the server'
    this.aliases = ['가입', 'ㄱㄷ햔ㅅㄷㄱ', 'rkdlq']
  }

  async run (seoa, msg, _args, locale) {
    const check = await seoa.knex('guild').select('id').where('id', msg.guild.id)
    if (check.length > 0) return await msg.channel.send(seoa.locale.t('commands.register.alreadyRegistered:This server is already registered.', locale))

    const mcFilter = (msg) => {
      if (this.author === msg.author.id) {
        const content = msg.content.toLowerCase()
        if (content !== 'yes' && content !== 'no') return false
        else if (content === 'yes') this.result = true
        else if (content === 'no') this.result = false
        return true
      } else return false
    }

    const rcFilter = (reaction, user) => {
      if (user.id === msg.author.id) {
        const emoji = reaction.emoji.name
        if (emoji !== '✅' && emoji !== '❌') return false
        else if (emoji === '✅') this.result = true
        else if (emoji === '❌') this.result = false
        return true
      } else return false
    }

    const m = await msg.channel.send(seoa.locale.t("commands.register.ask:If you register the server, you agree to providing this server's information to SeoaBot's database.\n" +
    'Do you agree?', locale))

    try {
      await m.react('✅')
      await m.react('❌')
    } catch (err) {
      await msg.channel.send(seoa.locale.t('commands.register.reactFail:Failed to add reaction. Please type your response.', locale))
    }

    this.result = null

    this.author = msg.author.id
    const mc = msg.channel.createMessageCollector(mcFilter, { time: 10000 })
    const rc = m.createReactionCollector(rcFilter, { time: 10000 })

    // Message Collector
    mc.on('collect', () => {
      if (this.result) {
        this.yes(seoa, msg, locale, mc, rc)
      } else {
        this.no(seoa, msg, locale, mc, rc)
      }
    })

    // Reaction Collector
    rc.on('collect', () => {
      if (this.result) {
        this.yes(seoa, msg, locale, rc, mc)
      } else {
        this.no(seoa, msg, locale, rc, mc)
      }
    })

    const timeOut = () => {
      if (this.result == null) {
        msg.channel.send(seoa.locale.t('commands.register.timeOut:Response timed out.', locale))
        this.result = false
      }
    }
    mc.on('end', timeOut)
    rc.on('end', timeOut)
  }

  async yes (seoa, msg, locale, collector, collector2) {
    // Registration
    console.log('[Bot Activation] ' + msg.author.tag + ' (' + msg.member.nickname + ') activated the bot in ' + msg.guild.name)

    await seoa.knex('guild').insert({
      id: msg.guild.id,
      locale: 'en_US'
    })

    // Done!
    msg.channel.send(seoa.locale.t('commands.register.yes:Registered the server! You can now use the many features of SeoaBot!', locale))
    collector.stop()
    collector2.stop()
  }

  async no (seoa, msg, locale, collector, collector2) {
    msg.channel.send(seoa.locale.t('commands.register.no:Server registration cancelled.', locale))
    collector.stop()
    collector2.stop()
  }
}

module.exports = RegisterCommand
