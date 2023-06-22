import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import { start } from "repl";
import { bfs } from "./algorithms/bfs";

const numRows = 25;
const numCols = 35;
type ArrayElement = number;
type TwoDimensionalArray = Array<Array<ArrayElement>>;

export const App: React.FC = () => {
  const [allowedToDraw, setAllowedToDraw] = useState<boolean>(true);
  const [startButtonClicked, setStartButtonClicked] = useState<boolean>(false);
  const [endButtonClicked, setEndButtonClicked] = useState<boolean>(false);
  const [startPoint, setStartPoint] = useState<[number, number]>([-1, -1]);
  const [endPoint, setEndPoint] = useState<[number, number]>([-1, -1]);
  const [searching, setSearching] = React.useState<boolean>(false); // Track if the search is in progress

  const twoDimensionalArray: TwoDimensionalArray = Array(numRows)
    .fill(0)
    .map(() => Array(numCols).fill(0));

  const [grid, setGrid] =
    React.useState<TwoDimensionalArray>(twoDimensionalArray);

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
    const animationSpeed = 6;
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
    <Flex>
      <Stack direction="column">
        <Button
          bg="#F68E5F"
          onClick={() => {
            setAllowedToDraw(true);
            setEndButtonClicked(false);
            setStartButtonClicked(false);
          }}
        >
          Draw lines
        </Button>

        <Button
          bg="green"
          onClick={() => {
            setAllowedToDraw(false);
            setEndButtonClicked(false);
            setStartButtonClicked(true);
          }}
        >
          Start point
        </Button>

        <Button
          onClick={() => {
            setAllowedToDraw(false);
            setStartButtonClicked(false);
            setEndButtonClicked(true);
          }}
          bg="red"
        >
          End point
        </Button>
        <Button
          onClick={() => {
            setSearching(true);
          }}
          bg="purple"
        >
          Start Search
        </Button>
        <Button
          onClick={() => {
            setGrid(twoDimensionalArray);
            setStartPoint([-1, -1]);
            setEndPoint([-1, -1]);
          }}
          bg="blue"
        >
          Clear
        </Button>
      </Stack>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
          width: "fit-content",
          margin: "0 auto",
        }}
      >
        {grid.map((rows, rowIndex) =>
          rows.map((col, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
              onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
              onMouseUp={handleCellMouseUp}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              style={{
                width: 20,
                height: 20,
                transition:
                  "border-radius 0.2s ease-in-out, background-color 0.2s ease-in-out",
                borderRadius: grid[rowIndex][colIndex] >= 4 ? "50%" : "0%",
                backgroundColor:
                  grid[rowIndex][colIndex] === 1
                    ? "#F68E5F"
                    : grid[rowIndex][colIndex] === 2
                    ? "green"
                    : grid[rowIndex][colIndex] === 3
                    ? "red"
                    : grid[rowIndex][colIndex] === 4
                    ? "lightblue" // Color for visited cells during search
                    : grid[rowIndex][colIndex] === 5
                    ? "yellow" // Color for cells in the path
                    : undefined,
                border: "1px solid #595959",
              }}
            />
          ))
        )}
      </div>
    </Flex>
  );
};
