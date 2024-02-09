import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Form } from "antd";

import { STATE_CITY } from "utils/constant";

import TextArea from "../Input/TextArea";
import Select from "../Input/Select";
import Input from "../Input/Input";
import ErrorMessage from "../Input/ErrorMessage";

const AddressInformation = () => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();

  return (
    <>
      <Form.Item
        label={t("form.page.2.field.1")}
        name={"streetAddress"}
        extra={
          errors.streetAddress && (
            <ErrorMessage>{`${errors.streetAddress.message}`}</ErrorMessage>
          )
        }
      >
        <Controller
          name="streetAddress"
          control={control}
          rules={{ required: t("form.page.2.field.1.required") }}
          render={({ field: { ref, name, ...field } }) => (
            <TextArea
              {...field}
              name={name}
              placeholder={t("form.page.2.field.1")}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label={t("form.page.2.field.2")}
        name={"state"}
        extra={
          errors.state && (
            <ErrorMessage>{`${errors.state.message}`}</ErrorMessage>
          )
        }
      >
        <Controller
          name="state"
          control={control}
          rules={{ required: t("form.page.2.field.2.required") }}
          render={({ field: { ref, onChange, name, ...field } }) => (
            <Select
              {...field}
              name={name}
              options={Object.keys(STATE_CITY).map((state) => ({
                label: state,
                value: state,
              }))}
              placeholder={t("form.page.2.field.2")}
              onChange={(e) => {
                onChange(e);
                setValue("city", null);
                setValue("zipCode", null);
              }}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label={t("form.page.2.field.3")}
        name="city"
        extra={
          errors.city && <ErrorMessage>{`${errors.city.message}`}</ErrorMessage>
        }
      >
        <Controller
          name="city"
          control={control}
          rules={{ required: t("form.page.2.field.3.required") }}
          render={({ field: { ref, onChange, name, ...field } }) => (
            <Select
              {...field}
              options={
                watch("state")
                  ? STATE_CITY[watch("state") as keyof typeof STATE_CITY].map(
                    (city) => ({
                      label: city,
                      value: city,
                    })
                  )
                  : []
              }
              placeholder={t("form.page.2.field.3")}
              onChange={(e) => {
                onChange(e);
                setValue("zipCode", null);
              }}
              name={name}
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label={t("form.page.2.field.4")}
        name={"zipCode"}
        extra={
          errors.zipCode && (
            <ErrorMessage>{`${errors.zipCode.message}`}</ErrorMessage>
          )
        }
      >
        <Controller
          name="zipCode"
          control={control}
          rules={{
            required: t("form.page.2.field.4.required"),
            pattern: {
              value: /^[0-9]{5}-[0-9]{4}$/,
              message: t("form.page.2.field.4.pattern"),
            },
          }}
          render={({ field: { ref, name, ...field } }) => (
            <Input
              {...field}
              name={name}
              placeholder={t("form.page.2.field.4")}
            />
          )}
        />
      </Form.Item>
    </>
  );
};

export default AddressInformation;
