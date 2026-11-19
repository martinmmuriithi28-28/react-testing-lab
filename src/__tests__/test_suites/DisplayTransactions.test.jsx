import { render, screen, waitFor } from "@testing-library/react";
import App from "../../components/App";
import { describe, test, expect } from "vitest";

describe("Display Transactions", () => {
  test("displays transactions on startup", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              id: 1,
              date: "2026-01-01",
              description: "Groceries",
              category: "Food",
              amount: "50",
            },
          ]),
      })
    );

    render(<App />);

    expect(
      await screen.findByText("Groceries")
    ).toBeInTheDocument();
  });
});