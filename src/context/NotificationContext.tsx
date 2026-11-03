'use client';

import React, { createContext, useContext, useState } from 'react';
import { NotificationItem } from '@/lib/types';

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (item: Omit<NotificationItem, 'id' | 'createdAt'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    userId: 'user-default',
    type: 'price_drop',
    title: 'Price Drop Alert',
    message: 'The Grand Pavilion in Indiranagar has reduced price by ₹15,00,000!',
    read: false,
    link: '/listing/prop-1',
    createdAt: '10 mins ago',
  },
  {
    id: 'n-2',
    userId: 'user-default',
    type: 'visit',
    title: 'Tour Scheduled',
    message: 'Your in-person visit to Serene Green Sanctuary Villa is confirmed for Saturday.',
    read: false,
    link: '/listing/prop-2',
    createdAt: '1 hour ago',
  },
  {
    id: 'n-3',
    userId: 'user-default',
    type: 'offer',
    title: 'Counteroffer Received',
    message: 'Seller has sent a counteroffer of ₹2.42 Cr for The Grand Pavilion.',
    read: false,
    link: '/dashboard',
    createdAt: '3 hours ago',
  },
];

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const addNotification = (item: Omit<NotificationItem, 'id' | 'createdAt'>) => {
    const newItem: NotificationItem = {
      ...item,
      id: `notif-${Date.now()}`,
      createdAt: 'Just now',
    };
    setNotifications((prev) => [newItem, ...prev]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        markAsRead,
        markAllAsRead,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within a NotificationProvider');
  return context;
}
