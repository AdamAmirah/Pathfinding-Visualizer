import { Text, Box, Flex, Img, Link } from "@chakra-ui/react";
import React from "react";

type Props = {};

export default function NavItem(props: any) {
  const color = "gray.300";
  const { icon, children, ...rest } = props;
  return (
    <Flex
      align="center"
      px="4"
      pl="4"
      py="3"
      cursor="pointer"
      color="inherit"
      _dark={{
        color: "gray.400",
      }}
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      {...rest}
    >
      <Flex direction="column" justify="space-between" align="center" p={10}>
        <Box p={4} bg="#1e2023" borderRadius="2xl" m={2}>
          <Img boxSize={12} src={icon}></Img>
        </Box>

        <Text color="white" fontSize="md" fontFamily="prodsans_bold">
          {children}
        </Text>
      </Flex>
    </Flex>
  );
}
