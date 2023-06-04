import React from "react";
import styled from "styled-components";

type ButtonProps = React.ComponentProps<"button"> & {
  icon?: JSX.Element;
};

export const Button = styled.button`
  background-color: inherit;
  color: inherit;
  border: none;
  padding: 0.5rem 2rem;
  border-radius: 2px;
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const StyledIcon = styled.span`
  margin: 0 0.5rem 0 0;
`;

const ButtonWithIcon: React.FC<ButtonProps> = ({
  icon,
  children,
  ...props
}) => {
  return (
    <button {...props}>
      {icon && <StyledIcon>{icon}</StyledIcon>}
      {children}
    </button>
  );
};

export const StyledButtonWithIcon = styled(ButtonWithIcon)`
  background-color: inherit;
  color: inherit;
  border: none;
  border: 1px solid ${(props) => props.theme.elements};
  box-shadow: -2px -1px 32px -4px ${(props) => props.theme.shadow};
  padding: 0.7rem 1rem;
  border-radius: 6px;
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;
