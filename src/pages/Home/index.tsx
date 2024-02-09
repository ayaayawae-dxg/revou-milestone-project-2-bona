import React, { lazy, useEffect, useState } from "react";
import { Button, Form, Steps } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { registrationState } from "store";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DRegistration } from "database";

import PersonalInformation from "./components/Form/PersonalInformation";
import AddressInformation from "./components/Form/AddressInformation";
import AccountInformation from "./components/Form/AccountInformation";

const NavButton = lazy(() => import("./components/molecules/NavButton"));

const Home = () => {
  const navigate = useNavigate();
  const methods = useForm<DRegistration>({
    criteriaMode: "all"
  });
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
  ];

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
    setRegistrationValue(data);
    localStorage.setItem("registration", JSON.stringify(data));
    navigate("dashboard");
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
