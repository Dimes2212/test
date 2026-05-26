import { useEffect, useState } from 'react';

import clearIcon from '../assets/Arrow _ Arrow Down 7.svg';
import Check from '../assets/check.svg?react';
import { Input } from '../shared/ui/input';
import { Progress } from '../shared/ui/progress';
import type { InnInputProps } from '../types/componentProps';
import type { StepStatus } from '../types/request';

export function InnInput({
  value,
  onChange,
  onCheckInn,
  onLegalAddressFound,
  onStepStatusChange,
}: InnInputProps) {
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [stepStatus, setStepStatus] = useState<StepStatus>('empty');

  const changeStepStatus = (status: StepStatus) => {
    setStepStatus(status);
    onStepStatusChange(status);
  };

  useEffect(() => {
    if (!value) {
      setError('');
      setStepStatus('empty');
      onStepStatusChange('empty');
      return;
    }
  }, [value, onStepStatusChange]);

  const handleChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 12);

    onChange(digitsOnly);
    changeStepStatus('empty');

    if (error) {
      setError('');
    }
  };

  const handleBlur = () => {
    if (!value) {
      setError('');
      changeStepStatus('empty');
      return;
    }

    if (value.length !== 10 && value.length !== 12) {
      setError('ИНН должен содержать 10 или 12 цифр');
      changeStepStatus('empty');
      return;
    }

    setIsChecking(true);

    onCheckInn(value)
      .then((data) => {
        const organization = data.suggestions?.[0];
        const formattedInn = organization?.data?.inn;
        const legalAddress =
          organization?.data?.address?.unrestricted_value ||
          organization?.data?.address?.value ||
          '';

        if (!formattedInn) {
          setError('ИНН не найден');
          changeStepStatus('empty');
          return;
        }

        onChange(formattedInn);
        onLegalAddressFound(legalAddress);
        setError('');
        changeStepStatus('success');
      })
      .catch(() => {
        setError('Не удалось проверить ИНН');
        changeStepStatus('empty');
      })
      .finally(() => {
        setIsChecking(false);
      });
  };

  const handleClear = () => {
    onChange('');
    onLegalAddressFound('');
    setError('');
    changeStepStatus('empty');
  };

  const inputColor = error ? 'bg-input-error' : 'bg-grey';

  return (
    <div className="flex h-[112px] w-[760px] gap-[16px]">
      <div
        className={`flex min-h-[112px] flex-col items-center ${
          stepStatus === 'success' ? 'transition-all duration-300' : ''
        }`}
      >
        <div
          className={`min-w-[24px] mb-2 min-h-[24px] rounded-full flex justify-center items-center ${
            stepStatus === 'success' ? 'bg-blue' : ''
          }`}
        >
          {stepStatus === 'success' ? <Check /> : <div className="bg-grey4 w-2 h-2 rounded-full" />}
        </div>
        <Progress
          value={stepStatus === 'success' ? 100 : 0}
          orientation="vertical"
          className="h-full max-w-1 mb-2 transition-all duration-300"
        />
      </div>

      <div className="flex w-[720px] flex-col gap-[8px]">
        <label
          htmlFor="organization-inn"
          className="flex h-[24px] items-center gap-[4px] font-onest text-[16px] font-[600] leading-[24px]"
        >
          <span>ИНН</span>
          <span className="text-red50">*</span>
        </label>

        <div className="relative h-[56px] w-[720px]">
          <Input
            id="organization-inn"
            className={`h-[56px] w-[720px] rounded-[8px] border-0 py-[16px] pl-[16px] pr-[56px] font-onest text-[16px] font-[500] leading-[24px] text-grey8 outline-none placeholder:text-grey8 ${inputColor}`}
            placeholder="Указать ИНН"
            value={value}
            inputMode="numeric"
            maxLength={12}
            onChange={(event) => handleChange(event.target.value)}
            onBlur={handleBlur}
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
          <span className="font-onest text-[12px] leading-[16px] text-grey8">Проверяется...</span>
        ) : null}
        {error ? (
          <span className="font-onest text-[12px] leading-[16px] text-red50">{error}</span>
        ) : null}
      </div>
    </div>
  );
}
