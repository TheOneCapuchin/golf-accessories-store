import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import GlobalLayout from '@/components/GlobalLayout';
import { LanguageProvider } from '@/context/LanguageContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'Kapuchin Golf Porsgrunn - Premium Golf Accessories',
  description: 'Discover our vibrant collection of premium golf accessories with unique Norwegian-inspired patterns and designs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} antialiased m-0 p-0`}>
        <LanguageProvider>
          <GlobalLayout>
            {children}
          </GlobalLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}
