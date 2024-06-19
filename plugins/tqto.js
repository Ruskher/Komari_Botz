let fs = require('fs')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
let handler = async (m, { conn, text, usedPrefix, command }) => {
let sc = `乂  *B O T - S C R I P T*\n\n`
sc += `┌  ◦  *Name* : Tenka-Ai\n`
sc += `│  ◦  *Version* : Latest\n`
sc += `│  ◦  *Size* : 1.5 MB\n`
sc += `│  ◦  *Updated* : Satu Bulan Yang Lalu\n`
sc += `└  ◦  *Url* : (No url Attached)`
let tqto = `乂  *B I G - T H A N K S T O*\n\n`
tqto += `┌  ◦  _Ilham_\n`
tqto += `│  ◦  _Fahri_\n`
tqto += `│  ◦  _DimasBotzz_\n`
tqto += `│  ◦  _Akbal_\n`
tqto += `│  ◦  *_DitzOfc_* -> ${nomorown}\n`
tqto += `└  ◦  _Lenwy_\n\n`
tqto += `Made By DitzOfc`
conn.sendMessage(m.chat, {
text: `${sc}\n\n${tqto}`,
contextInfo: {
mentionedJid: [m.sender],
externalAdReply: {
title: 'TENKA-1.0.9-VERSION',
thumbnailUrl: 'https://telegra.ph/file/58cf88ce7b3fed162f08c.jpg',
mediaType: 1,
renderLargerThumbnail: true
}}}, {quoted: m})
}
handler.help = ['tqto']
handler.tags = ['main','info']
handler.command = /^(credits|credit|thanks|thanksto|tqto)$/i
module.exports = handler