const fetch = require('node-fetch')
const uploadImage = require('../function/uploadImage')

let handler = async(m, { conn, q, command, args } ) => {
const q = m.quoted ? m.quoted : m;
const mime = (q.msg || q).mimetype || q.mediaType || "";
if (!/image\/(jpe?g|png)/.test(mime)) return conn.reply(m.chat, 
			`• *Example :* reply/send image with caption *${usedPrefix + command}*`,
		m);
		m.reply('Unblured Image...')
	try {
	let image = await q.download()
	let url = await uploadImage(q)
	let apiUrl = `https://api.itsrose.rest/image/unblur?url=${url}`
	const options = {
           method: 'GET',
           headers: {
             'accept': 'application/json',
             'Authorization': global.rose,
             }
            }
    fetch(apiURL, options)
           .then(response => response.json())
           .then(data => {
              if (data.status) {
              const hasil = data.result.images
	let hasil = await response.json()
	conn.sendMessage(m.chat, { image: { url: hasil }, caption: 'Your Image Succesfuly Removed Blur☑️' }, {quoted:m})
	} else {
	m.reply(`sorry we have trouble error`)
	}
    })
    .catch(error => console.error('Error:', error));