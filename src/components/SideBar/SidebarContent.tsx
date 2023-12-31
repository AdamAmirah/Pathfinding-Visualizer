import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import NavItem from "./NavItem";

interface Props {
  onClickControl: () => void;
  onClickInfo: () => void;
  display: { base: string; md: string };
  w: string;
  borderRight: string;
}

export default function SidebarContent(props: Props) {
  const { onClickControl, onClickInfo, display, w, borderRight } = props;

  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="#15171a"
      color="inherit"
      borderRightWidth="1px"
      borderTopRightRadius="3xl"
      borderBottomRightRadius="3xl"
      borderColor="transparent"
      w={w ? w : "60"}
      display={display}
      borderRight={borderRight ? borderRight : ""}
    >
      <Flex px="4" py="5" align="center" justify="center" direction="column">
        <Image src="logo.png" boxSize={20} />
        <Text fontSize="2xl" ml="2" color="#fff" fontWeight="semibold">
          PathVis
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
        flex="1"
        justify="center" // Add justify="center"
        align="center" // Add align="center"
        mt={10}
      >
        <Link
          onClick={() => onClickControl()}
          style={{ textDecoration: "none" }}
        >
          <NavItem icon={"settings.svg"}>Control Panel</NavItem>
        </Link>
        <Link
          href="https://github.com/AdamAmirah/Pathfinding-Visualizer"
          style={{ textDecoration: "none" }}
        >
          <NavItem icon={"github.svg"}>Github Repo</NavItem>
        </Link>
      </Flex>
    </Box>
  );
}
