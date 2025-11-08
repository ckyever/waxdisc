import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "../routes.jsx";

describe("App component", () => {
  test("Render home page", () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });
    const { container } = render(<RouterProvider router={router} />);
    expect(container).toMatchSnapshot();
  });

  test("Visit home page", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });
    const { container } = render(<RouterProvider router={router} />);
    const homeLink = screen.getByRole("link", { name: "Home" });
    await user.click(homeLink);
    expect(container).toMatchSnapshot();
  });
});
