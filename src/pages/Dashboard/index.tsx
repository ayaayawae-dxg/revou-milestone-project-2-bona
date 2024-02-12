import { Col, Result, Row, Spin, Typography } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useRecoilValue } from "recoil";
import { registrationState } from "../../store";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const registration = useRecoilValue(registrationState);

  useEffect(() => {
    if (registration) {
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    }
  }, [registration]);
  return (
    <Result
      icon={<SmileOutlined />}
      title={t("dashboard.title")}
      subTitle={
        <Row gutter={[16, 36]}>
          <Col span={24}>
            <Spin />
          </Col>
          <Col span={24}>
            <Typography.Text style={{ fontSize: 20 }}>
              {t("dashboard.subTitle")} {registration.firstName}, {t("dashboard.subTitle.waitMessage")}
            </Typography.Text>
          </Col>
        </Row>
      }
    />
  );
};

export default Dashboard;
