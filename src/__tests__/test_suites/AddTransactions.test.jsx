import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../components/App";
import { describe, test, expect, vi } from "vitest";

describe("Add Transactions", () => {
  test("adds a new transaction", async () => {
    global.fetch = vi.fn((url, options) => {
      if (options?.method === "POST") {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              id: 2,
              date: "2026-01-02",
              description: "Bus",
              category: "Transport",
              amount: "20",
            }),
        });
      }

      return Promise.resolve({
        json: () => Promise.resolve([]),
      });
    });

    render(<App />);

    fireEvent.change(
      screen.getByPlaceholderText("Description"),
      {
        target: { value: "Bus" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Category"),
      {
        target: { value: "Transport" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Amount"),
      {
        target: { value: "20" },
      }
    );


    fireEvent.click(
      screen.getByText("Add Transaction")
    );

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:6001/transactions",
      expect.any(Object)
    );
  });
});