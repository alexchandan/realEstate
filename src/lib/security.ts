/**
 * Enterprise Security Utilities
 * - XSS Input Sanitization
 * - Safe String Escaping
 * - Role Authorization Validation
 * - Structured API Error Responses
 */

import { UserRole } from '@/lib/types';

/**
 * Strips dangerous HTML tags, javascript: links, and event attributes
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '') // strip all raw HTML tags
    .replace(/javascript:/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .trim();
}

/**
 * Recursively sanitizes all string properties within an object
 */
export function sanitizeObject<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === 'string') {
    return sanitizeString(obj) as unknown as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item)) as unknown as T;
  }

  if (typeof obj === 'object') {
    const sanitized: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = sanitizeObject(value);
    }
    return sanitized as T;
  }

  return obj;
}

/**
 * Role-Based Access Control matrix
 */
const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  guest: ['view_listings'],
  buyer: ['view_listings', 'make_offer', 'schedule_visit', 'save_listing', 'submit_review'],
  renter: ['view_listings', 'make_offer', 'schedule_visit', 'save_listing', 'submit_review'],
  owner: ['view_listings', 'create_listing', 'manage_own_listings', 'review_offers'],
  seller: ['view_listings', 'create_listing', 'manage_own_listings', 'review_offers'],
  landlord: ['view_listings', 'create_listing', 'manage_own_listings', 'manage_leases', 'review_offers'],
  agent: ['view_listings', 'create_listing', 'manage_crm_leads', 'schedule_visit', 'negotiate_offers'],
  agency: ['view_listings', 'create_listing', 'manage_crm_leads', 'manage_team', 'negotiate_offers'],
  builder: ['view_listings', 'manage_projects', 'manage_inventory', 'bulk_upload'],
  property_manager: ['view_listings', 'manage_inventory', 'manage_leases'],
  moderator: ['view_listings', 'moderate_listings', 'manage_reports'],
  support_staff: ['view_listings', 'manage_tickets', 'assist_users'],
  admin: ['view_listings', 'moderate_listings', 'manage_users', 'view_analytics', 'view_audit_logs'],
  super_admin: ['*'], // Wildcard root access
};

export function hasPermission(role: UserRole | undefined, permission: string): boolean {
  if (!role) return false;
  const permissions = ROLE_PERMISSIONS[role] || [];
  if (permissions.includes('*')) return true;
  return permissions.includes(permission);
}

/**
 * Standard sanitized JSON envelope for API responses
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: Record<string, any>;
}

export function apiSuccess<T>(data: T, message?: string, meta?: Record<string, any>): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
    meta,
  };
}

export function apiError(message: string, errorDetail?: unknown): ApiResponse<never> {
  return {
    success: false,
    error: message,
    // In production we never expose internal stack traces
    message: typeof errorDetail === 'string' ? errorDetail : undefined,
  };
}
