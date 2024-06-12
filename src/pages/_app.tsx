import * as React from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '@/components/Layout';
import { PokemonProvider } from '@/context/PokemonContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PokemonProvider>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </PokemonProvider>
  );
}
