import { useState } from 'react';

import pipelineDoneIcon from '../shared/Component 359.svg';
import pipelineDotIcon from '../shared/Ellipse 78.svg';

export function OrganizationNameTextarea() {
  const [organizationName, setOrganizationName] = useState('');
  const [stepStatus, setStepStatus] = useState('empty');

  const handleChange = (value: string) => {
    setOrganizationName(value);
    setStepStatus(value.trim() ? 'typing' : 'empty');
  };

  const handleBlur = () => {
    setStepStatus(organizationName.trim() ? 'success' : 'empty');
  };

  const lineColor = stepStatus === 'empty' ? 'bg-[rgb(229,232,240)]' : 'bg-[rgba(36,109,249,1)]';
  const circleClass =
    stepStatus === 'typing'
      ? 'flex h-[24px] w-[24px] rounded-[24px] border-[2px] border-[rgba(36,109,249,1)] p-[4px]'
      : 'flex h-[24px] w-[24px] p-[8px]';

  return (
    <div className="flex h-[150px] w-[760px] gap-[16px]">
      <div className="flex h-[150px] w-[24px] flex-col items-center gap-[4px]">
        {stepStatus === 'success' ? (
          <img src={pipelineDoneIcon} className="h-[24px] w-[24px]" alt="" />
        ) : (
          <div className={circleClass}>
            {stepStatus === 'empty' ? (
              <img src={pipelineDotIcon} className="h-[8px] w-[8px]" alt="" />
            ) : null}
          </div>
        )}
        <div className={`h-[114px] w-[2px] rounded-full ${lineColor}`} />
      </div>

      <div className="flex h-[126px] w-[720px] flex-col gap-[8px]">
        <label
          htmlFor="organization-name"
          className="flex h-[24px] w-[294px] items-center gap-[4px] font-onest text-[16px] font-semibold leading-[24px]"
        >
          <span>Полное наименование организации</span>
          <span className="text-[rgb(252,34,34)]">*</span>
        </label>

        <div className="relative h-[94px] w-[720px]">
          <textarea
            id="organization-name"
            className="h-[94px] w-[720px] resize-none rounded-[8px] border-0 bg-[rgba(244,246,252,1)] p-[16px] font-onest text-[16px] font-medium leading-[24px] text-[rgba(82,82,102,1)] outline-none placeholder:text-[rgba(82,82,102,1)]"
            placeholder="Укажите наименование организации"
            value={organizationName}
            onChange={(event) => handleChange(event.target.value)}
            onBlur={handleBlur}
          />

          <span className="pointer-events-none absolute bottom-[-9px] right-[-9px] h-[18px] w-[18px] rounded-br-[20px] border-b-[2px] border-r-[2px] border-[rgba(36,109,249,1)]" />
        </div>
      </div>
    </div>
  );
}
