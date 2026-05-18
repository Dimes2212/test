import axios from 'axios';
import { useState } from 'react';

import clearIcon from '../shared/Arrow _ Arrow Down 7.svg';
import pipelineDoneIcon from '../shared/Component 359.svg';
import pipelineDotIcon from '../shared/Ellipse 78.svg';

type DadataPartyResponse = {
  suggestions?: Array<{
    data?: {
      inn?: string;
    };
  }>;
};

const DADATA_PARTY_FIND_BY_ID_URL =
  'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party';

export function InnInput() {
  const [inn, setInn] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [stepStatus, setStepStatus] = useState('empty');

  const handleChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 12);

    setInn(digitsOnly);
    setStepStatus(digitsOnly ? 'typing' : 'empty');

    if (error) {
      setError('');
    }
  };

  const handleBlur = async () => {
    if (!inn) {
      setError('');
      setStepStatus('empty');
      return;
    }

    if (inn.length !== 10 && inn.length !== 12) {
      setError('ИНН должен содержать 10 или 12 цифр');
      setStepStatus('typing');
      return;
    }

    setIsChecking(true);

    try {
      const response = await axios.post<DadataPartyResponse>(
        DADATA_PARTY_FIND_BY_ID_URL,
        { query: inn },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Token ${import.meta.env.VITE_DADATA_API_KEY}`,
          },
        },
      );

      const formattedInn = response.data.suggestions?.[0]?.data?.inn;

      if (!formattedInn) {
        setError('ИНН не найден');
        setStepStatus('typing');
        return;
      }

      setInn(formattedInn);
      setError('');
      setStepStatus('success');
    } catch (requestError) {
      if (axios.isAxiosError(requestError) && requestError.response) {
        setError(`DaData вернула ошибку ${requestError.response.status}`);
      } else {
        setError('Не удалось проверить ИНН');
      }

      setStepStatus('typing');
    } finally {
      setIsChecking(false);
    }
  };

  const handleClear = () => {
    setInn('');
    setError('');
    setStepStatus('empty');
  };

  const lineColor = stepStatus === 'empty' ? 'bg-[rgb(229,232,240)]' : 'bg-[rgba(36,109,249,1)]';
  const circleClass =
    stepStatus === 'typing'
      ? 'flex h-[24px] w-[24px] rounded-[24px] border-[2px] border-[rgba(36,109,249,1)] p-[4px]'
      : 'flex h-[24px] w-[24px] p-[8px]';
  const inputColor = error ? 'bg-[rgba(255,235,235,1)]' : 'bg-[rgba(244,246,252,1)]';

  return (
    <div className="flex h-[112px] w-[760px] gap-[16px]">
      <div className="flex h-[112px] w-[24px] flex-col items-center gap-[4px]">
        {stepStatus === 'success' ? (
          <img src={pipelineDoneIcon} className="h-[24px] w-[24px]" alt="" />
        ) : (
          <div className={circleClass}>
            {stepStatus === 'empty' ? (
              <img src={pipelineDotIcon} className="h-[8px] w-[8px]" alt="" />
            ) : null}
          </div>
        )}
        <div className={`h-[76px] w-[2px] rounded-full ${lineColor}`} />
      </div>

      <div className="flex w-[720px] flex-col gap-[8px]">
        <label
          htmlFor="organization-inn"
          className="flex h-[24px] items-center gap-[4px] font-onest text-[16px] font-semibold leading-[24px]"
        >
          <span>ИНН</span>
          <span className="text-[rgb(252,34,34)]">*</span>
        </label>

        <div className="relative h-[56px] w-[720px]">
          <input
            id="organization-inn"
            className={`h-[56px] w-[720px] rounded-[8px] border-0 py-[16px] pl-[16px] pr-[48px] font-onest text-[16px] font-medium leading-[24px] text-[rgba(82,82,102,1)] outline-none placeholder:text-[rgba(82,82,102,1)] ${inputColor}`}
            placeholder="Указать ИНН"
            value={inn}
            inputMode="numeric"
            maxLength={12}
            onChange={(event) => handleChange(event.target.value)}
            onBlur={() => void handleBlur()}
          />

          {inn ? (
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
        {error ? (
          <span className="font-onest text-[12px] leading-[16px] text-[rgb(252,34,34)]">
            {error}
          </span>
        ) : null}
      </div>
    </div>
  );
}
