import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { bfs } from "../../algorithms/bfs";
import { motion, AnimateSharedLayout } from "framer-motion";

interface IGridProps {
  searching: boolean;
  setSearching: React.Dispatch<React.SetStateAction<boolean>>;
  grid: TwoDimensionalArray;
  setGrid: React.Dispatch<React.SetStateAction<TwoDimensionalArray>>;
  startPoint: [number, number];
  endPoint: [number, number];
  setStartPoint: React.Dispatch<React.SetStateAction<[number, number]>>;
  setEndPoint: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const numRows = 35;
const numCols = 43;
const GRID_SIZE = 1505;

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
}) => {
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

  const [activeCell, setActiveCell] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const dragStart = () => {
    setIsDragging(true);
  };
  const dragEnd = (_: any, info: any) => {
    setIsDragging(false);
    const cellIndex = getActiveCellIndex(info.point);
    if (!cellIndex) return;

    console.log(cellIndex);
    if (
      cellIndex.x > GRID_SIZE - 1 ||
      cellIndex.y > GRID_SIZE - 1 ||
      cellIndex.x < 0 ||
      cellIndex.y < 0
    )
      return;
    setActiveCell(cellIndex);
  };

  const getActiveCellIndex = (point: any) => {
    const cellSize = 25;
    const gridRect = document.querySelector(".grid")?.getBoundingClientRect();
    if (!gridRect) return;
    const relativeX = point.x - gridRect.left;
    const relativeY = point.y - gridRect.top;

    const x = Math.floor(relativeX / cellSize);
    const y = Math.floor(relativeY / cellSize);

    return { x, y };
  };

  return (
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
            key={`cell-${colIndex}-${rowIndex}`}
            colIndex={colIndex}
            rowIndex={rowIndex}
            activeCell={activeCell}
            onDragStart={dragStart}
            onDragEnd={dragEnd}
            isDragging={isDragging}
          />
          // <Box
          //   key={`${rowIndex}-${colIndex}`}
          //   width={25}
          //   height={25}
          //   borderRadius={grid[rowIndex][colIndex] >= 4 ? "50%" : "0%"}
          //   backgroundColor={
          //     grid[rowIndex][colIndex] === 0
          //       ? "#202125" // Color for empty cells
          //       : grid[rowIndex][colIndex] === 1
          //       ? "#515256" // Color for obstacles
          //       : grid[rowIndex][colIndex] === 2
          //       ? "green" // Color for start point
          //       : grid[rowIndex][colIndex] === 3
          //       ? "red" // Color for end point
          //       : grid[rowIndex][colIndex] === 4
          //       ? "lightblue" // Color for visited cells during search
          //       : grid[rowIndex][colIndex] === 5
          //       ? "yellow" // Color for cells in the path
          //       : undefined
          //   }
          //   border="1px solid #595959"
          //   onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
          //   onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
          //   onMouseUp={handleCellMouseUp}
          //   onClick={() => handleCellClick(rowIndex, colIndex)}
          //   backgroundImage={
          //     rowIndex === startPoint[0] && colIndex === startPoint[1]
          //       ? "chevron-right.svg"
          //       : rowIndex === endPoint[0] && colIndex === endPoint[1]
          //       ? "actualTarget.svg"
          //       : ""
          //   }
          //   backgroundRepeat="no-repeat"
          //   backgroundPosition="center"
          //   backgroundSize="100%"
          // ></Box>
        ))
      )}
    </Box>
  );
};

const cellVariant = {
  dragging: {
    border: "2px dashed #008E95",
  },
  inactive: {
    border: "2px solid #fff",
  },
};

const draggableVariant = {
  dragging: {
    scale: 0.7,
  },
  inactive: {
    scale: 1,
  },
};

const Cell = ({
  colIndex,
  rowIndex,
  activeCell,
  onDragStart,
  onDragEnd,
  isDragging,
  grid,
}: any) => {
  const isOccupied = activeCell.x === colIndex && activeCell.y === rowIndex;

  return (
    <Box
      className="cell center"
      id={`${rowIndex}-${colIndex}`}
      width={25}
      height={25}
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
      backgroundImage="chevron-right.svg"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="100%"
    >
      {isOccupied && (
        <motion.div
          className="draggable center"
          variants={draggableVariant}
          animate={isDragging ? "dragging" : "inactive"}
          dragElastic={1}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          layoutId="drag"
          drag
        ></motion.div>
      )}
    </Box>
  );
};

export default Grid;
