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
  Sparkles,
  ChevronDown,
  User,
  LogOut,
  Building,
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
    { role: 'buyer', label: 'Buyer', desc: 'Search, save, tour, make offers' },
    { role: 'seller', label: 'Seller / Owner', desc: 'Listings, inquiries, offers' },
    { role: 'agent', label: 'Real Estate Agent', desc: 'CRM pipeline, leads, commissions' },
    { role: 'builder', label: 'Builder / Developer', desc: 'Projects, towers, floor inventory' },
    { role: 'landlord', label: 'Landlord', desc: 'Rental leases, tenant maintenance' },
    { role: 'moderator', label: 'Moderator', desc: 'Approve & verify listings, reports' },
    { role: 'admin', label: 'Super Admin', desc: 'Platform KPIs, user governance' },
  ];

  const primaryNavLinks = [
    { label: 'Explore', href: '/search', icon: Search },
    { label: 'Calculators', href: '/calculators', icon: Calculator },
    { label: 'Neighborhoods', href: '/neighborhoods', icon: Compass },
  ];

  const secondaryNavLinks = [
    { label: 'CRM & Deals', href: '/agent-crm', icon: LayoutDashboard },
    { label: 'Dashboard', href: '/dashboard', icon: Building },
  ];

  const allNavLinks = [...primaryNavLinks, ...secondaryNavLinks];

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          {/* Logo & Desktop Nav */}
          <div className="flex items-center gap-3 lg:gap-5 xl:gap-7 shrink-0 min-w-0">
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform shrink-0">
                <Building2 className="w-5 h-5 shrink-0" />
              </div>
              <div className="flex flex-col shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white font-display">
                    Brickly
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/50">
                    AlexEstate
                  </span>
                </div>
                <span className="text-[10px] font-medium tracking-wide text-slate-400 uppercase -mt-0.5">
                  Intelligent Ecosystem
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 shrink-0">
              {primaryNavLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                      isActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              {secondaryNavLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                      isActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Compare Badge Link */}
            <Link
              href="/compare"
              className="relative p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 min-w-[38px] min-h-[38px] flex items-center justify-center"
              title="Compare Properties"
            >
              <Scale className="w-4 h-4 shrink-0" />
              {compareList.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
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
              className="relative p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 min-w-[38px] min-h-[38px] flex items-center justify-center"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4 shrink-0" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Role Switcher Pill (2xl wide viewports) */}
            <div className="relative hidden 2xl:block shrink-0">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold transition-all shadow-sm hover:ring-2 hover:ring-emerald-400/40 shrink-0 min-h-[38px] whitespace-nowrap"
              >
                <UserCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="capitalize">{activeRole}</span>
                <ChevronDown className="w-3 h-3 opacity-60 shrink-0" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl z-50 animate-slide-up">
                  <div className="px-2 py-1 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Switch Test Persona
                  </div>
                  <div className="space-y-1">
                    {availableRoles.map((r) => (
                      <button
                        key={r.role}
                        onClick={() => {
                          setActiveRole(r.role);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2 rounded-xl transition-all ${
                          activeRole === r.role
                            ? 'bg-emerald-600 text-white'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        <div className="font-bold text-xs capitalize flex items-center justify-between">
                          <span>{r.label}</span>
                          {activeRole === r.role && <ShieldCheck className="w-3.5 h-3.5" />}
                        </div>
                        <div
                          className={`text-[10px] mt-0.5 ${
                            activeRole === r.role ? 'text-emerald-100' : 'text-slate-400'
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
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 lg:px-3.5 lg:py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold hover:shadow-glow hover:opacity-95 transition-all shrink-0 min-h-[38px] whitespace-nowrap shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Post Property</span>
            </Link>

            {/* User Profile Avatar / Sign In */}
            {user ? (
              <div className="relative shrink-0 flex items-center">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="relative w-9 h-9 min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px] rounded-full overflow-hidden border-2 border-emerald-500/60 hover:border-emerald-500 hover:ring-2 hover:ring-emerald-500/40 transition-all shrink-0 p-0 flex items-center justify-center focus:outline-none shadow-sm cursor-pointer"
                  aria-label="User account menu"
                  aria-expanded={userMenuOpen}
                >
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-full h-full object-cover shrink-0 block aspect-square"
                  />
                </button>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 pointer-events-none" />

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-60 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl z-50 animate-slide-up">
                    <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-xs text-slate-900 dark:text-white truncate">
                          {user.username}
                        </p>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                          {activeRole}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{user.email}</p>
                    </div>

                    {/* Quick Switch Persona Inside Dropdown */}
                    <div className="py-1.5 px-1 border-b border-slate-100 dark:border-slate-800">
                      <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1 px-1">
                        Switch Persona
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {availableRoles.map((r) => (
                          <button
                            key={r.role}
                            onClick={() => {
                              setActiveRole(r.role);
                              setUserMenuOpen(false);
                            }}
                            className={`px-2 py-1 rounded-lg text-[11px] font-semibold text-left truncate transition-colors ${
                              activeRole === r.role
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                          >
                            {r.label.split('/')[0].trim()}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="py-1 space-y-0.5">
                      <Link
                        href="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>My Profile & KYC</span>
                      </Link>
                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        <span>Seller Dashboard</span>
                      </Link>
                      <Link
                        href="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                        <span>Admin Moderation</span>
                      </Link>
                      <Link
                        href="/pricing"
                        onClick={() => setUserMenuOpen(false)}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Pro Subscriptions</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
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
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 shrink-0 whitespace-nowrap min-h-[38px] flex items-center justify-center"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl lg:hidden text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0 min-w-[38px] min-h-[38px] flex items-center justify-center border border-slate-200/60 dark:border-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 shrink-0" /> : <Menu className="w-5 h-5 shrink-0" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-4 py-5 animate-slide-up">
          <div className="space-y-1 mb-4">
            {allNavLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Icon className="w-4 h-4 text-emerald-600" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <Link
              href="/create-listing"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Property</span>
            </Link>
          </div>

          {/* Mobile Persona Switcher */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Active Persona</span>
              <span className="text-emerald-600 dark:text-emerald-400 capitalize font-extrabold">{activeRole}</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 mb-4">
              {availableRoles.map((r) => (
                <button
                  key={r.role}
                  onClick={() => {
                    setActiveRole(r.role);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-2.5 py-1.5 rounded-xl text-xs font-semibold truncate transition-colors ${
                    activeRole === r.role
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Currency & Unit</span>
            <CurrencyUnitToggle />
          </div>
        </div>
      )}
    </header>
  );
}
