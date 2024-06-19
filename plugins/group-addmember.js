const { getBinaryNodeChild, getBinaryNodeChildren } = require('@whiskeysockets/baileys')
let handler = async (m, { conn, text, participants, usedPrefix, command }) => {
  if (!text) return m.reply('Masukin Nomor Contoh 62xxx')
  let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await conn.groupParticipantsUpdate(m.chat, [users], 'add')
}
handler.help = ['add', '+'].map(v => v + ' nomor')
handler.tags = ['group']
handler.command = /^(add|menambahkan|\+)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
module.exports = handler