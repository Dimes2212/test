import axios from 'axios';
import { makeAutoObservable } from 'mobx';

export type StepStatus = 'empty' | 'success';

type DadataPartyResponse = {
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

type DadataCleanAddressResponse = {
  result?: string;
  fias_id?: string;
  inn?: string;
  data?: {
    inn?: string;
  };
  qc?: number;
  qc_complete?: number;
};

class FormStore {
  shouldShowConnectionAddress = false;
  organizationType = '';
  organizationName = '';
  inn = '';
  legalAddress = '';
  connectionAddress = '';
  organizationNameStatus: StepStatus = 'empty';
  innStatus: StepStatus = 'empty';
  legalAddressStatus: StepStatus = 'empty';
  connectionAddressStatus: StepStatus = 'empty';
  formError = '';

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setShouldShowConnectionAddress(value: boolean) {
    this.shouldShowConnectionAddress = value;
  }

  setOrganizationType(value: string) {
    this.organizationType = value;
  }

  setOrganizationName(value: string) {
    this.organizationName = value;
  }

  setInn(value: string) {
    this.inn = value;
  }

  setLegalAddress(value: string) {
    this.legalAddress = value;
  }

  setConnectionAddress(value: string) {
    this.connectionAddress = value;
  }

  setOrganizationNameStatus(status: StepStatus) {
    this.organizationNameStatus = status;
  }

  setInnStatus(status: StepStatus) {
    this.innStatus = status;
  }

  setLegalAddressStatus(status: StepStatus) {
    this.legalAddressStatus = status;
  }

  setConnectionAddressStatus(status: StepStatus) {
    this.connectionAddressStatus = status;
  }

  setFormError(value: string) {
    this.formError = value;
  }

  checkInn(inn: string) {
    return axios
      .post<DadataPartyResponse>('/api/dadata/find-party', { query: inn })
      .then((response) => response.data);
  }

  checkAddress(address: string) {
    return axios
      .post<DadataCleanAddressResponse[]>('/api/dadata/clean-address', [address])
      .then((response) => response.data);
  }

  handleSubmit = () => {
    const isFormValid =
      Boolean(this.organizationType) &&
      this.organizationNameStatus === 'success' &&
      this.innStatus === 'success' &&
      this.legalAddressStatus === 'success' &&
      (!this.shouldShowConnectionAddress || this.connectionAddressStatus === 'success');

    if (!isFormValid) {
      this.setFormError('Заполните и проверьте все обязательные поля');
      return;
    }

    this.setFormError('');

    const requestData = {
      organizationType: this.organizationType,
      organizationName: this.organizationName,
      inn: this.inn,
      legalAddress: this.legalAddress,
      shouldShowConnectionAddress: this.shouldShowConnectionAddress,
      connectionAddress: this.connectionAddress,
    };

    console.log(requestData);
  };
}

export const formStore = new FormStore();
