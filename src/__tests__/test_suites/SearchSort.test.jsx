import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../components/App";
import { describe, test, expect, vi } from "vitest";

describe("Search and Sort", () => {
  test("filters transactions when searching", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              id: 1,
              date: "2026-01-01",
              description: "Netflix",
              category: "Entertainment",
              amount: "15",
            },
            {
              id: 2,
              date: "2026-01-02",
              description: "Food",
              category: "Restaurant",
              amount: "30",
            },
          ]),
      })
    );

    render(<App />);

    const search = screen.getByPlaceholderText(
      "Search your Recent Transactions"
    );

    fireEvent.change(search, {
      target: { value: "Netflix" },
    });

    expect(
      await screen.findByText("Netflix")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Food")
    ).not.toBeInTheDocument();
  });
});