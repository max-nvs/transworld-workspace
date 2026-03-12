import { describe, it, expect } from "vitest";

const BRAND = {
  primary: "#0B1D3A",
  primaryLight: "#0F2634",
  accent: "#C9A64D",
  accentDark: "#B8954A",
  background: "#FAFAFA",
  card: "#FFFFFF",
  textBody: "#535862",
  textLabel: "#414651",
  textPlaceholder: "#717680",
  border: "#D5D7DA",
  success: "#1EBE5C",
  error: "#DC2626",
};

describe("brand tokens", () => {
  it("has all required brand colors defined", () => {
    Object.entries(BRAND).forEach(([key, value]) => {
      expect(value).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(key).toBeTruthy();
    });
    expect(Object.keys(BRAND)).toHaveLength(12);
  });
});
