let handler = async (m, { conn }) => {
conn.sendMessage(m.chat, { text: 'Menyiapkan Request Mu, Sabar :v' }, { quoted: m })
  const { proto, generateWAMessageFromContent, prepareWAMessageMedia } = require("@whiskeysockets/baileys") 
	
	const msg = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
    message: {
      messageContextInfo: {
        deviceListMetadata: {},
        deviceListMetadataVersion: 2
      },
      interactiveMessage: proto.Message.InteractiveMessage.fromObject({
      contextInfo: {
        	mentionedJid: [m.sender], 
        	isForwarded: true, 
	        forwardedNewsletterMessageInfo: {
			newsletterJid: '120363279875321922@newsletter',
			newsletterName: 'CLICK BUTTON HERE✅', 
			serverMessageId: -1
		},
	        forwardingScore: 256,
            externalAdReply: {  
                title: 'NTHNG', 
                thumbnailUrl: 'https://telegra.ph/file/a6f3ef42e42efcf542950.jpg', 
                sourceUrl: 'https://youtube.com/shorts/eHM3CMiAQ9Y?si=sqJQ1gyRAnptIK0m',
                mediaType: 2,
                renderLargerThumbnail: false
            }
          }, 
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `*Halo Kak @${m.sender.replace(/@.+/g, '')}!*\nSilahkan Pilih List Harga Di Bawah Yahh!!`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: 'Powered By _*Dev. Expertise*_'
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          hasMediaAttachment: false
        }),
        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
          cards: [
            {
              body: proto.Message.InteractiveMessage.Body.fromObject({
                text: '> *7 Days : 5.000*\n> *30 Days : 15.000*\n\n`</> Benefit Prem </>`\n\n> Get Unlimited Limit\n> Get Acces All Fitur\n> Get Rank "Sepuh"'
              }),
              footer: proto.Message.InteractiveMessage.Footer.fromObject({
              }),
              header: proto.Message.InteractiveMessage.Header.fromObject({
                title: '`</> Premium Bot </>`\n',
                hasMediaAttachment: true,...(await prepareWAMessageMedia({ image: { url: 'https://telegra.ph/file/b0b4131c63ad2f3f34bd9.jpg' } }, { upload: conn.waUploadToServer }))
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons: [
                  {
                    name: "cta_url",
                    buttonParamsJson: `{"display_text":"Order Here!","url":"https://wa.me/6285717062467?text=Hai+kak+adit+mau+premium+bot+dong","merchant_url":"https://wa.me/6285717062467?text=Hai+kak+adit+mau+premium+bot+dong"}`
                  }
                  ]
              })
            },
            {
              body: proto.Message.InteractiveMessage.Body.fromObject({
                text: '> *Script Base : 25.000*\n> *Script Full : 65.000*\n\n`</> Benefit </>`\n\n> Button Message\n> No Enc\n> Fast Respon"'
              }),
              footer: proto.Message.InteractiveMessage.Footer.fromObject({
              }),
              header: proto.Message.InteractiveMessage.Header.fromObject({
                title: '`</> Script Bot </>`\n',
                hasMediaAttachment: true,...(await prepareWAMessageMedia({ image: { url: 'https://telegra.ph/file/cf2a3193b838f79fdb94a.jpg' } }, { upload: conn.waUploadToServer }))
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons: [
                  {
                    name: "cta_url",
                    buttonParamsJson: `{"display_text":"Order Here!","url":"https://wa.me/6285717062467?text=Hai+kak+adit+mau+beli+script+nya+dong","merchant_url":"https://wa.me/6285717062467?text=Hai+kak+adit+mau+beli+script+nya+dong"}`
                  }
                  ]
              })
            },
            {
              body: proto.Message.InteractiveMessage.Body.fromObject({
                text: '> *7 Days : 10.000*\n> *30 Days : 30.000*\n\n`</> Benefit Sewa </>`\n\n> Auto Welcome\n> Auto Kick\n> Auto Open/Close'
              }),
              footer: proto.Message.InteractiveMessage.Footer.fromObject({
              }),
              header: proto.Message.InteractiveMessage.Header.fromObject({
                title: '`</> Sewa Bot </>`\n',
                hasMediaAttachment: true,...(await prepareWAMessageMedia({ image: { url: 'https://telegra.ph/file/c6d22a0591e716465d1c3.jpg' } }, { upload: conn.waUploadToServer }))
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons: [
                  {
                    name: "cta_url",
                    buttonParamsJson: `{"display_text":"Order Here!","url":"https://wa.me/6285717062467?text=Hai+kak+adit+mau+sewa+bot+dong","merchant_url":"https://wa.me/6285717062467?text=Hai+kak+adit+mau+sewa+bot+dong"}`
                  }
                  ]
              })
            }
          ]
        })
      })
    }
  }
}, { userJid: m.chat, quoted: m })
conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })
}
handler.help = ['shop', 'premium']
handler.tags = ['main']
handler.command = /^(shop|sewabot|premium|sew)$/i
handler.private = false

module.exports = handler