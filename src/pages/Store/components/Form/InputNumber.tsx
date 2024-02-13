import React from "react";
import { InputNumber as CustomInput } from "antd";

type Props = {
  name: string;
  placeholder: string;
  prefix?: string | React.ReactNode;
  min?: number;
};

const InputNumber = ({ placeholder, name, prefix, min, ...rest }: Props) => {
  return (
    <CustomInput
      {...rest}
      style={{
        color: "white",
        borderRadius: "0px",
        borderBottom: "1px solid white",
        fontSize: "1.25rem",
        width: "100%"
      }}
      variant="borderless"
      prefix={prefix}
      placeholder={placeholder}
      id={name}
      min={min}
    />
  );
};

export default InputNumber;
