import Cache from "./cache";
import {fetchLicenseStatus} from "./api";

/**
 * Main File for the Optro License API.
 * It exports a Class.
 * @author: Optro Market
 * @when:   2020
 */
export class OptroLicenseApi {
    private cache: Cache = null;
    private readonly apiKey: string = null;
    private readonly powerUpId: string = null;

    public constructor(apiKey: string, powerupId: string, maxAge: string, interval: string) {
        this.apiKey = apiKey;
        this.powerUpId = powerupId;
        this.cache = new Cache(maxAge, interval);
    }

    /**
     * Find out if a particular Trello Board has been licensed.
     * @param boardId   The Trello Board ID
     */
    public async getBoardLicenseStatus(boardId: string) {
        const cachedValue = this.cache?.get(`board_${boardId}`);
        if (typeof cachedValue !== "undefined") {
            return cachedValue;
        } else {
            const liveValue = await fetchLicenseStatus({powerupId: this.powerUpId, boardId: boardId}, this.apiKey);
            this.cache?.set(`board_${boardId}`, liveValue, undefined);
            return liveValue;
        }
    }

    /**
     * Find out if a particular Trello Member has been licensed.
     * @param memberId   The Trello Member ID (actually Atlassian Account ID now)
     */
    public async getMemberLicenseStatus(memberId: string) {
        const cachedValue = this.cache.get(`member_${memberId}`);
        if (typeof cachedValue !== "undefined") {
            return cachedValue;
        } else {
            const liveValue = await fetchLicenseStatus({powerupId: this.powerUpId, memberId: memberId}, this.apiKey);
            this.cache.set(`member_${memberId}`, liveValue, undefined);
            return liveValue;
        }
    }
}

export class OptroPowerupApi {
    private readonly apiKey: string = null;

    public constructor(apiKey: string) {
        this.apiKey = apiKey;
    }
    
    // TODO: Add additional methods:
    //  (a) Listing Power-ups
    //  (b) Get Power-up Pricing
    //  (c) Vendor API (with secret key auth)
}
