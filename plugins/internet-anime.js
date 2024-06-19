let fetch = require("node-fetch")
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("@whiskeysockets/baileys")

let handler = async (m, { text, command, usedPrefix, args }) => {
  if (command === 'anime') {
  if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} Jujutsu Kaisen`, m)
  m.reply('```Mencari...```')
  let res = await fetch(`https://api.neoxr.eu/api/anime?q=${text}&apikey=${global.neo}`)
  let tenka = await res.json()
  let sections = [{
  rows: []
  }]
  for(let i of tenka.data) {
  sections[0].rows.push({
  title: `Title: ${i.title}`, 
  description: `Score: ${i.score}`, 
  id: `.animeget ${i.url}`
  }) 
  }
await conn.sendListMsg(m.chat, 'Berhasil! Silahkan Pilih Disini', 'Powered By DitzOfc', '', 'Click Di Sini', sections, m)
  } else if (command === 'animeget') {
  if (!text) return
  m.reply('```Get Detail...```')
  let res = await fetch(`https://api.neoxr.eu/api/anime-get?url=${text}&apikey=${global.neo}`)
  let adit = await res.json()
  let teks = '```Judul:```' + ` ${adit.data.title}\n`
  teks += '```Status:```' + ` ${adit.data.status}\n`
  teks += '```Rilis Pada:```' + ` ${adit.data.release}\n`
  teks += '```Durasi Per Episode:```' + ` ${adit.data.duration}\n`
  teks += '```Duration:```' + ` ${adit.data.duration}\n`
  teks += '```Score:```' + ` ${adit.data.score}\n\n`
  teks += `Description:\n${adit.data.description}`
  let sections = [{
  rows: []
  }]
  for(let i of adit.data.episode) {
  for(let j of i.link) {
  for(let a of j.url) {
    sections[0].rows.push({
      header: i.episode,
      title: `Quality: ${j.quality}`, 
      description: `Server: ${a.server}`, 
      id: `.animedetail ${a.url}`
    })
   } 
  }
}
await conn.sendListImg(m.chat, teks, global.footer, 'Click Here!', sections, adit.data.thumbnail, m)
} else if (command === 'animedetail') {
if (!text) return
 let msg = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
  message: {
  "messageContextInfo": {
  "deviceListMetadata": {},
  "deviceListMetadataVersion": 2
  },
  interactiveMessage: proto.Message.InteractiveMessage.create({
  body: proto.Message.InteractiveMessage.Body.create({
  }),
  footer: proto.Message.InteractiveMessage.Footer.create({
  text: 'Powered By _Dev. Expertise_'
  }),
  header: proto.Message.InteractiveMessage.Header.create({
  title: 'Oke! Di bawah ini adalah link streaming Anime Untuk mu, Selamat Menonton🤗',
  hasMediaAttachment: false
  }),
  nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
  buttons: [
  {
  "name": "cta_url",
  "buttonParamsJson": `{"display_text":"Streaming Here!","url":"${text}","merchant_url":"${text}"}`
  }
  ],
  })
  })
  }
  }
  }, { userJid: m.chat, quoted: m })
conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })
}
}
handler.help = ['anime *<text>*']
handler.tags = ['internet']

handler.command = ["anime","animeget", "animedetail"]

module.exports = handler