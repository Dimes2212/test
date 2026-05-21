import { useState } from 'react';

import clearIcon from '../shared/Arrow _ Arrow Down 7.svg';
import { Input } from '../shared/ui/input';

type StepStatus = 'empty' | 'success';

type DadataCleanAddressResponse = {
  result?: string;
  fias_id?: string;
  qc?: number;
  qc_complete?: number;
};

type ConnectionAddressInputProps = {
  value: string;
  onChange: (value: string) => void;
  onCheckAddress: (address: string) => Promise<DadataCleanAddressResponse[]>;
  onStepStatusChange: (status: StepStatus) => void;
};

export function ConnectionAddressInput({
  value,
  onChange,
  onCheckAddress,
  onStepStatusChange,
}: ConnectionAddressInputProps) {
  const [error, setError] = useState('');
  const [fiasId, setFiasId] = useState('');
  const [warning, setWarning] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const handleChange = (nextValue: string) => {
    onChange(nextValue);
    setError('');
    setFiasId('');
    setWarning('');
    onStepStatusChange('empty');
  };

  const handleBlur = async () => {
    const trimmedAddress = value.trim();

    if (!trimmedAddress) {
      setError('Обязательное поле');
      setFiasId('');
      setWarning('');
      onStepStatusChange('empty');
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
        onStepStatusChange('empty');
        return;
      }

      onChange(cleanedAddress.result);

      if (cleanedAddress.qc === 2) {
        setError('Адрес пустой или не распознан');
        setFiasId('');
        setWarning('');
        onStepStatusChange('empty');
        return;
      }

      setFiasId(cleanedAddress.fias_id ?? '');
      setWarning(
        cleanedAddress.qc === 1 || cleanedAddress.qc === 3 ? 'Проверьте адрес вручную' : '',
      );
      setError('');
      onStepStatusChange('success');
    } catch {
      setError('Не удалось проверить адрес');
      setFiasId('');
      setWarning('');
      onStepStatusChange('empty');
    } finally {
      setIsChecking(false);
    }
  };

  const handleClear = () => {
    onChange('');
    setError('');
    setFiasId('');
    setWarning('');
    onStepStatusChange('empty');
  };

  const inputColor = error ? 'bg-[rgba(255,235,235,1)]' : 'bg-[rgba(244,246,252,1)]';

  return (
    <div className="flex h-auto w-[720px] flex-col gap-[8px]">
      <label
        htmlFor="connection-address"
        className="flex h-[24px] w-fit items-center gap-[4px] font-onest text-[16px] font-[600] leading-[24px]"
      >
        <span>Адрес подключения</span>
        <span className="text-[rgb(252,34,34)]">*</span>
      </label>

      <div className="relative h-[56px] w-[720px]">
        <Input
          id="connection-address"
          className={`h-[56px] w-[720px] rounded-[8px] border-0 py-[16px] pl-[16px] pr-[48px] font-onest text-[16px] font-[500] leading-[24px] text-[rgba(82,82,102,1)] outline-none placeholder:text-[rgba(82,82,102,1)] ${inputColor}`}
          placeholder="Указать адрес "
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
        <span className="font-onest text-[12px] leading-[16px] text-[rgb(252,34,34)]">{error}</span>
      ) : null}
    </div>
  );
}
