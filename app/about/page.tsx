import Head from 'next/head';
import Image from 'next/image';

import { navigationConfig } from '@/config/navigation';

const aboutImageUrl =
  'https://cdn.sanity.io/media-libraries/mlguNGBpeD0Z/images/4aef0711ea27edea3806863c827c75016f74b4b2-750x1000.webp';

const { socialLinks } = navigationConfig;

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>Обо мне – Tripplanr Blog</title>
        <meta name="description" content="Кто стоит за этим блогом" />
      </Head>

      <main className="mx-auto max-w-5xl px-5 py-8">
        <div className="flex flex-col items-start gap-8 md:flex-row">
          <div className="prose w-full md:w-1/2">
            <h1>Обо мне</h1>
            <p>
              Привет! Меня зовут Андрей. Я веду этот блог, чтобы делиться историями из своих
              прогулок по городам и походов по Европе.
            </p>
            <p>
              Мне интересно, как устроены районы, как выглядят дома изнутри, как живут деревни на
              краю континента. Иногда я лезу в горы, иногда — в болота. Иногда — просто гуляю по
              спальному району и фотографирую то, что считаю интересным.
            </p>
            <p>Этот блог — попытка собрать такие наблюдения в одном месте.</p>
            <p>Мои соцсети:</p>
            <ul>
              {socialLinks.map(({ title, href }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/2">
            <Image
              src={aboutImageUrl}
              alt="обо мне"
              width={448}
              height={497}
              className="m-0 mb-1 rounded-md border border-gray-300 object-cover shadow-md"
              priority={false}
            />
          </div>
        </div>
      </main>
    </>
  );
}
