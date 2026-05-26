export type DadataPartyResponse = {
  suggestions?: Array<{
    data?: {
      inn?: string;
      address?: {
        value?: string;
        unrestricted_value?: string;
      };
    };
  }>;
};

export type DadataCleanAddressResponse = {
  result?: string;
  fias_id?: string;
  inn?: string;
  data?: {
    inn?: string;
  };
  qc?: number;
  qc_complete?: number;
};
