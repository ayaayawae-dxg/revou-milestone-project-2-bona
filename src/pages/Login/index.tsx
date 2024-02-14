import { Col, Image, Row } from "antd";
import { useRecoilValue } from "recoil";
import { authState } from "store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import DigicampLogo from "../../assets/digicamp-logo-white.png";

import LoginCard from "./components/Molecules/LoginCard";
import ChangeLanguange from "components/ChangeLanguange";

const Login = () => {
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/store")
    }
  }, [])

  return (
    <>
      <ChangeLanguange />
      <Row style={{ minHeight: "100vh" }} justify={"center"} align="middle">
        <Col
          xs={{ flex: "none", span: 0 }}
          md={{ flex: 1, span: 12 }}
          style={{ textAlign: "center" }}
        >
          <Image loading="lazy" src={DigicampLogo} style={{ maxWidth: 500 }} />
        </Col>
        <Col
          xs={24}
          md={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingInline: 16,
          }}
        >
          <LoginCard />
        </Col>
      </Row>
    </>
  );
};

export default Login;
