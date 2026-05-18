import axios from 'axios';
import { useState } from 'react';

import clearIcon from '../shared/Arrow _ Arrow Down 7.svg';

type DadataCleanAddressResponse = {
  result?: string;
  fias_id?: string;
  qc?: number;
  qc_complete?: number;
};

const DADATA_ADDRESS_CLEAN_URL = '/dadata-clean/api/v1/clean/address';

export function ConnectionAddressInput() {
  const [connectionAddress, setConnectionAddress] = useState('');
  const [error, setError] = useState('');
  const [fiasId, setFiasId] = useState('');
  const [warning, setWarning] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const handleChange = (value: string) => {
    setConnectionAddress(value);
    setError('');
    setFiasId('');
    setWarning('');
  };

  const handleBlur = async () => {
    const trimmedAddress = connectionAddress.trim();

    if (!trimmedAddress) {
      setError('Обязательное поле');
      setFiasId('');
      setWarning('');
      return;
    }

    setIsChecking(true);

    try {
      const response = await axios.post<DadataCleanAddressResponse[]>(
        DADATA_ADDRESS_CLEAN_URL,
        [trimmedAddress],
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Token ${import.meta.env.VITE_DADATA_API_KEY}`,
            'X-Secret': import.meta.env.VITE_DADATA_SECRET_KEY,
          },
        },
      );

      const cleanedAddress = response.data[0];

      if (!cleanedAddress?.result) {
        setError('Адрес не найден');
        setFiasId('');
        setWarning('');
        return;
      }

      setConnectionAddress(cleanedAddress.result);

      if (cleanedAddress.qc === 2) {
        setError('Адрес пустой или не распознан');
        setFiasId('');
        setWarning('');
        return;
      }

      setFiasId(cleanedAddress.fias_id ?? '');
      setWarning(
        cleanedAddress.qc === 1 || cleanedAddress.qc === 3 ? 'Проверьте адрес вручную' : '',
      );
      setError('');
    } catch (requestError) {
      if (axios.isAxiosError(requestError) && requestError.response) {
        setError(`DaData вернула ошибку ${requestError.response.status}`);
      } else {
        setError('Не удалось проверить адрес');
      }

      setFiasId('');
      setWarning('');
    } finally {
      setIsChecking(false);
    }
  };

  const handleClear = () => {
    setConnectionAddress('');
    setError('');
    setFiasId('');
    setWarning('');
  };

  const inputColor = error ? 'bg-[rgba(255,235,235,1)]' : 'bg-[rgba(244,246,252,1)]';

  return (
    <div className="flex h-auto w-[720px] flex-col gap-[8px]">
      <label
        htmlFor="connection-address"
        className="flex h-[24px] w-fit items-center gap-[4px] font-onest text-[16px] font-semibold leading-[24px]"
      >
        <span>Адрес подключения</span>
        <span className="text-[rgb(252,34,34)]">*</span>
      </label>

      <div className="relative h-[56px] w-[720px]">
        <input
          id="connection-address"
          className={`h-[56px] w-[720px] rounded-[8px] border-0 py-[16px] pl-[16px] pr-[48px] font-onest text-[16px] font-medium leading-[24px] text-[rgba(82,82,102,1)] outline-none placeholder:text-[rgba(82,82,102,1)] ${inputColor}`}
          placeholder="Указать адрес "
          value={connectionAddress}
          onChange={(event) => handleChange(event.target.value)}
          onBlur={() => void handleBlur()}
        />

        {connectionAddress ? (
          <button
            type="button"
            className="absolute right-[16px] top-[16px] h-[24px] w-[24px]"
            onMouseDown={(event) => event.preventDefault()}
            onClick={handleClear}
          >
            <img src={clearIcon} className="h-[24px] w-[24px]" alt="" />
          </button>
        ) : null}
      </div>

      {isChecking ? (
        <span className="font-onest text-[12px] leading-[16px] text-[rgba(82,82,102,1)]">
          Проверяется...
        </span>
      ) : null}
      {fiasId ? (
        <span className="font-onest text-[12px] leading-[16px] text-[rgba(82,82,102,1)]">
          ФИАС: {fiasId}
        </span>
      ) : null}
      {warning ? (
        <span className="font-onest text-[12px] leading-[16px] text-[rgba(82,82,102,1)]">
          {warning}
        </span>
      ) : null}
      {error ? (
        <span className="font-onest text-[12px] leading-[16px] text-[rgb(252,34,34)]">{error}</span>
      ) : null}
    </div>
  );
}
