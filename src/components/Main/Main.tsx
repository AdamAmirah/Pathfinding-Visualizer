import * as React from "react";
import ControlPanel from "./control panel/ControlPanel";
import { Flex } from "@chakra-ui/react";
import Grid from "./Grid/Grid";
import { useState } from "react";

const numRows = 35;
const numCols = 43;
type ArrayElement = number;
type TwoDimensionalArray = Array<Array<ArrayElement>>;

interface IMainProps {}

const Main: React.FunctionComponent<IMainProps> = (props) => {
  const [startPoint, setStartPoint] = useState<[number, number]>([15, 10]);
  const [endPoint, setEndPoint] = useState<[number, number]>([15, 30]);
  const [searching, setSearching] = React.useState<boolean>(false); // Track if the search is in progress
  const [firstSearch, setFirstSearch] = useState(false);
  const twoDimensionalArray: TwoDimensionalArray = Array(numRows)
    .fill(0)
    .map(() => Array(numCols).fill(0));

  const [grid, setGrid] =
    React.useState<TwoDimensionalArray>(twoDimensionalArray);
  const [currentSpeed, setCurrentSpeed] = useState("Moderate");
  const [pickedAlgo, setPickedAlgo] = useState("");

  return (
    <Flex>
      <ControlPanel
        grid={grid}
        setGrid={setGrid}
        searching={searching}
        setSearching={setSearching}
        startPoint={startPoint}
        setStartPoint={setStartPoint}
        endPoint={endPoint}
        setEndPoint={setEndPoint}
        firstSearch={firstSearch}
        setFirstSearch={setFirstSearch}
        setCurrentSpeed={setCurrentSpeed}
        currentSpeed={currentSpeed}
        pickedAlgo={pickedAlgo}
        setPickedAlgo={setPickedAlgo}
      />
      <Grid
        grid={grid}
        setGrid={setGrid}
        searching={searching}
        setSearching={setSearching}
        startPoint={startPoint}
        setStartPoint={setStartPoint}
        endPoint={endPoint}
        setEndPoint={setEndPoint}
        firstSearch={firstSearch}
        setFirstSearch={setFirstSearch}
        setCurrentSpeed={setCurrentSpeed}
        currentSpeed={currentSpeed}
        pickedAlgo={pickedAlgo}
        setPickedAlgo={setPickedAlgo}
      />
    </Flex>
  );
};

export default Main;
