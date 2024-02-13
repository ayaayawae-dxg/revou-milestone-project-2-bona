import { Typography } from "antd";
import React from "react";

type Props = {
  children: string;
};

const ErrorMessage = ({ children }: Props) => {
  return (
    <Typography.Text type="danger" role="alert">
      {children}
    </Typography.Text>
  );
};

export default ErrorMessage;
