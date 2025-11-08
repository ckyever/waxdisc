import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App.jsx";

describe("App component", () => {
  test("Render home page", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  test("Visit home page", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    const homeLink = screen.getByRole("link", { name: "Home" });
    await user.click(homeLink);
    expect(container).toMatchSnapshot();
  });
});
