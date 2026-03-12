import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoginForm } from "../login-form";

describe("LoginForm", () => {
  it("renders email input and submit button", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send magic link/i })
    ).toBeInTheDocument();
  });

  it("renders welcome heading", () => {
    render(<LoginForm />);
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
  });
});
