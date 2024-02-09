import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { useTranslation } from "react-i18next";

type Props = {
  current: number;
  steps: object[];
  next: () => void;
  prev: () => void;
};

const NavButton = ({ current, steps, next, prev }: Props) => {
  const { t } = useTranslation();

  return (
    <Flex justify="space-between" style={{ marginTop: "1rem" }}>
      {current > 0 ? (
        <Button
          size="large"
          icon={<ArrowLeftOutlined />}
          data-testid="prev"
          type="primary"
          tabIndex={-1}
          onClick={prev}
        />
      ) : (
        <div></div>
      )}
      {current < steps.length - 1 && (
        <Button
          size="large"
          icon={<ArrowRightOutlined />}
          data-testid="next"
          type="primary"
          onClick={next}
        />
      )}
      {current === steps.length - 1 && (
        <Button size="large" type="primary" htmlType="submit">
          {t("form.page.3.submit")}
        </Button>
      )}
    </Flex>
  );
};

export default NavButton;
