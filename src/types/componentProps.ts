import type { DadataCleanAddressResponse, DadataPartyResponse } from './dadata';
import type { StepStatus } from './request';

export type FormActionButtonsProps = {
  onSubmit: () => void;
  onCancel: () => void;
};

export type OrgDropdownProps = {
  value: string;
  onChange: (value: string) => void;
};

export type OrganizationNameTextareaProps = {
  value: string;
  onChange: (value: string) => void;
  onStepStatusChange: (status: StepStatus) => void;
};

export type InnInputProps = {
  value: string;
  onChange: (value: string) => void;
  onCheckInn: (inn: string) => Promise<DadataPartyResponse>;
  onLegalAddressFound: (address: string) => void;
  onStepStatusChange: (status: StepStatus) => void;
};

export type LegalAddressInputProps = {
  value: string;
  onChange: (value: string) => void;
  onCheckAddress: (address: string) => Promise<DadataCleanAddressResponse[]>;
  onStepStatusChange: (status: StepStatus) => void;
};

export type ConnectionAddressInputProps = {
  value: string;
  onChange: (value: string) => void;
  onCheckAddress: (address: string) => Promise<DadataCleanAddressResponse[]>;
  onStepStatusChange: (status: StepStatus) => void;
};
