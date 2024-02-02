import { ConfigProvider } from 'antd';
import { Home } from 'pages';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#341eff",
          colorTextBase: "white"
        },
        components: {
          DatePicker: {
            colorBgElevated: '#00011e',
            activeBg: '#00011e',
            fontSize: 20,
          },
          Select: {
            colorBgElevated: "#313256",
            optionSelectedColor: "black",
            fontSize: 20,
            optionActiveBg: "#341eff",
          },
          Modal: {
            contentBg: "#313256",
            headerBg: "#313256",
          }
        },
      }}
    >
      <RecoilRoot>
        <Home />
      </RecoilRoot>
    </ConfigProvider>
  );
}

export default App;
