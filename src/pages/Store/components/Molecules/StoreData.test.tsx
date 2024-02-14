import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import StoreData from "./StoreData";
import { RecoilRoot } from "recoil";

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

const WrapperForm = ({ children }: any) => {
  return (
    <RecoilRoot>
      {children}
    </RecoilRoot>
  )
}

describe("Store Data", () => {
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

  it("should render table", async () => {
    const { container, getByText } = render(
      <WrapperForm>
        <StoreData />
      </WrapperForm>
    );

    expect(getByText("store.data.column.1.label")).toBeInTheDocument();
    expect(getByText("store.data.column.2.label")).toBeInTheDocument();
    expect(getByText("store.data.column.3.label")).toBeInTheDocument();
  });

  it("should render value", async () => {
    const mockUseRecoilValue = jest.spyOn(require("recoil"), "useRecoilValue");
    mockUseRecoilValue.mockReturnValueOnce([
      {
        key: crypto.randomUUID(),
        asset: "BTC",
        quantity: 3,
      },
      {
        key: crypto.randomUUID(),
        asset: "LAPTOP",
        quantity: 1,
      },
    ]);

    const { queryByText, getByText } = render(
      <WrapperForm>
        <StoreData />
      </WrapperForm>
    );

    await waitFor(() => {
      expect(queryByText("BTC")).toBeInTheDocument();
      expect(queryByText("LAPTOP")).toBeInTheDocument();
    });
  });
});
