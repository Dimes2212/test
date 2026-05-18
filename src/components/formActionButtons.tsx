export function FormActionButtons() {
  return (
    <div className="flex h-[48px] w-[760px] gap-[10px] pl-[40px]">
      <button
        type="button"
        className="flex h-[48px] w-[355px] items-center justify-center gap-[8px] rounded-[8px] bg-[rgba(20,95,245,1)] px-[24px] py-[12px] font-onest text-[16px] font-normal leading-[24px] text-white"
      >
        <span className="h-[24px] w-[138px] text-left">Отправить заявку</span>
      </button>

      <button
        type="button"
        className="flex h-[48px] w-[355px] items-center justify-center gap-[8px] rounded-[8px] border border-[rgba(183,183,204,1)] px-[24px] py-[12px] font-onest text-[16px] font-normal leading-[24px] text-[rgba(82,82,102,1)]"
      >
        <span className="w-[75px] text-left">Отменить</span>
      </button>
    </div>
  );
}
