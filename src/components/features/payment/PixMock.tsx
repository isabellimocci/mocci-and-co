import React, { useMemo } from 'react';
import { generateQRCode } from '../../../utils/qrcode.utils';
import { formatCurrency } from '../../../utils/currency.utils';
import { PAYMENT_CARD_STYLES } from '../../../styles/paymentCard.styles';
import CopyableCode from './CopyableCode';

const QR_SIZE = 160;
const MIN_KEY_LENGTH = 5;

interface PixMockProps {
  value: string;
  amount: number;
  testId?: string;
}

const styles = {
  container: `${PAYMENT_CARD_STYLES.container} items-center`,
  amount: 'text-2xl font-cardo font-bold text-primary',
  qr: 'bg-white p-2 rounded',
  instructionsTitle: `${PAYMENT_CARD_STYLES.instructionsTitle} self-start`,
  instructions: `${PAYMENT_CARD_STYLES.instructions} self-start`,
};

const INSTRUCTIONS = [
  'Open your bank app and choose Pix.',
  'Select "Pay with QR Code" or "Pix Copia e Cola".',
  'Scan the code above or paste the key below.',
  'Check the amount and confirm the payment.',
];

const PixMock: React.FC<PixMockProps> = ({ value, amount, testId = 'pix-mock' }) => {
  const isValidKey = value.length >= MIN_KEY_LENGTH;

  const qrSvg = useMemo(() => {
    if (!isValidKey) return null;
    return generateQRCode({ content: value, size: QR_SIZE });
  }, [value, isValidKey]);

  if (!isValidKey) {
    return (
      <div className={styles.container} data-testid={testId}>
        <span className={PAYMENT_CARD_STYLES.title}>Invalid Pix Key</span>
        <p className={PAYMENT_CARD_STYLES.disclaimer}>
          The Pix key must be at least {MIN_KEY_LENGTH} characters long.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container} data-testid={testId}>
      <span className={PAYMENT_CARD_STYLES.title}>Pay with Pix</span>
      <span className={styles.amount}>{formatCurrency(amount)}</span>
      {qrSvg && (
        <div
          className={styles.qr}
          dangerouslySetInnerHTML={{ __html: qrSvg }}
          aria-label="QR Code for Pix payment"
          role="img"
        />
      )}
      <CopyableCode value={value} label="Copy Pix key" />
      <span className={styles.instructionsTitle}>How to pay</span>
      <ol className={styles.instructions}>
        {INSTRUCTIONS.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
      <div className={PAYMENT_CARD_STYLES.disclaimer}>
        This QR Code is for testing purposes only.
      </div>
    </div>
  );
};

export default PixMock;
