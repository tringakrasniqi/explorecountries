import { ChangeEventHandler, FC } from "react";
import { IconType } from "react-icons";
import { CiSearch } from "react-icons/ci";
import styled from "styled-components";

type InputProps = {
  id: string;
  label: string;
  error?: boolean;
  message?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  success?: boolean;
  icon?: IconType;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const StyledInput = styled.input`
  background: ${(props) => props.theme.elements};
  color: ${(props) => props.theme.text};
  padding: 10px;
  border: none;
  border-radius: 0 3px 3px 0;
  outline: none;
  &:focus {
    outline: 1px solid ${(props) => props.theme.text};
  }
`;

const StyledLabel = styled.label`
  position: absolute;
  left: -999px;
`;

const StyledMessage = styled.p`
  font-size: 8px;
`;

const StyledIcon = styled.span`
  background: ${(props) => props.theme.elements};
  color: ${(props) => props.theme.text};
  padding: 10px;
  border-radius: 3px 0 0 3px;
`;

const StyledContainer = styled.span`
  display: flex;
  margin: 1rem;
  width: fit-content;
  box-shadow: 8px 10px 73px -13px rgba(0, 0, 0, 0.31);
`;

export const InputField: FC<InputProps> = ({
  id,
  label,
  error,
  message,
  placeholder,
  required,
  disabled,
  success,
  icon,
  onChange,
  ...props
}) => {
  return (
    <StyledContainer>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledIcon>
        <CiSearch aria-hidden="true" />
      </StyledIcon>
      <StyledInput
        type="text"
        id={id}
        name="name"
        required={required}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder ? placeholder : label}
        {...props}
      />
      {error && <StyledMessage> Error </StyledMessage>}
    </StyledContainer>
  );
};
