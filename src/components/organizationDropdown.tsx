import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const organizationOptions = [
  {
    value: 'Подведомственное учреждение ЦИО',
    label: 'Подведомственное учреждение ЦИО',
  },
  {
    value: 'Другое',
    label: 'Другое',
  },
];

export function OrgDropdown() {
  const [organizationType, setOrganizationType] = useState('');

  return (
    <div className="h-auto w-[760px]">
      <div className="flex h-[88px] w-[760px] flex-col justify-center gap-[8px]">
        <label
          htmlFor="organization-type"
          className="flex h-[24px] w-fit gap-[4px] font-onest text-[16px] font-semibold leading-[24px]"
        >
          <span>Тип организации</span>
          <span className="text-[rgb(252,34,34)]">*</span>
        </label>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger
            id="organization-type"
            className="flex h-[56px] w-full items-center justify-between rounded-[8px] border-[2px] border-[rgba(244,246,252,1)] bg-[rgba(244,246,252,1)] px-[16px] font-onest text-[16px] leading-[24px] text-[#56566D] outline-none"
          >
            <span>{organizationType || 'Выбрать'}</span>
            <ChevronDown className="size-[24px] text-[#171821]" aria-hidden="true" />
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              sideOffset={4}
              align="start"
              className="w-[760px] rounded-[16px] bg-white px-[20px] py-[24px] shadow-[0_16px_32px_rgba(20,49,81,0.16)]"
            >
              {organizationOptions.map((option) => (
                <DropdownMenu.Item
                  key={option.value}
                  className="flex h-[40px] w-[720px] items-center rounded-[8px] px-[16px] py-[8px] font-onest text-[16px] font-medium leading-[24px] text-[#171821] outline-none hover:bg-[rgba(244,246,252,1)] data-[highlighted]:bg-[rgba(244,246,252,1)]"
                  onSelect={() => setOrganizationType(option.value)}
                >
                  {option.label}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
}
