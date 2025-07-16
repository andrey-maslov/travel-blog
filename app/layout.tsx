import './globals.css';
import { Inter } from 'next/font/google';

import { PostHogProvider } from '@/app/providers';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

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
        <div className="flex min-h-screen flex-col">
          <PostHogProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </PostHogProvider>
        </div>
      </body>
    </html>
  );
}
