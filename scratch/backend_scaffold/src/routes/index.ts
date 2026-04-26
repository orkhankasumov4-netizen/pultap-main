import { Router } from 'express';
import { supabase } from '../db/supabase';
import { createCrudRouter } from './crud';

const router = Router();

// Test DB route
router.get('/db-test', async (req, res) => {
  res.json({ message: 'Supabase is connected!' });
});

// Dynamic CRUD Routes
router.use('/banks', createCrudRouter('banks'));
router.use('/credits', createCrudRouter('credits'));
router.use('/deposits', createCrudRouter('deposits'));
router.use('/cards', createCrudRouter('cards'));
router.use('/currencies', createCrudRouter('currencies', 'code'));
router.use('/bokts', createCrudRouter('bokts'));
router.use('/bokt_products', createCrudRouter('bokt_products'));
router.use('/institutions', createCrudRouter('institutions'));
router.use('/blog_posts', createCrudRouter('blog_posts'));

// Contact Submission
router.post('/contacts', async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ error: 'Name, phone and message are required' });
    }

    const { data, error } = await supabase
      .from('contacts')
      .insert([{ name, phone, email, message }])
      .select();

    if (error) throw error;

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
      } catch (telegramErr) {
        console.error('Failed to send telegram message:', telegramErr);
        // Do not fail the request if telegram fails
      }
    }

    res.status(201).json({ success: true, data });
  } catch (error: any) {
    console.error('Error inserting contact:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get Contacts
router.get('/contacts', async (req, res) => {
  try {
    const { data, error } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error: any) {
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

    const { data, error } = await supabase
      .from('leads')
      .insert([{ full_name, phone, fin_code, amount, credit_type }])
      .select();

    if (error) throw error;

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
      } catch (telegramErr) {
        console.error('Failed to send telegram message:', telegramErr);
        // Do not fail the request if telegram fails
      }
    }

    res.status(201).json({ success: true, data });
  } catch (error: any) {
    console.error('Error inserting lead:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get Leads
router.get('/leads', async (req, res) => {
  try {
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
