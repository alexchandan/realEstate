import mongoose, { Schema } from 'mongoose';
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

// Global cached connection for Next.js
declare global {
  var mongooseConnection: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose | null> | null;
  } | undefined;
}

let cached = global.mongooseConnection;
if (!cached) {
  cached = global.mongooseConnection = { conn: null, promise: null };
}

export async function connectDB(): Promise<typeof mongoose | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return null;
  }

  if (cached!.conn && cached!.conn.connection.readyState === 1) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 2500, // Quick timeout so it fails fast to in-memory if offline
    };
    cached!.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      console.log('✅ Connected to MongoDB Database');
      return mongooseInstance;
    }).catch((err) => {
      console.warn('⚠️ MongoDB connection unavailable, using resilient in-memory store:', err.message);
      cached!.promise = null;
      return null;
    });
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}

// ----------------------------------------------------------------------
// Mongoose Models
// ----------------------------------------------------------------------
const ListingSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    purpose: { type: String, required: true },
    propertyType: { type: String, required: true },
    status: { type: String, default: 'ACTIVE' },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    currency: { type: String, default: 'INR' },
    isNegotiable: { type: Boolean, default: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    parking: { type: Boolean, default: true },
    parkingSpots: { type: Number, default: 1 },
    furnished: { type: String, default: 'unfurnished' },
    constructionStatus: { type: String, default: 'ready-to-move' },
    floor: { type: Number },
    totalFloors: { type: Number },
    propertyAgeYears: { type: Number, default: 0 },
    location: { type: Schema.Types.Mixed, required: true },
    media: { type: Schema.Types.Mixed, required: true },
    amenities: { type: Schema.Types.Mixed },
    indiaDetails: { type: Schema.Types.Mixed, required: true },
    isFeatured: { type: Boolean, default: false },
    isPromoted: { type: Boolean, default: false },
    sellerId: { type: String },
    sellerName: { type: String },
    sellerType: { type: String },
    sellerPhone: { type: String },
    sellerEmail: { type: String },
    sellerAvatar: { type: String },
    sellerRating: { type: Number, default: 4.9 },
  },
  { timestamps: true }
);

const OfferSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    listingId: { type: String, required: true },
    propertyTitle: { type: String },
    buyerId: { type: String },
    buyerName: { type: String, required: true },
    buyerEmail: { type: String, required: true },
    buyerPhone: { type: String },
    sellerId: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    depositAmount: { type: Number, default: 0 },
    contingencies: { type: String },
    status: { type: String, default: 'pending' },
    counterAmount: { type: Number },
  },
  { timestamps: true }
);

const VisitSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    listingId: { type: String, required: true },
    propertyTitle: { type: String },
    buyerId: { type: String },
    buyerName: { type: String, required: true },
    buyerPhone: { type: String, required: true },
    sellerId: { type: String },
    date: { type: String, required: true },
    timeSlot: { type: String, required: true },
    mode: { type: String, default: 'in-person' },
    status: { type: String, default: 'confirmed' },
    notes: { type: String },
  },
  { timestamps: true }
);

export const ListingModel = mongoose.models.Listing || mongoose.model('Listing', ListingSchema);
export const OfferModel = mongoose.models.Offer || mongoose.model('Offer', OfferSchema);
export const VisitModel = mongoose.models.Visit || mongoose.model('Visit', VisitSchema);

// ----------------------------------------------------------------------
// High-Fidelity In-Memory Cache (Dual-Mode Data Access Layer)
// ----------------------------------------------------------------------
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
    senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    recipientId: 'agent-1',
    text: 'Great! Can we schedule a site visit this Saturday at 11 AM?',
    timestamp: '2025-03-02T11:05:00Z',
    read: true,
  },
];
let memoryNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'user-default',
    type: 'offer',
    title: 'Counter-Offer Received',
    message: 'Vikram Malhotra countered your offer for The Grand Pavilion at ₹2.42 Cr.',
    read: false,
    link: '/dashboard',
    createdAt: '2025-03-02T15:30:00Z',
  },
  {
    id: 'notif-2',
    userId: 'user-default',
    type: 'visit',
    title: 'Site Visit Confirmed',
    message: 'Your site visit for The Grand Pavilion on Mar 15, 11:00 AM has been confirmed.',
    read: false,
    link: '/listing/prop-1',
    createdAt: '2025-03-02T14:35:00Z',
  },
];
let memoryAuditLogs: AuditLogEntry[] = [
  {
    id: 'aud-1',
    actorId: 'user-default',
    actorName: 'Alex Estate User',
    actorRole: 'buyer',
    action: 'CREATE_OFFER',
    entityType: 'Offer',
    entityId: 'off-1',
    newValue: 'Submitted offer ₹2.38 Cr with ₹5L deposit',
    timestamp: '2025-03-01T10:00:00Z',
  },
];

// ----------------------------------------------------------------------
// Unified Database Operations API
// ----------------------------------------------------------------------
export const db = {
  connect: connectDB,

  // Listings
  async getListings(filters?: {
    searchTerm?: string;
    city?: string;
    locality?: string;
    purpose?: string;
    propertyType?: string;
    bhk?: string;
    minPrice?: number;
    maxPrice?: number;
    parking?: boolean;
    readyToMove?: boolean;
    reraVerified?: boolean;
    sort?: string;
  }): Promise<PropertyListing[]> {
    // If MongoDB is connected, attempt sync query
    const dbConn = await connectDB();
    if (dbConn) {
      try {
        const mongoListings = await ListingModel.find().lean();
        if (mongoListings && mongoListings.length > 0) {
          memoryListings = mongoListings as unknown as PropertyListing[];
        }
      } catch (err) {
        // Fallback to memory
      }
    }

    let results = [...memoryListings];

    if (!filters) return results;

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      results = results.filter(
        (l) =>
          l.title.toLowerCase().includes(term) ||
          l.description.toLowerCase().includes(term) ||
          l.location.locality.toLowerCase().includes(term) ||
          l.location.city.toLowerCase().includes(term) ||
          l.indiaDetails.societyName?.toLowerCase().includes(term)
      );
    }

    if (filters.city && filters.city !== 'all') {
      results = results.filter(
        (l) => l.location.city.toLowerCase() === filters.city!.toLowerCase()
      );
    }

    if (filters.locality) {
      results = results.filter(
        (l) => l.location.locality.toLowerCase().includes(filters.locality!.toLowerCase())
      );
    }

    if (filters.purpose && filters.purpose !== 'all') {
      results = results.filter((l) => l.purpose === filters.purpose);
    }

    if (filters.propertyType && filters.propertyType !== 'all') {
      results = results.filter((l) => l.propertyType === filters.propertyType);
    }

    if (filters.bhk && filters.bhk !== 'all') {
      results = results.filter((l) => l.indiaDetails.bhk === filters.bhk);
    }

    if (filters.minPrice !== undefined) {
      results = results.filter((l) => l.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      results = results.filter((l) => l.price <= filters.maxPrice!);
    }

    if (filters.parking !== undefined) {
      results = results.filter((l) => l.parking === filters.parking);
    }

    if (filters.readyToMove !== undefined) {
      results = results.filter((l) => (l.constructionStatus === 'ready-to-move') === filters.readyToMove);
    }

    if (filters.reraVerified !== undefined) {
      results = results.filter((l) => (l.indiaDetails.reraStatus === 'verified') === filters.reraVerified);
    }

    if (filters.sort) {
      if (filters.sort === 'price_asc') results.sort((a, b) => a.price - b.price);
      else if (filters.sort === 'price_desc') results.sort((a, b) => b.price - a.price);
      else if (filters.sort === 'area_desc')
        results.sort((a, b) => b.indiaDetails.carpetAreaSqFt - a.indiaDetails.carpetAreaSqFt);
      else if (filters.sort === 'newest')
        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return results;
  },

  async getListingById(id: string): Promise<PropertyListing | null> {
    const dbConn = await connectDB();
    if (dbConn) {
      try {
        const item = await ListingModel.findOne({ id }).lean();
        if (item) return item as unknown as PropertyListing;
      } catch (err) {
        // Fallback to memory
      }
    }
    return memoryListings.find((l) => l.id === id) || null;
  },

  async createListing(data: Partial<PropertyListing>): Promise<PropertyListing> {
    const newListing: PropertyListing = {
      id: `prop-${Date.now()}`,
      title: data.title || 'Untitled Luxury Property',
      description: data.description || '',
      purpose: data.purpose || 'sale',
      propertyType: data.propertyType || 'apartment',
      status: 'ACTIVE',
      price: data.price || 10000000,
      currency: data.currency || 'INR',
      isNegotiable: data.isNegotiable ?? true,
      bedrooms: data.bedrooms || 2,
      bathrooms: data.bathrooms || 2,
      parking: data.parking ?? true,
      parkingSpots: data.parkingSpots || 1,
      furnished: data.furnished || 'semi-furnished',
      constructionStatus: data.constructionStatus || 'ready-to-move',
      floor: data.floor ?? 5,
      totalFloors: data.totalFloors ?? 20,
      propertyAgeYears: data.propertyAgeYears ?? 1,
      priceHistory: data.priceHistory || [
        {
          date: new Date().toISOString().split('T')[0],
          price: data.price || 10000000,
          pricePerSqFt: Math.round((data.price || 10000000) / 1800),
          note: 'Initial Listing Launch',
        },
      ],
      location: data.location || {
        country: 'India',
        state: 'Karnataka',
        city: 'Bangalore',
        locality: 'Indiranagar',
        neighborhood: 'Central Defense Colony',
        street: '100 Feet Road',
        pinCode: '560038',
        landmark: 'Near Metro Station',
        lat: 12.9784,
        lng: 77.6408,
        formattedAddress: 'Indiranagar, Bangalore, Karnataka',
      },
      media: data.media || {
        coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        imageUrls: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
      },
      amenities: data.amenities || { building: [], lifestyle: [], utility: [], outdoor: [], accessibility: [] },
      indiaDetails: data.indiaDetails || {
        reraStatus: 'verified',
        bhk: '3 BHK',
        carpetAreaSqFt: 1800,
        builtUpAreaSqFt: 2150,
        superBuiltUpAreaSqFt: 2450,
      },
      fraudAssessment: { riskScore: 1, riskLevel: 'low', flags: [] },
      isFeatured: false,
      isPromoted: false,
      viewsCount: 1,
      uniqueVisitorsCount: 1,
      savesCount: 0,
      inquiriesCount: 0,
      sellerId: data.sellerId || 'agent-1',
      sellerName: data.sellerName || 'Alex Estate Agent',
      sellerType: data.sellerType || 'agent',
      sellerRating: 4.9,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    memoryListings.unshift(newListing);

    // Save to MongoDB if available
    const dbConn = await connectDB();
    if (dbConn) {
      try {
        await ListingModel.create(newListing);
      } catch (err: any) {
        console.warn('MongoDB save warning:', err.message);
      }
    }

    return newListing;
  },

  async updateListing(id: string, updates: Partial<PropertyListing>): Promise<PropertyListing | null> {
    const index = memoryListings.findIndex((l) => l.id === id);
    if (index === -1) return null;

    memoryListings[index] = {
      ...memoryListings[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    const dbConn = await connectDB();
    if (dbConn) {
      try {
        await ListingModel.findOneAndUpdate({ id }, { $set: memoryListings[index] });
      } catch (err) {
        // Fallback
      }
    }

    return memoryListings[index];
  },

  async deleteListing(id: string): Promise<boolean> {
    const index = memoryListings.findIndex((l) => l.id === id);
    if (index === -1) return false;
    memoryListings.splice(index, 1);

    const dbConn = await connectDB();
    if (dbConn) {
      try {
        await ListingModel.findOneAndDelete({ id });
      } catch (err) {
        // Fallback
      }
    }

    return true;
  },

  // Offers
  async getOffers(userId?: string): Promise<Offer[]> {
    const dbConn = await connectDB();
    if (dbConn) {
      try {
        const query = userId ? { $or: [{ buyerId: userId }, { sellerId: userId }] } : {};
        const items = await OfferModel.find(query).lean();
        if (items && items.length > 0) return items as unknown as Offer[];
      } catch (err) {
        // Fallback
      }
    }

    if (!userId) return memoryOffers;
    return memoryOffers.filter((o) => o.buyerId === userId || o.sellerId === userId);
  },

  async createOffer(data: any): Promise<Offer> {
    const newOffer: Offer = {
      id: `off-${Date.now()}`,
      listingId: data.listingId,
      propertyTitle: data.propertyTitle || 'Luxury Real Estate Property',
      buyerId: data.buyerId || 'user-default',
      buyerName: data.buyerName,
      buyerEmail: data.buyerEmail,
      sellerId: data.sellerId || 'agent-1',
      amount: data.offerAmount || data.amount || 10000000,
      currency: data.currency || 'INR',
      depositAmount: data.tokenDeposit || data.depositAmount || 200000,
      contingencies: data.contingency || data.contingencies || 'Subject to title verification',
      status: 'pending',
      expiresAt: new Date(Date.now() + 86400000 * 7).toISOString(),
      createdAt: new Date().toISOString(),
    };

    memoryOffers.unshift(newOffer);

    const dbConn = await connectDB();
    if (dbConn) {
      try {
        await OfferModel.create(newOffer);
      } catch (err: any) {
        console.warn('MongoDB offer save error:', err.message);
      }
    }

    return newOffer;
  },

  // Visits
  async getVisits(userId?: string): Promise<VisitBooking[]> {
    const dbConn = await connectDB();
    if (dbConn) {
      try {
        const query = userId ? { $or: [{ buyerId: userId }, { sellerId: userId }] } : {};
        const items = await VisitModel.find(query).lean();
        if (items && items.length > 0) return items as unknown as VisitBooking[];
      } catch (err) {
        // Fallback
      }
    }

    if (!userId) return memoryVisits;
    return memoryVisits.filter((v) => v.buyerId === userId || v.sellerId === userId);
  },

  async createVisit(data: any): Promise<VisitBooking> {
    const newVisit: VisitBooking = {
      id: `vis-${Date.now()}`,
      listingId: data.listingId,
      propertyTitle: data.propertyTitle || 'Property Visit',
      buyerId: data.buyerId || 'user-default',
      buyerName: data.visitorName || data.buyerName || 'Guest User',
      buyerPhone: data.visitorPhone || data.buyerPhone || '+91 98000 00000',
      sellerId: data.sellerId || 'agent-1',
      date: data.date,
      timeSlot: data.timeSlot,
      mode: data.mode || 'in-person',
      status: 'confirmed',
      notes: data.notes || '',
      createdAt: new Date().toISOString(),
    };

    memoryVisits.unshift(newVisit);

    const dbConn = await connectDB();
    if (dbConn) {
      try {
        await VisitModel.create(newVisit);
      } catch (err: any) {
        console.warn('MongoDB visit save error:', err.message);
      }
    }

    return newVisit;
  },

  // Users
  async getUsers(): Promise<UserProfile[]> {
    return memoryUsers;
  },

  async getUserById(id: string): Promise<UserProfile | null> {
    return memoryUsers.find((u) => u.id === id) || null;
  },

  async updateUser(id: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
    const index = memoryUsers.findIndex((u) => u.id === id);
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
