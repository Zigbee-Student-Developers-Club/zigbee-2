import { Button, Stack, useMediaQuery } from '@chakra-ui/react';
import Link from 'next/link';

const navItemsData = [
  {
    name: 'Department',
    route: '/department',
  },
  {
    name: 'Alumni',
    route: '/alumni',
  },
  {
    name: 'Events',
    route: '/events',
  },
  {
    name: 'Resources',
    route: '/resources',
  },
  {
<<<<<<< HEAD
    name: 'Drafts',
    route: '/drafts',
=======
    name: "Drafts",
    route: "/drafts",
>>>>>>> 112469df19d8200b8c201c5559ecd6b9c3ce0cb2
  },
];

export default function NavItemsGroup() {
  const [isMobile] = useMediaQuery('(max-width: 900px)');

  return (
    <Stack direction={isMobile ? 'column' : 'row'}>
      {navItemsData.map((item, index) => (
        <Link href={item.route} key={index}>
          <Button
            variant='ghost'
            _hover={{ background: 'blue.100' }}
            colorScheme='blue'
            color='black'
            size={'lg'}
          >
            {item.name}
          </Button>
        </Link>
      ))}
    </Stack>
  );
}
