import { Button, Form } from "antd";
import { DStore } from "database";
import { Controller, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { storeState } from "store";

import ErrorMessage from "../Form/ErrorMessage";
import Input from "../Form/Input";
import InputNumber from "../Form/InputNumber";
import { useTranslation } from "react-i18next";

const InputForm = () => {
  const { t } = useTranslation();
  const setStoreState = useSetRecoilState(storeState);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DStore>({
    criteriaMode: "all",
  });

  const onSubmit = (e: DStore) => {
    const newAsset = {
      ...e,
      key: crypto.randomUUID(),
    };
    setStoreState((prev) => [...prev, newAsset]);
  };

  return (
    <>
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        style={{ width: "100%" }}
      >
        <Form.Item
          label={t("store.input.field.1")}
          name={"asset"}
          extra={
            errors.asset && (
              <ErrorMessage>{`${errors.asset.message}`}</ErrorMessage>
            )
          }
        >
          <Controller
            name="asset"
            control={control}
            rules={{ required: t("store.input.field.1.required") }}
            render={({ field: { ref, name, ...field } }) => (
              <Input
                {...field}
                name={name}
                placeholder={t("store.input.field.1")}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label={t("store.input.field.2")}
          name={"quantity"}
          extra={
            errors.quantity && (
              <ErrorMessage>{`${errors.quantity.message}`}</ErrorMessage>
            )
          }
        >
          <Controller
            name="quantity"
            control={control}
            rules={{
              required: t("store.input.field.2.required"),
              min: { value: 1, message: t("store.input.field.2.min") },
            }}
            render={({ field: { ref, name, ...field } }) => (
              <InputNumber {...field} name={name} placeholder={t("store.input.field.2")} />
            )}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          style={{ width: "100%" }}
        >
          {t("store.submit")}
        </Button>
      </Form>
    </>
  );
};

export default InputForm;
