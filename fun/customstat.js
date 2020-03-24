const Command = require('../../classes/Command')

class CustomStatCommand extends Command {
  constructor() {
    super()

    this.name = 'customstat'
    this.description = 'Edit the Custom Status!'
    this.aliases = ['customstatus', '봇상태', '쳔새ㅡㄴㅅㅁ션', '쳔새ㅡㄴㅅㅁㅅ', 'qhttkdxo']
    this.cooldown = 10
  }

  async run(seoa, msg, args) {
    const arr = args.args
    if(arr.length < 1) return await msg.reply(this.usage(seoa.prefix, args.cmd))

    const cycler = seoa.extensions.get('Cycles')
    const cmd = arr.shift()
    const content = arr.join(' ')
    
    switch(cmd) {
      case 'add':
      case '추가':
      case 'ㅁㅇㅇ':
      case 'cnrk':
        if(content.length < 1) return await msg.reply(this.usageAdd(seoa.prefix, args.cmd, cmd))

        cycler.add(content, msg.author.id)
        msg.reply('Added custom status.')
        break

      case 'list':
      case '리스트':
      case 'ㅣㅑㄴㅅ':
      case 'fltmxm':
        let data, all = false, author
        if(arr.length < 1){
          data = cycler.get(msg.author.id)
          author = msg.author
        }
        else if (arr.includes === '--all') {
          data = cycler.get()
          all = true
        }
        else { //return await msg.reply('Listing other users\' data: WIP')
          author = msg.mentions.users.first()
          data = cycler.get(author.id)
        }

        let str = ''
        data.forEach((d, c) => {
          let u
          if(all) u = seoa.users.cache.get(d.author) || seoa.users.fetch(d.author)
          str = str + (c + 1) + '. ' + (all ? "'" + d.content + "' by " + (u.tag || 'Unknown User') : d.content) + '\n'
        })
        if(data.length < 1) str = 'Nothing to show'

        return await msg.reply('Custom status added by ' + (all ? 'everyone' : author.tag) + '```\n'
         + str + '```')
        break

      case 'delete':
      case '삭제':
      case 'remove':
      case '제거':
      case 'ㅇ딛ㅅㄷ':
      case 'tkrwp':
      case 'ㄱ드ㅐㅍㄷ':
      case 'wprj':
        if(arr.length < 1) return await msg.reply(this.usageDelete(seoa.prefix, args.cmd, cmd))

        if(isNaN(arr[0])) return await msg.reply('Incorrect value. Please enter the number.')
        const num = parseInt(arr[0]) - 1
        
        let user
        if(arr.length > 1) {
          if(!seoa.owner.includes(msg.author.id)) return await msg.reply("Only the owners of the bot can delete others' bot custom status data.")
          user = msg.mentions.members.first()
        }

        let result
        if(user) result = cycler.delete(num, user.id)
        else result = cycler.delete(num, msg.author.id)

        if(result) return await msg.reply('Deleted bot status data.')
        else return await msg.reply('Cannot find bot status data.')

        break
      default:
        return await msg.reply(this.usage(seoa.prefix, args.cmd))
    }
  }

  usage (prefix, cmd) {
    return 'Usage: ```\n' + prefix + cmd + ' <add/추가/list/리스트/delete/삭제> [...]\n```'
  }

  usageAdd(prefix, cmd, cmd2) {
    return 'Usage: ```\n' + prefix + cmd + ' ' + cmd2 + ' <content: string>\n```'
  }

  usageDelete(prefix, cmd, cmd2) {
    return 'Usage: ```\n' + prefix + cmd + ' ' + cmd2 + ' <number> [--user (mention)]\n```'
  }
}

module.exports = CustomStatCommand
