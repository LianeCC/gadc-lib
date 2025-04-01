export class APITDCache {
    constructor(expirationTime = 3600) {
        this.cache = new Map();
        this.expirationTime = expirationTime;
    }
    set(siret, data) {
        this.cache.set(siret, {
            timestamp: Date.now(),
            data
        });
    }
    get(siret) {
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
    clear() {
        this.cache.clear();
    }
    remove(siret) {
        this.cache.delete(siret);
    }
    setExpirationTime(seconds) {
        this.expirationTime = seconds;
    }
    // Clean expired entries
    cleanup() {
        const now = Date.now();
        for (const [siret, entry] of this.cache.entries()) {
            const age = (now - entry.timestamp) / 1000;
            if (age > this.expirationTime) {
                this.cache.delete(siret);
            }
        }
    }
}
