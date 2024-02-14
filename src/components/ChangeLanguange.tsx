import { Segmented } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ChangeLanguange = () => {
  const [lang, setLang] = useState<string>("en");
  const { i18n } = useTranslation();

  return (
    <Segmented
      style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}
      options={[
        { label: "EN", value: "en" },
        { label: "ID", value: "id" },
      ]}
      value={lang}
      onChange={(e) => {
        setLang(e.toString());
        i18n.changeLanguage(e.toString());
      }}
    />
  );
};

export default ChangeLanguange;
