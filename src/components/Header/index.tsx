import { Layout, Segmented } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const { Header: CustomHeader } = Layout;

const Header = () => {
  const [lang, setLang] = useState<string>("en");
  const { t, i18n } = useTranslation();

  return (
    <CustomHeader
      style={{
        textAlign: "center",
        color: "#fff",
        backgroundColor: "#00011e",
        height: "auto",
        fontSize: "3rem",
        lineHeight: "normal",
        padding: "1rem",
        position: "relative",
      }}
    >
      <Segmented
        style={{ position: "absolute", top: 10, right: 10 }}
        options={["EN", "ID"]}
        value={lang}
        onChange={(e) => i18n.changeLanguage(e.toString().toLowerCase())}
      />
      {t("header")}
    </CustomHeader>
  );
};

export default Header;
