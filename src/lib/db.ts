import mongoose from 'mongoose';
import {
  PropertyListing,
  UserProfile,
  Offer,
  VisitBooking,
  ChatMessage,
  CRMLead,
  AuditLogEntry,
  BuilderProject,
  NotificationItem,
} from './types';
import {
  SEED_PROPERTIES,
  SEED_USERS,
  SEED_BUILDER_PROJECTS,
  SEED_LEADS,
} from './seedData';

// Global in-memory cache to support seamless execution without requiring MongoDB daemon
let memoryListings: PropertyListing[] = [...SEED_PROPERTIES];
let memoryUsers: UserProfile[] = [...SEED_USERS];
let memoryProjects: BuilderProject[] = [...SEED_BUILDER_PROJECTS];
let memoryLeads: CRMLead[] = [...SEED_LEADS];
let memoryOffers: Offer[] = [
  {
    id: 'off-1',
    listingId: 'prop-1',
    propertyTitle: 'The Grand Pavilion - Ultra Luxury 3 BHK Sky Residence',
    buyerId: 'user-default',
    buyerName: 'Alex Estate User',
    buyerEmail: 'chandan@example.com',
    sellerId: 'agent-1',
    amount: 23800000,
    currency: 'INR',
    depositAmount: 500000,
    contingencies: 'Subject to bank loan sanction and clear encumbrance certificate',
    status: 'countered',
    counterAmount: 24200000,
    expiresAt: '2025-04-30T23:59:59Z',
    createdAt: '2025-03-01T10:00:00Z',
  },
];
let memoryVisits: VisitBooking[] = [
  {
    id: 'vis-1',
    listingId: 'prop-1',
    propertyTitle: 'The Grand Pavilion - Ultra Luxury 3 BHK Sky Residence',
    buyerId: 'user-default',
    buyerName: 'Alex Estate User',
    buyerPhone: '+91 98765 43210',
    sellerId: 'agent-1',
    date: '2025-03-15',
    timeSlot: '11:00 AM - 12:00 PM',
    mode: 'in-person',
    status: 'confirmed',
    notes: 'Would like to inspect car parking slots and club house amenities',
    createdAt: '2025-03-02T14:30:00Z',
  },
];
let memoryMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-prop-1',
    senderId: 'agent-1',
    senderName: 'Vikram Malhotra',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    recipientId: 'user-default',
    text: 'Hello! Thank you for inquiring about The Grand Pavilion. The title deed is 100% clear and RERA registered.',
    timestamp: '2025-03-02T11:00:00Z',
    read: true,
  },
  {
    id: 'msg-2',
    conversationId: 'conv-prop-1',
    senderId: 'user-default',
    senderName: 'Alex Estate User',
    recipientId: 'agent-1',
    text: 'Great! Can we schedule a site visit this Saturday morning to verify the east facing view?',
    timestamp: '2025-03-02T11:15:00Z',
    read: true,
  },
];
let memoryAuditLogs: AuditLogEntry[] = [
  {
    id: 'aud-1',
    actorId: 'admin-1',
    actorName: 'System Moderator',
    actorRole: 'moderator',
    action: 'APPROVE_LISTING',
    entityType: 'PropertyListing',
    entityId: 'prop-1',
    previousValue: 'PENDING_REVIEW',
    newValue: 'ACTIVE',
    timestamp: '2024-01-10T10:05:00Z',
  },
  {
    id: 'aud-2',
    actorId: 'agent-1',
    actorName: 'Vikram Malhotra',
    actorRole: 'agent',
    action: 'PRICE_UPDATE',
    entityType: 'PropertyListing',
    entityId: 'prop-1',
    previousValue: '26000000',
    newValue: '24500000',
    timestamp: '2024-03-10T14:30:00Z',
  },
];
let memoryNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'user-default',
    type: 'price_drop',
    title: 'Price Drop Alert!',
    message: 'The Grand Pavilion in Indiranagar dropped price by ₹15 Lakhs to ₹2.45 Cr.',
    read: false,
    link: '/listing/prop-1',
    createdAt: '2025-03-01T09:00:00Z',
  },
  {
    id: 'notif-2',
    userId: 'user-default',
    type: 'visit',
    title: 'Visit Confirmed',
    message: 'Your site tour for The Grand Pavilion is confirmed for Saturday 11:00 AM.',
    read: false,
    link: '/listing/prop-1',
    createdAt: '2025-03-02T14:35:00Z',
  },
];

// Connect to MongoDB if MONGO_URI is set
let isConnected = false;
export async function connectToDatabase() {
  if (isConnected || !process.env.MONGO_URI) {
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState === 1;
  } catch (error) {
    console.warn('MongoDB connection fallback to resilient in-memory store:', error);
  }
}

// Data access operations
export const db = {
  // Properties
  async getListings(query?: {
    searchTerm?: string;
    city?: string;
    locality?: string;
    purpose?: string;
    propertyType?: string;
    bhk?: string;
    minPrice?: number;
    maxPrice?: number;
    furnished?: string;
    parking?: boolean;
    readyToMove?: boolean;
    reraVerified?: boolean;
    sort?: string;
  }): Promise<PropertyListing[]> {
    let results = [...memoryListings];

    if (query) {
      if (query.searchTerm) {
        const term = query.searchTerm.toLowerCase();
        results = results.filter(
          (p) =>
            p.title.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term) ||
            p.location.city.toLowerCase().includes(term) ||
            p.location.locality.toLowerCase().includes(term) ||
            p.indiaDetails.bhk.toLowerCase().includes(term) ||
            p.indiaDetails.societyName?.toLowerCase().includes(term)
        );
      }
      if (query.city && query.city !== 'all') {
        results = results.filter((p) => p.location.city.toLowerCase() === query.city?.toLowerCase());
      }
      if (query.locality) {
        results = results.filter((p) => p.location.locality.toLowerCase().includes(query.locality!.toLowerCase()));
      }
      if (query.purpose && query.purpose !== 'all') {
        results = results.filter((p) => p.purpose === query.purpose);
      }
      if (query.propertyType && query.propertyType !== 'all') {
        results = results.filter((p) => p.propertyType === query.propertyType);
      }
      if (query.bhk && query.bhk !== 'all') {
        results = results.filter((p) => p.indiaDetails.bhk === query.bhk);
      }
      if (query.minPrice !== undefined && query.minPrice > 0) {
        results = results.filter((p) => p.price >= query.minPrice!);
      }
      if (query.maxPrice !== undefined && query.maxPrice > 0) {
        results = results.filter((p) => p.price <= query.maxPrice!);
      }
      if (query.parking) {
        results = results.filter((p) => p.parking === true);
      }
      if (query.readyToMove) {
        results = results.filter((p) => p.constructionStatus === 'ready-to-move');
      }
      if (query.reraVerified) {
        results = results.filter((p) => p.indiaDetails.reraStatus === 'verified');
      }

      // Sorting
      if (query.sort === 'price_asc') {
        results.sort((a, b) => a.price - b.price);
      } else if (query.sort === 'price_desc') {
        results.sort((a, b) => b.price - a.price);
      } else if (query.sort === 'area_desc') {
        results.sort((a, b) => b.indiaDetails.carpetAreaSqFt - a.indiaDetails.carpetAreaSqFt);
      } else if (query.sort === 'newest') {
        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
    }

    return results;
  },

  async getListingById(id: string): Promise<PropertyListing | null> {
    const listing = memoryListings.find((p) => p.id === id || p._id === id);
    return listing || null;
  },

  async createListing(data: Omit<PropertyListing, 'id'>): Promise<PropertyListing> {
    const newListing: PropertyListing = {
      ...data,
      id: `prop-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memoryListings.unshift(newListing);
    return newListing;
  },

  async updateListing(id: string, updates: Partial<PropertyListing>): Promise<PropertyListing | null> {
    const index = memoryListings.findIndex((p) => p.id === id || p._id === id);
    if (index === -1) return null;
    memoryListings[index] = {
      ...memoryListings[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return memoryListings[index];
  },

  async deleteListing(id: string): Promise<boolean> {
    const initialLength = memoryListings.length;
    memoryListings = memoryListings.filter((p) => p.id !== id && p._id !== id);
    return memoryListings.length < initialLength;
  },

  // Offers
  async getOffers(userId?: string): Promise<Offer[]> {
    if (!userId) return memoryOffers;
    return memoryOffers.filter((o) => o.buyerId === userId || o.sellerId === userId);
  },

  async createOffer(data: Omit<Offer, 'id' | 'createdAt'>): Promise<Offer> {
    const newOffer: Offer = {
      ...data,
      id: `off-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    memoryOffers.unshift(newOffer);
    return newOffer;
  },

  async updateOfferStatus(
    id: string,
    status: Offer['status'],
    counterAmount?: number
  ): Promise<Offer | null> {
    const index = memoryOffers.findIndex((o) => o.id === id);
    if (index === -1) return null;
    memoryOffers[index].status = status;
    if (counterAmount) {
      memoryOffers[index].counterAmount = counterAmount;
    }
    return memoryOffers[index];
  },

  // Visits
  async getVisits(userId?: string): Promise<VisitBooking[]> {
    if (!userId) return memoryVisits;
    return memoryVisits.filter((v) => v.buyerId === userId || v.sellerId === userId);
  },

  async createVisit(data: Omit<VisitBooking, 'id' | 'createdAt'>): Promise<VisitBooking> {
    const newVisit: VisitBooking = {
      ...data,
      id: `vis-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    memoryVisits.unshift(newVisit);
    return newVisit;
  },

  async updateVisitStatus(id: string, status: VisitBooking['status']): Promise<VisitBooking | null> {
    const index = memoryVisits.findIndex((v) => v.id === id);
    if (index === -1) return null;
    memoryVisits[index].status = status;
    return memoryVisits[index];
  },

  // Chat
  async getMessages(conversationId: string): Promise<ChatMessage[]> {
    return memoryMessages.filter((m) => m.conversationId === conversationId);
  },

  async sendMessage(data: Omit<ChatMessage, 'id' | 'timestamp'>): Promise<ChatMessage> {
    const newMsg: ChatMessage = {
      ...data,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    memoryMessages.push(newMsg);
    return newMsg;
  },

  // Users
  async getUsers(): Promise<UserProfile[]> {
    return memoryUsers;
  },

  async getUserById(id: string): Promise<UserProfile | null> {
    return memoryUsers.find((u) => u.id === id || u._id === id) || null;
  },

  async updateUser(id: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
    const index = memoryUsers.findIndex((u) => u.id === id || u._id === id);
    if (index === -1) return null;
    memoryUsers[index] = { ...memoryUsers[index], ...updates };
    return memoryUsers[index];
  },

  // Leads & CRM
  async getCRMLeads(agentId?: string): Promise<CRMLead[]> {
    if (!agentId) return memoryLeads;
    return memoryLeads.filter((l) => l.agentId === agentId);
  },

  async updateCRMLead(id: string, updates: Partial<CRMLead>): Promise<CRMLead | null> {
    const index = memoryLeads.findIndex((l) => l.id === id);
    if (index === -1) return null;
    memoryLeads[index] = { ...memoryLeads[index], ...updates };
    return memoryLeads[index];
  },

  // Projects
  async getProjects(): Promise<BuilderProject[]> {
    return memoryProjects;
  },

  // Notifications
  async getNotifications(userId: string): Promise<NotificationItem[]> {
    return memoryNotifications.filter((n) => n.userId === userId || n.userId === 'all');
  },

  async markNotificationRead(id: string): Promise<boolean> {
    const notif = memoryNotifications.find((n) => n.id === id);
    if (notif) {
      notif.read = true;
      return true;
    }
    return false;
  },

  async markAllNotificationsRead(userId: string): Promise<void> {
    memoryNotifications.forEach((n) => {
      if (n.userId === userId) n.read = true;
    });
  },

  // Audit Logs
  async getAuditLogs(): Promise<AuditLogEntry[]> {
    return memoryAuditLogs;
  },

  async addAuditLog(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): Promise<AuditLogEntry> {
    const log: AuditLogEntry = {
      ...entry,
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    memoryAuditLogs.unshift(log);
    return log;
  },
};
