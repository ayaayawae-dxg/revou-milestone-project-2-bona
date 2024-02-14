import { Layout } from "antd";

const { Header: CustomHeader } = Layout;

const Header = () => {
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
      Store
    </CustomHeader>
  );
};

export default Header;
