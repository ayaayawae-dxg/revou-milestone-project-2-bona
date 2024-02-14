import { Layout } from "antd";
import { useTranslation } from "react-i18next";

const { Header: CustomHeader } = Layout;

const Header = () => {
  const { t } = useTranslation();

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
      {t("header")}
    </CustomHeader>
  );
};

export default Header;
