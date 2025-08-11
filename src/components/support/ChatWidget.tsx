'use client';

import { useState, useRef, useEffect } from 'react';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hi! I\'m SecureBot. Ask me about transfers, cards, or loans.' },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  function reply(q: string): string {
    const lq = q.toLowerCase();
    if (lq.includes('transfer')) return 'You can make transfers from the Transfers page: Internal, Within Bank, or International.';
    if (lq.includes('card')) return 'Manage your cards on the Cards page: request a new card, block/unblock, or set limits.';
    if (lq.includes('loan')) return 'You can apply for loans in the Loans page with flexible terms.';
    if (lq.includes('help')) return 'Visit the Help Center for FAQs or open a dispute from Support > Disputes.';
    return 'I\'m here to help! Please specify transfers, cards, loans, or support.';
  }

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user' as const, text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    const botMsg = { role: 'bot' as const, text: reply(input.trim()) };
    setTimeout(() => setMessages((m) => [...m, botMsg]), 300);
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="w-80 h-96 bg-white border border-gray-200 rounded-lg shadow-xl flex flex-col overflow-hidden">
          <div className="bg-blue-600 text-white px-4 py-2 flex items-center justify-between">
            <span className="font-semibold">SecureBot</span>
            <button className="text-white/80 hover:text-white" onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <span className={`inline-block px-3 py-2 rounded-lg text-sm ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                  {m.text}
                </span>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="p-3 border-t border-gray-200 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Type a message"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
            <button onClick={send} className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 py-1.5 text-sm">Send</button>
          </div>
        </div>
      )}

      {!open && (
        <button onClick={() => setOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 w-12 shadow-lg flex items-center justify-center">
          💬
        </button>
      )}
    </div>
  );
}

