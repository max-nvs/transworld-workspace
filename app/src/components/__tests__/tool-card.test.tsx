import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ToolCard } from "../tool-card";

const SSO_TOOL = {
  id: "crm",
  name: "Transworld CRM",
  description: "Customer relationship management",
  href: "https://crm.example.com",
  icon: "users",
  sso: true,
};

const LINK_ONLY_TOOL = {
  id: "matamba",
  name: "Matamba",
  description: "Market intelligence · separate login",
  href: "https://matamba.example.com",
  icon: "activity",
  sso: false,
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ToolCard", () => {
  it("renders tool name and description", () => {
    render(<ToolCard {...SSO_TOOL} />);
    expect(screen.getByText("Transworld CRM")).toBeInTheDocument();
    expect(
      screen.getByText("Customer relationship management")
    ).toBeInTheDocument();
  });

  it("renders as a link to the tool URL", () => {
    render(<ToolCard {...SSO_TOOL} />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://crm.example.com"
    );
  });
});

describe("ToolCard SSO behaviour", () => {
  it("requests an SSO token when an SSO tool is clicked", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({ redirect_url: "https://crm.example.com?sso_token=x" })
      )
    );
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    render(<ToolCard {...SSO_TOOL} />);
    fireEvent.click(screen.getByRole("link"));

    await waitFor(() =>
      expect(fetchSpy).toHaveBeenCalledWith(
        "/api/sso/token",
        expect.objectContaining({ method: "POST" })
      )
    );
    await waitFor(() =>
      expect(openSpy).toHaveBeenCalledWith(
        "https://crm.example.com?sso_token=x",
        "_blank",
        "noopener"
      )
    );
  });

  // A workspace identity token must never be minted for, or appended to, a URL
  // belonging to a third party that has its own login. The browser follows the
  // plain href instead.
  it("never requests an SSO token when a link-only tool is clicked", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    vi.spyOn(window, "open").mockImplementation(() => null);

    render(<ToolCard {...LINK_ONLY_TOOL} />);
    fireEvent.click(screen.getByRole("link"));

    // Give the handler the same chance to fire that the SSO path needs.
    await new Promise((r) => setTimeout(r, 0));
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("opens a link-only tool in a new tab without leaking the referrer", () => {
    render(<ToolCard {...LINK_ONLY_TOOL} />);
    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", "https://matamba.example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
  });
});
