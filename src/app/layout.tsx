import type { Metadata } from 'next';
import { Recursive } from 'next/font/google';
import './globals.css';

import { Providers } from '@/components/providers';

const recursive = Recursive({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TokenWise',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={recursive.className}>
        <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-default">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
