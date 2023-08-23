import React, { useState } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { bfs } from "../../../algorithms/bfs";
import { dijkstra } from "../../../algorithms/dijkstra";
import { motion, AnimateSharedLayout } from "framer-motion";
import "./cell.css";
import Cell from "./Cell";
import { dfs } from "../../../algorithms/dfs";
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
  setCurrentSpeed: React.Dispatch<React.SetStateAction<string>>;
  currentSpeed: string;
  pickedAlgo: string;
  setPickedAlgo: React.Dispatch<React.SetStateAction<string>>;
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
  startPoint,
  endPoint,
  setEndPoint,
  setStartPoint,
  firstSearch,
  setCurrentSpeed,
  currentSpeed,
  pickedAlgo,
  setPickedAlgo,
}) => {
  const twoDimensionalArray: TwoDimensionalArray = Array(numRows)
    .fill(0)
    .map(() => Array(numCols).fill(0));

  const [drawing, setDrawing] = useState<boolean>(false);
  const [distances, setDistances] = useState<{ [key: string]: number }>({});

  React.useEffect(() => {
    let result;
    if (pickedAlgo === "Breadth-First Search")
      result = bfs(grid, startPoint, endPoint);
    else if (pickedAlgo === "Dijkstra's Algorithm")
      result = dijkstra(grid, startPoint, endPoint);
    else if (pickedAlgo === "Depth-First Search")
      result = dfs(grid, startPoint, endPoint);

    if (searching && result) {
      const path = result?.path;
      const steps = result?.steps;
      setDistances(result?.distances);

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
    let animationSpeed: number;
    setDrawing(true);
    if (currentSpeed === "Fast") animationSpeed = 1;
    else if (currentSpeed === "Slow") animationSpeed = 100;
    else animationSpeed = 20;

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
      setDrawing(false);
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
      grid[cellIndex.y][cellIndex.x] = 0;
    } else {
      setEndPoint([cellIndex.y, cellIndex.x]);
      grid[cellIndex.y][cellIndex.x] = 0;
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
              distances={distances}
              handleCellMouseDown={handleCellMouseDown}
              handleCellMouseEnter={handleCellMouseEnter}
              handleCellMouseUp={handleCellMouseUp}
              handleCellClick={handleCellClick}
              searching={drawing}
            />
          ))
        )}
      </Box>

      <Text mt={2} fontSize="2.2vh" color="#F2F2F2" fontFamily="prodsans">
        {pickedAlgo === "Breadth-First Search"
          ? "Breath-first Search is unweighted and guarantees the shortest path!"
          : pickedAlgo === "Depth-First Search"
          ? "Depth-first Search is unweighted and does not guarantee the shortest path!"
          : pickedAlgo === "Dijkstra's Algorithm"
          ? "Dijkstra's Algorithm is weighted and guarantees the shortest path!"
          : "Pick an algorithm and visualize it!"}
      </Text>
    </Flex>
  );
};

export default Grid;
