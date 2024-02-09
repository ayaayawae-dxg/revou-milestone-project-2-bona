import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Form } from "antd";

import Input from "../Input/Input";
import Password from "../Input/Password";
import ErrorMessage from "../Input/ErrorMessage";

const AccountInformation = () => {
  const { t } = useTranslation();

  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Form.Item
        label={t("form.page.3.field.1")}
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
          rules={{ required: t("form.page.3.field.1.required") }}
          render={({ field: { ref, name, ...field } }) => (
            <Input
              {...field}
              name={name}
              placeholder={t("form.page.3.field.1")}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label={t("form.page.3.field.2")}
        name={"password"}
        extra={
          errors.password &&
          Object.entries(errors.password.types || {}).map(([type, message]) => (
            <ErrorMessage key={type}>{message}</ErrorMessage>
          ))
        }
      >
        <Controller
          name="password"
          control={control}
          rules={{
            required: t("form.page.3.field.2.required"),
            minLength: {
              value: 8,
              message: t("form.page.3.field.2.minLength"),
            },
            validate: {
              hasLower: (value) =>
                /[a-z]/.test(value) || t("form.page.3.field.2.hasLower"),
              hasUpper: (value) =>
                /[A-Z]/.test(value) || t("form.page.3.field.2.hasUpper"),
              hasSymbol: (value) =>
                /\W/.test(value) || t("form.page.3.field.2.hasSymbol"),
            },
          }}
          render={({ field: { ref, name, ...field } }) => (
            <Password
              {...field}
              name={name}
              placeholder={t("form.page.3.field.2")}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label={t("form.page.3.field.3")}
        name={"rePassword"}
        extra={
          errors.rePassword && (
            <ErrorMessage>{`${errors.rePassword.message}`}</ErrorMessage>
          )
        }
      >
        <Controller
          name="rePassword"
          control={control}
          rules={{
            required: t("form.page.3.field.3.required"),
            validate: {
              isMatch: (value) =>
                watch("password") === value || t("form.page.3.field.3.isMatch"),
            },
          }}
          render={({ field: { ref, name, ...field } }) => (
            <Password
              {...field}
              name={name}
              placeholder={t("form.page.3.field.3")}
            />
          )}
        />
      </Form.Item>
    </>
  );
};

export default AccountInformation;
