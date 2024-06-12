import React from 'react';
import { Box } from '@chakra-ui/react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box bg='gray' w='100%' p={4} color='white'>
      <main>{children}</main>
    </Box>
  );
}
