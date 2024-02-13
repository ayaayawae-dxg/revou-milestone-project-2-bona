import { Button, Form } from "antd";
import { DStore } from "database";
import { Controller, useForm } from "react-hook-form";
import ErrorMessage from "../Form/ErrorMessage";
import Input from "../Form/Input";
import InputNumber from "../Form/InputNumber";
import { useSetRecoilState } from "recoil";
import { storeState } from "store";

const InputForm = () => {
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
    }
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
          label={"Asset"}
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
            rules={{ required: "Asset is Required" }}
            render={({ field: { ref, name, ...field } }) => (
              <Input {...field} name={name} placeholder={"Asset"} />
            )}
          />
        </Form.Item>

        <Form.Item
          label={"Quantity"}
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
              required: "Quantity is Required",
              min: { value: 1, message: "Quantity must be greater than 0" },
            }}
            render={({ field: { ref, name, ...field } }) => (
              <InputNumber
                {...field}
                min={1}
                name={name}
                placeholder={"Quantity"}
              />
            )}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          style={{ width: "100%" }}
        >
          Add
        </Button>
      </Form>
    </>
  );
};

export default InputForm;
