import QRCode from 'qrcode-svg';

interface QRCodeGeneratorOptions {
  content: string;
  size: number;
}

export const generateQRCode = ({ content, size }: QRCodeGeneratorOptions): string => {
  if (!content) {
    throw new Error('QR Code content cannot be empty');
  }

  try {
    const qr = new QRCode({
      content,
      width: size,
      height: size,
      padding: 2,
      color: '#000000',
      background: '#ffffff',
    });
    return qr.svg();
  } catch (error) {
    console.error('Failed to generate QR code:', error);
    return `<svg width="${size}" height="${size}" role="img" aria-label="QR Code Error">
      <rect width="${size}" height="${size}" fill="#f8f8f8"/>
      <text x="50%" y="50%" text-anchor="middle" fill="#666666" font-size="12">
        QR Error
      </text>
    </svg>`;
  }
};
