import React from "react";
import { Input as CustomInput } from "antd";

type Props = {
  name: string;
  placeholder: string;
};

const Input = ({ placeholder, name, ...rest }: Props) => {
  return (
    <CustomInput
      {...rest}
      style={{
        color: "white",
        borderRadius: "0px",
        borderBottom: "1px solid white",
        fontSize: "1.25rem"
      }}
      variant="borderless"
      placeholder={placeholder}
      id={name}
    />
  );
};

export default Input;
