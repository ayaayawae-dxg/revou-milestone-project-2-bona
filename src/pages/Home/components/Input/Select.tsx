import React from "react";
import { Select as CustomSelect } from "antd";

type Props = {
  placeholder: string;
  options: {
    label: string;
    value: string;
  }[]
  name: string;
  onChange: (e: any) => void;
};

const Select = ({ placeholder, options, name, onChange, ...rest }: Props) => {
  return (
    <CustomSelect
      style={{
        color: "white",
        borderRadius: "0px",
        borderBottom: "1px solid white",
        fontSize: "1.25rem",
      }}
      showSearch
      variant="borderless"
      placeholder={placeholder}
      options={options}
      onChange={onChange}
      id={name}
      {...rest}
    />
  );
};

export default Select;
