import * as React from "react";
import SideBar from "./components/SideBar/SideBar";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import Main from "./components/Main/Main";

export const App: React.FC = () => {
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(true);
  const [isControlOpen, setIsControlOpen] = useState<boolean>(false);

  const onClickInfo = () => {
    setIsInfoOpen(true);
    setIsControlOpen(false);
  };

  const onClickControl = () => {
    setIsInfoOpen(false);
    setIsControlOpen(true);
  };
  return (
    <Box as="section" bg="#1e2023" minH="100vh">
      <SideBar onClickControl={onClickControl} onClickInfo={onClickInfo} />
      <Box
        as="main"
        p="4"
        ml={{
          base: 0,
          md: 60,
        }}
      >
        <Main />
      </Box>
    </Box>
  );
};
