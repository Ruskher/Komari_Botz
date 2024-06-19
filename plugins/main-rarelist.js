let fetch = require('node-fetch')
let handler = async (m, {
    conn,
    command,
    isOwner
}) => {
let sections = [{
		title: 'RARE Features And 100% Working', 
		highlight_label: 'Features',
		rows: [{
	    title: 'Character Ai',
    	description: `Automatic Character Ai( Chat Ai )`, 
    	id: '.cai'
    	},
    	{
		title: 'Bing Image', 
		description: "Bing Image ( Created Realistic Image )", 
		id: '.bingimg'
		},
		{
		title: 'Jadi Anime',
		description: 'Convert Photo To Anime Using AI ( AI Image )',
		id: '.jadianime'
		},
		{
		title: 'Jadi Zombie',
		description: 'Convert Your Photo To Zombie Using AI ( AI Image )',
		id: '.jadizombie'
		},
		{
		title: 'Gemini Ai', 
		description: "Chat Ai Gemini Google ( Chat Ai )", 
		id: '.gemini'
		},
		{
		title: 'Alicia Ai', 
		description: "Chat Ai with Alicia ( Chat Ai )", 
		id: '.alicia'
		},
		{
		title: 'Animediff',
		description: 'Create Image Anime ( Diffusion )',
		id: '.animediff'
		},
		{
		title: 'Animediff-XL',
		description: 'Make anime images more real ( Diffusion )',
		id: '.animediff-xl'
		},
		{
		title: 'Emi Anime Image',
		description: 'Created Image Anime Using Emi AI ( Ai )',
		id: '.emi'
		},
		{
		title: 'Gemini Image Ai', 
		description: "Asking What Image From Gemini ( Chat Ai )", 
		id: '.geminiimg'
		},
		{
		title: 'Dall-E 3', 
		description: "Create image use prompt ( Image Ai )", 
		id: '.dalle3'
	    }, 
    	{
	    title: 'Download Feature',
    	description: `Displays menu Download ( List Menu )`, 
    	id: '.menu downloader'
    	},
		{
		title: 'Meta Chat', 
		description: "Displays Meta Ai ( Meta-Chat )", 
		id: '.ai'
	    }]
     }]

await conn.sendListMsg(m.chat, 'Hello, Silahkan Pilih melalui List menu di bawah ini :)', 'Powered By Dev. Expertise', 'Click Here!', sections, m)
}
handler.customPrefix = /^(listfeatures)$/i
handler.command = new RegExp

module.exports = handler