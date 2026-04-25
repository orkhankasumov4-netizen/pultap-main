"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supabase_1 = require("../db/supabase");
const router = (0, express_1.Router)();
// Test DB route
router.get('/db-test', async (req, res) => {
    res.json({ message: 'Supabase is connected!' });
});
// Contact Submission
router.post('/contacts', async (req, res) => {
    try {
        const { name, phone, email, message } = req.body;
        if (!name || !phone || !message) {
            return res.status(400).json({ error: 'Name, phone and message are required' });
        }
        const { data, error } = await supabase_1.supabase
            .from('contacts')
            .insert([{ name, phone, email, message }])
            .select();
        if (error)
            throw error;
        // Send Telegram Notification
        const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;
        if (telegramBotToken && chatId) {
            const text = `📬 Yeni Mesaj (Pultap.az)\n\n👤 Ad: ${name}\n📧 E-mail: ${email || '-'}\n📱 Nömrə: ${phone}\n💬 Mesaj:\n${message}`;
            try {
                await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: chatId, text }),
                });
            }
            catch (telegramErr) {
                console.error('Failed to send telegram message:', telegramErr);
                // Do not fail the request if telegram fails
            }
        }
        res.status(201).json({ success: true, data });
    }
    catch (error) {
        console.error('Error inserting contact:', error);
        res.status(500).json({ error: error.message });
    }
});
// Lead Submission (Credit Application)
router.post('/leads', async (req, res) => {
    try {
        const { full_name, phone, fin_code, amount, credit_type } = req.body;
        if (!full_name || !phone) {
            return res.status(400).json({ error: 'Full name and phone are required' });
        }
        const { data, error } = await supabase_1.supabase
            .from('leads')
            .insert([{ full_name, phone, fin_code, amount, credit_type }])
            .select();
        if (error)
            throw error;
        // Send Telegram Notification
        const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;
        if (telegramBotToken && chatId) {
            const text = `💰 Yeni Müraciət (Pultap.az)\n\n👤 Ad: ${full_name}\n📱 Nömrə: ${phone}\n💳 FİN: ${fin_code || '-'}\n💵 Məbləğ: ${amount || '-'}\n🏷️ Növ: ${credit_type || '-'}`;
            try {
                await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: chatId, text }),
                });
            }
            catch (telegramErr) {
                console.error('Failed to send telegram message:', telegramErr);
                // Do not fail the request if telegram fails
            }
        }
        res.status(201).json({ success: true, data });
    }
    catch (error) {
        console.error('Error inserting lead:', error);
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=index.js.map