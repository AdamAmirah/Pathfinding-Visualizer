import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

type ArrayElement = number;
type TwoDimensionalArray = Array<Array<ArrayElement>>;

interface ICellProps {
  componentType: string;

  onDragStart: (type: "start" | "end") => void;
  onDragEnd: (type: "start" | "end", _: any, info: any) => void;
  isDraggingStart: boolean;
  isDraggingEnd: boolean;
  colIndex: number;
  rowIndex: number;
  grid: TwoDimensionalArray;
  handleCellMouseDown: (rowIndex: number, colIndex: number) => void;
  handleCellMouseEnter: (rowIndex: number, colIndex: number) => void;
  handleCellMouseUp: () => void;
  handleCellClick: (rowIndex: number, colIndex: number) => void;
}

const draggableVariant = {
  dragging: {
    scale: 0.7,
  },
  inactive: {
    scale: 1,
  },
};
const Cell: React.FC<ICellProps> = ({
  componentType,
  colIndex,
  rowIndex,
  grid,
  onDragStart,
  onDragEnd,
  isDraggingStart,
  isDraggingEnd,
  handleCellMouseDown,
  handleCellMouseEnter,
  handleCellMouseUp,
  handleCellClick,
}) => {
  const [allowedToDraw, setAllowedToDraw] = useState<boolean>(true);

  const handleCellMouseDownWrapper = () => {
    if (!allowedToDraw) return;
    handleCellMouseDown(rowIndex, colIndex);
  };

  const handleCellMouseEnterWrapper = () => {
    if (!allowedToDraw) return;
    handleCellMouseEnter(rowIndex, colIndex);
  };
  const isStartPoint = componentType === "start";
  const isEndPoint = componentType === "end";

  const dragConstraints = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  return (
    <Box
      className="cell"
      id={`${rowIndex}-${colIndex}`}
      width={25}
      height={25}
      border="1px solid #ffffff1b"
      onMouseDown={handleCellMouseDownWrapper}
      onMouseEnter={handleCellMouseEnterWrapper}
      onMouseUp={handleCellMouseUp}
      onClick={() => handleCellClick(rowIndex, colIndex)}
      backgroundColor={
        grid[rowIndex][colIndex] === 0
          ? "#202125" // Color for empty cells
          : grid[rowIndex][colIndex] === 1
          ? "#515256" // Color for obstacles
          : grid[rowIndex][colIndex] === 4
          ? "#0090e3" // Color for visited cells during search
          : grid[rowIndex][colIndex] === 5
          ? "#f9c80e" // Color for cells in the path
          : undefined
      }
    >
      {isStartPoint && (
        <motion.div
          className="draggable start"
          variants={draggableVariant}
          animate={isDraggingStart ? "dragging" : "inactive"}
          dragElastic={1}
          onDragStart={() => onDragStart("start")}
          onDragEnd={(e, info) => onDragEnd("start", e, info)}
          layoutId={`start-${rowIndex}-${colIndex}`}
          drag
          dragConstraints={dragConstraints}
        ></motion.div>
      )}
      {isEndPoint && (
        <motion.div
          className="draggable end"
          variants={draggableVariant}
          animate={isDraggingEnd ? "dragging" : "inactive"}
          dragElastic={1}
          onDragStart={() => onDragStart("end")}
          onDragEnd={(e, info) => onDragEnd("end", e, info)}
          layoutId={`end-${rowIndex}-${colIndex}`}
          drag
          dragConstraints={dragConstraints}
        ></motion.div>
      )}
    </Box>
  );
};

export default Cell;
