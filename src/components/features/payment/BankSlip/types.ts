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
  META_ROW: 'flex justify-between text-sm',
  META_LABEL: 'text-text/60',
  META_VALUE: 'font-semibold text-primary',
  BARCODE: 'w-full bg-white border border-secondary rounded p-2',
  INSTRUCTION: 'text-xs text-text/60',
} as const;
