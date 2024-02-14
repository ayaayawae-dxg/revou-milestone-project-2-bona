import { render, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import Dashboard from "./index";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => { }),
      },
    };
  },
  initReactI18next: {
    type: "3rdParty",
    init: () => { },
  },
}));

describe("Dashboard", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it("renders dashboard with registered information", async () => {
    const registration = {
      firstName: "John",
    };

    jest
      .spyOn(require("recoil"), "useRecoilValue")
      .mockReturnValue(registration);

    const { queryByText } = render(
      <RecoilRoot>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </RecoilRoot>
    );

    await waitFor(() => {
      expect(queryByText("dashboard.title")).toBeInTheDocument();
      expect(queryByText("dashboard.subTitle John, dashboard.subTitle.waitMessage")).toBeInTheDocument();
    })
  });
});

