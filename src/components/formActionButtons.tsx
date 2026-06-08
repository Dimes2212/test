import * as Dialog from '@radix-ui/react-dialog';

import { Button } from '../shared/ui/button';
import { formStore } from '../stores/formStore';

export function FormActionButtons() {
  return (
    <div className="flex h-[48px] w-[760px] gap-[10px] pl-[40px]">
      <Button
        type="button"
        variant="primary"
        onClick={formStore.handleSubmit}
        className="h-[48px] w-[355px] rounded-[8px] bg-blue6 px-[24px] py-[12px] font-onest text-[16px] font-[400] leading-[24px]"
      >
        <span className="h-[24px] w-[138px] text-left">Отправить заявку</span>
      </Button>

      <Dialog.Close asChild>
        <Button
          type="button"
          variant="secondary"
          onClick={formStore.resetForm}
          className="h-[48px] w-[355px] border-border-primary px-[24px] py-[12px] font-onest leading-[24px] text-grey8"
        >
          <span className="w-[75px] text-left">Отменить</span>
        </Button>
      </Dialog.Close>
    </div>
  );
}
