import './globals.css';
import { Inter } from 'next/font/google';

import { EXAMPLE_PATH, CMS_NAME } from '@/lib/constants';

export const metadata = {
  title: `Next.js and ${CMS_NAME} Example`,
  description: `This is a blog built with Next.js and ${CMS_NAME}.`,
};

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

function Footer() {
  return (
    <footer className="bg-accent-1 border-accent-2 border-t">
      <div className="container mx-auto px-5">
        <div className="flex flex-col items-center py-28 lg:flex-row">
          <h3 className="mb-10 text-center text-4xl font-bold leading-tight tracking-tighter lg:mb-0 lg:w-1/2 lg:pr-4 lg:text-left lg:text-5xl">
            Built with Next.js.
          </h3>
          <div className="flex flex-col items-center justify-center lg:w-1/2 lg:flex-row lg:pl-4">
            <a
              href="https://nextjs.org/docs"
              className="mx-3 mb-6 border border-black bg-black px-12 py-3 font-bold text-white transition-colors duration-200 hover:bg-white hover:text-black lg:mb-0 lg:px-8">
              Read Documentation
            </a>
            <a
              href={`https://github.com/vercel/next.js/tree/canary/examples/${EXAMPLE_PATH}`}
              className="mx-3 font-bold hover:underline">
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <section className="min-h-screen">
          <main>{children}</main>
          <Footer />
        </section>
      </body>
    </html>
  );
}
