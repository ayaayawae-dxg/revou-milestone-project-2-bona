import React from "react";
import { Input as CustomInput } from "antd";

type Props = {
  placeholder: string;
  name: string;
  prefix?: string | React.ReactNode;
};

const Password = ({ placeholder, name, prefix, ...rest }: Props) => {
  return (
    <CustomInput.Password
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
      {...rest}
    />
  );
};

export default Password;
