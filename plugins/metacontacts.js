let { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("@whiskeysockets/baileys") 
let handler = async (m, { conn }) => {
var contact = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
"contactMessage": {
"displayName": `DitzOfc`,
"vcard": "BEGIN:VCARD\nVERSION:3.0\nN:Adit;Bot;;;\nFN:DitzOfc\nTEL;type=Mobile;waid=13135550002:+62 857-1706-2467\nEND:VCARD",
}
}), { userJid: m.chat, quoted: m })
conn.relayMessage(m.chat, contact.message, { messageId: contact.key.id })
}
handler.tags = ['ai']
handler.help = ['metacontacts']
handler.command = ["metacontacts"]
module.exports = handler