import { Button, Stack, useMediaQuery } from "@chakra-ui/react";
import Link from "next/link";

const navItemsData = [
  {
    name: "Department",
    route: "/department",
  },
  {
    name: "Alumni",
    route: "/alumni",
  },
  {
    name: "Events",
    route: "/events",
  },
  {
    name: "Resources",
    route: "/resources",
  },
  {
    name: "Drafts",
    route: "/drafts",
  },
];

export default function NavItemsGroup() {
  const [isMobile] = useMediaQuery("(max-width: 900px)");

  return (
    <Stack direction={isMobile ? "column" : "row"}>
      {navItemsData.map((item, index) => (
        <Link href={item.route} key={index}>
          <Button
            variant="ghost"
            _hover={{ background: "blue.100" }}
            colorScheme="blue"
            color="black"
            size={"lg"}
          >
            {item.name}
          </Button>
        </Link>
      ))}
    </Stack>
  );
}
