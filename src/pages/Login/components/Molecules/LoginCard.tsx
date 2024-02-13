import { Button, Card, Form, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { DLogin } from "database";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Input from "../Form/Input";
import ErrorMessage from "../Form/ErrorMessage";
import Password from "../Form/Password";

import { compareHashPassword } from "utils/helper";

const LoginCard = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DLogin>({
    criteriaMode: "all",
  });

  const onSubmit = (e: DLogin) => {
    const registrationData = JSON.parse(
      localStorage.getItem("registration") as string
    );

    if (registrationData) {
      const isUsernameMatch = e.username === registrationData.username;
      const isPasswordMatch = compareHashPassword(
        e.password,
        registrationData.password
      );

      if (isUsernameMatch && isPasswordMatch) {
        navigate("/store");
      } else {
        messageApi.open({
          type: "error",
          content: "Username or password is incorrect",
        });
      }
    } else {
      messageApi.open({
        type: "error",
        content: "Username or password is incorrect",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        style={{ maxWidth: 450, width: "100%" }}
      >
        <Card
          title={
            <Typography.Title style={{ textAlign: "center" }}>
              LOGIN
            </Typography.Title>
          }
          headStyle={{ borderBottom: 0 }}
          style={{ backgroundColor: "transparent" }}
        >
          <Form.Item
            name={"username"}
            extra={
              errors.username && (
                <ErrorMessage>{`${errors.username.message}`}</ErrorMessage>
              )
            }
          >
            <Controller
              name="username"
              control={control}
              rules={{ required: "Username is Required" }}
              render={({ field: { ref, name, ...field } }) => (
                <Input
                  {...field}
                  name={name}
                  placeholder={"Username"}
                  prefix={<UserOutlined />}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            name={"password"}
            extra={
              errors.password && (
                <ErrorMessage>{`${errors.password.message}`}</ErrorMessage>
              )
            }
          >
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is Required" }}
              render={({ field: { ref, name, ...field } }) => (
                <Password
                  {...field}
                  name={name}
                  placeholder={"Password"}
                  prefix={<LockOutlined />}
                />
              )}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", marginBlock: "1rem" }}
            size="large"
          >
            Login
          </Button>
        </Card>
      </Form>
    </>
  );
};

export default LoginCard;
