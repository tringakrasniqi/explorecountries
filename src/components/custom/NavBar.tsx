import styled from "styled-components";
import { ThemeSwitcher } from "./ThemeSwitcher";

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
`;

export const NavBar = ({
  toggleTheme,
  isDarkMode,
}: {
  toggleTheme: () => void;
  isDarkMode: boolean;
}) => {
  return (
    <Nav>
      <h1>Where in the world?</h1>
      <ThemeSwitcher toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
    </Nav>
  );
};
