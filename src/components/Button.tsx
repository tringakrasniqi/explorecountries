import { MouseEventHandler, FC } from "react";
import { IconBaseProps } from "react-icons";
import styled from "styled-components";

type ButtonProps = {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  icon?: JSX.Element;
};

const StyledButton = styled.button`
  padding: 10px;
  background-color: inherit;
  color: inherit;
  border: none;
  border: 1px solid ${(props) => props.theme.elements};
  box-shadow: -2px -1px 32px -4px rgba(0, 0, 0, 0.51);
  padding: 0.5rem 2rem;
  border-radius: 6px;
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const StyledIcon = styled.span`
  margin: 0 0.5rem 0 0;
`;

export const Button: FC<ButtonProps> = ({
  text,
  disabled,
  onClick,
  icon,
  ...props
}) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled} {...props}>
      {icon && <StyledIcon>{icon}</StyledIcon>}
      {text}
    </StyledButton>
  );
};
