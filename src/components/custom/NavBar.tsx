import React from "react";
import styled from "styled-components";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { GiWorld } from "react-icons/gi";
import { Link } from "react-router-dom";

type NavBarProps = {
  toggleTheme: () => void;
  isDarkMode: boolean;
};

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: inherit;
  font-size: 1.5rem;
  font-weight: 400;
  padding: 1rem;
  :hover {
    opacity: 0.8;
  }
`;

const StyledIcon = styled(GiWorld)`
  margin-right: 5px;
  vertical-align: sub;
`;

export const NavBar: React.FC<NavBarProps> = ({ toggleTheme, isDarkMode }) => {
  return (
    <Nav>
      <h1>
        <StyledLink to={"/"}>
          <StyledIcon />
          Where in the world?
        </StyledLink>
      </h1>
      <ThemeSwitcher toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
    </Nav>
  );
};
