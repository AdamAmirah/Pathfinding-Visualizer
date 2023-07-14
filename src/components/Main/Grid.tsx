import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { bfs } from "../../algorithms/bfs";

interface IGridProps {
  searching: boolean;
  setSearching: React.Dispatch<React.SetStateAction<boolean>>;
  grid: TwoDimensionalArray;
  setGrid: React.Dispatch<React.SetStateAction<TwoDimensionalArray>>;
}

const numRows = 35;
const numCols = 43;
type ArrayElement = number;
type TwoDimensionalArray = Array<Array<ArrayElement>>;

const Grid: React.FC<IGridProps> = ({
  searching,
  setSearching,
  setGrid,
  grid,
}) => {
  const [startPoint, setStartPoint] = useState<[number, number]>([15, 5]);
  const [endPoint, setEndPoint] = useState<[number, number]>([15, 9]);
  const [allowedToDraw, setAllowedToDraw] = useState<boolean>(true);
  const [startButtonClicked, setStartButtonClicked] = useState<boolean>(false);
  const [endButtonClicked, setEndButtonClicked] = useState<boolean>(false);
  const [mouseIsPressed, setMouseIsPressed] = React.useState(false);

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    if (allowedToDraw && grid[rowIndex][colIndex] <= 1)
      newGrid[rowIndex][colIndex] = grid[rowIndex][colIndex] ? 0 : 1;
    else if (startButtonClicked && grid[rowIndex][colIndex] === 0) {
      if (startPoint[0] !== -1) {
        newGrid[startPoint[0]][startPoint[1]] = 0; // start mode
      }
      newGrid[rowIndex][colIndex] = 2; // start mode
      setStartPoint([rowIndex, colIndex]);
    } else if (endButtonClicked && grid[rowIndex][colIndex] === 0) {
      if (endPoint[0] !== -1) {
        newGrid[endPoint[0]][endPoint[1]] = 0; // start mode
      }
      newGrid[rowIndex][colIndex] = 3; // end mode
      setEndPoint([rowIndex, colIndex]);
    }

    setGrid(newGrid);
  };

  const handleCellMouseDown = (rowIndex: number, colIndex: number) => {
    if (!allowedToDraw) return;
    setMouseIsPressed(true);
    handleCellClick(rowIndex, colIndex);
  };

  const handleCellMouseEnter = (rowIndex: number, colIndex: number) => {
    if (!allowedToDraw) return;
    if (mouseIsPressed) {
      handleCellClick(rowIndex, colIndex);
    }
  };

  const handleCellMouseUp = () => {
    if (!allowedToDraw) return;
    setMouseIsPressed(false);
  };

  React.useEffect(() => {
    if (searching) {
      const result = bfs(grid, startPoint, endPoint);
      const path = result?.path;
      const steps = result?.steps;

      if (path) {
        animateSearch(steps!, path);
      } else {
        console.log("No path found");
      }
      setSearching(false);
    }
  }, [searching, grid, startPoint, endPoint]);

  const animateSearch = (
    steps: Array<[number, number]>,
    path: Array<[number, number]>
  ) => {
    const animationSpeed = 1;
    let delay = 0;

    for (let i = 0; i < steps.length; i++) {
      const [row, col] = steps[i];
      if (
        (row === startPoint[0] && col === startPoint[1]) ||
        (row === endPoint[0] && col === endPoint[1])
      )
        continue;

      setTimeout(() => {
        setGrid((prevGrid) => {
          const newGrid = JSON.parse(JSON.stringify(prevGrid));

          newGrid[row][col] = 4; // Mark the cell as visited during search
          return newGrid;
        });
      }, delay);

      delay += animationSpeed;
    }

    setTimeout(() => {
      setGrid((prevGrid) => {
        const newGrid = JSON.parse(JSON.stringify(prevGrid));
        for (let i = 0; i < path.length; i++) {
          const [row, col] = path[i];
          if (
            (row === startPoint[0] && col === startPoint[1]) ||
            (row === endPoint[0] && col === endPoint[1])
          )
            continue;

          newGrid[row][col] = 5; // Mark the cell as part of the path
        }
        return newGrid;
      });
    }, delay);
  };

  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(${numCols}, 25px)`}
      width="fit-content"
      margin="0 auto"
    >
      {grid.map((rows, rowIndex) =>
        rows.map((col, colIndex) => (
          <Box
            key={`${rowIndex}-${colIndex}`}
            width={25}
            height={25}
            borderRadius={grid[rowIndex][colIndex] >= 4 ? "50%" : "0%"}
            backgroundColor={
              grid[rowIndex][colIndex] === 0
                ? "#202125" // Color for empty cells
                : grid[rowIndex][colIndex] === 1
                ? "#515256" // Color for obstacles
                : grid[rowIndex][colIndex] === 2
                ? "green" // Color for start point
                : grid[rowIndex][colIndex] === 3
                ? "red" // Color for end point
                : grid[rowIndex][colIndex] === 4
                ? "lightblue" // Color for visited cells during search
                : grid[rowIndex][colIndex] === 5
                ? "yellow" // Color for cells in the path
                : undefined
            }
            border="1px solid #595959"
            onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
            onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
            onMouseUp={handleCellMouseUp}
            onClick={() => handleCellClick(rowIndex, colIndex)}
            backgroundImage={
              rowIndex === startPoint[0] && colIndex === startPoint[1]
                ? "chevron-right.svg"
                : rowIndex === endPoint[0] && colIndex === endPoint[1]
                ? "actualTarget.svg"
                : ""
            }
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            backgroundSize="100%"
          ></Box>
        ))
      )}
    </Box>
  );
};

export default Grid;
