import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronsRight, MoreHorizontal, Square } from 'lucide-react';
import { useState } from 'react';

import { ConnectionAddressInput } from '../components/connectionAddressInput';
import { FormActionButtons } from '../components/formActionButtons';
import { InnInput } from '../components/innInput';
import { LegalAddressInput } from '../components/legalAddressInput';
import { OrganizationNameTextarea } from '../components/organizationNameTextarea';
import { OrgDropdown } from '../components/organizationDropdown';
import arrowRightSmIcon from '../shared/arrow _ right-sm.svg';
import { Button } from '../shared/ui/button';

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

type StepStatus = 'empty' | 'success';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export function HomePage() {
  const [shouldShowConnectionAddress, setShouldShowConnectionAddress] = useState(false);
  const [organizationType, setOrganizationType] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [inn, setInn] = useState('');
  const [legalAddress, setLegalAddress] = useState('');
  const [connectionAddress, setConnectionAddress] = useState('');
  const [organizationNameStatus, setOrganizationNameStatus] = useState<StepStatus>('empty');
  const [innStatus, setInnStatus] = useState<StepStatus>('empty');
  const [legalAddressStatus, setLegalAddressStatus] = useState<StepStatus>('empty');
  const [connectionAddressStatus, setConnectionAddressStatus] = useState<StepStatus>('empty');
  const [formError, setFormError] = useState('');

  const checkInn = async (inn: string) => {
    const response = await axios.post<DadataPartyResponse>(
      `${API_BASE_URL}/api/dadata/find-party`,
      { inn },
    );

    return response.data;
  };

  const checkAddress = async (address: string) => {
    const response = await axios.post<DadataCleanAddressResponse[]>(
      `${API_BASE_URL}/api/dadata/clean-address`,
      { address },
    );

    return response.data;
  };

  const handleSubmit = () => {
    const isFormValid =
      Boolean(organizationType) &&
      organizationNameStatus === 'success' &&
      innStatus === 'success' &&
      legalAddressStatus === 'success' &&
      (!shouldShowConnectionAddress || connectionAddressStatus === 'success');

    if (!isFormValid) {
      setFormError('Заполните и проверьте все обязательные поля');
      return;
    }

    setFormError('');

    const requestData = {
      organizationType,
      organizationName,
      inn,
      legalAddress,
      shouldShowConnectionAddress,
      connectionAddress,
    };

    console.log(requestData);
  };

  return (
    <Dialog.Root>
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Dialog.Trigger asChild>
          <Button
            variant="primary"
            className="h-[48px] w-[200px] rounded-[8px] bg-[rgba(20,95,245,1)] px-[24px] font-onest text-[16px] font-[400] leading-[24px] text-white"
          >
            Открыть форму
          </Button>
        </Dialog.Trigger>
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <div className="fixed inset-0 flex justify-center py-[24px]">
          <Dialog.Content className="h-full w-[824px] overflow-y-auto bg-white">
            <div className="flex h-[56px] w-full items-center justify-between bg-white px-[24px]">
              <div className="flex h-[24px] w-[56px] items-center justify-center gap-[8px]">
                <ChevronsRight
                  className="size-[24px] text-[#171821]"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <Square className="size-[24px] text-[#171821]" aria-hidden="true" />
              </div>

              <MoreHorizontal className="size-[24px] text-[#171821]" aria-hidden="true" />
            </div>

            <div className="flex justify-center px-[32px] py-[32px]">
              <div className="flex w-[760px] max-w-[760px] flex-col gap-[32px]">
                <div className="flex w-[760px] flex-col gap-[24px]">
                  <div className="flex h-[24px] w-[760px] items-center gap-[8px]">
                    <div className="flex h-[24px] w-[76px] items-center gap-[4px]">
                      <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center">
                        <img src={arrowRightSmIcon} className="h-[24px] w-[24px]" alt="" />
                      </span>
                      <span className="font-onest text-[16px] font-[500] leading-[24px] text-[#246BFE]">
                        Назад
                      </span>
                    </div>

                    <span className="flex h-[24px] w-[6px] items-center justify-center font-onest text-[16px] font-[500] leading-[24px] text-[#56566D]">
                      •
                    </span>

                    <span className="h-[24px] w-[662px] truncate font-onest text-[16px] font-[500] leading-[24px] text-[#56566D]">
                      Технические неисправности на рабочем месте
                    </span>
                  </div>

                  <Dialog.Title className="h-[38px] w-[760px] font-onest text-[32px] font-[600] leading-[38px] text-[#171821]">
                    Запрос новых ТУ
                  </Dialog.Title>
                </div>

                <div className="flex h-[798px] w-[760px] flex-col gap-[32px]">
                  <OrgDropdown value={organizationType} onChange={setOrganizationType} />
                  <div className="flex w-[760px] flex-col">
                    <OrganizationNameTextarea
                      value={organizationName}
                      onChange={setOrganizationName}
                      onStepStatusChange={setOrganizationNameStatus}
                    />
                    <InnInput
                      value={inn}
                      onChange={setInn}
                      onCheckInn={checkInn}
                      onLegalAddressFound={setLegalAddress}
                      onStepStatusChange={setInnStatus}
                    />
                    <LegalAddressInput
                      value={legalAddress}
                      onChange={setLegalAddress}
                      onCheckAddress={checkAddress}
                      onStepStatusChange={setLegalAddressStatus}
                    />
                  </div>
                  <label className="flex h-[24px] w-[720px] items-center gap-[10px] font-onest text-[16px] font-[500] leading-[24px] text-[#171821]">
                    <input
                      type="checkbox"
                      className="h-[18px] w-[18px] accent-[rgba(36,109,249,1)]"
                      checked={shouldShowConnectionAddress}
                      onChange={(event) => setShouldShowConnectionAddress(event.target.checked)}
                    />
                    <span>Юридический адрес не совпадает с адресом подключения</span>
                  </label>
                  {shouldShowConnectionAddress ? (
                    <ConnectionAddressInput
                      value={connectionAddress}
                      onChange={setConnectionAddress}
                      onCheckAddress={checkAddress}
                      onStepStatusChange={setConnectionAddressStatus}
                    />
                  ) : null}
                  {formError ? (
                    <span className="pl-[40px] font-onest text-[12px] leading-[16px] text-[rgb(252,34,34)]">
                      {formError}
                    </span>
                  ) : null}
                  <FormActionButtons onSubmit={handleSubmit} />
                </div>
              </div>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
