import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Flex,
  IconButton,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { FiMenu } from "react-icons/fi";
import SidebarContent from "./SideBar/SidebarContent";

type Props = {};

export default function MobileSideBar({}: Props) {
  const sidebar = useDisclosure();

  return (
    <Box
      ml={{
        base: 0,
        md: 60,
      }}
      transition=".3s ease"
    >
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent
            w="full"
            borderRight="none"
            onClickControl={function (): void {
              throw new Error("Function not implemented.");
            }}
            onClickInfo={function (): void {
              throw new Error("Function not implemented.");
            }}
            display={{
              base: "",
              md: "",
            }}
          />
        </DrawerContent>
      </Drawer>
      <Flex
        as="header"
        align="center"
        justify="space-between"
        w="full"
        px="4"
        borderBottomWidth="1px"
        color="inherit"
        h="14"
        display={{
          base: "inline-flex",
          md: "none",
        }}
      >
        <IconButton
          icon={<FiMenu />}
          aria-label="Menu"
          display={{
            base: "inline-flex",
            md: "none",
          }}
          onClick={sidebar.onOpen}
          size="sm"
        />
      </Flex>
    </Box>
  );
}
