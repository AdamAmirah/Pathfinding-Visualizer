import React, { useState } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { bfs } from "../../../algorithms/bfs";
import { motion, AnimateSharedLayout } from "framer-motion";
import "./cell.css";
import Cell from "./Cell";
interface IGridProps {
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

const numRows = 33;
const numCols = 43;

type ArrayElement = number;
type TwoDimensionalArray = Array<Array<ArrayElement>>;

const Grid: React.FC<IGridProps> = ({
  searching,
  setSearching,
  setGrid,
  grid,
  startPoint,
  endPoint,
  setEndPoint,
  setStartPoint,
  firstSearch,
}) => {
  const twoDimensionalArray: TwoDimensionalArray = Array(numRows)
    .fill(0)
    .map(() => Array(numCols).fill(0));
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
    let delay = 1;
    grid.forEach((rows, rowIndex) => {
      rows.forEach((col, colIndex) => {
        if (grid[rowIndex][colIndex] > 1) grid[rowIndex][colIndex] = 0;
      });
    });

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

          newGrid[row][col] = 4;
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

          newGrid[row][col] = 5; // Mark the cell as part of the path
        }
        return newGrid;
      });
    }, delay);
  };

  const [isDraggingStart, setIsDraggingStart] = useState(false);
  const [isDraggingEnd, setIsDraggingEnd] = useState(false);

  const dragStart = (type: "start" | "end") => {
    if (type === "start") {
      setIsDraggingStart(true);
    } else {
      setIsDraggingEnd(true);
    }
  };

  const dragEnd = (type: "start" | "end", _: any, info: any) => {
    if (type === "start") {
      setIsDraggingStart(false);
    } else {
      setIsDraggingEnd(false);
    }

    const cellIndex = getActiveCellIndex(info.point);

    if (!cellIndex) return;

    if (
      cellIndex.x >= numCols ||
      cellIndex.y >= numRows ||
      cellIndex.x < 0 ||
      cellIndex.y < 0
    )
      return;

    if (type === "start") {
      setStartPoint([cellIndex.y, cellIndex.x]);
    } else {
      setEndPoint([cellIndex.y, cellIndex.x]);
    }

    if (firstSearch) setSearching(true);
  };

  const getActiveCellIndex = (point: any) => {
    const cellSize = 25;
    const gridRect = document.querySelector(".grid")?.getBoundingClientRect();
    if (!gridRect) return;
    const relativeX = point.x - gridRect.left;
    const relativeY = point.y - gridRect.top;

    const x = Math.floor(relativeX / cellSize);
    const y = Math.floor(relativeY / cellSize);

    if (x < 0 || x >= numCols || y < 0 || y >= numRows) return;

    return { x, y };
  };
  const [allowedToDraw, setAllowedToDraw] = useState<boolean>(true);
  const [mouseIsPressed, setMouseIsPressed] = React.useState(false);

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    if (allowedToDraw && grid[rowIndex][colIndex] <= 1)
      newGrid[rowIndex][colIndex] = grid[rowIndex][colIndex] ? 0 : 1;

    setGrid(newGrid);
  };

  const handleCellMouseDown = (rowIndex: number, colIndex: number) => {
    if (!allowedToDraw || isDraggingStart || isDraggingEnd) return;
    setMouseIsPressed(true);
    handleCellClick(rowIndex, colIndex);
  };

  const handleCellMouseEnter = (rowIndex: number, colIndex: number) => {
    if (!allowedToDraw || isDraggingStart || isDraggingEnd) return;
    if (mouseIsPressed) {
      handleCellClick(rowIndex, colIndex);
    }
  };

  const handleCellMouseUp = () => {
    if (!allowedToDraw || isDraggingStart || isDraggingEnd) return;
    setMouseIsPressed(false);
  };

  return (
    <Flex direction="column" alignItems="center">
      <Box
        className="grid"
        display="grid"
        gridTemplateColumns={`repeat(${numCols}, 25px)`}
        width="fit-content"
        margin="0 auto"
      >
        {grid.map((rows, rowIndex) =>
          rows.map((col, colIndex) => (
            <Cell
              componentType={
                startPoint[1] === colIndex && startPoint[0] === rowIndex
                  ? "start"
                  : endPoint[1] === colIndex && endPoint[0] === rowIndex
                  ? "end"
                  : "normal"
              }
              onDragStart={dragStart}
              onDragEnd={dragEnd}
              isDraggingStart={isDraggingStart}
              isDraggingEnd={isDraggingEnd}
              key={`${rowIndex}-${colIndex}`}
              colIndex={colIndex}
              rowIndex={rowIndex}
              grid={grid}
              handleCellMouseDown={handleCellMouseDown}
              handleCellMouseEnter={handleCellMouseEnter}
              handleCellMouseUp={handleCellMouseUp}
              handleCellClick={handleCellClick}
            />
          ))
        )}
      </Box>

      <Text mt={4} fontSize="2.2vh" color="#F2F2F2" fontFamily="prodsans">
        Pick an algorithm and visualize it!
      </Text>
    </Flex>
  );
};

export default Grid;
