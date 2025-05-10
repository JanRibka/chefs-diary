import { IoSunnyOutline } from "react-icons/io5";
import { MdComputer } from "react-icons/md";
import { RxMoon } from "react-icons/rx";

import Icon from "@/components/shared/icon/Icon";
import ThemeType from "@/lib/types/common/ThemeType";

interface Props {
  theme: ThemeType;
  handleClickIcon: () => void;
}

const ThemeIcon = ({ theme, handleClickIcon }: Props) => {
  if (theme === "light") {
    return (
      <Icon onClick={handleClickIcon}>
        <IoSunnyOutline />
      </Icon>
    );
  } else if (theme === "dark") {
    return (
      <Icon onClick={handleClickIcon}>
        <RxMoon />
      </Icon>
    );
  }

  return (
    <Icon onClick={handleClickIcon}>
      <MdComputer />
    </Icon>
  );
};

export default ThemeIcon;
