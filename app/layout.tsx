import './globals.css';
import { Inter } from 'next/font/google';

import { Footer } from '@/components/Footer';
import { CMS_NAME } from '@/lib/constants';

export const metadata = {
  title: '',
  description: '',
  verification: {
    google: '3xFLRhuHLISlf9kRNyiZj6pcyb1PQ7r2vbdt_X-RXpA',
    // yandex: 'yandex',
    // yahoo: 'yahoo',
    // other: {
    //   me: ['my-email', 'my-link'],
    // },
  },
};

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={inter.variable}>
      <body>
        <section className="min-h-screen">
          <main>{children}</main>
          <Footer />
        </section>
      </body>
    </html>
  );
}
