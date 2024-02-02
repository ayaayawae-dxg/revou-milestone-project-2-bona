import React, { useMemo, useState } from "react";
import { GeneralLayout } from "layouts";
import { Form, Steps } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { registrationState } from "store";

import PersonalInformation from "./components/Form/PersonalInformation";
import AddressInformation from "./components/Form/AddressInformation";
import AccountInformation from "./components/Form/AccountInformation";
import NavButton from "./components/molecules/NavButton";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";



const Home = () => {
  const navigate = useNavigate()
  const methods = useForm<DRegistration>();
  const [current, setCurrent] = useState<number>(0);
  const setRegistrationValue = useSetRecoilState(registrationState);
  const { t } = useTranslation();

  const steps = [
    {
      title: t("form.page.1.title"),
      content: <PersonalInformation />,
    },
    {
      title: t("form.page.2.title"),
      content: <AddressInformation />,
    },
    {
      title: t("form.page.3.title"),
      content: <AccountInformation />,
    },
  ]
  
  const next = () => {
    methods.handleSubmit((data) => {
      setCurrent(current + 1);
    })();
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const onSubmit = (data: DRegistration) => {
    setRegistrationValue(data)
    navigate('dashboard')
  };

  return (
    <FormProvider {...methods}>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: "100%" }}
        onFinish={methods.handleSubmit(onSubmit)}
      >
        <Steps current={current} items={items} />

        <div style={{ marginTop: 16 }}>{steps[current].content}</div>

        <NavButton current={current} steps={steps} next={next} prev={prev} />
      </Form>
    </FormProvider>
  );
};

export default Home;
