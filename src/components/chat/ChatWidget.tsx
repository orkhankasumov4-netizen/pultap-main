import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, X, Sparkles, ChevronDown, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

type WidgetState = 'closed' | 'open' | 'minimized';

const API = import.meta.env.VITE_API_URL || 'https://pultap.duckdns.org/api/v1';

const QUICK_QUESTIONS = [
  'Ən aşağı faizli kredit?',
  'Manat depoziti harada yaxşıdır?',
  'USD/AZN kursu?',
  'İpoteka şərtləri?',
];

function usePageContext(): string {
  const { pathname } = useLocation();
  if (pathname.includes('kredit')) return 'kredit bölməsi';
  if (pathname.includes('depozit')) return 'depozit bölməsi';
  if (pathname.includes('ipoteka')) return 'ipoteka bölməsi';
  if (pathname.includes('kart')) return 'bank kartları bölməsi';
  if (pathname.includes('valyuta') || pathname.includes('konvertor')) return 'valyuta bölməsi';
  if (pathname.includes('banks')) return 'banklar bölməsi';
  return 'ana səhifə';
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-primary/60"
          style={{
            animation: 'chatDot 1.2s ease-in-out infinite',
            animationDelay: `${i * 0.2}s`
          }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg, isLast }: { msg: Message; isLast: boolean }) {
  const isUser = msg.role === 'user';
  return (
    <div
      className={cn(
        'flex gap-2.5 group',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
      style={{
        animation: 'chatFadeUp 0.25s ease-out forwards',
        opacity: 0,
      }}
    >
      {!isUser && (
        <div className="shrink-0 w-7 h-7 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-sm mt-0.5">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
      )}
      <div
        className={cn(
          'max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm',
          isUser
            ? 'bg-primary text-primary-foreground rounded-tr-sm'
            : 'bg-muted text-foreground rounded-tl-sm border border-border/50'
        )}
      >
        {msg.content || (isLast && !isUser ? <TypingDots /> : null)}
      </div>
    </div>
  );
}

export const ChatWidget = () => {
  const [widgetState, setWidgetState] = useState<WidgetState>('closed');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Salam! 👋 Mən Pultap AI-yəm — maliyyə köməkçiniz. Kredit, depozit, kart və ya valyuta haqqında suallarınıza cavab verməkdən məmnunam.',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pageContext = usePageContext();
  const isOpen = widgetState === 'open';

  useEffect(() => {
    if (isOpen) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = useCallback(async (text?: string) => {
    const msgText = (text || input).trim();
    if (!msgText || streaming) return;

    const userMsg: Message = {
      role: 'user',
      content: msgText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setStreaming(true);

    const assistantMsg: Message = {
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, assistantMsg]);

    try {
      const res = await fetch(`${API}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msgText,
          history: messages.slice(-8).map(m => ({
            role: m.role,
            content: m.content
          })),
          pageContext,
        }),
      });

      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const lines = decoder.decode(value).split('\n');
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          try {
            const parsed = JSON.parse(line.slice(6));
            if (parsed.error) {
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  ...updated[updated.length - 1],
                  content: '⚠️ ' + parsed.error,
                };
                return updated;
              });
              break;
            }
            if (parsed.token) {
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  ...updated[updated.length - 1],
                  content: updated[updated.length - 1].content + parsed.token,
                };
                return updated;
              });
            }
          } catch (e) {
            // Ignore parse errors
          }
        }
      }

      if (!isOpen) setUnread(u => u + 1);
    } catch {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content: '⚠️ Bağlantı xətası. Zəhmət olmasa yenidən cəhd edin.',
        };
        return updated;
      });
    } finally {
      setStreaming(false);
    }
  }, [input, streaming, messages, pageContext, isOpen]);

  const resetChat = () => {
    setMessages([{
      role: 'assistant',
      content: 'Söhbət sıfırlandı. Sizə necə kömək edə bilərəm?',
      timestamp: new Date(),
    }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  return (
    <>
      <style>{`
        @keyframes chatFadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes chatDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1);   opacity: 1; }
        }
        @keyframes chatPop {
          0%   { transform: scale(0.85); opacity: 0; }
          60%  { transform: scale(1.04); }
          100% { transform: scale(1);    opacity: 1; }
        }
        @keyframes chatPulse {
          0%, 100% { box-shadow: 0 0 0 0 hsl(142 71% 45% / 0.4); }
          50%       { box-shadow: 0 0 0 8px hsl(142 71% 45% / 0); }
        }
        .chat-panel-open {
          animation: chatPop 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .chat-panel-closed {
          opacity: 0;
          pointer-events: none;
          transform: scale(0.9) translateY(12px);
          transition: all 0.2s ease;
        }
        .chat-trigger-pulse {
          animation: chatPulse 2.5s ease-in-out infinite;
        }
        .chat-textarea:focus {
          outline: none;
        }
        .chat-scroll::-webkit-scrollbar { width: 4px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb {
          background: hsl(214 25% 90%);
          border-radius: 4px;
        }
      `}</style>

      {/* ── Trigger Button ─────────────────────────────── */}
      <button
        onClick={() => setWidgetState(s => s === 'open' ? 'closed' : 'open')}
        aria-label="Pultap AI Köməkçi"
        className={cn(
          'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl',
          'bg-primary text-primary-foreground',
          'flex items-center justify-center',
          'transition-all duration-200 hover:scale-105 active:scale-95',
          'shadow-lg hover:shadow-xl',
          !isOpen && 'chat-trigger-pulse'
        )}
        style={{ boxShadow: '0 4px 24px hsl(142 71% 45% / 0.35)' }}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <div className="relative">
            <Sparkles className="w-5 h-5" />
            {unread > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">
                {unread}
              </span>
            )}
          </div>
        )}
      </button>

      {/* ── Chat Panel ─────────────────────────────────── */}
      <div
        className={cn(
          'fixed z-50 flex flex-col',
          'bg-card border border-border rounded-2xl overflow-hidden',
          isOpen ? 'chat-panel-open' : 'chat-panel-closed',

          /* Mobil: tam ekran alt sheet */
          'bottom-0 right-0 left-0 max-h-[92dvh] rounded-b-none',

          /* Desktop: köşə panel */
          'sm:bottom-24 sm:right-6 sm:left-auto sm:w-[380px] sm:max-h-[600px] sm:rounded-2xl',
        )}
        style={{ boxShadow: '0 8px 48px hsl(222 47% 11% / 0.18)' }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-4 py-3.5 shrink-0"
          style={{ background: 'hsl(222 47% 15%)' }}
        >
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <Sparkles className="w-4.5 h-4.5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <p className="text-sm font-semibold text-white leading-tight">Pultap AI</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {/* eslint-disable-next-line i18next/no-literal-string */}
              <span className="text-[11px] text-white/60">Maliyyə köməkçiniz</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={resetChat}
              title="Söhbəti sıfırla"
              className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setWidgetState('closed')}
              className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors sm:hidden"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 chat-scroll min-h-0">
          {messages.map((msg, i) => (
            <MessageBubble
              key={i}
              msg={msg}
              isLast={i === messages.length - 1}
            />
          ))}
          <div ref={bottomRef} className="h-1" />
        </div>

        {/* Quick questions — yalnız ilk açılışda */}
        {messages.length === 1 && !streaming && (
          <div className="px-4 pb-3 flex flex-wrap gap-2">
            {QUICK_QUESTIONS.map(q => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className={cn(
                  'text-xs px-3 py-1.5 rounded-full border border-border',
                  'bg-muted hover:bg-primary hover:text-primary-foreground hover:border-primary',
                  'transition-all duration-150 text-muted-foreground'
                )}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="border-t border-border px-3 py-3 shrink-0 bg-card">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Sualınızı yazın..."
              disabled={streaming}
              rows={1}
              className={cn(
                'chat-textarea flex-1 resize-none rounded-xl px-4 py-2.5',
                'bg-muted border border-border text-sm text-foreground',
                'placeholder:text-muted-foreground',
                'focus:border-primary focus:ring-1 focus:ring-primary/20',
                'disabled:opacity-50 transition-colors',
                'max-h-[120px] min-h-[42px]'
              )}
              style={{ lineHeight: '1.5' }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || streaming}
              className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                'bg-primary text-primary-foreground',
                'hover:bg-primary/90 active:scale-95',
                'disabled:opacity-40 disabled:cursor-not-allowed',
                'transition-all duration-150 shadow-sm'
              )}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <p className="text-center text-[10px] text-muted-foreground mt-2">
            Pultap AI • Məlumatlar müqayisə məqsədlidir
          </p>
        </div>
      </div>

      {/* Mobil overlay — chat açıq olanda arxa fonu qaraldır */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 sm:hidden"
          onClick={() => setWidgetState('closed')}
        />
      )}
    </>
  );
};
