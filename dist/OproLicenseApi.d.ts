import { OptroLicenseResponse } from "./types/types";
declare class OptroLicenseApi {
    private cache;
    private readonly apiKey;
    private readonly powerUpId;
    constructor(apiKey: string, powerupId: string, maxAge?: string, interval?: string);
    getBoardLicenseStatus(boardId: string): Promise<OptroLicenseResponse>;
    getMemberLicenseStatus(memberId: string): Promise<OptroLicenseResponse>;
}
export default OptroLicenseApi;
