import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 10px;
`;

export const NavBar = () => {
  return (
    <Nav>
      <h1>Where in the world?</h1>
    </Nav>
  );
};
