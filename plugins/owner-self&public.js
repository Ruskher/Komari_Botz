let handler = async(m, { conn, command }) => {
  let isPublic = command === "public";
  let self = global.opts["self"]

  if(self === !isPublic) return reply(m.chat, `Dah ${!isPublic ? "Self" : "Public"} dari tadi ${m.sender.split("@")[0] === global.owner[1] ? "Mbak" : "Bang"} :v`)

  global.opts["self"] = !isPublic

  reply(`Berhasil ${!isPublic ? "Self" : "Public"} bot!`)
}

handler.help = ["self", "public"]
handler.tags = ["owner"]

handler.rowner = true

handler.command = /^(self|public)/i

module.exports = handler