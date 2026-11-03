'use client';

import React, { useState } from 'react';
import { ChatMessage } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { Send, CheckCheck } from 'lucide-react';
import Link from 'next/link';

export default function ChatPage() {
  const { user } = useAuth();

  const [activeConversation, setActiveConversation] = useState('conv-1');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [conversations] = useState([
    {
      id: 'conv-1',
      participantName: 'Vikram Malhotra',
      role: 'RERA Certified Broker',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      property: 'The Grand Pavilion - 3 BHK',
      lastMessage: 'All title deeds are 100% verified and RERA audited.',
      time: '11:15 AM',
      unread: 0,
    },
    {
      id: 'conv-2',
      participantName: 'Ananya Deshmukh',
      role: 'Luxury Villa Specialist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      property: 'Serene Green Sanctuary Villa',
      lastMessage: 'Would you like to review the soil testing report?',
      time: 'Yesterday',
      unread: 1,
    },
  ]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      conversationId: 'conv-1',
      senderId: 'agent-1',
      senderName: 'Vikram Malhotra',
      recipientId: 'user-default',
      text: 'Hello! Thank you for inquiring about The Grand Pavilion. The title deed is 100% clear and RERA registered.',
      timestamp: '11:00 AM',
      read: true,
      propertyPreview: {
        id: 'prop-1',
        title: 'The Grand Pavilion - Ultra Luxury 3 BHK',
        price: 24500000,
        currency: 'INR',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80',
      },
    },
    {
      id: 'm-2',
      conversationId: 'conv-1',
      senderId: 'user-default',
      senderName: user?.username || 'You',
      recipientId: 'agent-1',
      text: 'Great! Can we schedule a site visit this Saturday morning to verify the east facing view?',
      timestamp: '11:15 AM',
      read: true,
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: activeConversation,
      senderId: 'user-default',
      senderName: user?.username || 'You',
      recipientId: 'agent-1',
      text: inputText,
      timestamp: 'Just now',
      read: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const replyMsg: ChatMessage = {
        id: `reply-${Date.now()}`,
        conversationId: activeConversation,
        senderId: 'agent-1',
        senderName: 'Vikram Malhotra',
        recipientId: 'user-default',
        text: 'Confirmed! Saturday 11:00 AM works perfectly. I will have the master key and clubhouse access card ready for you.',
        timestamp: 'Just now',
        read: true,
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-[680px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Left: Conversation Roster */}
          <div className="md:col-span-4 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="font-extrabold text-base text-slate-900 dark:text-white">Messages & Inquiries</h2>
              <p className="text-xs text-slate-400">Buyer & Agent Conversations</p>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
              {conversations.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setActiveConversation(c.id)}
                  className={`p-4 flex gap-3 cursor-pointer transition-colors ${
                    activeConversation === c.id
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/30'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <img src={c.avatar} alt={c.participantName} className="w-11 h-11 rounded-2xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0 text-xs">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-slate-900 dark:text-white truncate">{c.participantName}</span>
                      <span className="text-[10px] text-slate-400">{c.time}</span>
                    </div>
                    <p className="text-[11px] text-emerald-600 font-semibold truncate">{c.property}</p>
                    <p className="text-slate-400 truncate mt-0.5">{c.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Active Chat View */}
          <div className="md:col-span-8 flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="Vikram Malhotra"
                  className="w-10 h-10 rounded-2xl object-cover"
                />
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Vikram Malhotra</h3>
                  <p className="text-[11px] text-emerald-600">Online • Typically replies in 10 mins</p>
                </div>
              </div>

              <Link
                href="/listing/prop-1"
                className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
              >
                <span>View Property</span>
                <span>→</span>
              </Link>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.senderId === 'user-default' ? 'items-end' : 'items-start'}`}
                >
                  {m.propertyPreview && (
                    <div className="mb-2 p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 max-w-xs flex gap-2.5 items-center">
                      <img src={m.propertyPreview.image} alt={m.propertyPreview.title} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="min-w-0 text-xs">
                        <span className="font-bold text-slate-900 dark:text-white truncate block">{m.propertyPreview.title}</span>
                        <span className="text-emerald-600 font-bold">₹2.45 Cr</span>
                      </div>
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-2xl max-w-[80%] ${
                      m.senderId === 'user-default'
                        ? 'bg-emerald-600 text-white rounded-br-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-sm'
                    }`}
                  >
                    <p>{m.text}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400">
                    <span>{m.timestamp}</span>
                    {m.senderId === 'user-default' && <CheckCheck className="w-3 h-3 text-emerald-600" />}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 w-16 text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce delay-100" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce delay-200" />
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-3 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
