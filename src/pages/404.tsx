import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';

const Custom404 = () => {
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    toast({
      title: `Site not found !`,
      status: 'error',
      duration: 1000,
      isClosable: true,
    });
    router.replace('/');
  }, [router, toast]);

  return null;
};

export default Custom404;
