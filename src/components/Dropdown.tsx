import { ChangeEventHandler, FC } from "react";
import styled from "styled-components";

type DropdwonProps = {
  label?: string;
  items: string[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
  defaultValue?: string;
};

const StyledSelect = styled.select`
  padding: 10px;
  background: ${(props) => props.theme.elements};
  color: ${(props) => props.theme.text};
  border: none;
  border-radius: 3px;
  width: 100%;
`;

const StyledFieldSet = styled.fieldset`
  border: none;
  width: 150px;
`;
export const Dropdown: FC<DropdwonProps> = ({
  label,
  items,
  onChange,
  defaultValue,
  ...props
}) => {
  return (
    <StyledFieldSet>
      <legend>{label}</legend>
      <StyledSelect id={label} {...props} onChange={onChange}>
        {items.map((item) => (
          <option key={item} value={item} selected={defaultValue === item}>
            {item}
          </option>
        ))}
      </StyledSelect>
    </StyledFieldSet>
  );
};
