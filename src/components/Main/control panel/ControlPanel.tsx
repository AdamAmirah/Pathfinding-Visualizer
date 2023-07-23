import {
  Flex,
  Heading,
  Icon,
  Image,
  LinkBox,
  LinkOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

import { MdArrowDropDown } from "react-icons/md";
import * as React from "react";

const numRows = 35;
const numCols = 43;

type ArrayElement = number;
type TwoDimensionalArray = Array<Array<ArrayElement>>;

interface IControlPanelProps {
  searching: boolean;
  setSearching: React.Dispatch<React.SetStateAction<boolean>>;
  grid: TwoDimensionalArray;
  setGrid: React.Dispatch<React.SetStateAction<TwoDimensionalArray>>;
  startPoint: [number, number];
  endPoint: [number, number];
  setStartPoint: React.Dispatch<React.SetStateAction<[number, number]>>;
  setEndPoint: React.Dispatch<React.SetStateAction<[number, number]>>;
  firstSearch: boolean;
  setFirstSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const ControlPanel: React.FunctionComponent<IControlPanelProps> = ({
  searching,
  setSearching,
  setGrid,
  grid,
  startPoint,
  endPoint,
  setEndPoint,
  setStartPoint,
  setFirstSearch,
}) => {
  const twoDimensionalArray: TwoDimensionalArray = Array(numRows)
    .fill(0)
    .map(() => Array(numCols).fill(0));
  return (
    <Flex
      direction="column"
      justify="center"
      w="21%"
      // border="1px solid red"
      my={20}
      mx={20}
    >
      <Heading mb={4} fontSize="2.5vh" fontFamily="prodsans">
        Control Panel
      </Heading>
      <LinkBox
        display="flex"
        borderRadius="3xl"
        bg="#15171a"
        // border="1px solid red"
        w="100%"
        alignItems="center"
        px={8}
        py={4}
        onClick={() => {
          setSearching(true);
          setFirstSearch(true);
        }}
        cursor="pointer"
      >
        <Image src="play.svg" boxSize={8} />
        <Flex ml={6} direction="column">
          <Heading size="md">
            <LinkOverlay color="#F2F2F2" fontSize="lg" fontFamily="prodsans">
              Visualize!
            </LinkOverlay>
          </Heading>
          <Text color="#73767C" fontSize="sm" fontFamily="prodsans">
            State of the visualization
          </Text>
        </Flex>
      </LinkBox>
      <LinkBox
        display="flex"
        borderRadius="3xl"
        bg="#25272a"
        // border="1px solid red"
        w="95%"
        alignItems="self-start"
        px={8}
        py={3}
        my={2}
        ml={4}
        cursor="pointer"
        onClick={() => {
          setGrid(twoDimensionalArray);
          setEndPoint([15, 30]);
          setStartPoint([15, 10]);
          setFirstSearch(false);
        }}
      >
        <Image src="clear_all-24px.svg" boxSize={12} />
        <Flex ml={6} direction="column">
          <Heading size="md">
            <LinkOverlay color="#F2F2F2" fontSize="lg" fontFamily="prodsans">
              Clear Board
            </LinkOverlay>
          </Heading>
          <Text color="#73767C" fontSize="sm" fontFamily="prodsans">
            Clear Board of Elements
          </Text>
        </Flex>
      </LinkBox>
      <LinkBox
        display="flex"
        borderRadius="3xl"
        bg="#25272a"
        // border="1px solid red"
        w="95%"
        alignItems="self-start"
        px={8}
        py={3}
        my={2}
        ml={4}
        cursor="pointer"
        onClick={() => {
          setGrid(twoDimensionalArray);
          setFirstSearch(false);
        }}
      >
        <Image src="Squiggly-Road-Sign-Arrow.svg" boxSize={12} />
        <Flex ml={6} direction="column">
          <Heading size="md">
            <LinkOverlay color="#F2F2F2" fontSize="lg" fontFamily="prodsans">
              Clear Path
            </LinkOverlay>
          </Heading>
          <Text color="#73767C" fontSize="sm" fontFamily="prodsans">
            Clear All Shortest-Path Nodes
          </Text>
        </Flex>
      </LinkBox>

      <Menu>
        <MenuButton
          as={Flex}
          direction="row"
          wrap="nowrap"
          borderRadius="3xl"
          bg="#15171a"
          w="100%"
          justifyContent="center" // Align items and icon to opposite ends
          alignItems="center"
          px={8}
          py={4}
          my={2}
          cursor="pointer"
        >
          <Flex alignItems="center">
            <Image src="dashboard.svg" boxSize={10} />
            <Flex ml={6} direction="column">
              <Heading
                size="md"
                color="#F2F2F2"
                fontSize="lg"
                fontFamily="prodsans"
              >
                Speed!
                <Icon as={MdArrowDropDown} />
              </Heading>
              <Text color="#73767C" fontSize="sm" fontFamily="prodsans">
                Change Visualizer Speed
              </Text>
            </Flex>
          </Flex>
        </MenuButton>

        <MenuList bg="#25272a" border="0px" p={4} ml={2}>
          <MenuItem bg="#25272a" _hover={{ color: "#b8afaf" }}>
            Fast
          </MenuItem>
          <MenuItem bg="#25272a" _hover={{ color: "#b8afaf" }}>
            Moderate
          </MenuItem>
          <MenuItem bg="#25272a" _hover={{ color: "#b8afaf" }}>
            Slow
          </MenuItem>
        </MenuList>
      </Menu>
      <Heading my={4} fontSize="2.5vh" fontFamily="prodsans">
        Configure Pathfinding
      </Heading>

      <Menu>
        <MenuButton
          as={Flex}
          direction="row"
          wrap="nowrap"
          borderRadius="3xl"
          bg="#15171a"
          w="100%"
          justifyContent="center" // Align items and icon to opposite ends
          alignItems="center"
          px={8}
          py={4}
          my={2}
          cursor="pointer"
        >
          <Flex alignItems="center">
            <Image src="coding.svg" boxSize={10} />
            <Flex ml={6} direction="column">
              <Heading
                size="md"
                color="#F2F2F2"
                fontSize="lg"
                fontFamily="prodsans"
              >
                Algorithms
                <Icon as={MdArrowDropDown} />
              </Heading>
              <Text color="#73767C" fontSize="sm" fontFamily="prodsans">
                Select an Algorithm to Visualize
              </Text>
            </Flex>
          </Flex>
        </MenuButton>

        <MenuList bg="#25272a" border="0px" p={4} ml={2}>
          <MenuItem bg="#25272a" _hover={{ color: "#b8afaf" }}>
            Breadth-First Search
          </MenuItem>
          <MenuItem bg="#25272a" _hover={{ color: "#b8afaf" }}>
            Depth-First Search
          </MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton
          as={Flex}
          direction="row"
          wrap="nowrap"
          borderRadius="3xl"
          bg="#15171a"
          w="100%"
          justifyContent="center" // Align items and icon to opposite ends
          alignItems="center"
          px={8}
          py={4}
          my={2}
          cursor="pointer"
        >
          <Flex alignItems="center">
            <Image src="maze.svg" boxSize={10} />
            <Flex ml={6} direction="column">
              <Heading
                size="md"
                color="#F2F2F2"
                fontSize="lg"
                fontFamily="prodsans"
              >
                Generate
                <Icon as={MdArrowDropDown} />
              </Heading>
              <Text color="#73767C" fontSize="sm" fontFamily="prodsans">
                Generate Mazes and Patterns
              </Text>
            </Flex>
          </Flex>
        </MenuButton>

        <MenuList bg="#25272a" border="0px" p={4} ml={2}>
          <MenuItem bg="#25272a" _hover={{ color: "#b8afaf" }}>
            Basic Random Maze
          </MenuItem>
          <MenuItem bg="#25272a" _hover={{ color: "#b8afaf" }}>
            Basic Random Maze
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default ControlPanel;
