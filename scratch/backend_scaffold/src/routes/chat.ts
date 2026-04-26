import { Router } from 'express';
import { supabase } from '../db/supabase';

const router = Router();

const MODEL = process.env.OLLAMA_MODEL || 'aya-expanse:8b';

function buildSystemPrompt(financeContext: string, pageContext: string): string {
  return `Sən Pultap.az-ın rəsmi AI maliyyə köməkçisisən. Adın "Pultap AI"dır.

## SƏNİN KİMLİYİN
Sən Azərbaycanın aparıcı maliyyə müqayisə platforması olan Pultap.az-ın köməkçisisən.
İstifadəçilərə kredit, depozit, bank kartı, ipoteka və valyuta məsələlərində kömək edirsən.
Mehriban, peşəkar və konkret danışırsan. Lazımsız söz işlətmirsən.

## DİL QAYDASI
- Həmişə Azərbaycan ədəbi dilində yazırsan
- İstifadəçi rus dilində yazarsa → rus dilində cavabla
- İstifadəçi ingilis dilində yazarsa → ingilis dilində cavabla
- Azərbaycanca yazarkən düzgün qrammatika işlət: "edirəm", "var", "lazımdır"
- "Siz", "sizə", "sizin" — rəsmi müraciət forması istifadə et
- Rəqəmləri yazarkən: "12 faiz", "1700 manat", "6 ay" kimi yaz

## PULTAP.AZ MƏHSUL VERİLƏNLƏR BAZASI
${financeContext}
${pageContext ? `\nİstifadəçi hazırda saytın "${pageContext}" bölməsindədir.` : ''}

## CAVAB FORMATI QAYDАЛАРИ
1. Qısa ol — maksimum 4-5 cümlə
2. Rəqəm varsa, həmişə konkret göstər: "12 faiz illik", "500-50000 manat aralığında"
3. Müqayisə soruşulursa — sadə sıra ilə yaz (cədvəl yox)
4. Cavabın sonunda 1 əlaqəli sual ver ki, istifadəçi daha dərin məlumat alsın
5. Heç vaxt "Mən dil modeliyəm" və ya "Mənim məhdudiyyətlərim var" demə

## NƏ ETMƏMƏLI
- Bazada olmayan məlumat uydurma
- "Bilmirəm" demək əvəzinə: "Bu məlumat bazamızda yoxdur, birbaşa bankla əlaqə saxlamağı tövsiyə edirəm"
- Hüquqi və ya tibbi məsləhət vermə
- Saytın texniki problemlərindən, kodundan danışma
- Özünü ChatGPT, Gemini və ya başqa AI kimi təqdim etmə

## FEW-SHOT NÜMUNƏLƏR

İstifadəçi: "Ən ucuz kredit hansıdır?"
Pultap AI: "Ən aşağı faizli kreditlər hazırda Kapital Bank (12 faiz), ABB Bank (13 faiz) və PAŞA Bank (13.5 faiz) tərəfindən təklif olunur. Məbləğ və müddət tələbləri fərqlənir. Nə qədər məbləğə və neçə aylığa kredit götürmək istəyirsiniz?"

İstifadəçi: "Manat depoziti qoymaq istəyirəm"
Pultap AI: "Manat depozitlərində ən yüksək faizi hazırda Rabitəbank (16 faiz), Bank Respublika (15 faiz) və Xalq Bank (14.5 faiz) təklif edir. Depoziti neçə müddətə qoymaq düşünürsünüz — 3 ay, 6 ay, yoxsa 1 il?"

İstifadəçi: "USD/AZN kursu nədir?"
Pultap AI: "CBAR-ın bu günkü rəsmi məzənnəsinə görə 1 ABŞ dolları 1.70 manatdır. Valyuta mübadiləsi üçün bankların alış-satış qiymətləri bir qədər fərqlənir. Valyuta konvertorumuza baxmaq istəyirsiniz?"

İstifadəçi: "Kredit üçün nə lazımdır?"
Pultap AI: "Əksər banklar kredit üçün şəxsiyyət vəsiqəsi, iş yeri arayışı və DSMF çıxarışı tələb edir. Bəzi banklar əlavə olaraq zaminlik və ya girov istəyə bilər. Hansı bank haqqında daha ətraflı məlumat almaq istəyirsiniz?"

İstifadəçi: "ipoteka necə işləyir?"
Pultap AI: "İpoteka uzunmüddətli daşınmaz əmlak kreditidir. Azərbaycanda iki əsas növü var: Dövlət ipotekası (Azəripoteka, 8 faiz illik) və kommersiya bankı ipotekası (12-18 faiz illik). Dövlət ipotekası daha ucuzdur, lakin tələbləri daha sərtdir. Hansı ipoteka növü sizi maraqlandırır?"`;
}

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

    const systemPrompt = buildSystemPrompt(financeContext, pageContext);

    const messages = [
      { role: "system", content: systemPrompt },
      ...history.map((m: {role: string, content: string}) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content
      })),
      { role: "user", content: message }
    ];

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      res.write(`data: {"error": "Groq API Key is not configured."}\n\n`);
      return res.end();
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
        messages: messages,
        stream: true,
        temperature: 0.2,
        top_p: 0.85,
        max_tokens: 400,
        stop: ["İstifadəçi:", "User:", "Human:", "\n\nİstifadəçi"]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      res.write(`data: {"error": "Groq API xətası: ${response.status}"}\n\n`);
      return res.end();
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder('utf-8');

    if (!reader) {
      res.write(`data: {"error": "Failed to read stream"}\n\n`);
      return res.end();
    }

    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.trim() === '') continue;
        if (line.startsWith('data: ')) {
          const dataStr = line.slice(6).trim();
          if (dataStr === '[DONE]') continue;
          
          try {
            const parsed = JSON.parse(dataStr);
            const token = parsed.choices?.[0]?.delta?.content;
            if (token) {
              res.write(`data: ${JSON.stringify({ token })}\n\n`);
            }
          } catch (e) {
            // Ignore parse errors on partial chunks
          }
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
