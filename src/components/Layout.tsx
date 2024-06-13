import React from 'react';
import { VStack, Box } from '@chakra-ui/react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <VStack justifyContent='center'>
      <Navbar />
      <main>{children}</main>
    </VStack>
  );
}
