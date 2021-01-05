export declare class OptroLicenseApi {
    private cache;
    private readonly apiKey;
    private readonly powerUpId;
    constructor(apiKey: string, powerupId: string, maxAge: string, interval: string);
    getBoardLicenseStatus(boardId: string): Promise<any>;
    getMemberLicenseStatus(memberId: string): Promise<any>;
}
export declare class OptroPowerupApi {
    private readonly apiKey;
    constructor(apiKey: string);
}
