const { generateWAMessageFromContent, proto } = require("@whiskeysockets/baileys");

let handler = async (m, { conn, command, text }) => {
    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [
                            {
                                name: "review_and_pay",
                                buttonParamsJson: JSON.stringify({
                                    currency: "IDR",
                                    total_amount: { value: 1, offset: 100 },
                                    reference_id: "PAYMENT",
                                    type: "physical-goods",
                                    order: {
                                        status: "payment_requested",
                                        subtotal: { value: 0, offset: 100 },
                                        order_type: "DitzOfc",
                                        items: [
                                            {
                                                retailer_id: "custom-item-b5152f80-2dba-4bc5-aa63-35bbf30376c6",
                                                name: `${m.sender}`,
                                                amount: { value: 10000000, offset: 100 },
                                                quantity: 1
                                            }
                                        ]
                                    },
                                    additional_note: "FITUR PERCOBAAN",
                                    native_payment_methods: []
                                })
                            }
                        ]
                    })
                })
            }
        }
    }, { userJid: m.chat, quoted: m });

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
}

handler.command = /^(pay)$/i;
handler.tags = ["main"];
handler.help = ["pay"];

module.exports = handler;