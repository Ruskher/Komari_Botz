let fetch = require('node-fetch')

let handler = async (m, { conn, command }) => {
conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });
	let url = `https://api.lolhuman.xyz/api/random2/neko?apikey=${global.lolkey}`
		conn.sendFile(m.chat, url, null, done, m)
		}
		handler.command = /^(neko)$/i
		handler.tags = ['anime']
		handler.help = ['neko']
		module.exports = handler
		
