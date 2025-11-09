import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import Home from "../components/Home.jsx";

describe("Home component", () => {
  test("Home page renders", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
