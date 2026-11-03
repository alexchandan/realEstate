'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, ArrowRight, Building, Send, ShieldCheck, Compass, HelpCircle } from 'lucide-react';
import Link from 'next/link';

interface Message {
  sender: 'ai' | 'user';
  text: string;
  links?: { label: string; href: string }[];
}

export function AiAssistantModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Welcome to Brickly Private Advisory. I can provide real-time data on RERA-verified inventory, micro-market appreciation trends, legal due diligence frameworks, and mortgage amortisation schedules.',
      links: [
        { label: 'Indiranagar 3 BHK Sky Residence (₹2.45 Cr)', href: '/listing/prop-1' },
        { label: 'Compare Bangalore Luxury Estates', href: '/compare' },
        { label: 'State Stamp Duty Calculator', href: '/calculators?tab=stamp-duty' },
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

    setTimeout(() => {
      const lower = query.toLowerCase();
      let responseMsg: Message;

      if (lower.includes('emi') || lower.includes('mortgage') || lower.includes('interest')) {
        responseMsg = {
          sender: 'ai',
          text: 'For an institutional loan of ₹2.0 Crore at 8.5% interest over a 20-year tenure with 20% down payment, your estimated monthly amortisation is ₹1,73,561/mo. You can review the complete amortisation schedule and principal-interest split in our Financial Suite.',
          links: [{ label: 'Open EMI Amortisation Schedule', href: '/calculators?tab=emi' }],
        };
      } else if (lower.includes('stamp duty') || lower.includes('registration') || lower.includes('tax')) {
        responseMsg = {
          sender: 'ai',
          text: 'In Karnataka, properties exceeding ₹45 Lakhs incur a 5% baseline stamp duty plus 2% registration charges. A 10% cess and 2% surcharges apply within BBMP municipal jurisdiction (approx 5.6% net stamp duty). Joint purchases or sole female ownership qualify for statutory rebates.',
          links: [{ label: 'State-wise Stamp Duty Calculator', href: '/calculators?tab=stamp-duty' }],
        };
      } else if (lower.includes('compare') || lower.includes('versus') || lower.includes('vs')) {
        responseMsg = {
          sender: 'ai',
          text: 'Comparing The Grand Pavilion (Indiranagar, ₹2.45 Cr at ₹13,243/sqft) vs Serene Green Sanctuary (Sarjapur, ₹3.85 Cr at ₹11,323/sqft): Indiranagar offers metro transit accessibility and high livability, whereas Sarjapur provides a 3,400 sqft carpet footprint and private landscaped grounds.',
          links: [{ label: 'Open Side-by-Side Comparison', href: '/compare' }],
        };
      } else {
        responseMsg = {
          sender: 'ai',
          text: `Analyzing your inquiry: "${query}". You can review our RERA-verified luxury portfolios, inspect 360° virtual walkthroughs, or query micro-market livability scores across India's top metropolitan corridors.`,
          links: [
            { label: 'Explore Verified Property Catalog', href: '/search' },
            { label: 'Micro-Market Intelligence', href: '/neighborhoods' },
          ],
        };
      }

      setIsTyping(false);
      setMessages((prev) => [...prev, responseMsg]);
    }, 600);
  };

  return (
    <>
      {/* Refined Docked Advisory Launcher (No rainbow gradient, no fuzzy glows) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-6 z-40 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-stone-900 text-white dark:bg-white dark:text-stone-900 border border-stone-800 dark:border-stone-200 shadow-elevation-card hover:shadow-elevation-hover transition-all text-xs font-semibold"
        aria-label="Open Client Advisory"
      >
        <MessageSquare className="w-4 h-4 text-brand-400 dark:text-brand-900" />
        <span className="tracking-wide">Client Advisory</span>
      </button>

      {/* Advisory Modal */}
      {isOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 w-[94vw] sm:w-[410px] h-[560px] max-h-[85vh] z-50 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-elevation-modal flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="p-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-white border border-stone-700">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-xs tracking-wide">BRICKLY ADVISORY</h3>
                <p className="text-[10px] text-stone-400">Institutional Client Concierge</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Close Advisory"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs leading-relaxed bg-stone-50/50 dark:bg-stone-900/50">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3.5 rounded-xl max-w-[88%] ${
                    m.sender === 'user'
                      ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900'
                      : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 shadow-sm'
                  }`}
                >
                  <p>{m.text}</p>
                </div>

                {/* Grounded Action Links */}
                {m.links && m.links.length > 0 && (
                  <div className="mt-2 space-y-1.5 w-full max-w-[88%]">
                    {m.links.map((link, lIdx) => (
                      <Link
                        key={lIdx}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between p-2 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-semibold hover:border-stone-400 transition-colors text-[11px]"
                      >
                        <span className="truncate">{link.label}</span>
                        <ArrowRight className="w-3 h-3 shrink-0 text-stone-500" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-xl bg-white dark:bg-stone-800 w-16 border border-stone-200 dark:border-stone-700 text-stone-400">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce delay-200" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Guidance Prompts */}
          <div className="p-2 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex gap-1.5 overflow-x-auto text-[11px]">
            <button
              onClick={() => handleSend('Show me 3 BHK in Indiranagar')}
              className="px-2.5 py-1 rounded border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 whitespace-nowrap hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              3 BHK Indiranagar
            </button>
            <button
              onClick={() => handleSend('What is the EMI on a 2 Cr loan?')}
              className="px-2.5 py-1 rounded border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 whitespace-nowrap hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              EMI on ₹2 Cr
            </button>
            <button
              onClick={() => handleSend('Stamp duty rules in Karnataka')}
              className="px-2.5 py-1 rounded border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 whitespace-nowrap hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              Stamp Duty
            </button>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2 bg-white dark:bg-stone-900"
          >
            <input
              type="text"
              placeholder="Inquire regarding properties, valuations, stamp duty..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-stone-100 dark:bg-stone-800 border-none rounded-lg px-3 py-2 text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-900 disabled:opacity-40 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
