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
      {...rest}
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
      aria-label={name}
    />
  );
};

export default Password;
