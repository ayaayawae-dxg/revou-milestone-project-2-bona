import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import InputForm from "./InputForm";

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

describe("Input Asset", () => {
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
    const { container, getByLabelText } = render(<InputForm />);

    expect(getByLabelText("store.input.field.1")).toBeInTheDocument();
    expect(getByLabelText("store.input.field.2")).toBeInTheDocument();
    expect(
      container.querySelector(`button[type="submit"]`)
    ).toBeInTheDocument();
  });

  it("should validate input(fail)", async () => {
    const { getByTestId, getByText, getByLabelText, getByRole } = render(
      <InputForm />
    );

    const assetInput = getByLabelText("store.input.field.1");
    const quantityInput = getByLabelText("store.input.field.2");
    const buttonSubmit = getByText("store.submit");

    fireEvent.input(assetInput, { target: { value: "" } });
    fireEvent.input(quantityInput, { target: { value: "" } });

    fireEvent.submit(buttonSubmit);

    await waitFor(() => {
      expect(
        screen.queryByText("store.input.field.1.required")
      ).toBeInTheDocument();
      expect(
        screen.queryByText("store.input.field.2.required")
      ).toBeInTheDocument();
    });
  });

  it("should validate quantity input", async () => {
    const { getByTestId, getByText, getByLabelText, getByRole } = render(
      <InputForm />
    );

    const quantityInput = getByLabelText("store.input.field.2");
    const buttonSubmit = getByText("store.submit");

    fireEvent.input(quantityInput, { target: { value: 0 } });

    fireEvent.submit(buttonSubmit);

    await waitFor(() => {
      expect(
        screen.queryByText("store.input.field.2.required")
      ).not.toBeInTheDocument();
      expect(screen.queryByText("store.input.field.2.min")).toBeInTheDocument();
    });
  });

  it("should test valid value and input", async () => {
    const { getByLabelText } = render(
      <InputForm />
    );

    const assetInput = getByLabelText("store.input.field.1");
    const quantityInput = getByLabelText("store.input.field.2");

    fireEvent.input(assetInput, { target: { value: "laptop" } });
    fireEvent.input(quantityInput, { target: { value: 2 } });

    expect(assetInput).toHaveValue("laptop");
    expect(quantityInput).toHaveValue("2");
  });
});
