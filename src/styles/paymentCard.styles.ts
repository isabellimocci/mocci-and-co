export const PAYMENT_CARD_STYLES = {
  container:
    'flex flex-col gap-3 p-6 bg-white/70 rounded border border-secondary w-full max-w-md',
  title: 'font-bold text-primary text-lg',
  codeRow: 'w-full flex items-center gap-2',
  code:
    'flex-1 truncate bg-secondary/40 rounded px-3 py-2 text-xs font-mono tracking-wide text-text/80',
  copyButton:
    'shrink-0 px-3 py-2 text-xs font-semibold uppercase border border-text text-text hover:bg-primary hover:text-white transition-colors',
  instructionsTitle: 'text-sm font-semibold text-primary mt-1',
  instructions: 'text-xs text-text/80 list-decimal list-inside space-y-1',
  disclaimer: 'mt-2 text-xs text-text/60',
} as const;
