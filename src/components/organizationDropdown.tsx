import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../shared/ui/dropdown-menu';
import type { OrgDropdownProps } from '../types/componentProps';

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

export function OrgDropdown({ value, onChange }: OrgDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-auto w-[760px]">
      <div className="flex h-[88px] w-[760px] flex-col justify-center gap-[8px]">
        <label
          htmlFor="organization-type"
          className="flex h-[24px] w-fit gap-[4px] font-onest text-[16px] font-[600] leading-[24px]"
        >
          <span>Тип организации</span>
          <span className="text-red50">*</span>
        </label>

        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger
            id="organization-type"
            className="flex h-[56px] w-full items-center justify-between rounded-[8px] border-[2px] border-grey bg-grey px-[16px] font-onest text-[16px] leading-[24px] text-grey11 outline-none"
          >
            <span>{value || 'Выбрать'}</span>
            <ChevronDown className="size-[24px] text-text-primary" aria-hidden="true" />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            sideOffset={4}
            align="start"
            className="w-[760px] rounded-[16px] bg-white px-[20px] py-[24px] shadow-[0_16px_32px_var(--color-shadow-modal)]"
          >
            {organizationOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                className="flex h-[40px] w-[720px] items-center rounded-[8px] px-[16px] py-[8px] font-onest text-[16px] font-[500] leading-[24px] text-text-primary outline-none hover:bg-grey data-[highlighted]:bg-grey"
                onSelect={() => onChange(option.value)}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
