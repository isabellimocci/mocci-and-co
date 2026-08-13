import React from 'react';
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard';
import { PAYMENT_CARD_STYLES } from '../../../styles/paymentCard.styles';

interface CopyableCodeProps {
  value: string;
  label: string;
}

const CopyableCode: React.FC<CopyableCodeProps> = ({ value, label }) => {
  const { copied, copy } = useCopyToClipboard();

  return (
    <div className={PAYMENT_CARD_STYLES.codeRow}>
      <span className={PAYMENT_CARD_STYLES.code} title={value}>
        {value}
      </span>
      <button
        type="button"
        className={PAYMENT_CARD_STYLES.copyButton}
        onClick={() => copy(value)}
        aria-label={label}
      >
        <span aria-live="polite">{copied ? 'Copied!' : 'Copy'}</span>
      </button>
    </div>
  );
};

export default CopyableCode;
