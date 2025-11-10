import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Preview from "../components/Preview.jsx";

describe("Preview component", () => {
  test("Render empty preview", () => {
    const { container } = render(<Preview />);
    expect(container).toMatchSnapshot();
  });

  test("Display products in the preview", () => {
    const products = [
      {
        id: "1",
        images: [{ url: "./lux_album_cover.png" }],
        artists: [{ name: "Rosalia" }],
        name: "LUX",
      },
      {
        id: "2",
        images: [{ url: "./mom_&_dad_album_cover.png" }],
        artists: [{ name: "Apathy" }],
        name: "Mom & Dad",
      },
      {
        id: "3",
        images: [{ url: "./hyperyouth_album_cover.png" }],
        artists: [{ name: "Joey Valence & Brae" }],
        name: "HYPERYOUTH",
      },
    ];
    render(<Preview title="Test" products={products} />);
    const previewProducts = screen.getAllByRole("listitem");
    const uniqueProducts = new Set(previewProducts);
    expect(uniqueProducts.size).toBe(products.length);
  });

  test("Display not available message if no products provided", () => {
    const products = [];
    render(<Preview title="Test" products={products} />);
    const previewProducts = screen.queryAllByRole("listitem");
    expect(previewProducts.length).toBe(0);
    const unavailableText = screen.getByText("Products are unavailable");
    expect(unavailableText).toBeInTheDocument();
  });
});
