import { useState } from 'react';
import { observer } from 'mobx-react-lite';

import clearIcon from '../assets/Arrow _ Arrow Down 7.svg';
import { Input } from '../shared/ui/input';
import { formStore } from '../stores/formStore';
import { parseAddressCheck } from '../utils/addressCheck';

export const ConnectionAddressInput = observer(function ConnectionAddressInput() {
  const [error, setError] = useState('');
  const [fiasId, setFiasId] = useState('');
  const [warning, setWarning] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const handleChange = (nextValue: string) => {
    formStore.setConnectionAddress(nextValue);
    setError('');
    setFiasId('');
    setWarning('');
    formStore.setConnectionAddressStatus('empty');
  };

  const handleBlur = () => {
    const trimmedAddress = formStore.connectionAddress.trim();

    if (!trimmedAddress) {
      setError('Обязательное поле');
      setFiasId('');
      setWarning('');
      formStore.setConnectionAddressStatus('empty');
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
          formStore.setConnectionAddressStatus('empty');
          return;
        }

        formStore.setConnectionAddress(checkedAddress.result);

        if (checkedAddress.error) {
          setError(checkedAddress.error);
          setFiasId('');
          setWarning('');
          formStore.setConnectionAddressStatus('empty');
          return;
        }

        setFiasId(checkedAddress.fiasId);
        setWarning(checkedAddress.warning);
        setError('');
        formStore.setConnectionAddressStatus('success');
      })
      .catch(() => {
        setError('Не удалось проверить адрес');
        setFiasId('');
        setWarning('');
        formStore.setConnectionAddressStatus('empty');
      })
      .finally(() => {
        setIsChecking(false);
      });
  };

  const handleClear = () => {
    formStore.setConnectionAddress('');
    setError('');
    setFiasId('');
    setWarning('');
    formStore.setConnectionAddressStatus('empty');
  };

  const inputColor = error ? 'bg-input-error' : 'bg-grey';

  return (
    <div className="flex h-auto w-[720px] flex-col gap-[8px]">
      <label
        htmlFor="connection-address"
        className="flex h-[24px] w-fit items-center gap-[4px] font-onest text-[16px] font-[600] leading-[24px]"
      >
        <span>Адрес подключения</span>
        <span className="text-red50">*</span>
      </label>

      <div className="relative h-[56px] w-[720px]">
        <Input
          id="connection-address"
          className={`h-[56px] w-[720px] rounded-[8px] border-0 py-[16px] pl-[16px] pr-[48px] font-onest text-[16px] font-[500] leading-[24px] text-grey8 outline-none placeholder:text-grey8 ${inputColor}`}
          placeholder="Указать адрес "
          value={formStore.connectionAddress}
          onChange={(event) => handleChange(event.target.value)}
          onBlur={handleBlur}
        />

        {formStore.connectionAddress ? (
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
  );
});
