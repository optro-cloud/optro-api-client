"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ms_1 = __importDefault(require("ms"));
const object_hash_1 = __importDefault(require("object-hash"));
class Cache extends Map {
    constructor(maxAge, interval) {
        super();
        this.maxAge = this.ms(maxAge) || Infinity;
        this.expires = new Map();
        interval = this.ms(interval);
        this.interval = interval > 0 && interval < Infinity ?
            setInterval(this.trim.bind(this), interval) :
            null;
    }
    ms(ttl) {
        switch (typeof ttl) {
            case 'string':
                ttl = ms_1.default(ttl);
                break;
            case 'number':
                ttl = Math.floor(ttl);
                break;
            default:
                break;
        }
        return ttl > 0 ? ttl : this.maxAge;
    }
    now() {
        return Date.now();
    }
    has(key) {
        return super.has(key) && this.expires.get(key) > this.now();
    }
    delete(key) {
        this.expires.delete(key);
        return super.delete(key);
    }
    trim() {
        const now = this.now();
        let keys = new Set();
        for (let pair of this.expires) {
            if (pair[1] < now) {
                keys.add(pair[0]);
            }
        }
        for (let key of keys) {
            super.delete(key);
            this.expires.delete(key);
        }
        return keys;
    }
    check(key) {
        return this.expires.get(key) > this.now();
    }
    get(key) {
        return this.check(key) ? super.get(key) : void 0;
    }
    set(key, value, maxAge) {
        super.set(key, value);
        this.expires.set(key, this.now() + this.ms(maxAge));
        return this;
    }
    clear() {
        this.expires.clear();
        return super.clear();
    }
    get size() {
        this.trim();
        return super.size;
    }
    proxy(fn, maxAge) {
        const cache = this;
        const fnkey = object_hash_1.default(fn);
        return function () {
            const args = Array.prototype.slice.apply(arguments);
            let key = `${fnkey}:${object_hash_1.default(args)}`;
            if (cache.has(key)) {
                return Promise.resolve(cache.get(key));
            }
            else {
                return new Promise((resolve, reject) => {
                    try {
                        resolve(fn.apply(null, args));
                    }
                    catch (err) {
                        reject(err);
                    }
                }).then(results => {
                    return cache.set(key, results, maxAge).get(key);
                });
            }
        };
    }
}
const mapiter = Map.prototype[Symbol.iterator];
Cache.prototype.entries = function* cacheEntries() {
    for (let pair of this) {
        yield pair;
    }
    return;
};
Cache.prototype.keys = function* cacheKeys() {
    for (let pair of this) {
        yield pair[0];
    }
    return;
};
Cache.prototype.values = function* cacheValues() {
    for (let pair of this) {
        yield pair[1];
    }
    return;
};
Cache.prototype[Symbol.iterator] = function* cacheIterator() {
    const now = this.now();
    for (let pair of mapiter.apply(this)) {
        if (this.expires.get(pair[0]) > now) {
            yield pair;
        }
    }
};
exports.default = Cache;
//# sourceMappingURL=cache.js.map