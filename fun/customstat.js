const Command = require('../../classes/Command')

class CustomStatCommand extends Command {
  constructor () {
    super()

    this.name = 'customstat'
    this.description = 'Edit the Custom Status!'
    this.aliases = ['customstatus', '봇상태', '쳔새ㅡㄴㅅㅁ션', '쳔새ㅡㄴㅅㅁㅅ', 'qhttkdxo']
    this.cooldown = 10
  }

  async run (seoa, msg, query, locale) {
    const arr = query.args
    if (arr.length < 1) return await msg.reply(this.usage(seoa, locale, query.cmd))

    const cycler = seoa.extensions.get('Cycles')
    const cmd = arr.shift()
    const content = arr.join(' ')

    switch (cmd) {
      case 'add':
      case '추가':
      case 'ㅁㅇㅇ':
      case 'cnrk':
        if (content.length < 1) return await msg.reply(this.usageAdd(seoa, locale, query.cmd, cmd))

        cycler.add(content, msg.author.id)
        return await msg.reply(seoa.locale.t('commands.customstat.add:Added bot custom status.', locale))

      case 'list':
      case '리스트':
      case 'ㅣㅑㄴㅅ':
      case 'fltmxm': {
        let data; let all = false; let author
        if (arr.length < 1) {
          data = cycler.get(msg.author.id)
          author = msg.author
        } else if (arr.includes('--all')) {
          data = cycler.get()
          all = true
        } else {
          author = msg.mentions.users.first()
          data = cycler.get(author.id)
        }

        let str = ''
        data.forEach((d, c) => {
          let u
          if (all) u = seoa.users.cache.get(d.author) || seoa.users.fetch(d.author)
          str = str + (c + 1) + '. ' + (all ? "'" + d.content + "' - " + (u.tag || seoa.locale.t('common.unknownUser:Unknown User', locale)) : d.content) + '\n'
        })
        if (data.length < 1) str = seoa.locale.t('commands.customstat.list.nothing:Nothing to show', locale)

        return await msg.reply(seoa.locale.t('commands.customstat.list.result:Custom status added by %1$s:```\n%2$s```', locale, (all ? seoa.locale.t('common.everyone:everyone', locale) : author.tag), str))
      }

      case 'delete':
      case 'del':
      case '삭제':
      case 'remove':
      case '제거':
      case 'ㅇ딛ㅅㄷ':
      case 'ㅇ디':
      case 'tkrwp':
      case 'ㄱ드ㅐㅍㄷ':
      case 'wprj': {
        if (arr.length < 1) return await msg.reply(this.usageDelete(seoa, locale, query.cmd, cmd))

        if (isNaN(arr[0])) return await msg.reply(seoa.locale.t('commands.customstat.delete.NaN:Incorrect value. Please enter the number.', locale))
        const num = parseInt(arr[0]) - 1

        let user
        if (arr.length > 1) {
          if (!seoa.owner.includes(msg.author.id)) return await msg.reply(seoa.locale.t("commands.customstat.delete.notOwner:Only the owners of the bot can delete others' bot custom status data.", locale))
          user = msg.mentions.members.first()
        }

        let result
        if (user) result = cycler.delete(num, user.id)
        else result = cycler.delete(num, msg.author.id)

        if (result) return await msg.reply(seoa.locale.t('commands.customstat.delete.complete:Deleted bot status data.'), locale)
        else return await msg.reply(seoa.locale.t('commands.customstat.delete.cannotfind:Cannot find bot status data.', locale))
      }

      default:
        return await msg.reply(this.usage(seoa, locale, query.cmd))
    }
  }

  usage (seoa, locale, cmd) {
    return seoa.locale.t('commands.customstat.usage.all:Usage:```\n%1$s%2$s <add/추가/list/리스트/delete/삭제> [...]\n```', locale, seoa.prefix, cmd)
  }

  usageAdd (seoa, locale, cmd, cmd2) {
    return seoa.locale.t('commands.customstat.usage.add:Usage:```\n%1$s%2$s %3$s <content: string>\n```', locale, seoa.prefix, cmd, cmd2)
  }

  usageDelete (seoa, locale, cmd, cmd2) {
    return seoa.locale.t('commands.customstat.usage.delete:Usage:```\n%1$s%2$s %3$s <number> [--user (mention)]\n```', locale, seoa.prefix, cmd, cmd2)
  }
}

module.exports = CustomStatCommand
