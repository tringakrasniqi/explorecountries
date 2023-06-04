import styled from "styled-components";

export const AnchorLink = styled.a`
  padding: 10px;
  color: ${(props) => props.theme.text};
  text-underline-offset: 5px;

  :hover {
    color: ${(props) => props.theme.textHover};
  }
`;
