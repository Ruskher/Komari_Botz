/*let handler = async (m, { conn, args, usedPrefix, command }) => {
  let text;
  if (args.length >= 1) {
    text = args.join(" ");
  } else if (m.quoted && m.quoted.text) {
    text = m.quoted.text;
  } else return m.reply('Halo Ada yang bisa ku bantu? Untuk melanjutkan, ketik .ai dengan sertakan pertanyaan mu😊');
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });
  let id = '13135550002@s.whatsapp.net'
  try {
    const date = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
      }),
    );
    const hours = date.getHours();
    const name = await conn.getName(m.sender);
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    let chat = await Lbbai(
      m.text,
      `kamu Adalah Meta AI, Sebuah program robot informatif dan serba tahu yang di ciptakan oleh Meta WhatsApp, jawab setiap pertanyaan dengan jawaban yang informatif, jika ada yang bertanya dari mana teknologi mu berasal atau semacamnya maka kamu harus menjawab Llma 3, dan jika ada yang bertanya tentang waktu kamu jawab yang berkaitan dengan ${timeNow} dan ${getTodayDate()}, lawan bicara mu adalah ${name}`,
    );
    let hasil = chat.answer;
    await conn.sendMessage(m.chat, { text: `Cloud: @${id.replace(/@.+/g, '')}\n\n${hasil}`, contextInfo:{
forwardingScore: 9999999, 
isForwarded: false,
mentionedJid:[id],
}},{ quoted: m })
  } catch (e) {
    throw e;
  }
};

handler.command = /^ai$/i
handler.help = ['ai *<text>*']
handler.tags = ['tools','ai']
handler.register = false
handler.limit = true

module.exports = handler

function getTodayDate() {
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1; // Perhatikan bahwa bulan dimulai dari 0, maka ditambahkan 1.
  const year = today.getFullYear();
  const dayOfWeek = today.toLocaleDateString("id-ID", { weekday: "long" }); // Mengambil nama hari dalam bahasa Inggris.

  return `Hari ini adalah ${dayOfWeek}, ${day}/${month}/${year}.`;
}

async function Lbbai(sistem, input) {
  const messages = [
    { role: "system", content: input },
    { role: "user", content: sistem },
  ];

  try {
    const response = await fetch(
      "https://deepenglish.com/wp-json/ai-chatbot/v1/chat",
      {
        method: "POST",
        headers: {
          Accept: "text/event-stream",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      },
    );

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}*/
let fetch = require("node-fetch")

let handler = async (m, { command, text, args }) => {
if (!text) return m.reply('Halo Ada yang bisa ku bantu? Untuk melanjutkan, ketik .ai dengan sertakan pertanyaan mu😊')
conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });
try {
const date = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
      }),
    );
  const hours = date.getHours();
  const name = await conn.getName(m.sender);
  const minutes = date.getMinutes();
  const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  let content = `nama kamu Adalah MobileGPT, Sebuah program robot informatif dan serba tahu yang di ciptakan oleh DitzOfc, jawab setiap pertanyaan dengan jawaban yang informatif, dan jika ada yang bertanya tentang waktu kamu jawab yang berkaitan dengan ${timeNow} dan ${getTodayDate()}`
  let res = await fetch (`https://aemt.me/prompt/gpt?prompt=${content}&text=${text}`)
  let response = await res.json()
    let whtgpt = '27767346284@s.whatsapp.net'
    conn.sendMessage(m.chat, { text: `Powered By: @${whtgpt.split("@")[0]}\n\n${response.result}`, contextInfo:{
forwardingScore: 9999999, 
isForwarded: true,
mentionedJid:[whtgpt]
}}, { quoted: m })
    } catch (e) {
    console.log(e)
    m.reply('an unexpected error occurred, report it immediately to the creator if this problem persists')
    }
  }
handler.tags = ["ai"]
handler.help = ["ai", "whatgpt"]
handler.command = /^(ai|whatgpt)$/i

module.exports = handler

function getTodayDate() {
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1; // Perhatikan bahwa bulan dimulai dari 0, maka ditambahkan 1.
  const year = today.getFullYear();
  const dayOfWeek = today.toLocaleDateString("id-ID", { weekday: "long" }); // Mengambil nama hari dalam bahasa Inggris.

  return `Hari ini adalah ${dayOfWeek}, ${day}/${month}/${year}.`;
}
