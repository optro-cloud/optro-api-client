"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
var ms_1 = require("ms");
var object_hash_1 = require("object-hash");
var Cache = (function (_super) {
    __extends(Cache, _super);
    function Cache(maxAge, interval) {
        var _this = _super.call(this) || this;
        _this.maxAge = _this.ms(maxAge) || Infinity;
        _this.expires = new Map();
        interval = _this.ms(interval);
        _this.interval = interval > 0 && interval < Infinity ?
            setInterval(_this.trim.bind(_this), interval) :
            null;
        return _this;
    }
    Cache.prototype.ms = function (ttl) {
        switch (typeof ttl) {
            case 'string':
                ttl = ms_1["default"](ttl);
                break;
            case 'number':
                ttl = Math.floor(ttl);
                break;
            default:
                break;
        }
        return ttl > 0 ? ttl : this.maxAge;
    };
    Cache.prototype.now = function () {
        return Date.now();
    };
    Cache.prototype.has = function (key) {
        return _super.prototype.has.call(this, key) && this.expires.get(key) > this.now();
    };
    Cache.prototype["delete"] = function (key) {
        this.expires["delete"](key);
        return _super.prototype["delete"].call(this, key);
    };
    Cache.prototype.trim = function () {
        var e_1, _a, e_2, _b;
        var now = this.now();
        var keys = new Set();
        try {
            for (var _c = __values(this.expires), _d = _c.next(); !_d.done; _d = _c.next()) {
                var pair = _d.value;
                if (pair[1] < now) {
                    keys.add(pair[0]);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                var key = keys_1_1.value;
                _super.prototype["delete"].call(this, key);
                this.expires["delete"](key);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (keys_1_1 && !keys_1_1.done && (_b = keys_1["return"])) _b.call(keys_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return keys;
    };
    Cache.prototype.check = function (key) {
        return this.expires.get(key) > this.now();
    };
    Cache.prototype.get = function (key) {
        return this.check(key) ? _super.prototype.get.call(this, key) : void 0;
    };
    Cache.prototype.set = function (key, value, maxAge) {
        _super.prototype.set.call(this, key, value);
        this.expires.set(key, this.now() + this.ms(maxAge));
        return this;
    };
    Cache.prototype.clear = function () {
        this.expires.clear();
        return _super.prototype.clear.call(this);
    };
    Object.defineProperty(Cache.prototype, "size", {
        get: function () {
            this.trim();
            return _super.prototype.size;
        },
        enumerable: false,
        configurable: true
    });
    Cache.prototype.proxy = function (fn, maxAge) {
        var cache = this;
        var fnkey = object_hash_1["default"](fn);
        return function () {
            var args = Array.prototype.slice.apply(arguments);
            var key = fnkey + ":" + object_hash_1["default"](args);
            if (cache.has(key)) {
                return Promise.resolve(cache.get(key));
            }
            else {
                return new Promise(function (resolve, reject) {
                    try {
                        resolve(fn.apply(null, args));
                    }
                    catch (err) {
                        reject(err);
                    }
                }).then(function (results) {
                    return cache.set(key, results, maxAge).get(key);
                });
            }
        };
    };
    return Cache;
}(Map));
exports["default"] = Cache;
var mapiter = Map.prototype[Symbol.iterator];
Cache.prototype.entries = function cacheEntries() {
    var _a, _b, pair, e_3_1;
    var e_3, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 5, 6, 7]);
                _a = __values(this), _b = _a.next();
                _d.label = 1;
            case 1:
                if (!!_b.done) return [3, 4];
                pair = _b.value;
                return [4, pair];
            case 2:
                _d.sent();
                _d.label = 3;
            case 3:
                _b = _a.next();
                return [3, 1];
            case 4: return [3, 7];
            case 5:
                e_3_1 = _d.sent();
                e_3 = { error: e_3_1 };
                return [3, 7];
            case 6:
                try {
                    if (_b && !_b.done && (_c = _a["return"])) _c.call(_a);
                }
                finally { if (e_3) throw e_3.error; }
                return [7];
            case 7: return [2];
        }
    });
};
Cache.prototype.keys = function cacheKeys() {
    var _a, _b, pair, e_4_1;
    var e_4, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 5, 6, 7]);
                _a = __values(this), _b = _a.next();
                _d.label = 1;
            case 1:
                if (!!_b.done) return [3, 4];
                pair = _b.value;
                return [4, pair[0]];
            case 2:
                _d.sent();
                _d.label = 3;
            case 3:
                _b = _a.next();
                return [3, 1];
            case 4: return [3, 7];
            case 5:
                e_4_1 = _d.sent();
                e_4 = { error: e_4_1 };
                return [3, 7];
            case 6:
                try {
                    if (_b && !_b.done && (_c = _a["return"])) _c.call(_a);
                }
                finally { if (e_4) throw e_4.error; }
                return [7];
            case 7: return [2];
        }
    });
};
Cache.prototype.values = function cacheValues() {
    var _a, _b, pair, e_5_1;
    var e_5, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 5, 6, 7]);
                _a = __values(this), _b = _a.next();
                _d.label = 1;
            case 1:
                if (!!_b.done) return [3, 4];
                pair = _b.value;
                return [4, pair[1]];
            case 2:
                _d.sent();
                _d.label = 3;
            case 3:
                _b = _a.next();
                return [3, 1];
            case 4: return [3, 7];
            case 5:
                e_5_1 = _d.sent();
                e_5 = { error: e_5_1 };
                return [3, 7];
            case 6:
                try {
                    if (_b && !_b.done && (_c = _a["return"])) _c.call(_a);
                }
                finally { if (e_5) throw e_5.error; }
                return [7];
            case 7: return [2];
        }
    });
};
Cache.prototype[Symbol.iterator] = function cacheIterator() {
    var now, _a, _b, pair, e_6_1;
    var e_6, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                now = this.now();
                _d.label = 1;
            case 1:
                _d.trys.push([1, 6, 7, 8]);
                _a = __values(mapiter.apply(this)), _b = _a.next();
                _d.label = 2;
            case 2:
                if (!!_b.done) return [3, 5];
                pair = _b.value;
                if (!(this.expires.get(pair[0]) > now)) return [3, 4];
                return [4, pair];
            case 3:
                _d.sent();
                _d.label = 4;
            case 4:
                _b = _a.next();
                return [3, 2];
            case 5: return [3, 8];
            case 6:
                e_6_1 = _d.sent();
                e_6 = { error: e_6_1 };
                return [3, 8];
            case 7:
                try {
                    if (_b && !_b.done && (_c = _a["return"])) _c.call(_a);
                }
                finally { if (e_6) throw e_6.error; }
                return [7];
            case 8: return [2];
        }
    });
};
//# sourceMappingURL=cache.js.map