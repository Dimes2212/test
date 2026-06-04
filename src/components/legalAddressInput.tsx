import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import clearIcon from '../assets/Arrow _ Arrow Down 7.svg';
import Check from '../assets/check.svg?react';
import { Input } from '../shared/ui/input';
import { Progress } from '../shared/ui/progress';
import { formStore } from '../stores/formStore';
import { parseAddressCheck } from '../utils/addressCheck';

export const LegalAddressInput = observer(function LegalAddressInput() {
  const [error, setError] = useState('');
  const [fiasId, setFiasId] = useState('');
  const [warning, setWarning] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const stepStatus = formStore.legalAddressStatus;

  useEffect(() => {
    if (!formStore.legalAddress.trim()) {
      setError('');
      setFiasId('');
      setWarning('');
      formStore.setLegalAddressStatus('empty');
      return;
    }
  }, [formStore.legalAddress]);

  const handleChange = (value: string) => {
    formStore.setLegalAddress(value);
    setError('');
    setFiasId('');
    setWarning('');
    formStore.setLegalAddressStatus('empty');
  };

  const handleBlur = () => {
    const trimmedAddress = formStore.legalAddress.trim();

    if (!trimmedAddress) {
      setError('Обязательное поле');
      setFiasId('');
      setWarning('');
      formStore.setLegalAddressStatus('empty');
      return;
    }

    setIsChecking(true);

    formStore
      .checkAddress(trimmedAddress)
      .then((data) => {
        const checkedAddress = parseAddressCheck(data);

        if (!checkedAddress.result) {
          setError(checkedAddress.error);
          setFiasId('');
          setWarning('');
          formStore.setLegalAddressStatus('empty');
          return;
        }

        formStore.setLegalAddress(checkedAddress.result);

        if (checkedAddress.error) {
          setError(checkedAddress.error);
          setFiasId('');
          setWarning('');
          formStore.setLegalAddressStatus('empty');
          return;
        }

        setFiasId(checkedAddress.fiasId);
        setWarning(checkedAddress.warning);
        setError('');
        formStore.setLegalAddressStatus('success');
      })
      .catch(() => {
        setError('Не удалось проверить адрес');
        setFiasId('');
        setWarning('');
        formStore.setLegalAddressStatus('empty');
      })
      .finally(() => {
        setIsChecking(false);
      });
  };

  const handleClear = () => {
    formStore.setLegalAddress('');
    setError('');
    setFiasId('');
    setWarning('');
    formStore.setLegalAddressStatus('empty');
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
          htmlFor="legal-address"
          className="flex h-[24px] items-center gap-[4px] font-onest text-[16px] font-[600] leading-[24px]"
        >
          <span>Юридический адрес</span>
          <span className="text-red50">*</span>
        </label>

        <div className="relative h-[56px] w-[720px]">
          <Input
            id="legal-address"
            className={`h-[56px] w-[720px] rounded-[8px] border-0 py-[16px] pl-[16px] pr-[48px] font-onest text-[16px] font-[500] leading-[24px] text-grey8 outline-none placeholder:text-grey8 ${inputColor}`}
            placeholder="Указать адрес"
            value={formStore.legalAddress}
            onChange={(event) => handleChange(event.target.value)}
            onBlur={handleBlur}
          />

          {formStore.legalAddress ? (
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
        {fiasId ? (
          <span className="font-onest text-[12px] leading-[16px] text-grey8">ФИАС: {fiasId}</span>
        ) : null}
        {warning ? (
          <span className="font-onest text-[12px] leading-[16px] text-grey8">{warning}</span>
        ) : null}
        {error ? (
          <span className="font-onest text-[12px] leading-[16px] text-red50">{error}</span>
        ) : null}
      </div>
    </div>
  );
});
