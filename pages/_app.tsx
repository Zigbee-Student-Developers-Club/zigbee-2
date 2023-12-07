import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Nunito } from '@next/font/google';
import Head from 'next/head';

const nunito = Nunito({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>Zigbee Student Developers&apos; Club</title>
        <meta property='og:title' content='Zigbee' key='title' />
        <meta name='title' content="Zigbee Student Developers' Club" />
        <meta name='description' content="Zigbee Student Developers' Club" />
        <meta
          name='keywords'
          content="Zigbee Student Developers' Club, tech club, odisha tech club, odisha college club, college club, MCA club, mca club, 2023, club, tech conference, outr, odisha university of technology and research, cet, college of engineering and technology"
        />
        <meta name='robots' content='index, follow' />
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta name='language' content='English' />
        <meta name='revisit-after' content='2 days' />
        <meta
          name='author'
          content='Odisha University of Technology and Research'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
      </Head>
      <main className={nunito.className}>
        <style jsx global>{`
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          th,
          tr {
            font-family: ${nunito.style.fontFamily}!important;
          }
        `}</style>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </main>
    </>
  );
}
