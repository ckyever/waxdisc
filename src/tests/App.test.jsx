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

  test("Visit shop page", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });
    const { container } = render(<RouterProvider router={router} />);
    const shopLink = screen.getByRole("link", { name: "Shop" });
    await user.click(shopLink);
    expect(container).toMatchSnapshot();
  });

  test("Visit cart page", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });
    const { container } = render(<RouterProvider router={router} />);
    const cartLink = screen.getByRole("link", { name: "Cart" });
    await user.click(cartLink);
    expect(container).toMatchSnapshot();
  });

  test("Visit non-existent page", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/fakepage"],
    });
    const { container } = render(<RouterProvider router={router} />);
    expect(container).toMatchSnapshot();
  });
});
