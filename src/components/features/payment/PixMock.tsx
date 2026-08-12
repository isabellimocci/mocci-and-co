import React, { useMemo, useState } from 'react';
import { generateQRCode } from '../../../utils/qrcode.utils';
import { formatCurrency } from '../../../utils/currency.utils';

const QR_SIZE = 160;
const MIN_KEY_LENGTH = 5;

interface PixMockProps {
  value: string;
  amount: number;
  testId?: string;
}

const styles = {
  container:
    'flex flex-col items-center gap-3 p-6 bg-white/70 rounded border border-secondary w-full max-w-md',
  title: 'font-bold text-primary text-lg',
  amount: 'text-2xl font-cardo font-bold text-primary',
  qr: 'bg-white p-2 rounded',
  copyRow: 'w-full flex items-center gap-2',
  key: 'flex-1 truncate font-mono text-xs bg-secondary/40 rounded px-3 py-2 text-text/80',
  copyBtn:
    'shrink-0 px-3 py-2 text-xs font-semibold uppercase border border-text text-text hover:bg-primary hover:text-white transition-colors',
  instructionsTitle: 'self-start text-sm font-semibold text-primary mt-1',
  instructions: 'self-start text-xs text-text/80 list-decimal list-inside space-y-1',
  disclaimer: 'mt-2 text-xs text-text/60',
};

const INSTRUCTIONS = [
  'Open your bank app and choose Pix.',
  'Select "Pay with QR Code" or "Pix Copia e Cola".',
  'Scan the code above or paste the key below.',
  'Check the amount and confirm the payment.',
];

const PixMock: React.FC<PixMockProps> = ({ value, amount, testId = 'pix-mock' }) => {
  const isValidKey = value.length >= MIN_KEY_LENGTH;
  const [copied, setCopied] = useState(false);

  const qrSvg = useMemo(() => {
    if (!isValidKey) return null;
    return generateQRCode({ content: value, size: QR_SIZE });
  }, [value, isValidKey]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  if (!isValidKey) {
    return (
      <div className={styles.container} data-testid={testId}>
        <span className={styles.title}>Invalid Pix Key</span>
        <p className={styles.disclaimer}>
          The Pix key must be at least {MIN_KEY_LENGTH} characters long.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container} data-testid={testId}>
      <span className={styles.title}>Pay with Pix</span>
      <span className={styles.amount}>{formatCurrency(amount)}</span>
      {qrSvg && (
        <div
          className={styles.qr}
          dangerouslySetInnerHTML={{ __html: qrSvg }}
          aria-label="QR Code for Pix payment"
          role="img"
        />
      )}
      <div className={styles.copyRow}>
        <span className={styles.key} title={value}>
          {value}
        </span>
        <button type="button" className={styles.copyBtn} onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <span className={styles.instructionsTitle}>How to pay</span>
      <ol className={styles.instructions}>
        {INSTRUCTIONS.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
      <div className={styles.disclaimer}>This QR Code is for testing purposes only.</div>
    </div>
  );
};

export default PixMock;
