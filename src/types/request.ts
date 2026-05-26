export type StepStatus = 'empty' | 'success';

export type RequestData = {
  organizationType: string;
  organizationName: string;
  inn: string;
  legalAddress: string;
  shouldShowConnectionAddress: boolean;
  connectionAddress: string;
};
