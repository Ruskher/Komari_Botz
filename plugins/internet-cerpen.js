var fetch = require('node-fetch')

async function handler(m) {
  var ditzofc = await fetch(`https://api.lolhuman.xyz/api/cerpen?apikey=${global.lolkey}`)
  var res = await ditzofc.json()
  var hasil = `Title: *${res.result.title}*\nCreator: *${res.result.creator}*\n\n${res.result.cerpen}`
  await conn.reply(m.chat, hasil, m)
}

handler.command = handler.help = ['cerpen']
handler.tags = ['internet']

module.exports = handler