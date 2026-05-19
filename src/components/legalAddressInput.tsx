import { useEffect, useState } from 'react';

import clearIcon from '../shared/Arrow _ Arrow Down 7.svg';
import pipelineDoneIcon from '../shared/Component 359.svg';
import pipelineDotIcon from '../shared/Ellipse 78.svg';

type DadataCleanAddressResponse = {
  result?: string;
  fias_id?: string;
  qc?: number;
  qc_complete?: number;
};

type LegalAddressInputProps = {
  value: string;
  onChange: (value: string) => void;
  onCheckAddress: (address: string) => Promise<DadataCleanAddressResponse[]>;
};

export function LegalAddressInput({ value, onChange, onCheckAddress }: LegalAddressInputProps) {
  const [error, setError] = useState('');
  const [fiasId, setFiasId] = useState('');
  const [warning, setWarning] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [stepStatus, setStepStatus] = useState('empty');

  useEffect(() => {
    if (!value.trim()) {
      setError('');
      setFiasId('');
      setWarning('');
      setStepStatus('empty');
      return;
    }

    if (stepStatus === 'empty') {
      setStepStatus('typing');
    }
  }, [value, stepStatus]);

  const handleChange = (value: string) => {
    onChange(value);
    setError('');
    setFiasId('');
    setWarning('');
    setStepStatus(value.trim() ? 'typing' : 'empty');
  };

  const handleBlur = async () => {
    const trimmedAddress = value.trim();

    if (!trimmedAddress) {
      setError('Обязательное поле');
      setFiasId('');
      setWarning('');
      setStepStatus('empty');
      return;
    }

    setIsChecking(true);

    try {
      const data = await onCheckAddress(trimmedAddress);
      const cleanedAddress = data[0];

      if (!cleanedAddress?.result) {
        setError('Адрес не найден');
        setFiasId('');
        setWarning('');
        setStepStatus('typing');
        return;
      }

      onChange(cleanedAddress.result);

      if (cleanedAddress.qc === 2) {
        setError('Адрес пустой или не распознан');
        setFiasId('');
        setWarning('');
        setStepStatus('typing');
        return;
      }

      setFiasId(cleanedAddress.fias_id ?? '');
      setWarning(
        cleanedAddress.qc === 1 || cleanedAddress.qc === 3 ? 'Проверьте адрес вручную' : '',
      );
      setError('');
      setStepStatus('success');
    } catch {
      setError('Не удалось проверить адрес');
      setFiasId('');
      setWarning('');
      setStepStatus('typing');
    } finally {
      setIsChecking(false);
    }
  };

  const handleClear = () => {
    onChange('');
    setError('');
    setFiasId('');
    setWarning('');
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
          htmlFor="legal-address"
          className="flex h-[24px] items-center gap-[4px] font-onest text-[16px] font-semibold leading-[24px]"
        >
          <span>Юридический адрес</span>
          <span className="text-[rgb(252,34,34)]">*</span>
        </label>

        <div className="relative h-[56px] w-[720px]">
          <input
            id="legal-address"
            className={`h-[56px] w-[720px] rounded-[8px] border-0 py-[16px] pl-[16px] pr-[48px] font-onest text-[16px] font-medium leading-[24px] text-[rgba(82,82,102,1)] outline-none placeholder:text-[rgba(82,82,102,1)] ${inputColor}`}
            placeholder="Указать адрес"
            value={value}
            onChange={(event) => handleChange(event.target.value)}
            onBlur={() => void handleBlur()}
          />

          {value ? (
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
          <span className="font-onest text-[12px] leading-[16px] text-[rgb(252,34,34)]">
            {error}
          </span>
        ) : null}
      </div>
    </div>
  );
}
