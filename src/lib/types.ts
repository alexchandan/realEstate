export type UserRole =
  | 'guest'
  | 'buyer'
  | 'renter'
  | 'owner'
  | 'seller'
  | 'landlord'
  | 'agent'
  | 'agency'
  | 'builder'
  | 'property_manager'
  | 'admin'
  | 'super_admin'
  | 'moderator'
  | 'support_staff';

export type ListingLifecycle =
  | 'DRAFT'
  | 'PENDING_REVIEW'
  | 'APPROVED'
  | 'ACTIVE'
  | 'UNDER_OFFER'
  | 'SOLD'
  | 'RENTED'
  | 'ARCHIVED'
  | 'REJECTED'
  | 'SUSPENDED'
  | 'EXPIRED';

export type PropertyType =
  | 'apartment'
  | 'villa'
  | 'house'
  | 'penthouse'
  | 'duplex'
  | 'studio'
  | 'commercial'
  | 'plot'
  | 'warehouse'
  | 'industrial'
  | 'pg_coliving';

export type ListingPurpose = 'sale' | 'rent' | 'lease';
export type FurnishingStatus = 'unfurnished' | 'semi-furnished' | 'fully-furnished';
export type ConstructionStatus = 'ready-to-move' | 'under-construction';

export interface LocationDetails {
  country: string;
  state: string;
  city: string;
  locality: string;
  neighborhood: string;
  street: string;
  pinCode: string;
  landmark: string;
  lat: number;
  lng: number;
  formattedAddress: string;
}

export interface AmenitiesTaxonomy {
  building: string[]; // e.g. Lift, 24/7 Security, CCTV, Power Backup, Fire Fighting
  lifestyle: string[]; // e.g. Gym, Swimming Pool, Clubhouse, Children Play Area, Jogging Track
  utility: string[]; // e.g. Covered Parking, EV Charging, Piped Gas, 24h Water, Rainwater Harvesting
  outdoor: string[]; // e.g. Private Terrace, Balcony, Park, Pet-friendly
  accessibility: string[]; // e.g. Wheelchair ramp, Wide doorways
}

export interface PropertyMedia {
  imageUrls: string[];
  coverImage: string;
  videoUrl?: string;
  virtualTour360Url?: string;
  floorPlanUrls?: string[];
  brochurePdfUrl?: string;
}

export interface IndiaSpecificDetails {
  reraNumber?: string;
  reraStatus: 'verified' | 'in-progress' | 'exempt' | 'unregistered';
  bhk: string; // '1 RK' | '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK' | '5+ BHK'
  carpetAreaSqFt: number;
  builtUpAreaSqFt: number;
  superBuiltUpAreaSqFt: number;
  vastuFacing?: 'East' | 'North' | 'North-East' | 'West' | 'South' | 'North-West' | 'South-East' | 'South-West';
  societyName?: string;
  maintenanceMonthly?: number;
  bookingAmount?: number;
  possessionDate?: string;
  powerBackupDetails?: string;
  waterSource?: string;
}

export interface PriceHistoryEntry {
  date: string;
  price: number;
  pricePerSqFt: number;
  note?: string;
}

export interface FraudRiskAssessment {
  riskScore: number; // 0 to 100
  riskLevel: 'low' | 'medium' | 'high';
  flags: string[];
}

export interface PropertyListing {
  id: string;
  _id?: string;
  title: string;
  description: string;
  purpose: ListingPurpose;
  propertyType: PropertyType;
  status: ListingLifecycle;
  price: number;
  originalPrice?: number;
  currency: string;
  isNegotiable: boolean;
  bedrooms: number;
  bathrooms: number;
  parking: boolean;
  parkingSpots?: number;
  furnished: FurnishingStatus;
  constructionStatus: ConstructionStatus;
  floor: number;
  totalFloors: number;
  propertyAgeYears: number;
  location: LocationDetails;
  media: PropertyMedia;
  amenities: AmenitiesTaxonomy;
  indiaDetails: IndiaSpecificDetails;
  priceHistory: PriceHistoryEntry[];
  fraudAssessment: FraudRiskAssessment;
  isFeatured: boolean;
  isPromoted: boolean;
  viewsCount: number;
  uniqueVisitorsCount: number;
  savesCount: number;
  inquiriesCount: number;
  sellerId: string;
  sellerName: string;
  sellerType: 'owner' | 'agent' | 'builder';
  sellerPhone?: string;
  sellerEmail?: string;
  sellerAvatar?: string;
  sellerRating?: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  _id?: string;
  username: string;
  email: string;
  phone?: string;
  avatar: string;
  roles: UserRole[];
  activeRole: UserRole;
  bio?: string;
  location?: string;
  currencyPreference: string;
  unitPreference: 'sqft' | 'sqm';
  isVerified: boolean;
  kycStatus: 'none' | 'pending' | 'verified';
  twoFactorEnabled: boolean;
  agentDetails?: {
    agencyName: string;
    reraLicense: string;
    specialties: string[];
    experienceYears: number;
    rating: number;
    reviewCount: number;
    activeListingsCount: number;
    verifiedBadge: boolean;
  };
}

export interface Offer {
  id: string;
  listingId: string;
  propertyTitle: string;
  buyerId: string;
  buyerName: string;
  buyerEmail?: string;
  sellerId: string;
  amount: number;
  currency: string;
  depositAmount: number;
  contingencies: string;
  status: 'pending' | 'accepted' | 'rejected' | 'countered' | 'expired';
  counterAmount?: number;
  expiresAt: string;
  createdAt: string;
}

export interface VisitBooking {
  id: string;
  listingId: string;
  propertyTitle: string;
  buyerId: string;
  buyerName: string;
  buyerPhone: string;
  sellerId: string;
  date: string;
  timeSlot: string;
  mode: 'in-person' | 'virtual';
  status: 'requested' | 'confirmed' | 'rescheduled' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  recipientId: string;
  text: string;
  timestamp: string;
  read: boolean;
  propertyPreview?: {
    id: string;
    title: string;
    price: number;
    currency: string;
    image: string;
  };
}

export interface Review {
  id: string;
  targetId: string;
  targetType: 'agent' | 'builder' | 'project';
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;
  categories: {
    communication: number;
    responsiveness: number;
    transparency: number;
    marketKnowledge: number;
  };
  comment: string;
  verifiedBuyer: boolean;
  createdAt: string;
}

export interface SavedSearch {
  id: string;
  userId: string;
  name: string;
  queryParams: Record<string, string>;
  alertFrequency: 'instant' | 'daily' | 'weekly';
  createdAt: string;
}

export interface FavoriteCollection {
  id: string;
  userId: string;
  name: string;
  listingIds: string[];
  notes: Record<string, string>;
  isShared: boolean;
  sharedToken?: string;
}

export interface CRMLead {
  id: string;
  agentId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  budget: number;
  propertyInterest: string;
  stage: 'New' | 'Contacted' | 'Interested' | 'Viewing' | 'Negotiating' | 'Closed';
  score: 'Hot' | 'Warm' | 'Cold';
  lastActivity: string;
  notes: string[];
}

export interface BuilderProject {
  id: string;
  developerName: string;
  projectName: string;
  reraNumber: string;
  location: string;
  totalTowers: number;
  totalUnits: number;
  availableUnits: number;
  startingPrice: number;
  completionDate: string;
  constructionProgressPercent: number;
  milestones: {
    title: string;
    date: string;
    completed: boolean;
    photoUrl?: string;
  }[];
}

export interface NotificationItem {
  id: string;
  userId: string;
  type: 'price_drop' | 'new_lead' | 'visit' | 'offer' | 'message' | 'system' | 'moderation';
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  action: string;
  entityType: string;
  entityId: string;
  previousValue?: string;
  newValue?: string;
  timestamp: string;
  ipAddress?: string;
}
