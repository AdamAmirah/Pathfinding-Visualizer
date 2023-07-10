import * as React from "react";
import ControlPanel from "./control panel/ControlPanel";
import { Flex } from "@chakra-ui/react";
import Grid from "./Grid";

interface IMainProps {}

const Main: React.FunctionComponent<IMainProps> = (props) => {
  return (
    <Flex>
      <ControlPanel />
      <Grid />
    </Flex>
  );
};

export default Main;
