import React from "react";
import { Input as CustomInput } from "antd";

type Props = {
  placeholder: string;
  name: string;
};

const Password = ({ placeholder, name, ...rest }: Props) => {
  return (
    <CustomInput.Password
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
      name={name}
      aria-label={name}
      data-testid={name}
    />
  );
};

export default Password;
