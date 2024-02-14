import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PersonalInformation from "./PersonalInformation";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "antd";
import { DRegistration } from "database";

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
  const methods = useForm<DRegistration>();
  const onSubmitMock = jest.fn();

  return (
    <FormProvider {...methods}>
      <Form onFinish={methods.handleSubmit(onSubmitMock)}>{children}</Form>
    </FormProvider>
  );
};

describe("PersonalInformation", () => {
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
    render(
      <WrapperForm>
        <PersonalInformation />
      </WrapperForm>
    );
    expect(screen.getByText("form.page.1.field.1")).toBeInTheDocument();
    expect(screen.getByText("form.page.1.field.2")).toBeInTheDocument();
    expect(screen.getByText("form.page.1.field.3")).toBeInTheDocument();
  });

  it("should validate user input fields", async () => {
    const { getByRole, getByText } = render(
      <WrapperForm>
        <PersonalInformation />
        <button type="submit">Submit</button>
      </WrapperForm>
    );

    const firstNameInput = getByRole("textbox", { name: /firstname/i })
    const emailInput = getByRole("textbox", { name: /email/i })
    const dateBirthInput = getByRole("textbox", { name: /birthDate/i })
    const buttonSubmit = getByText("Submit")

    fireEvent.input(firstNameInput, { target: { value: "" } });
    fireEvent.input(emailInput, { target: { value: "" } });
    fireEvent.input(dateBirthInput, { target: { value: "" } });

    fireEvent.submit(buttonSubmit);

    await waitFor(() => {
      expect(screen.queryByText("form.page.1.field.1.required")).toBeInTheDocument();
      expect(screen.queryByText("form.page.1.field.2.required")).toBeInTheDocument();
      expect(screen.queryByText("form.page.1.field.3.required")).toBeInTheDocument();
    });
  });
});
