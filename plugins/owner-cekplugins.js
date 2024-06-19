let handler = async (m, { args, usedPrefix, text, command }) => {
    let ar = Object.keys(plugins);
    let ar1 = ar.map(v => v.replace('.js', ''));
    let spas = "                ";
    let sections = [];
    
    ar1.forEach((v, index) => {
        sections.push({
            title: `${spas}[ RESULT ${index + 1} ]`,
            rows: [
                {
                    title: v.toUpperCase(),
                    description: "To Check",
                    id: `/plugins ${v}`
                }
            ]
        });
    });

    if (!text) {
        return conn.sendListMsg(m.chat, "*[ CHECK PLUGINS ]*", "⚡ Silakan pilih PLUGINS yang ingin di cek...", "☂️ SELECT ☂️", sections, m);
    }

    try {
        let pluginStats = global.db.data.stats[text + '.js'];
        if (!pluginStats) {
            return conn.reply(m.chat, `❌ Plugin *${text}* belum pernah digunakan.`, m);
        }

        let { total, success, last, lastSuccess } = pluginStats;
        conn.reply(m.chat, `
📑 *Plugins:* ${text}
*💬 Total :* ${total}
*✔️ Success :* ${success}
${readMore}
*🕔 Last time used:* ${new Date(last)}
*🕔 Last time it worked:* ${new Date(lastSuccess)}
        `, m);
    } catch (e) {
        throw new Error(e);
    }
}

handler.help = ['plugins'].map(v => v + ' *<teks>*');
handler.tags = ['owner'];
handler.command = /^plugins$/i;
module.exports = handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);
