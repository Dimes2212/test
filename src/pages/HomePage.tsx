import axios from 'axios';
import { ChevronsRight, MoreHorizontal, Square } from 'lucide-react';
import { useState } from 'react';

import { ConnectionAddressInput } from '../components/connectionAddressInput';
import { FormActionButtons } from '../components/formActionButtons';
import { InnInput } from '../components/innInput';
import { LegalAddressInput } from '../components/legalAddressInput';
import { OrganizationNameTextarea } from '../components/organizationNameTextarea';
import { OrgDropdown } from '../components/organizationDropdown';
import arrowRightSmIcon from '../shared/arrow _ right-sm.svg';

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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export function HomePage() {
  const [shouldShowConnectionAddress, setShouldShowConnectionAddress] = useState(false);
  const [inn, setInn] = useState('');
  const [legalAddress, setLegalAddress] = useState('');

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

  return (
    <div className="min-h-screen bg-white">
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

      <div className="flex justify-center pt-[32px]">
        <div className="flex w-[760px] max-w-[760px] flex-col gap-[32px]">
          <div className="flex w-[760px] flex-col gap-[24px]">
            <div className="flex h-[24px] w-[760px] items-center gap-[8px]">
              <div className="flex h-[24px] w-[76px] items-center gap-[4px]">
                <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center">
                  <img src={arrowRightSmIcon} className="h-[24px] w-[24px]" alt="" />
                </span>
                <span className="font-onest text-[16px] font-medium leading-[24px] text-[#246BFE]">
                  Назад
                </span>
              </div>

              <span className="flex h-[24px] w-[6px] items-center justify-center font-onest text-[16px] font-medium leading-[24px] text-[#56566D]">
                •
              </span>

              <span className="h-[24px] w-[662px] truncate font-onest text-[16px] font-medium leading-[24px] text-[#56566D]">
                Технические неисправности на рабочем месте
              </span>
            </div>

            <div className="h-[38px] w-[760px] font-onest text-[32px] font-semibold leading-[38px] text-[#171821]">
              Запрос новых ТУ
            </div>
          </div>

          <div className="flex h-[798px] w-[760px] flex-col gap-[32px]">
            <OrgDropdown />
            <div className="flex w-[760px] flex-col">
              <OrganizationNameTextarea />
              <InnInput
                value={inn}
                onChange={setInn}
                onCheckInn={checkInn}
                onLegalAddressFound={setLegalAddress}
              />
              <LegalAddressInput
                value={legalAddress}
                onChange={setLegalAddress}
                onCheckAddress={checkAddress}
              />
            </div>
            <label className="flex h-[24px] w-[720px] items-center gap-[10px] font-onest text-[16px] font-medium leading-[24px] text-[#171821]">
              <input
                type="checkbox"
                className="h-[18px] w-[18px] accent-[rgba(36,109,249,1)]"
                checked={shouldShowConnectionAddress}
                onChange={(event) => setShouldShowConnectionAddress(event.target.checked)}
              />
              <span>Юридический адрес не совпадает с адресом подключения</span>
            </label>
            {shouldShowConnectionAddress ? (
              <ConnectionAddressInput onCheckAddress={checkAddress} />
            ) : null}
            <FormActionButtons />
          </div>
        </div>
      </div>
    </div>
  );
}
