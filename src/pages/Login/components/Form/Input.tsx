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
      aria-label={name}
      style={{
        color: "white",
        borderRadius: "0px",
        borderBottom: "1px solid white",
        fontSize: "1.25rem"
      }}
      data-testid={name}
      variant="borderless"
      prefix={prefix}
      placeholder={placeholder}
      id={name}
      name={name}
    />
  );
};

export default Input;
