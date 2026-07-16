import { describe, it, expect } from "vitest";
import { TOOLS, getToolsForRole } from "../tools";
import { ICON_MAP } from "@/components/tool-card";

describe("TOOLS registry", () => {
  it("every tool has required fields", () => {
    TOOLS.forEach((tool) => {
      expect(tool.id, `${tool.id}: id`).toBeTruthy();
      expect(tool.name, `${tool.id}: name`).toBeTruthy();
      expect(tool.description, `${tool.id}: description`).toBeTruthy();
      expect(tool.href, `${tool.id}: href`).toBeTruthy();
      expect(tool.icon, `${tool.id}: icon`).toBeTruthy();
      expect(tool.iconColor, `${tool.id}: iconColor`).toBeTruthy();
      expect(tool.roles.length, `${tool.id}: roles`).toBeGreaterThan(0);
      expect(typeof tool.sso, `${tool.id}: sso`).toBe("boolean");
    });
  });

  // /api/sso/token resolves a tool with TOOLS.find(), which returns the FIRST
  // match. A duplicate id would silently mint a token for the wrong tool and
  // send the user to the wrong product.
  it("has no duplicate ids", () => {
    const ids = TOOLS.map((t) => t.id);
    expect(ids).toHaveLength(new Set(ids).size);
  });

  // ToolCard falls back to the Database glyph for an unmapped icon, so a typo
  // is invisible in review and ships as a wrong-but-plausible tile.
  it("every tool declares an icon that ToolCard can render", () => {
    TOOLS.forEach((tool) => {
      expect(
        ICON_MAP[tool.icon],
        `${tool.id} declares icon "${tool.icon}"`
      ).toBeDefined();
    });
  });

  it("every tool href is an absolute https URL or the coming-soon marker", () => {
    TOOLS.forEach((tool) => {
      const ok = tool.href === "#" || tool.href.startsWith("https://");
      expect(ok, `${tool.id} has href "${tool.href}"`).toBe(true);
    });
  });

  // A link-only tool is defined by being reachable without a workspace token.
  // Pairing sso:false with "#" describes nothing we can render or link to.
  it("link-only tools point at a real destination", () => {
    TOOLS.filter((t) => !t.sso).forEach((tool) => {
      expect(tool.href, `${tool.id} is link-only`).not.toBe("#");
    });
  });
});

// A tool's `id` is stamped into the SSO token as the audience, and each tool
// pins the same literal in its own AUDIENCE constant and rejects anything else.
// That contract spans repos, so nothing here can enforce it — this is a canary:
// rename an id and this fails, which is the moment to go change the constant on
// the other side. Without it, a rename silently breaks sign-in in production
// while every test stays green.
describe("SSO token audience contract", () => {
  it.each([
    ["engagement", "lib/workspaceSso.mjs"],
    ["peopleops", "lib/auth/workspace-sso.ts"],
  ])("tile id %s matches AUDIENCE in the tool's %s", (id) => {
    const tool = TOOLS.find((t) => t.id === id);
    expect(tool, `tile "${id}" must exist — the tool verifies this exact string`).toBeDefined();
    expect(tool?.sso).toBe(true);
  });
});

describe("Matamba tile", () => {
  const matamba = TOOLS.find((t) => t.id === "matamba");

  // Matamba is a third-party product with its own login. Flipping this to true
  // would put a signed workspace identity token on an external URL.
  it("never accepts a workspace SSO token", () => {
    expect(matamba?.sso).toBe(false);
  });

  it("tells the user a separate login is coming", () => {
    expect(matamba?.description).toContain("separate login");
  });
});

// NOTE: getToolsForRole is NOT wired to the dashboard. page.tsx renders every
// tool to every user; the app has no role source yet. These tests cover the
// function in isolation and are deliberately named for what it does, not for a
// product guarantee the workspace does not currently make.
describe("getToolsForRole", () => {
  it("returns tools that list the given role", () => {
    const ids = getToolsForRole("finance").map((t) => t.id);
    expect(ids).toContain("treasury");
    expect(ids).toContain("accounting");
  });

  it("omits tools that do not list the given role", () => {
    const ids = getToolsForRole("sales").map((t) => t.id);
    expect(ids).toContain("crm");
    expect(ids).not.toContain("treasury");
  });

  it("returns nothing for an unknown role", () => {
    expect(getToolsForRole("nonexistent")).toHaveLength(0);
  });
});
