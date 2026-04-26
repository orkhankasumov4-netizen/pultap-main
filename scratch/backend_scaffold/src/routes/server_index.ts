import { Router } from 'express';
import { supabase } from '../db/supabase';
import chatRouter from './chat';

const router = Router();

router.use('/chat', chatRouter);

// ─── CBAR Currency Proxy ──────────────────────────────────────
// Proxies requests to cbar.az to avoid CORS issues from the browser.
// Frontend calls: GET /api/v1/cbar/DD.MM.YYYY.xml
router.get('/cbar/:filename', async (req, res) => {
  const { filename } = req.params;
  try {
    const cbarUrl = `https://cbar.az/currencies/${filename}`;
    const response = await fetch(cbarUrl);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'CBAR returned ' + response.status });
    }
    const xml = await response.text();
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache 1 hour
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(xml);
  } catch (err: any) {
    res.status(502).json({ error: 'Failed to fetch CBAR: ' + err.message });
  }
});

// ─── Health / DB test ────────────────────────────────────────
router.get('/db-test', async (_req, res) => {
  res.json({ message: 'Supabase is connected!' });
});

// ─── Generic CRUD helper ─────────────────────────────────────
function crudRoutes(table: string) {
  router.get(`/${table}`, async (_req, res) => {
    const { data, error } = await supabase.from(table).select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  router.get(`/${table}/:id`, async (req, res) => {
    const { data, error } = await supabase.from(table).select('*').eq('id', req.params.id).single();
    if (error) return res.status(404).json({ error: error.message });
    res.json(data);
  });

  router.post(`/${table}`, async (req, res) => {
    const { data, error } = await supabase.from(table).insert([req.body]).select();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data?.[0]);
  });

  router.put(`/${table}/:id`, async (req, res) => {
    const { data, error } = await supabase.from(table).update(req.body).eq('id', req.params.id).select();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data?.[0]);
  });

  router.delete(`/${table}/:id`, async (req, res) => {
    const { error } = await supabase.from(table).delete().eq('id', req.params.id);
    if (error) return res.status(500).json({ error: error.message });
    res.status(204).send();
  });
}

// ─── Register all financial tables ───────────────────────────
crudRoutes('banks');
crudRoutes('credits');
crudRoutes('deposits');
crudRoutes('cards');
crudRoutes('bokts');
crudRoutes('bokt_products');
crudRoutes('institutions');
crudRoutes('currencies');
crudRoutes('blog_posts');
crudRoutes('leads');
crudRoutes('contacts');

// ─── Contact Submission (with Telegram notification) ─────────
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
      } catch (e) { console.error('Telegram error:', e); }
    }

    res.status(201).json({ success: true, data });
  } catch (error: any) {
    console.error('Error inserting contact:', error);
    res.status(500).json({ error: error.message });
  }
});

// ─── Lead Submission (with Telegram notification) ────────────
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
      } catch (e) { console.error('Telegram error:', e); }
    }

    res.status(201).json({ success: true, data });
  } catch (error: any) {
    console.error('Error inserting lead:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
