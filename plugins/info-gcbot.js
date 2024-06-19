let handler = async (m, { conn }) => {
  let text = '- Network WhatsApp Bot\nhttps://chat.whatsapp.com/C1LbTu4n8lX30WOsdH32ff'
  m.reply(text)
}

handler.command = /^(gcbot)$/i;
handler.private = false;
module.exports = handler;