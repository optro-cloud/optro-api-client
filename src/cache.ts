import ms from "ms";
import hashobj from "object-hash";

/**
 * A Simple Cache made from a Map.
 * Thanks to Alexandros Sigalas -
 * https://github.com/alxarch/map-cache-ttl
 */
class Cache extends Map {
  expires: any;
  private readonly maxAge: any;
  private interval: any;

  constructor(maxAge: any, interval: any) {
    super();
    this.maxAge = this.ms(maxAge) || Infinity;
    this.expires = new Map();
    interval = this.ms(interval);
    this.interval = interval > 0 && interval < Infinity ?
      setInterval(this.trim.bind(this), interval) :
      null;
  }

  get size() {
    this.trim();
    // @ts-ignore
    return super.size;
  }

  ms(ttl: any) {
    switch (typeof ttl) {
      case 'string':
        ttl = ms(ttl);

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

  has(key: string) {
    return super.has(key) && this.expires.get(key) > this.now();
  }

  delete(key: string) {
    this.expires.delete(key);
    return super.delete(key);
  }

  trim() {
    const now = this.now();
    let keys: Set<string> = new Set();
    for (let pair of this.expires) {
      if (pair[1] < now) {
        keys.add(pair[0]);
      }
    }
    // @ts-ignore
    for (let key of keys) {
      super.delete(key);
      this.expires.delete(key);
    }
    return keys;
  }

  check(key: any) {
    return this.expires.get(key) > this.now();
  }

  get(key: any) {
    return this.check(key) ? super.get(key) : void 0;
  }

  // @ts-ignore
  set(key: string, value, maxAge) {
    super.set(key, value);
    this.expires.set(key, this.now() + this.ms(maxAge));
    return this;
  }

  clear() {
    this.expires.clear();
    return super.clear();
  }

  proxy(fn: any, maxAge: any) {
    const cache = this;
    const fnkey = hashobj(fn);
    return function () {
      const args = Array.prototype.slice.apply(arguments);
      let key = `${fnkey}:${hashobj(args)}`;
      if (cache.has(key)) {
        return Promise.resolve(cache.get(key));
      } else {
        return new Promise((resolve, reject) => {
          try {
            resolve(fn.apply(null, args));
          } catch (err) {
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


export default Cache;
