import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { Button } from "../Button";

export const ThemeSwitcher = ({
  toggleTheme,
  isDarkMode,
}: {
  toggleTheme: () => void;
  isDarkMode: boolean;
}) => {
  return (
    <Button
      onClick={toggleTheme}
      aria-label={"Color theme"}
      style={{ fontSize: "1.2rem" }}
    >
      {isDarkMode ? <BsFillSunFill /> : <BsFillMoonStarsFill />}
    </Button>
  );
};
