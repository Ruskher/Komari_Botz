let gis = require("g-i-s")
let ytdl = require('ytdl-core')
let fs = require('fs')
let { pipeline } = require('stream')
let { promisify } = require('util')
let os = require('os')
let yts = require('yt-search')
let streamPipeline = promisify(pipeline);
let axios = require("axios")
function trimYouTubeUrl(url) {
  const trimmedUrl = url.split("?")[0];
  return trimmedUrl;
}

let handler = async (m, { conn, text, usedPrefix, command, isBotAdmin, isAdmin }) => {
  if (!text) return m.reply(`Hallo *${m.name}* Aku Komari Senang bertemu denganmu~ Apa yang ingin kamu ceritakan atau tanyakan hari ini? Aku siap mendengarkan dan membantu dengan apapun yang kamu butuhkan! 😅`.trim())
  
  if (text.includes("group") && text.includes("tutup")) {
  if (!isBotAdmin) return m.reply(`Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`)
  if (!isAdmin) return m.reply(`Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`);      
  await conn.groupSettingUpdate(m.chat, "announcement");
  m.reply(`Oke, grup telah ditutup. Semoga lebih teratur ya~ 😉`);
  } else if (text.includes("group") && text.includes("buka")) {
  if (!isBotAdmin) return m.reply(`Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`)
  if (!isAdmin) return m.reply(`Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`);
  await conn.groupSettingUpdate(m.chat, "not_announcement");
  m.reply(`Oke, grup telah dibuka. Ayo kita beraktivitas bersama-sama! 😉`);
  } else if (text.includes("cariin") || text.includes("cari")) {
  await m.reply('Bentar ya Komari cariin..🤗')
  let memek = await pinterest(text)
 
  await conn.sendFile(m.chat, memek.result[0], '', 'Ini hasil pencariannya kak 🤭', m)
  } else if (text.includes("carikan") || text.includes("putar") || text.includes("putarkan") || text.includes("play")) {
  let anu = await m.reply('Okeiy, aku cariin dulu yaa! 😅')
  let trimmedUrl = trimYouTubeUrl(text);
  let search = await yts(trimmedUrl);
  let vid = search.videos[0];
  let { title, thumbnail, timestamp, views, ago, url } = vid;
  let audioStream = ytdl(url, {
    filter: 'audioonly',
    quality: 'highestaudio',
  });
  let tmpDir = os.tmpdir();
  let writableStream = fs.createWriteStream(`${tmpDir}/${title}.mp3`);
  await streamPipeline(audioStream, writableStream);
  let salsa = await conn.sendMessage(m.chat, { text: `Berhasil mendapatkan hasil, Selamat Menikmati. 🤗`.trim(), edit: anu })
  let doc = {
  audio: {
  url: `${tmpDir}/${title}.mp3`
  },
  mimetype: 'audio/mp4',
  fileName: `${title}`,
  }
  await conn.sendMessage(m.chat, doc, { quoted: salsa });
  fs.unlink(`${tmpDir}/${title}.mp3`, (err) => {
  if (err) {
  console.error(`Failed to delete audio file: ${err}`);
  } else {
  console.log(`Deleted audio file: ${tmpDir}/${title}.mp3`);
  }
  })  
  } else if (text.includes("kick") || text.includes("kik")) {
  if (!isBotAdmin) return m.reply(`Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`)
  if (!isAdmin) return m.reply(`Maaf, hanya admin yang bisa menggunakan perintah ini. 😔`);
  let users = m.mentionedJid[0]
  ? m.mentionedJid[0]
  : m.quoted
  ? m.quoted.sender
  : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
  await conn.groupParticipantsUpdate(m.chat, [users], "remove");
  m.reply(`Maaf Ya Terpaksa Aku Tendang 😖, Perintah Admin Sih..`);
};
}
handler.tags = ["ai"]
handler.help = ["komari <text>"]
handler.command = ["komari"];
handler.register = true

module.exports = handler;

async function pinterest(query) {
	return new Promise((resolve, reject) => {
	  let err = { status: 404, message: "Terjadi kesalahan" }
	  gis({ searchTerm: query + ' site:id.pinterest.com', }, (er, res) => {
	   if (er) return err
	   let hasil = {
		  status: 200,
		  creator: 'DitzKomari',
		  result: []
	   }
	   res.forEach(x => hasil.result.push(x.url))
	   resolve(hasil)
	  })
	})
}