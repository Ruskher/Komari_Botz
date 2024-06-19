//Fake Reply, kalau mau pake tambahin return reply
let NeoApi = require("@neoxr/wb");
let b = new NeoApi();
const { generateWAMessageFromContent, proto } = require("@whiskeysockets/baileys")
let handler = m => m;
handler.all = async function (m) {
let pplu = 'https://telegra.ph/file/4a4d7546fd33df787188d.jpg'
const ditz = {
            key: {
                participant: `0@s.whatsapp.net`,
                ...(m.chat ? {
                    remoteJid: `status@broadcast`
                } : {})
            },
            message: {
                "contactMessage": {
                    'displayName': `KOMARI_BOTZ`,
                    'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ditzGans,;;;\nFN: (≡^∇^≡) Komari_Botz\nitem1.TEL;waid=${m.sender.split("@")[0]}:+${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
                    'jpegThumbnail': pplu,
                    thumbnail: pplu,
                    sendEphemeral: true
                }   
            }
        }
global.reply = (teks) => {
let sections = [{
  title: 'Halo kak, Ngapain disini?',
  rows: [{
    title: 'Information Owner',
    id: 'owner'
  }]
}]
let listMessage = {
  title: '',
  sections
}
let msg = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
        contextInfo: {
        	mentionedJid: [], 
        	isForwarded: true, 
	        forwardedNewsletterMessageInfo: {
			newsletterJid: '120363279875321922@newsletter',
			newsletterName: 'Made By DitzOfc', 
			serverMessageId: -1
			}
		},
          body: proto.Message.InteractiveMessage.Body.create({
            text: ''
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: 'Powered By _*Dev. Expertise*_'
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: teks,
            hasMediaAttachment: false
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [              
              {
                "name": "single_select",
                "buttonParamsJson": JSON.stringify(listMessage) 
              }
             ]
          })
        })
    }
  }
}, { userJid: m.chat, quoted: ditz })

conn.relayMessage(msg.key.remoteJid, msg.message, {
  messageId: msg.key.id
})
}
global.Func = b.Function;
global.betul = 'https://telegra.ph/file/fa190f428461465d70837.png'
global.salah = 'https://telegra.ph/file/ff4e3037f2df79041daff.png'
}

module.exports = handler;