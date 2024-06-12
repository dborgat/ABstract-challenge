import React from 'react';
import { VStack } from '@chakra-ui/react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <VStack minH='100vh' justifyContent='center'>
      <Navbar />
      <main>{children}</main>
    </VStack>
  );
}
