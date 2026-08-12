export interface BankSlipProps {
  value: string;
  amount: number;
}

export const BANK_SLIP_MESSAGES = {
  TITLE: 'Pay with Bank Slip',
  INVALID_CODE: 'Invalid bank slip code',
  TEST_DISCLAIMER: 'This bank slip is for testing purposes only',
  AMOUNT_LABEL: 'Amount',
  DUE_LABEL: 'Due date',
  HOW_TO_TITLE: 'How to pay',
} as const;

export const BANK_SLIP_INSTRUCTIONS = [
  'Copy the digitable line below.',
  'Open your bank app and choose "Pay a boleto".',
  'Paste the line or scan the barcode.',
  'Check the amount and due date, then confirm.',
] as const;

export const BANK_SLIP_STYLES = {
  CONTAINER:
    'flex flex-col gap-3 p-6 bg-white/80 rounded border border-secondary w-full max-w-md',
  TITLE: 'font-bold text-primary text-lg text-center',
  META_ROW: 'flex justify-between text-sm',
  META_LABEL: 'text-text/60',
  META_VALUE: 'font-semibold text-primary',
  BARCODE: 'w-full bg-white border border-secondary rounded p-2',
  CODE_ROW: 'flex items-center gap-2',
  CODE_DISPLAY:
    'flex-1 truncate bg-secondary/40 rounded px-3 py-2 text-xs font-mono tracking-wide text-text/80',
  COPY_BTN:
    'shrink-0 px-3 py-2 text-xs font-semibold uppercase border border-text text-text hover:bg-primary hover:text-white transition-colors',
  INSTRUCTION: 'text-xs text-text/60',
  INSTRUCTIONS_TITLE: 'text-sm font-semibold text-primary mt-1',
  INSTRUCTIONS: 'text-xs text-text/80 list-decimal list-inside space-y-1',
  DISCLAIMER: 'mt-2 text-xs text-text/60 text-center',
} as const;
