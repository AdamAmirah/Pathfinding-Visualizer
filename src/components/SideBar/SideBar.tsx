import { Box } from "@chakra-ui/react";
import SidebarContent from "./SidebarContent";
import MobileSideBar from "../MobileSideBar";
interface Props {
  onClickControl: () => void;
  onClickInfo: () => void;
}

export default function SideBar({ onClickControl, onClickInfo }: Props) {
  return (
    <>
      <SidebarContent
        display={{
          base: "none",
          md: "unset",
        }}
        onClickControl={onClickControl}
        onClickInfo={onClickInfo}
      />

      <MobileSideBar />
    </>
  );
}
