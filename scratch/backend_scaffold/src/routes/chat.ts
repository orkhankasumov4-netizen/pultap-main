import { Router } from 'express';
import { supabase } from '../db/supabase';

const router = Router();

// Cache context to avoid DB querying on every message
let cachedContext: string | null = null;
let lastCacheTime = 0;
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

async function buildFinanceContext() {
  if (cachedContext && Date.now() - lastCacheTime < CACHE_TTL) {
    return cachedContext;
  }

  try {
    const [institutionsRes, creditsRes, depositsRes, cardsRes] = await Promise.all([
      supabase.from('institutions').select('*'),
      supabase.from('credits').select('*, institution:institutions(name)'),
      supabase.from('deposits').select('*, institution:institutions(name)'),
      supabase.from('cards').select('*, institution:institutions(name)'),
    ]);

    let contextText = "Pultap.az Məlumat Bazası:\n\n";

    if (institutionsRes.data?.length) {
      contextText += "Təşkilatlar:\n";
      institutionsRes.data.forEach(inst => {
        contextText += `- ${inst.name} (${inst.type}). Reytinq: ${inst.rating}\n`;
      });
      contextText += "\n";
    }

    if (creditsRes.data?.length) {
      contextText += "Kreditlər:\n";
      creditsRes.data.forEach(c => {
        const bankName = Array.isArray(c.institution) ? c.institution[0]?.name : (c.institution as any)?.name;
        contextText += `- ${c.name} (${bankName || c.bank_id}): Növ: ${c.type}, Faiz: ${c.rate}%, Məbləğ: ${c.amount_min}-${c.amount_max} AZN, Müddət: ${c.term_min}-${c.term_max} ay\n`;
      });
      contextText += "\n";
    }

    if (depositsRes.data?.length) {
      contextText += "Depozitlər:\n";
      depositsRes.data.forEach(d => {
        const bankName = Array.isArray(d.institution) ? d.institution[0]?.name : (d.institution as any)?.name;
        contextText += `- ${d.name} (${bankName || d.bank_id}): Faiz: ${d.rate}%, Valyuta: ${d.currency}, Min: ${d.min_amount}, Müddət: ${d.term_months} ay\n`;
      });
      contextText += "\n";
    }

    if (cardsRes.data?.length) {
      contextText += "Kartlar:\n";
      cardsRes.data.forEach(c => {
        const bankName = Array.isArray(c.institution) ? c.institution[0]?.name : (c.institution as any)?.name;
        contextText += `- ${c.name} (${bankName || c.bank_id}): Növ: ${c.kind}, Cashback: ${c.cashback}%, İllik: ${c.annual_fee} AZN\n`;
      });
      contextText += "\n";
    }

    cachedContext = contextText;
    lastCacheTime = Date.now();
    return contextText;

  } catch (error) {
    console.error("Error fetching context:", error);
    return "Məlumat bazasına qoşularkən xəta baş verdi.";
  }
}

router.post('/', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  try {
    const { message, history = [], pageContext = "" } = req.body;
    
    if (!message) {
      res.write(`data: {"error": "Message is required"}\n\n`);
      return res.end();
    }

    const financeContext = await buildFinanceContext();

    const systemPrompt = `Sən Pultap.az-ın AI maliyyə köməkçisisən, adın "Pultap AI"dır.
İstifadəçilərə bank, kredit, depozit və kart seçimlərində kömək edirsən.
Yalnız aşağıdakı bazadakı məlumatlar əsasında cavab ver. 
Əgər sualın cavabı bazada yoxdursa, bunu nəzakətlə bildir.
Azərbaycan dilində cavabla (istifadəçi rus və ya ingilis yazarsa, o dildə cavabla).
Sənə lazımsız qısa cavablar yox, ətraflı və faydalı cavablar ver.

${financeContext}

Əlavə Kontekst (İstifadəçinin hazırda baxdığı səhifə):
${pageContext}
`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: message }
    ];

    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.1:8b',
        messages: messages,
        stream: true,
        options: {
          temperature: 0.3,
          num_predict: 500
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      res.write(`data: {"error": "Ollama API xətası: ${response.status}"}\n\n`);
      return res.end();
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder('utf-8');

    if (!reader) {
      res.write(`data: {"error": "Failed to read stream"}\n\n`);
      return res.end();
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(l => l.trim() !== '');

      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          if (parsed.message?.content) {
            res.write(`data: ${JSON.stringify({ token: parsed.message.content })}\n\n`);
          }
        } catch (e) {
          // Ignore parse errors on partial chunks
        }
      }
    }

    res.write(`data: {"done": true}\n\n`);
    res.end();

  } catch (error: any) {
    console.error("Chat route error:", error);
    res.write(`data: {"error": "Daxili server xətası baş verdi."}\n\n`);
    res.end();
  }
});

export default router;
