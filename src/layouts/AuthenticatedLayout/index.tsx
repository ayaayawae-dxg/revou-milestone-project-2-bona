import { Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "store";
import { useEffect } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ChangeLanguange from "components/ChangeLanguange";

const { Content } = Layout;

const AuthenticatedLayout = () => {
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [])

  return (
    <>
      <ChangeLanguange />
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
    </>
  );
};

export default AuthenticatedLayout;
