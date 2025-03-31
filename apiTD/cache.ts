import { CompanyDetails } from './types';

interface CacheEntry {
  timestamp: number;
  data: CompanyDetails;
}

export class APITDCache {
  private cache: Map<string, CacheEntry>;
  private expirationTime: number; // in seconds

  constructor(expirationTime: number = 3600) {
    this.cache = new Map();
    this.expirationTime = expirationTime;
  }

  set(siret: string, data: CompanyDetails): void {
    this.cache.set(siret, {
      timestamp: Date.now(),
      data
    });
  }

  get(siret: string): CompanyDetails | null {
    const entry = this.cache.get(siret);
    
    if (!entry) {
      return null;
    }

    // Check if cache entry has expired
    const now = Date.now();
    const age = (now - entry.timestamp) / 1000; // Convert to seconds
    
    if (age > this.expirationTime) {
      this.cache.delete(siret);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }

  remove(siret: string): void {
    this.cache.delete(siret);
  }

  setExpirationTime(seconds: number): void {
    this.expirationTime = seconds;
  }

  // Clean expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [siret, entry] of this.cache.entries()) {
      const age = (now - entry.timestamp) / 1000;
      if (age > this.expirationTime) {
        this.cache.delete(siret);
      }
    }
  }
} 