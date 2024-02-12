import React from "react";
import { Input as CustomInput } from "antd";

type Props = {
  name: string;
  placeholder: string;
  prefix?: string | React.ReactNode;
};

const Input = ({ placeholder, name, prefix, ...rest }: Props) => {
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
      prefix={prefix}
      placeholder={placeholder}
      id={name}
    />
  );
};

export default Input;
