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
exports.fetchLicenseStatus = void 0;
function fetchLicenseStatus(request, apiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield fetch("https://api.optro.cloud/1.0/license", {
                method: 'POST',
                mode: 'cors',
                headers: { "x-api-key": apiKey },
                body: JSON.stringify(Object.assign({}, request))
            });
            return result.json();
        }
        catch (e) {
            console.error("Optro License Check Failed. Silently failing back to FREE Mode. Make sure api.optro.cloud is reachable", e);
            return { isLicensed: false, isRegistered: false };
        }
    });
}
exports.fetchLicenseStatus = fetchLicenseStatus;
//# sourceMappingURL=api.js.map