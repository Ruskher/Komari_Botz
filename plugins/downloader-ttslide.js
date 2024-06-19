let fetch = require('node-fetch')

let handler = async(m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `• *Example :* ${usedPrefix + command} https://vt.tiktok.com/ZS81qJD5v/`
	await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
	if (!(text.includes('http://') || text.includes('https://'))) return m.reply(`URL invalid, please input a valid URL. Try with adding http:// or https://`)
	if (!text.includes('tiktok.com')) return m.reply(`Invalid TikTok URL.`)
	try {
		let res = await fetch(`https://api.neoxr.eu/api/tiktok?url=${text}&apikey=${global.neo}`)
		let anu = await res.json()
		anu = anu.data
		if (anu.photo.length === 0) throw Error('Error: no data')
		let c = 0
		for (let x of anu.photo) {
			if (c === 0) await conn.sendMessage(m.chat, { image: { url: x }, caption: `Mengirim 1 dari ${anu.photo.length} slide gambar.\n_(Sisanya akan dikirim via chat pribadi.)_` }, { quoted: m })
			else await conn.sendMessage(m.sender, { image: { url: x } }, { quoted: m })
			c += 1
		}
	} catch (e) {
		console.log(e)
		throw `Invalid slideshow URL / media isn't available.`
	}
}

handler.help = ['tiktokslide', 'ttslide', 'slide'].map(v => v + ' *<url>*')
handler.command = /^(tiktokslide|ttslide|slide)$/i
handler.tags = ['downloader'];
handler.limit = true;
handler.group = false;
handler.premium = false;
handler.owner = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.private = false;

module.exports = handler
