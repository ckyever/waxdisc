import { describe, test, expect, vi } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "../routes.jsx";

window.fetch = vi
  .fn()
  .mockResolvedValueOnce(() => {
    const accessToken = { access_token: "notarealtoken" };
    return Promise.resolve({ json: () => Promise.resolve(accessToken) });
  })
  .mockResolvedValueOnce(() => {
    const products = {
      items: [
        {
          id: "1",
          name: "GNX",
          artists: [{ name: "Kendirck Lamar" }],
          images: [{ url: "placeholder" }],
        },
      ],
    };

    return Promise.resolve({ json: () => Promise.resolve(products) });
  });

describe("Shop component", () => {
  test("Render shop page", () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/shop"] });
    const { container } = render(<RouterProvider router={router} />);
    expect(container).toMatchSnapshot();
  });

  /* CKYTODO: Figure out why this test isn't working as expected
  test("Loading is shown while request is in progress", async () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/shop"] });
    render(<RouterProvider router={router} />);
    const loading = screen.getByText("Loading...");
    expect(loading).toBeInTheDocument;
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
  });
  */
});
