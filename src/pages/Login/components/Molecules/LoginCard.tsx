import { Button, Card, Form, Typography } from "antd";
import { DLogin } from "database";
import { Controller, useForm } from "react-hook-form";
import Input from "../Form/Input";
import ErrorMessage from "../Form/ErrorMessage";
import { LockOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import Password from "../Form/Password";

const LoginCard = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DLogin>({
    criteriaMode: "all",
  });

  const onSubmit = (e: DLogin) => {
    console.log(e);
  };

  return (
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
  );
};

export default LoginCard;
