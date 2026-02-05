import type { Metadata } from 'next';
import { Orbitron } from 'next/font/google';
import { StoreProviderCom } from './store/StoreProviderCom';
import './globals.css';

const orbitron = Orbitron({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TicTacToe Game',
  description: 'TicTacToe game, for trying different testing techniques',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProviderCom>
      <html lang='en' className={orbitron.className} suppressHydrationWarning>
        <body>{children}</body>
      </html>
    </StoreProviderCom>
  );
}
