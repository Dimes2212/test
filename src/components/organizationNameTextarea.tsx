import { useState } from 'react';

import Check from '../assets/check.svg?react';
import { Progress } from '../shared/ui/progress';
import { Textarea } from '../shared/ui/textarea';
import type { OrganizationNameTextareaProps } from '../types/componentProps';
import type { StepStatus } from '../types/request';

export function OrganizationNameTextarea({
  value,
  onChange,
  onStepStatusChange,
}: OrganizationNameTextareaProps) {
  const [stepStatus, setStepStatus] = useState<StepStatus>('empty');

  const changeStepStatus = (status: StepStatus) => {
    setStepStatus(status);
    onStepStatusChange(status);
  };

  const handleChange = (nextValue: string) => {
    onChange(nextValue);
    changeStepStatus('empty');
  };

  const handleBlur = () => {
    changeStepStatus(value.trim() ? 'success' : 'empty');
  };

  return (
    <div className="flex h-[150px] w-[760px] gap-[16px]">
      <div
        className={`flex min-h-[150px] flex-col items-center ${
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

      <div className="flex h-[126px] w-[720px] flex-col gap-[8px]">
        <label
          htmlFor="organization-name"
          className="flex h-[24px] w-[294px] items-center gap-[4px] font-onest text-[16px] font-[600] leading-[24px]"
        >
          <span>Полное наименование организации</span>
          <span className="text-red50">*</span>
        </label>

        <div className="relative h-[94px] w-[720px]">
          <Textarea
            id="organization-name"
            className="h-[94px] w-[720px] resize-none rounded-[8px] border-0 bg-grey p-[16px] font-onest text-[16px] font-[500] leading-[24px] text-grey8 outline-none placeholder:text-grey8"
            placeholder="Укажите наименование организации"
            value={value}
            onChange={(event) => handleChange(event.target.value)}
            onBlur={handleBlur}
          />

          <span className="pointer-events-none absolute bottom-[-9px] right-[-9px] h-[18px] w-[18px] rounded-br-[20px] border-b-[2px] border-r-[2px] border-blue5" />
        </div>
      </div>
    </div>
  );
}
