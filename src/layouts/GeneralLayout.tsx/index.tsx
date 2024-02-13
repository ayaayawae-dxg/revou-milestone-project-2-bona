import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

const { Content } = Layout;

const GeneralLayout = () => {
  return (
    <Layout
      style={{
        overflow: "hidden",
        width: "100%",
        maxWidth: "50rem",
        height: "100vh",
        margin: "0 auto",
        backgroundColor: "#00011e",
      }}
    >
      <Header />
      <Content style={{ overflow: "auto", padding: "3rem 1rem" }}>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
};

export default GeneralLayout;
