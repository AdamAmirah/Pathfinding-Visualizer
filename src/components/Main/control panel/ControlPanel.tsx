import {
  Flex,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import * as React from "react";

interface IControlPanelProps {}

const ControlPanel: React.FunctionComponent<IControlPanelProps> = (props) => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      p={10}
      border="1px solid red"
    >
      <LinkBox
        display="flex"
        flexDirection="column"
        borderRadius="3xl"
        bg="#15171a"
        border="1px solid red"
      >
        <Flex border="1px solid red" px={24} py={4} justifyContent="flex-start">
          <Image src="play.svg" boxSize={10} mr={10} />
          <Heading size="md" my="2">
            <LinkOverlay href="#">Visualize</LinkOverlay>
          </Heading>
        </Flex>
        <Text textAlign="left" color="whiteAlpha.400" mt={4}>
          State of the visualization
        </Text>
      </LinkBox>
    </Flex>
  );
};

export default ControlPanel;
