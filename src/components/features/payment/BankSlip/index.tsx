import React, { useMemo, useState } from 'react';
import type { BankSlipProps } from './types';
import { BANK_SLIP_MESSAGES, BANK_SLIP_INSTRUCTIONS, BANK_SLIP_STYLES } from './types';
import { formatCurrency } from '../../../../utils/currency.utils';

const DUE_DAYS = 3;

const Barcode: React.FC<{ code: string }> = ({ code }) => {
  const digits = code.replace(/\D/g, '') || '0';
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  for (let i = 0; i < digits.length; i++) {
    const w = (Number(digits[i]) % 4) + 1;
    if (i % 2 === 0) bars.push({ x, w });
    x += w + 1;
  }
  return (
    <svg
      className={BANK_SLIP_STYLES.BARCODE}
      height="56"
      viewBox={`0 0 ${x} 56`}
      preserveAspectRatio="none"
      role="img"
      aria-label="Boleto barcode"
    >
      {bars.map((bar, i) => (
        <rect key={i} x={bar.x} width={bar.w} height="56" fill="#1a1a1a" />
      ))}
    </svg>
  );
};

const BankSlip: React.FC<BankSlipProps> = ({ value, amount }) => {
  const isValidValue = value?.trim().length > 0;
  const [copied, setCopied] = useState(false);

  const dueDate = useMemo(
    () => new Date(Date.now() + DUE_DAYS * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
    []
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  if (!isValidValue) {
    return (
      <div className={BANK_SLIP_STYLES.CONTAINER}>
        <span className={BANK_SLIP_STYLES.TITLE}>{BANK_SLIP_MESSAGES.TITLE}</span>
        <p className={BANK_SLIP_STYLES.INSTRUCTION}>{BANK_SLIP_MESSAGES.INVALID_CODE}</p>
      </div>
    );
  }

  return (
    <div className={BANK_SLIP_STYLES.CONTAINER}>
      <span className={BANK_SLIP_STYLES.TITLE}>{BANK_SLIP_MESSAGES.TITLE}</span>

      <div className={BANK_SLIP_STYLES.META_ROW}>
        <span className={BANK_SLIP_STYLES.META_LABEL}>{BANK_SLIP_MESSAGES.AMOUNT_LABEL}</span>
        <span className={BANK_SLIP_STYLES.META_VALUE}>{formatCurrency(amount)}</span>
      </div>
      <div className={BANK_SLIP_STYLES.META_ROW}>
        <span className={BANK_SLIP_STYLES.META_LABEL}>{BANK_SLIP_MESSAGES.DUE_LABEL}</span>
        <span className={BANK_SLIP_STYLES.META_VALUE}>{dueDate}</span>
      </div>

      <Barcode code={value} />

      <div className={BANK_SLIP_STYLES.CODE_ROW}>
        <span className={BANK_SLIP_STYLES.CODE_DISPLAY} title={value}>
          {value}
        </span>
        <button type="button" className={BANK_SLIP_STYLES.COPY_BTN} onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <span className={BANK_SLIP_STYLES.INSTRUCTIONS_TITLE}>{BANK_SLIP_MESSAGES.HOW_TO_TITLE}</span>
      <ol className={BANK_SLIP_STYLES.INSTRUCTIONS}>
        {BANK_SLIP_INSTRUCTIONS.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>

      <div className={BANK_SLIP_STYLES.DISCLAIMER}>{BANK_SLIP_MESSAGES.TEST_DISCLAIMER}</div>
    </div>
  );
};

export default BankSlip;
