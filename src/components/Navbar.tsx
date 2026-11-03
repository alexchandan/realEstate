'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCompare } from '@/context/CompareContext';
import { useNotifications } from '@/context/NotificationContext';
import { ThemeToggle } from './ThemeToggle';
import { CurrencyUnitToggle } from './CurrencyUnitToggle';
import {
  Building2,
  Search,
  Scale,
  Calculator,
  Compass,
  LayoutDashboard,
  Bell,
  PlusCircle,
  Menu,
  X,
  UserCheck,
  ShieldCheck,
  ChevronDown,
  User,
  LogOut,
} from 'lucide-react';
import { UserRole } from '@/lib/types';

export function Navbar() {
  const pathname = usePathname();
  const { user, activeRole, setActiveRole, logout } = useAuth();
  const { compareList } = useCompare();
  const { unreadCount, openDrawer } = useNotifications();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const availableRoles: { role: UserRole; label: string; desc: string }[] = [
    { role: 'buyer', label: 'Buyer', desc: 'Search, tour, make verified offers' },
    { role: 'seller', label: 'Owner / Seller', desc: 'Direct listings, inquiries, offers' },
    { role: 'agent', label: 'Licensed Broker', desc: 'CRM pipeline, deals, client records' },
    { role: 'builder', label: 'Developer', desc: 'Projects, towers, floor inventory' },
    { role: 'moderator', label: 'Legal Due Diligence', desc: 'Verify RERA, EC, and title records' },
  ];

  const primaryNavLinks = [
    { label: 'Properties', href: '/search', icon: Search },
    { label: 'Developments', href: '/builder-projects', icon: Building2 },
    { label: 'Financial Suite', href: '/calculators', icon: Calculator },
    { label: 'Micro-Markets', href: '/neighborhoods', icon: Compass },
  ];

  const secondaryNavLinks = [
    { label: 'Advisory & CRM', href: '/agent-crm', icon: LayoutDashboard },
  ];

  const allNavLinks = [...primaryNavLinks, ...secondaryNavLinks];

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          {/* Architectural Monogram & Brand */}
          <div className="flex items-center gap-6 xl:gap-8 shrink-0 min-w-0">
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-brand-900 dark:bg-white text-white dark:text-stone-900 flex items-center justify-center font-black text-sm tracking-tight transition-transform group-hover:scale-105 shrink-0 shadow-sm">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col shrink-0">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-stone-900 dark:text-white font-display">
                    BRICKLY
                  </span>
                  <span className="text-[10px] tracking-widest uppercase font-semibold px-1.5 py-0.5 rounded border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400">
                    ESTATES
                  </span>
                </div>
                <span className="text-[10px] tracking-wider uppercase font-medium text-stone-500 dark:text-stone-400 hidden sm:block">
                  Verified Luxury Realty
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 shrink-0">
              {primaryNavLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white'
                        : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100/60 dark:hover:bg-stone-800/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {secondaryNavLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`hidden xl:block px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white'
                        : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100/60 dark:hover:bg-stone-800/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Compare Badge Link */}
            <Link
              href="/compare"
              className="relative p-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors shrink-0 min-w-[36px] min-h-[36px] flex items-center justify-center"
              title="Compare Properties"
            >
              <Scale className="w-4 h-4 shrink-0" />
              {compareList.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-brand-900 dark:bg-emerald-500 text-white dark:text-stone-950 text-[10px] font-bold flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </Link>

            {/* Currency & Unit Switcher */}
            <div className="hidden lg:block shrink-0">
              <CurrencyUnitToggle />
            </div>

            {/* Theme Toggle */}
            <ThemeToggle className="shrink-0" />

            {/* Notifications Bell */}
            <button
              onClick={openDrawer}
              type="button"
              className="relative p-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors shrink-0 min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4 shrink-0" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Role Switcher Pill */}
            <div className="relative hidden 2xl:block shrink-0">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-all hover:bg-stone-100 shrink-0 min-h-[36px] whitespace-nowrap"
              >
                <UserCheck className="w-3.5 h-3.5 shrink-0 text-stone-500" />
                <span className="capitalize">{activeRole}</span>
                <ChevronDown className="w-3 h-3 opacity-50 shrink-0" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 p-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xl z-50 animate-slide-up">
                  <div className="px-2 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    Client Persona
                  </div>
                  <div className="space-y-1 mt-1">
                    {availableRoles.map((r) => (
                      <button
                        key={r.role}
                        onClick={() => {
                          setActiveRole(r.role);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2 rounded-lg transition-colors ${
                          activeRole === r.role
                            ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900'
                            : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200'
                        }`}
                      >
                        <div className="font-bold text-xs capitalize flex items-center justify-between">
                          <span>{r.label}</span>
                          {activeRole === r.role && <ShieldCheck className="w-3.5 h-3.5" />}
                        </div>
                        <div
                          className={`text-[10px] mt-0.5 ${
                            activeRole === r.role
                              ? 'text-stone-300 dark:text-stone-600'
                              : 'text-stone-400'
                          }`}
                        >
                          {r.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Post Property CTA */}
            <Link
              href="/create-listing"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-brand-900 hover:bg-brand-800 text-white dark:bg-white dark:text-stone-900 dark:hover:bg-stone-100 text-xs font-bold transition-colors shrink-0 min-h-[36px] whitespace-nowrap shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5 shrink-0" />
              <span>List Property</span>
            </Link>

            {/* User Profile Avatar / Sign In */}
            {user ? (
              <div className="relative shrink-0 flex items-center">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="relative w-8 h-8 min-w-[32px] min-h-[32px] rounded-full overflow-hidden border border-stone-300 dark:border-stone-700 hover:ring-2 hover:ring-stone-400 transition-all shrink-0 p-0 flex items-center justify-center focus:outline-none cursor-pointer"
                  aria-label="User account menu"
                  aria-expanded={userMenuOpen}
                >
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-full h-full object-cover shrink-0 block aspect-square"
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 p-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xl z-50 animate-slide-up">
                    <div className="p-2 border-b border-stone-100 dark:border-stone-800">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-xs text-stone-900 dark:text-white truncate">
                          {user.username}
                        </p>
                        <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                          {activeRole}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-400 truncate mt-0.5">{user.email}</p>
                    </div>

                    <div className="py-1 space-y-0.5">
                      <Link
                        href="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>Profile & Verification</span>
                      </Link>
                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        <span>Seller Dashboard</span>
                      </Link>
                      <Link
                        href="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Legal Due Diligence</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-stone-100 dark:border-stone-800">
                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/signin"
                className="px-3.5 py-2 rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold hover:opacity-90 shrink-0 whitespace-nowrap min-h-[36px] flex items-center justify-center transition-opacity"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg lg:hidden text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 shrink-0 min-w-[36px] min-h-[36px] flex items-center justify-center border border-stone-200 dark:border-stone-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 shrink-0" /> : <Menu className="w-5 h-5 shrink-0" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-stone-200 dark:border-stone-800 bg-white/98 dark:bg-stone-900/98 backdrop-blur-xl px-4 py-5 animate-slide-up">
          <div className="space-y-1 mb-4">
            {allNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                <span>{link.label}</span>
              </Link>
            ))}
            <Link
              href="/create-listing"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-brand-900 dark:text-emerald-400 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Property</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
            <span className="text-xs text-stone-500 font-medium">Currency & Unit</span>
            <CurrencyUnitToggle />
          </div>
        </div>
      )}
    </header>
  );
}
