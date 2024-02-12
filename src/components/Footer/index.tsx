import { Image, Layout } from "antd";
import DigicampLogo from "assets/digicamp-logo-white.png"

const { Footer: CustomFooter } = Layout;

const Footer = () => {
  return (
    <CustomFooter
      style={{
        textAlign: "center",
        backgroundColor: "#00011e",
        height: "6rem",
        padding: "1rem 1rem"
      }}
    >
      <Image
        loading="lazy"
        height={"100%"}
        src={DigicampLogo}
      />
    </CustomFooter>
  );
};

export default Footer;
