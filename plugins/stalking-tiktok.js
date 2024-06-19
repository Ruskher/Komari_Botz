const fetch = require('node-fetch');
const cheerio = require("cheerio");

let handler = async(m, { text, command, args }) => {
  if(!text) return reply(`Masukan username nya! contoh: ditz.ofc\n*NOTE: Jangan memasukan @ kedalam command`)
  if(text.includes('@')) return reply('Jangan menggunakan @ pada command')
  reply('Sabar om lagi nyari...')
  try {
    let d = await tiktokStalk(text)
    let teks = `
Nama: ${d.user.nickname}
Username: ${d.user.uniqueId}
Terverifikasi: ${d.user.verified ? 'Terverifikasi' : 'Tidak Terverifikasi'}
Bio: ${d.user.signature}
Kode Negara: ${d.user.region}

Pengikut: ${d.stats.followerCount}
Mengikuti: ${d.stats.followingCount}
Total Like: ${d.stats.heart}
Total Postingan: ${d.stats.videoCount}
`
m.reply(teks)
  }catch (e) {
    console.log(e)
    m.reply(e)
  }
}
handler.tags = ['stalk']
handler.help = ['ttstalk <username>']
handler.command = /^ttstalk$/i

module.exports = handler

async function tiktokStalk(user) {
  try {
    const url = await fetch(`https://tiktok.com/@${user}`, {
      headers: {
        'User-Agent': 'PostmanRuntime/7.32.2'
      }
    });
    const html = await url.text();
    const $ = cheerio.load(html);
    const data = $('#__UNIVERSAL_DATA_FOR_REHYDRATION__').text();
    const result = JSON.parse(data);
    if (result['__DEFAULT_SCOPE__']['webapp.user-detail'].statusCode !== 0) {
      const ress = {
        status: 'error',
        message: 'User not found!',
      };
      console.log(ress);
      return ress;
    }
    const res = result['__DEFAULT_SCOPE__']['webapp.user-detail']['userInfo'];
    return res;
  } catch (err) {
    console.log(err);
    return String(err);
  }
};