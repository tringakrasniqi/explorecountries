import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import styled from "styled-components";

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.text};
  font-size: 1.5rem;

  &:hover {
    cursor: pointer;
  }
`;

export const ThemeSwitcher = ({
  toggleTheme,
  isDarkMode,
}: {
  toggleTheme: () => void;
  isDarkMode: boolean;
}) => {
  return (
    <Button onClick={toggleTheme}>
      {isDarkMode ? <BsFillSunFill /> : <BsFillMoonStarsFill />}
    </Button>
  );
};
