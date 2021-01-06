import { OptroBoardLicenseStatus, OptroUserLicenseStatus } from "./types";
export declare class OptroLicenseApi {
    private cache;
    private readonly apiKey;
    private readonly powerUpId;
    constructor(apiKey: string, powerupId: string, maxAge: string, interval: string);
    getBoardLicenseStatus(boardId: string): Promise<OptroBoardLicenseStatus>;
    getMemberLicenseStatus(memberId: string): Promise<OptroUserLicenseStatus>;
}
