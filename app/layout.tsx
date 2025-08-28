import './globals.css';
import { Inter } from 'next/font/google';

import { PostHogProvider } from '@/app/providers';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ClarityRouteTracker } from '@/components/ClarityRouteTracker';
import Script from 'next/script';

const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

export const metadata = {
  title: '',
  description: '',
  verification: {
    google: '3xFLRhuHLISlf9kRNyiZj6pcyb1PQ7r2vbdt_X-RXpA',
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
      {process.env.NEXT_PUBLIC_ENV === 'production' && clarityId && (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `}
        </Script>
      )}
      <body>
        <div className="flex min-h-screen flex-col">
          <PostHogProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </PostHogProvider>
          <ClarityRouteTracker />
        </div>
      </body>
    </html>
  );
}
