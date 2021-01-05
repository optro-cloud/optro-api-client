"use strict";
import {OptroLicenseRequest} from "./types";

/**
 * Fetch the License Status from the Optro License API
 * @param request   A request, representing what is being checked.
 * @param apiKey    The API Key that is used to authorize this Power-up.
 */
export async function fetchLicenseStatus(request: OptroLicenseRequest, apiKey: string) {
    try {
        const result = await fetch("https://api.optro.cloud/1.0/license", {
            method: 'POST',
            mode: 'cors',
            headers: {"x-api-key": apiKey},
            body: JSON.stringify({...request})
        });
        return result.json();
    } catch (e) {
        console.error("Optro License Check Failed. Silently failing back to FREE Mode. Make sure api.optro.cloud is reachable", e);
        return {isLicensed: false, isRegistered: false};
    }
}
