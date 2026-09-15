/**
 * Centralized Schema Validation Utilities
 * Validates inputs for listings, offers, visits, reviews, and CRM leads.
 */

import { sanitizeString } from './security';

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function validateListingInput(data: any): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.title || typeof data.title !== 'string' || data.title.trim().length < 5) {
    errors.title = 'Title is required and must be at least 5 characters.';
  }

  if (!data.description || typeof data.description !== 'string' || data.description.trim().length < 20) {
    errors.description = 'Description is required and must be at least 20 characters.';
  }

  if (typeof data.price !== 'number' || isNaN(data.price) || data.price <= 0) {
    errors.price = 'Price must be a positive number.';
  }

  if (!['sale', 'rent', 'lease', 'pg_coliving'].includes(data.purpose)) {
    errors.purpose = 'Invalid transaction purpose.';
  }

  if (!data.location || typeof data.location !== 'object') {
    errors.location = 'Location details are required.';
  } else {
    if (!data.location.city) errors['location.city'] = 'City is required.';
    if (!data.location.locality) errors['location.locality'] = 'Locality is required.';
    if (
      typeof data.location.lat !== 'number' ||
      typeof data.location.lng !== 'number' ||
      isNaN(data.location.lat) ||
      isNaN(data.location.lng)
    ) {
      errors['location.coordinates'] = 'Valid GPS coordinates (latitude, longitude) are required.';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateOfferInput(data: any): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.listingId || typeof data.listingId !== 'string') {
    errors.listingId = 'Listing ID is required.';
  }

  if (typeof data.offerAmount !== 'number' || isNaN(data.offerAmount) || data.offerAmount <= 0) {
    errors.offerAmount = 'Offer amount must be a positive number.';
  }

  if (!data.buyerName || typeof data.buyerName !== 'string' || data.buyerName.trim().length < 2) {
    errors.buyerName = 'Buyer name is required.';
  }

  if (!data.buyerEmail || typeof data.buyerEmail !== 'string' || !/^\S+@\S+\.\S+$/.test(data.buyerEmail)) {
    errors.buyerEmail = 'A valid email address is required.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateVisitInput(data: any): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.listingId || typeof data.listingId !== 'string') {
    errors.listingId = 'Listing ID is required.';
  }

  if (!data.date || isNaN(Date.parse(data.date))) {
    errors.date = 'A valid future date is required.';
  }

  if (!data.timeSlot || typeof data.timeSlot !== 'string') {
    errors.timeSlot = 'Time slot is required.';
  }

  if (!data.visitorName || typeof data.visitorName !== 'string') {
    errors.visitorName = 'Visitor name is required.';
  }

  if (!data.visitorPhone || typeof data.visitorPhone !== 'string' || data.visitorPhone.length < 8) {
    errors.visitorPhone = 'A valid phone number is required.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateReviewInput(data: any): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.targetId || typeof data.targetId !== 'string') {
    errors.targetId = 'Target listing or agent ID is required.';
  }

  if (typeof data.rating !== 'number' || data.rating < 1 || data.rating > 5) {
    errors.rating = 'Rating must be an integer or half-number between 1 and 5.';
  }

  if (!data.comment || typeof data.comment !== 'string' || data.comment.trim().length < 10) {
    errors.comment = 'Review comment must be at least 10 characters.';
  }

  if (!data.userName || typeof data.userName !== 'string') {
    errors.userName = 'User name is required.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateLeadInput(data: any): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.name = 'Lead name is required.';
  }

  if (!data.phone || typeof data.phone !== 'string' || data.phone.length < 8) {
    errors.phone = 'Valid phone number is required.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
