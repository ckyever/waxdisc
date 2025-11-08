import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App.jsx";

describe("App component", () => {
  test("Renders correct heading", () => {
    render(<App />);
    expect(screen.getByRole("heading").textContent).equals("WAXDISC");
  });
});
