import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ToolCard } from "../tool-card";

describe("ToolCard", () => {
  it("renders tool name and description", () => {
    render(
      <ToolCard
        name="Transworld CRM"
        description="Customer relationship management"
        href="https://crm.example.com"
        icon="users"
      />
    );
    expect(screen.getByText("Transworld CRM")).toBeInTheDocument();
    expect(
      screen.getByText("Customer relationship management")
    ).toBeInTheDocument();
  });

  it("renders as a link to the tool URL", () => {
    render(
      <ToolCard
        name="Transworld CRM"
        description="Customer relationship management"
        href="https://crm.example.com"
        icon="users"
      />
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://crm.example.com");
  });
});
