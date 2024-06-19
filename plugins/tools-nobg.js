const uploadImage = require('../function/uploadImage')
const fetch = require('node-fetch')

let handler = async (m, { conn, command, usedPrefix }) => {
 let q = m.quoted ? m.quoted : m;
let mime = (q.msg || q).mimetype || q.mediaType || "";
if (!mime) return conn.reply(m.chat, `Fotonya Mana Kak?`, m);
if (!/image\/(jpe?g)/.test(mime)) throw 'Unsupported format.';
      m.reply('Menghapus background...')
      try {
      let down = await q.download()
      let upload = await uploadImage(down)
      let res = await fetch(`https://api.neoxr.eu/api/nobg2?image=${upload}&apikey=${global.neo}`)
      let response = await res.json()
      let hasil = response.data
      conn.sendMessage(m.chat, { image: { url: hasil.no_background }, caption: 'Done' }, { quoted: m})
      } catch (e) {
      console.log(e)
      m.reply('Error :(, Mungkin terjadi karena format gambar mu berbentuk .png')
      }
  }

handler.tags = ["tools"]
handler.help = ["nobg *<image>*"]
handler.command = /^nobg$/i

handler.limit = true

module.exports = handler