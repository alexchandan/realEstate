'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Building2, Lock, Mail, User, ArrowRight } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await signup(username, email);
    setIsLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-4 bg-stone-50 dark:bg-stone-950">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-elevation-card space-y-6 text-xs animate-slide-up">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 mx-auto rounded-lg bg-brand-900 dark:bg-white text-white dark:text-stone-900 flex items-center justify-center shadow-sm">
            <Building2 className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-black text-stone-900 dark:text-white tracking-tight font-display">
            Create Your Account
          </h1>
          <p className="text-stone-500 font-normal">Join verified buyers, owners, and licensed brokers.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-semibold text-stone-700 dark:text-stone-300 mb-1 block">Full Legal Name</label>
            <div className="flex items-center gap-2 p-2.5 rounded-lg border border-stone-200 dark:border-stone-750 bg-stone-50 dark:bg-stone-850">
              <User className="w-4 h-4 text-stone-400" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. Vikram Malhotra"
                className="w-full bg-transparent border-none text-xs text-stone-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-stone-700 dark:text-stone-300 mb-1 block">Corporate or Personal Email</label>
            <div className="flex items-center gap-2 p-2.5 rounded-lg border border-stone-200 dark:border-stone-750 bg-stone-50 dark:bg-stone-850">
              <Mail className="w-4 h-4 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-transparent border-none text-xs text-stone-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-stone-700 dark:text-stone-300 mb-1 block">Password</label>
            <div className="flex items-center gap-2 p-2.5 rounded-lg border border-stone-200 dark:border-stone-750 bg-stone-50 dark:bg-stone-850">
              <Lock className="w-4 h-4 text-stone-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-none text-xs text-stone-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <span>{isLoading ? 'Registering...' : 'Complete Registration'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-stone-500 text-xs">
          Already have an account?{' '}
          <Link href="/signin" className="font-bold text-stone-900 dark:text-white hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
