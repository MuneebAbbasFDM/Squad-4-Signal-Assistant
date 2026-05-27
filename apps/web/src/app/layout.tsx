import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Signal Assistant - Sales Meeting Intelligence',
  description:
    'AI-powered Meeting Intelligence Assistant that standardises how sales meetings are captured, analysed, and reviewed using MEDDPICC and SPIN methodologies.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
