export interface OptroPowerup {
    id: string;
    name: string;
    overview: string;
    icon: string;
    icon100: string;
    banner: string;
    links: string;
    vendor: {
        id: string;
        name: string;
    };
}

export interface OptroPowerupFull extends OptroPowerup {
    description: string;
    featuresFree: string[];
    featuresPro: string[];
    images: string[];
    licensingModel: "board" | "user";
    price: {
        id: string;
        active: boolean;
        currency: string;
        unit_amount: number;
        unit_amount_decimal: string;
    };
}

export interface OptroLicenseResponse {
    isRegistered: boolean;
    isLicensed: boolean;
}

export interface OptroBoardLicenseStatus {
    powerupId: string;
    boardId: string;
}

export interface OptroUserLicenseStatus {
    powerupId: string;
    memberId: string;
}

export interface OptroLicenseRequest {
    powerupId: string;
    boardId?: string;
    memberId?: string;
}
