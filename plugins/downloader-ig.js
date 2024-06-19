let axios = require("axios");

let handler = async (m, { text, usedPrefix, command, args }) => {
  if (!text) return m.reply(`Example: ${usedPrefix + command} link`);
  m.reply('Wait...');
  
  const url = `https://api.itsrose.rest/downloader/ig?url=${text}`;
  const options = {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Authorization': global.rose,
    }
  };

  try {
    const response = await axios(url, options);
    const data = response.data;

    if (Array.isArray(data.result) && data.result.length > 1) {
      // Jika hasilnya adalah beberapa gambar
      for (let item of data.result) {
        await conn.sendMessage(m.chat, { image: { url: item.url }, caption: 'Done' }, { quoted: m });
      }
    } else if (Array.isArray(data.result) && data.result.length === 1) {
      // Jika hasilnya adalah satu video atau satu gambar
      let result = data.result[0];
      if (result.url.includes('.mp4')) {  // Mengasumsikan bahwa video memiliki ekstensi .mp4
        await conn.sendMessage(m.chat, { video: { url: result.url }, caption: 'Done' }, { quoted: m });
      } else {
        await conn.sendMessage(m.chat, { image: { url: result.url }, caption: 'Done' }, { quoted: m });
      }
    } else {
      m.reply('Tidak ada hasil yang ditemukan.');
    }

  } catch (error) {
    console.error(error);
    m.reply('Terjadi kesalahan saat mengambil data.');
  }
};
handler.help = ['ig', 'igdl', 'instagram'].map(v => v + ' *<url>*')
handler.tags = ['downloader'];
handler.command = /^(ig|igdl|instagram)$/i;

module.exports = handler;