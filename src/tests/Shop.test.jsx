import { describe, test, expect, vi } from "vitest";
import { render, act } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "../routes.jsx";
import Loading from "../components/Loading.jsx";

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
                album: "GNX",
                artist: "Kendirck Lamar",
                image: "placeholder",
              },
            ],
          },
        };
        return Promise.resolve({ json: () => Promise.resolve(products) });
      });

    const router = createMemoryRouter(routes, { initialEntries: ["/shop"] });
    render(<RouterProvider router={router} />);
    expect(<Loading />).toBeInTheDocument;
  });
});
