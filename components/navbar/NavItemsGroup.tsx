import { Button, Stack, useMediaQuery } from "@chakra-ui/react";

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
];

export default function NavItemsGroup() {
  const [isMobile] = useMediaQuery("(max-width: 900px)");

  return (
    <Stack direction={isMobile ? "column" : "row"}>
      {navItemsData.map((item, index) => (
        <Button
          key={index}
          variant="ghost"
          _hover={{ background: "blue.100" }}
          colorScheme="blue"
          color="black"
          size={"lg"}
        >
          {item.name}
        </Button>
      ))}

    </Stack>
  );
}
