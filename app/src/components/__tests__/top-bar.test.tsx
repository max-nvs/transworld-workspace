import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TopBar } from "../top-bar";

describe("TopBar", () => {
  it("renders user display name", () => {
    render(<TopBar userEmail="max@transworld.com" />);
    expect(screen.getByText("max@transworld.com")).toBeInTheDocument();
  });

  it("renders logout button", () => {
    render(<TopBar userEmail="max@transworld.com" />);
    expect(screen.getByRole("button", { name: /log out/i })).toBeInTheDocument();
  });
});
