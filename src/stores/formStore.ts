import axios from 'axios';
import { makeAutoObservable } from 'mobx';

import type { DadataCleanAddressResponse, DadataPartyResponse } from '../types/dadata';
import type { RequestData, StepStatus } from '../types/request';

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

  getRequestData(): RequestData {
    return {
      organizationType: this.organizationType,
      organizationName: this.organizationName,
      inn: this.inn,
      legalAddress: this.legalAddress,
      shouldShowConnectionAddress: this.shouldShowConnectionAddress,
      connectionAddress: this.connectionAddress,
    };
  }

  sendRequest(data: RequestData) {
    return axios.post('/api/requests', data);
  }

  resetForm() {
    this.shouldShowConnectionAddress = false;
    this.organizationType = '';
    this.organizationName = '';
    this.inn = '';
    this.legalAddress = '';
    this.connectionAddress = '';
    this.organizationNameStatus = 'empty';
    this.innStatus = 'empty';
    this.legalAddressStatus = 'empty';
    this.connectionAddressStatus = 'empty';
    this.formError = '';
  }

  handleSubmit() {
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

    return this.sendRequest(this.getRequestData())
      .then(() => {
        this.resetForm();
      })
      .catch(() => {
        this.setFormError('Не удалось отправить заявку');
      });
  }
}

export const formStore = new FormStore();
