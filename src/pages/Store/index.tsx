import { Col, Image, Row, Typography } from "antd";

import InputForm from "./components/Molecules/InputForm";
import StoreData from "./components/Molecules/StoreData";

const Store = () => {
  return (
    <Row gutter={[16, 36]} align={"top"}>
      <Col xs={24} md={8}>
        <InputForm />
      </Col>
      <Col xs={24} md={16}>
        <StoreData />
      </Col>
    </Row>
  );
};

export default Store;
