const fetch = require('node-fetch');
const uploadImage = require('../lib/uploadImage');

let handler = async (m, { conn, command, args }) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || q.mediaType || '';

  if (!/image\/(jpe?g|png)/.test(mime)) {
    return conn.reply(m.chat, `• *Example :* reply/send image with caption *${usedPrefix + command}*`, m);
  }

  m.reply('Processing Image...');
  
  try {
    let image = await q.download();
    let url = await uploadImage(image);

    let apiUrl = `https://api.itsrose.rest/image/unblur?url=${url}`;
    const options = {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': global.rose,
      }
    };

    let response = await fetch(apiUrl, options);
    let data = await response.json();

    if (data.status) {
      const hasil = data.result.images[0]; // Mengambil gambar pertama dari respons
      await conn.sendMessage(m.chat, { image: { url: hasil }, caption: 'Your Image Successfully Processed☑️' }, { quoted: m });
    } else {
      m.reply('Sorry, we have trouble error');
    }

  } catch (error) {
    console.error('Error:', error);
    m.reply('Sorry, there was an error processing your request.');
  }
};

handler.tags = ['tools'];
handler.help = ['4k'];
handler.command = /^4k$/i;
handler.limit = true;

module.exports = handler;