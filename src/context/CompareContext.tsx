'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PropertyListing } from '@/lib/types';

interface CompareContextType {
  compareList: PropertyListing[];
  addToCompare: (listing: PropertyListing) => boolean;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = useState<PropertyListing[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('brickly-compare');
      if (saved) {
        setCompareList(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveList = (list: PropertyListing[]) => {
    setCompareList(list);
    try {
      localStorage.setItem('brickly-compare', JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
  };

  const addToCompare = (listing: PropertyListing): boolean => {
    if (compareList.length >= 4) {
      alert('You can compare up to 4 properties at a time.');
      return false;
    }
    if (compareList.some((p) => p.id === listing.id)) {
      return true;
    }
    const updated = [...compareList, listing];
    saveList(updated);
    return true;
  };

  const removeFromCompare = (id: string) => {
    const updated = compareList.filter((p) => p.id !== id);
    saveList(updated);
  };

  const isInCompare = (id: string) => {
    return compareList.some((p) => p.id === id);
  };

  const clearCompare = () => {
    saveList([]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) throw new Error('useCompare must be used within a CompareProvider');
  return context;
}
