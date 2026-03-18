import { describe, it, expect } from "vitest";
import { TOOLS, getToolsForRole } from "../tools";

describe("tools", () => {
  it("has 8 tools defined", () => {
    expect(TOOLS).toHaveLength(8);
  });

  it("every tool has required fields", () => {
    TOOLS.forEach((tool) => {
      expect(tool.id).toBeTruthy();
      expect(tool.name).toBeTruthy();
      expect(tool.description).toBeTruthy();
      expect(tool.href).toBeTruthy();
      expect(tool.icon).toBeTruthy();
      expect(tool.iconColor).toBeTruthy();
      expect(tool.roles.length).toBeGreaterThan(0);
    });
  });

  it("admin role can access all tools", () => {
    const adminTools = getToolsForRole("admin");
    expect(adminTools).toHaveLength(8);
  });

  it("sales role sees CRM, Service Requests, and Commitment Tracker", () => {
    const salesTools = getToolsForRole("sales");
    const ids = salesTools.map((t) => t.id);
    expect(ids).toContain("crm");
    expect(ids).toContain("service-requests");
    expect(ids).toContain("commitment-tracker");
    expect(ids).not.toContain("treasury");
  });

  it("unknown role sees no tools", () => {
    const tools = getToolsForRole("nonexistent");
    expect(tools).toHaveLength(0);
  });
});
