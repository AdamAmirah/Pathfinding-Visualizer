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
