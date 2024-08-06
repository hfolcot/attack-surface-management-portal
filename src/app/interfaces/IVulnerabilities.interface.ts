export interface IVulnerabilities {
    catalogVersion: string;
    count: number;
    dateReleased: string;
    title: string;
    vulnerabilities: IVulnerability[];
}

export interface IVulnerability {
    cveID: string;
    cwes: any[];
    dateAdded: string;
    dueDate: string[];
    knownRansomwareCampaignUse: string;
    notes: string;
    product: string;
    requiredAction: string;
    shortDescription: string;
    vendorProject: string;
    vulnerabilityName: string;
}