import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginCard from "./LoginCard";

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
    <BrowserRouter>
      {children}
    </BrowserRouter>
  )
}

describe("LoginCard", () => {
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

  it("should render all fields", async () => {
    const { container } = render(
      <WrapperForm>
        <LoginCard />
      </WrapperForm>
    );
    expect(screen.getByText("LOGIN")).toBeInTheDocument();
    expect(container.querySelector(`input[name="username"]`)).toBeInTheDocument();
    expect(container.querySelector(`input[name="password"]`)).toBeInTheDocument();
    expect(container.querySelector(`button[type="submit"]`)).toBeInTheDocument();
  });

  it("should validate login input(fail)", async () => {
    const { getByTestId, getByText, getByRole } = render(
      <WrapperForm>
        <LoginCard />
      </WrapperForm>
    )

    const usernameInput = getByRole("textbox", { name: /username/i })
    const passwordInput = getByTestId("password")
    const buttonSubmit = getByText("login.submit")

    fireEvent.input(usernameInput, { target: { value: "" } });
    fireEvent.input(passwordInput, { target: { value: "" } });

    fireEvent.submit(buttonSubmit)

    await waitFor(() => {
      expect(screen.queryByText("login.field.1.required")).toBeInTheDocument();
      expect(screen.queryByText("login.field.2.required")).toBeInTheDocument();
    })
  });

  it("should validate login input(success)", async () => {
    const { getByTestId, getByText, getByRole } = render(
      <WrapperForm>
        <LoginCard />
      </WrapperForm>
    )

    const usernameInput = getByRole("textbox", { name: /username/i })
    const passwordInput = getByTestId("password")
    const buttonSubmit = getByText("login.submit")

    fireEvent.input(usernameInput, { target: { value: "abece" } });
    fireEvent.input(passwordInput, { target: { value: "Asdf123$" } });

    fireEvent.submit(buttonSubmit)

    await waitFor(() => {
      expect(screen.queryByText("login.field.1.required")).not.toBeInTheDocument();
      expect(screen.queryByText("login.field.2.required")).not.toBeInTheDocument();
    })
  });
});
