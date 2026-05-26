import type { DadataCleanAddressResponse } from '../types/dadata';

export type AddressCheckResult = {
  result: string;
  fiasId: string;
  warning: string;
  error: string;
};

export function parseAddressCheck(data: DadataCleanAddressResponse[]): AddressCheckResult {
  const checkedAddress = data[0];

  if (!checkedAddress?.result) {
    return {
      result: '',
      fiasId: '',
      warning: '',
      error: 'Адрес не найден',
    };
  }

  if (checkedAddress.qc === 2) {
    return {
      result: checkedAddress.result,
      fiasId: '',
      warning: '',
      error: 'Адрес пустой или не распознан',
    };
  }

  return {
    result: checkedAddress.result,
    fiasId: checkedAddress.fias_id ?? '',
    warning: checkedAddress.qc === 1 || checkedAddress.qc === 3 ? 'Проверьте адрес вручную' : '',
    error: '',
  };
}
