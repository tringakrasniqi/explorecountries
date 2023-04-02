import { IconType } from "react-icons";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 10px;
`;

const Button = ({ text }: { text: string }) => {
  return <StyledButton>{text}</StyledButton>;
};
