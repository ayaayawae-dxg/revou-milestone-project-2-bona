import { Button, Card, Form, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { DLogin } from "database";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Input from "../Form/Input";
import ErrorMessage from "../Form/ErrorMessage";
import Password from "../Form/Password";

import { compareHashPassword } from "../../../../utils/helper";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";
import { authState } from "../../../../store";

const LoginCard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const setAuth = useSetRecoilState(authState);

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
        setAuth(e);
        localStorage.setItem("user", JSON.stringify(e.username));
        navigate("/store");
      } else {
        messageApi.open({
          type: "error",
          content: t("login.submit.failed"),
        });
      }
    } else {
      messageApi.open({
        type: "error",
        content: t("login.submit.failed"),
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
              rules={{ required: t("login.field.1.required") }}
              render={({ field: { ref, name, ...field } }) => (
                <Input
                  {...field}
                  name={name}
                  placeholder={t("login.field.1")}
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
              rules={{ required: t("login.field.2.required") }}
              render={({ field: { ref, name, ...field } }) => (
                <Password
                  {...field}
                  name={name}
                  placeholder={t("login.field.2")}
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
            {t("login.submit")}
          </Button>
        </Card>
      </Form>
    </>
  );
};

export default LoginCard;
