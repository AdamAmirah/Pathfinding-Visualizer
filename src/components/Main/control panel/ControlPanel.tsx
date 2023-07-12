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
      align="flex-start" // Align items to the left
      justify="center"
      w="25%"
      // border="1px solid red"
    >
      <LinkBox
        display="flex"
        flexDirection="column"
        borderRadius="3xl"
        bg="#15171a"
        // border="1px solid red"
        w="100%"
        alignItems="self-start"
        pl={6}
        py={4}
      >
        <Flex align="center">
          <Image src="play.svg" boxSize={10} mr={5} />
          <Heading size="md">
            <LinkOverlay href="#">Visualize</LinkOverlay>
          </Heading>
        </Flex>
        <Text color="whiteAlpha.400" mt={2}>
          State of the visualization
        </Text>
      </LinkBox>
    </Flex>
  );
};

export default ControlPanel;
