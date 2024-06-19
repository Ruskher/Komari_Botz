let handler = async (m, {
    conn,
    command,
    text
}) => {
    conn.menubot = conn.menubot ? conn.menubot : {
        id: 1
    }
    let mennu = {
        1: 'Normal',
        2: 'Biasa',
        3: 'Normal Mini',
        4: 'Call',
        5: 'Payment',
        6: 'Gif',
        7: 'Document',
    };

    if (text) {
        let mennuIndex = parseInt(text);
        if (isNaN(mennuIndex) || !mennu[mennuIndex]) {
            reply('```Silakan pilih menu dari daftar berikut:\n\n```' + Object.entries(mennu).map(([id, theme]) => `${id}. Menu ${mennu}`).join('\n') + `\n\nMade By DitzOfc`)
            return;
        }
        conn.menubot = {
            id: mennuIndex
        };
        reply('```Menu berhasil diubah menjadi:```' + ` *${mennu[mennuIndex]}*`)
    } else {
        reply('```Silakan pilih menu dari daftar berikut:\n\n```' + Object.entries(mennu).map(([id, mennu]) => `${id}. Menu ${mennu}`).join('\n') + `\n\nDone!`)
        return;
    }
};
handler.help = ['setmenu *<type>*']
handler.tags = ['owner']
handler.command = /^(setmenu)$/i
handler.owner = true

module.exports = handler