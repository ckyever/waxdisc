import { describe, test, expect, vi } from "vitest";
import {
  render,
  act,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "../routes.jsx";

describe("Shop component", () => {
  test("Render shop page", async () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/shop"] });
    const { container } = await act(async () => {
      return render(<RouterProvider router={router} />);
    });
    expect(container).toMatchSnapshot();
  });

  test("Loading is shown while request is in progress", async () => {
    window.fetch = vi
      .fn()
      .mockImplementationOnce(() => {
        const accessToken = { access_token: "notarealtoken" };
        return Promise.resolve({ json: () => Promise.resolve(accessToken) });
      })
      .mockImplementationOnce(() => {
        const products = {
          albums: {
            items: [
              {
                id: "1",
                name: "GNX",
                artists: [{ name: "Kendirck Lamar" }],
                images: [{ url: "placeholder" }],
              },
            ],
          },
        };
        return Promise.resolve({ json: () => Promise.resolve(products) });
      });

    const router = createMemoryRouter(routes, { initialEntries: ["/shop"] });
    render(<RouterProvider router={router} />);
    const loading = screen.getByText("Loading...");
    expect(loading).toBeInTheDocument;
    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
  });
});
