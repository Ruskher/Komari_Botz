let { tiktoks } = require('../function/scrape.js')
let { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("@whiskeysockets/baileys") 

let handler = async (m, { conn, text, command }) => {
  if (!text) return conn.reply(m.chat, `• *Example :* .${command} jedag jedug`, m)
  conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
  let ditz = await tiktoks(`${text}`)
  var ppt = prepareWAMessageMedia({ video: {url:ditz.no_watermark}}, { upload: conn.waUploadToServer })
  var ptv = generateWAMessageFromContent(m.chat, proto.Message.fromObject({"ptvMessage": ppt.videoMessage, caption: `done banh`, fileLength: 9999999999 }), { userJid: m.chat })
  conn.relayMessage(m.chat, ptv.message, { messageId: ptv.key.id })
}
handler.help = ['tiktoksearch'].map(v => v + ' *<text>*')
handler.tags = ['downloader']

handler.command = /^tiktoksearch|ttsearch$/i
handler.premium = false

module.exports = handler