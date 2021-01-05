"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptroPowerupApi = exports.OptroLicenseApi = void 0;
const cache_1 = require("./cache");
const api_1 = require("./api");
class OptroLicenseApi {
    constructor(apiKey, powerupId, maxAge, interval) {
        this.cache = null;
        this.apiKey = null;
        this.powerUpId = null;
        this.apiKey = apiKey;
        this.powerUpId = powerupId;
        this.cache = new cache_1.default(maxAge, interval);
    }
    getBoardLicenseStatus(boardId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cachedValue = this.cache.get(`board_${boardId}`);
            if (typeof cachedValue !== "undefined") {
                return cachedValue;
            }
            else {
                const liveValue = yield api_1.fetchLicenseStatus({ powerupId: this.powerUpId, boardId: boardId }, this.apiKey);
                this.cache.set(`board_${boardId}`, liveValue, undefined);
                return liveValue;
            }
        });
    }
    getMemberLicenseStatus(memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cachedValue = this.cache.get(`member_${memberId}`);
            if (typeof cachedValue !== "undefined") {
                return cachedValue;
            }
            else {
                const liveValue = yield api_1.fetchLicenseStatus({ powerupId: this.powerUpId, memberId: memberId }, this.apiKey);
                this.cache.set(`member_${memberId}`, liveValue, undefined);
                return liveValue;
            }
        });
    }
}
exports.OptroLicenseApi = OptroLicenseApi;
class OptroPowerupApi {
    constructor(apiKey) {
        this.apiKey = null;
        this.apiKey = apiKey;
    }
}
exports.OptroPowerupApi = OptroPowerupApi;
//# sourceMappingURL=index.js.map