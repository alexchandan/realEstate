'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, Send, X, ArrowRight, Building, Calculator, Compass, Scale } from 'lucide-react';
import Link from 'next/link';

interface Message {
  sender: 'ai' | 'user';
  text: string;
  links?: { label: string; href: string; icon?: 'property' | 'calc' | 'compare' }[];
}

export function AiAssistantModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Hello! I am Brickly AI, your real estate intelligence copilot. Ask me to discover homes, compare properties, calculate mortgage EMIs, or analyze neighborhood trends.',
      links: [
        { label: '3 BHK in Indiranagar under ₹2.5 Cr', href: '/listing/prop-1', icon: 'property' },
        { label: 'Compare Bangalore Luxury Villas', href: '/compare', icon: 'compare' },
        { label: 'Affordability Calculator', href: '/calculators?tab=affordability', icon: 'calc' },
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // AI grounded knowledge response generator
    setTimeout(() => {
      const lower = query.toLowerCase();
      let responseMsg: Message;

      if (lower.includes('emi') || lower.includes('mortgage') || lower.includes('interest')) {
        responseMsg = {
          sender: 'ai',
          text: 'For a property priced at ₹2.5 Crore with a standard 20% down payment (₹50 Lakhs) and loan of ₹2.0 Crore at 8.5% interest for 20 years, your estimated monthly EMI is approximately ₹1,73,561. You can inspect the complete year-by-year amortisation schedule using our interactive Financial Suite.',
          links: [{ label: 'Open EMI & Amortisation Calculator', href: '/calculators?tab=emi', icon: 'calc' }],
        };
      } else if (lower.includes('stamp duty') || lower.includes('registration') || lower.includes('karnataka') || lower.includes('tax')) {
        responseMsg = {
          sender: 'ai',
          text: 'In Karnataka, for properties above ₹45 Lakhs, the stamp duty is 5% plus 2% registration charges. A 10% cess and 2% surcharges apply in municipal corporation limits (approx 5.6% net stamp duty). Female buyers or joint purchases can avail special government concessions.',
          links: [{ label: 'Calculate State Stamp Duty', href: '/calculators?tab=stamp-duty', icon: 'calc' }],
        };
      } else if (lower.includes('compare') || lower.includes('versus') || lower.includes('vs')) {
        responseMsg = {
          sender: 'ai',
          text: 'Between The Grand Pavilion (3 BHK Indiranagar, ₹2.45 Cr, ₹13,243/sqft) and Serene Green Sanctuary (4 BHK Sarjapur Villa, ₹3.85 Cr, ₹11,323/sqft): Indiranagar offers high transit livability and metro access, while Sarjapur provides 3,400 sqft carpet area and private plunge pool.',
          links: [{ label: 'View Side-by-Side Comparison Matrix', href: '/compare', icon: 'compare' }],
        };
      } else if (lower.includes('bangalore') || lower.includes('3 bhk') || lower.includes('whitefield') || lower.includes('rent')) {
        responseMsg = {
          sender: 'ai',
          text: 'I found 3 verified matches in Bangalore matching your preferences: The Grand Pavilion (Indiranagar 3 BHK Sky Residence), Serene Green Sanctuary (Sarjapur 4 BHK Villa), and Skyline Heights (Whitefield 2 BHK for rent next to ITPL). All have verified RERA certifications.',
          links: [
            { label: 'The Grand Pavilion (₹2.45 Cr)', href: '/listing/prop-1', icon: 'property' },
            { label: 'Skyline Heights (₹45,000/mo)', href: '/listing/prop-3', icon: 'property' },
          ],
        };
      } else {
        responseMsg = {
          sender: 'ai',
          text: `I analyzed your request: "${query}". You can explore all our RERA-verified listings, apply 15+ advanced filters, or view our interactive map with school, transit, and hospital layers.`,
          links: [
            { label: 'Explore Interactive Map Search', href: '/search', icon: 'property' },
            { label: 'Explore Neighborhood Hotspots', href: '/neighborhoods', icon: 'calc' },
          ],
        };
      }

      setIsTyping(false);
      setMessages((prev) => [...prev, responseMsg]);
    }, 800);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white font-bold shadow-glow hover:scale-105 hover:shadow-2xl transition-all duration-300"
        aria-label="Open AI Assistant"
      >
        <Sparkles className="w-5 h-5 animate-pulse" />
        <span className="text-xs tracking-wide">Ask Alex AI</span>
      </button>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 w-[94vw] sm:w-[420px] h-[580px] max-h-[85vh] z-50 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm flex items-center gap-1.5">
                  <span>Alex AI Assistant</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 font-semibold">
                    Grounded
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">Real Estate Intelligence</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs leading-relaxed">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] ${
                    m.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-sm border border-slate-200/50 dark:border-slate-700/50'
                  }`}
                >
                  <p>{m.text}</p>
                </div>

                {/* Grounded Action Links */}
                {m.links && m.links.length > 0 && (
                  <div className="mt-2 space-y-1 w-full max-w-[85%]">
                    {m.links.map((link, lIdx) => (
                      <Link
                        key={lIdx}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 font-medium hover:bg-emerald-100 transition-colors"
                      >
                        <span className="truncate">{link.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 w-20 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce delay-200" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions pills */}
          <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex gap-1.5 overflow-x-auto text-[11px]">
            <button
              onClick={() => handleSend('Show me 3 BHK in Indiranagar')}
              className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 whitespace-nowrap hover:border-emerald-500"
            >
              🏡 3 BHK Indiranagar
            </button>
            <button
              onClick={() => handleSend('What is the EMI on a 2 Cr loan?')}
              className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 whitespace-nowrap hover:border-emerald-500"
            >
              💰 EMI on ₹2 Cr loan
            </button>
            <button
              onClick={() => handleSend('Stamp duty rules in Karnataka')}
              className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 whitespace-nowrap hover:border-emerald-500"
            >
              📜 Stamp Duty
            </button>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 bg-white dark:bg-slate-900"
          >
            <input
              type="text"
              placeholder="Ask about properties, EMIs, localities..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
