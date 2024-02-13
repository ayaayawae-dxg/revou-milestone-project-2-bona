import { Controller, useFormContext } from "react-hook-form";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Form } from "antd";
import dayjs from "dayjs";

import Input from "../Input/Input";
import DatePicker from "../Input/DatePicker";
import ErrorMessage from "../Input/ErrorMessage";

const PersonalInformation = () => {
  const { t } = useTranslation();

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Form.Item
        label={t("form.page.1.field.1")}
        name={"firstName"}
        extra={
          errors.firstName && (
            <ErrorMessage>{`${errors.firstName.message}`}</ErrorMessage>
          )
        }
      >
        <Controller
          name="firstName"
          control={control}
          rules={{ required: t("form.page.1.field.1.required") }}
          render={({ field: { ref, name, ...field } }) => (
            <Input
              {...field}
              name={name}
              placeholder={t("form.page.1.field.1")}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label={t("form.page.1.field.2")}
        name={"email"}
        extra={
          errors.email && (
            <ErrorMessage>{`${errors.email.message}`}</ErrorMessage>
          )
        }
      >
        <Controller
          name="email"
          control={control}
          rules={{
            required: t("form.page.1.field.2.required"),
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: t("form.page.1.field.2.pattern"),
            },
          }}
          render={({ field: { ref, name, ...field } }) => (
            <Input
              {...field}
              name={name}
              placeholder={t("form.page.1.field.2")}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label={t("form.page.1.field.3")}
        name={"birthDate"}
        extra={
          errors.birthDate && (
            <ErrorMessage>{`${errors.birthDate.message}`}</ErrorMessage>
          )
        }
      >
        <Controller
          name="birthDate"
          control={control}
          rules={{
            validate: {
              isBeforeNow: (value) => {
                if (value) {
                  const now = moment();
                  const birthDate = moment(value.toString());
                  if (birthDate.isAfter(now)) {
                    return t("form.page.1.field.3.isBeforeNow");
                  }
                  return true;
                }
              },
            },
            required: t("form.page.1.field.3.required"),
          }}
          render={({ field: { ref, name, ...field } }) => {
            const tomorrow = moment().add(1, "days").toString();

            return (
              <DatePicker
                name={name}
                placeholder={t("form.page.1.field.3")}
                disabledDate={(current) => current.isAfter(tomorrow)}
                defaultPickerValue={dayjs(dayjs().subtract(23, "years"))}
                {...field}
              />
            );
          }}
        />
      </Form.Item>
    </>
  );
};

export default PersonalInformation;
