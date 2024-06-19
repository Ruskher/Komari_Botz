let fetch = require("node-fetch")
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = require("@whiskeysockets/baileys")

let handler = async (m, { command, text, args, conn }) => {
   if (command === 'kuronime') {
     if(!text) return m.reply(`Masukan judul Anime yang ingin kamu tonton`)
     m.reply('```Mencari...```')
     let res = await fetch(`https://api.neoxr.eu/api/kuronime?q=${text}&apikey=${global.neo}`)
     let tenka = await res.json()
     let sections = [{
     rows: []
     }]
     for (let i of tenka.data)
       sections[0].rows.push({
       header: i.title,
       title: `${i.genre}`, 
       description: `${i.status}`, 
       id: `.kuronimeget ${i.url}`
       })
      await conn.sendListMsg(m.chat, 'Ini kak hasil nya, Silahkan pilih ya☺️', global.footer, 'Click Here!', sections, m)
       
 } else if (command === 'kuronimeget') {
 if(!text) return
 m.reply('Menyiapkan list Episode...')
 let res = await fetch(`https://api.neoxr.eu/api/kuronime?url=${text}&apikey=${global.neo}`)
 let adit = await res.json()
 let teks = '```Judul:```' + ` ${adit.data.title}\n`
  teks += '```Genre:```' + ` ${adit.data.genre}\n`
  teks += '```Studio:```' + ` ${adit.data.studio}\n`
  teks += '```Status:```' + ` ${adit.data.status}\n`
  teks += '```Season:```' + ` ${adit.data.season}\n`
  teks += '```Rilis Pada:```' + ` ${adit.data.released_on}\n`
  teks += '```Di Update Pada:```' + ` ${adit.data.updated_on}\n`
  teks += '```Total Episode```' + ` ${adit.data.total_episodes}\n`
  teks += '```Durasi Per Episode:```' + ` ${adit.data.duration}\n`
  teks += '```Duration:```' + ` ${adit.data.duration}\n`
  teks += '```Rating:```' + ` ${adit.data.rating}\n\n`
  teks += `Sinopsis:\n${adit.data.sinopsis}`
  let sections = [{
  rows: []
  }]
  for(let i of adit.data.episodes) {
    sections[0].rows.push({
      title: `I Want To...`, 
      description: `${i.episode}`, 
      id: `.kuronimeurl ${i.url}`
    })}
conn.sendListImg(m.chat, teks, global.footer, 'Click Here!', sections, adit.data.thumbnail, m)
} else if (command === 'kuronimeurl') {
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
handler.help = ['kuronime *<text>*']
handler.tags = ['internet', 'anime']

handler.command = ["kuronime","kuronimeget", "kuronimeurl"]

module.exports = handler