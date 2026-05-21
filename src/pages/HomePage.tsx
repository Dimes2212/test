import * as Dialog from '@radix-ui/react-dialog';
import { ChevronsRight, MoreHorizontal, Square } from 'lucide-react';
import { observer } from 'mobx-react-lite';

import { ConnectionAddressInput } from '../components/connectionAddressInput';
import { FormActionButtons } from '../components/formActionButtons';
import { InnInput } from '../components/innInput';
import { LegalAddressInput } from '../components/legalAddressInput';
import { OrganizationNameTextarea } from '../components/organizationNameTextarea';
import { OrgDropdown } from '../components/organizationDropdown';
import arrowRightSmIcon from '../assets/arrow _ right-sm.svg';
import { Button } from '../shared/ui/button';
import { formStore } from '../stores/formStore';

export const HomePage = observer(function HomePage() {
  return (
    <Dialog.Root>
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Dialog.Trigger asChild>
          <Button
            variant="primary"
            className="h-[48px] w-[200px] rounded-[8px] bg-blue6 px-[24px] font-onest text-[16px] font-[400] leading-[24px] text-white"
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
                  className="size-[24px] text-text-primary"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <Square className="size-[24px] text-text-primary" aria-hidden="true" />
              </div>

              <MoreHorizontal className="size-[24px] text-text-primary" aria-hidden="true" />
            </div>

            <div className="flex justify-center px-[32px] py-[32px]">
              <div className="flex w-[760px] max-w-[760px] flex-col gap-[32px]">
                <div className="flex w-[760px] flex-col gap-[24px]">
                  <div className="flex h-[24px] w-[760px] items-center gap-[8px]">
                    <div className="flex h-[24px] w-[76px] items-center gap-[4px]">
                      <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center">
                        <img src={arrowRightSmIcon} className="h-[24px] w-[24px]" alt="" />
                      </span>
                      <span className="font-onest text-[16px] font-[500] leading-[24px] text-link-blue">
                        Назад
                      </span>
                    </div>

                    <span className="flex h-[24px] w-[6px] items-center justify-center font-onest text-[16px] font-[500] leading-[24px] text-grey11">
                      •
                    </span>

                    <span className="h-[24px] w-[662px] truncate font-onest text-[16px] font-[500] leading-[24px] text-grey11">
                      Технические неисправности на рабочем месте
                    </span>
                  </div>

                  <Dialog.Title className="h-[38px] w-[760px] font-onest text-[32px] font-[600] leading-[38px] text-text-primary">
                    Запрос новых ТУ
                  </Dialog.Title>
                </div>

                <div className="flex h-[798px] w-[760px] flex-col gap-[32px]">
                  <OrgDropdown
                    value={formStore.organizationType}
                    onChange={formStore.setOrganizationType}
                  />
                  <div className="flex w-[760px] flex-col">
                    <OrganizationNameTextarea
                      value={formStore.organizationName}
                      onChange={formStore.setOrganizationName}
                      onStepStatusChange={formStore.setOrganizationNameStatus}
                    />
                    <InnInput
                      value={formStore.inn}
                      onChange={formStore.setInn}
                      onCheckInn={formStore.checkInn}
                      onLegalAddressFound={formStore.setLegalAddress}
                      onStepStatusChange={formStore.setInnStatus}
                    />
                    <LegalAddressInput
                      value={formStore.legalAddress}
                      onChange={formStore.setLegalAddress}
                      onCheckAddress={formStore.checkAddress}
                      onStepStatusChange={formStore.setLegalAddressStatus}
                    />
                  </div>
                  <label className="flex h-[24px] w-[720px] items-center gap-[10px] font-onest text-[16px] font-[500] leading-[24px] text-text-primary">
                    <input
                      type="checkbox"
                      className="h-[18px] w-[18px] accent-blue5"
                      checked={formStore.shouldShowConnectionAddress}
                      onChange={(event) =>
                        formStore.setShouldShowConnectionAddress(event.target.checked)
                      }
                    />
                    <span>Юридический адрес не совпадает с адресом подключения</span>
                  </label>
                  {formStore.shouldShowConnectionAddress ? (
                    <ConnectionAddressInput
                      value={formStore.connectionAddress}
                      onChange={formStore.setConnectionAddress}
                      onCheckAddress={formStore.checkAddress}
                      onStepStatusChange={formStore.setConnectionAddressStatus}
                    />
                  ) : null}
                  {formStore.formError ? (
                    <span className="pl-[40px] font-onest text-[12px] leading-[16px] text-red50">
                      {formStore.formError}
                    </span>
                  ) : null}
                  <FormActionButtons onSubmit={formStore.handleSubmit} />
                </div>
              </div>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
});
