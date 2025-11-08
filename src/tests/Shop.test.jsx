import { describe, test, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "../routes.jsx";

describe("Shop component", () => {
  test("Render shop page", () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/shop"] });
    const { container } = render(<RouterProvider router={router} />);
    expect(container).toMatchSnapshot();
  });

  test("Visit product on shop page", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, { initialEntries: ["/shop"] });
    const { container } = render(<RouterProvider router={router} />);
    const productHeader = screen.getByRole("heading", { name: "Products" });
    const productSection = productHeader.parentElement;
    screen.debug();
    const productLinks = within(productSection).getAllByRole("link");
    await user.click(productLinks[0]);
    expect(container).toMatchSnapshot();
  });
});
