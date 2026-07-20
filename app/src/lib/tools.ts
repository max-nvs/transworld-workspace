export interface Tool {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: string;
  iconColor: string;
  roles: string[];
  /**
   * Whether this tool accepts a workspace SSO token.
   *
   * Required, not optional — a tool must state its position. Defaulting this
   * to true would mean a forgotten field silently mints identity tokens at a
   * third party; defaulting to false would silently break SSO on a real tool.
   * Neither failure is one we'd notice, so the compiler asks instead.
   *
   * false = external product with its own login. We link to it and never
   * issue a token for it.
   */
  sso: boolean;
}

export const TOOLS: Tool[] = [
  {
    id: "crm",
    name: "Transworld CRM",
    description: "Customer relationship management",
    href: "https://transworld-crm.up.railway.app/auth/sso",
    icon: "users",
    iconColor: "#0B1D3A",
    roles: ["admin", "sales", "bdrm", "md"],
    sso: true,
  },
  {
    id: "service-requests",
    name: "Service Requests",
    description: "Track and manage client service requests",
    href: "https://transworld-service-tracker.vercel.app/auth/sso",
    icon: "clipboard-list",
    iconColor: "#0B1D3A",
    roles: ["admin", "operations", "sales", "md"],
    sso: true,
  },
  {
    id: "compliance",
    name: "Daily Trade Reconciliation",
    description: "Trade reconciliation and compliance reporting",
    href: "https://transworld-compliance.vercel.app/api/auth/sso",
    icon: "shield",
    iconColor: "#0F7B6C",
    roles: ["admin", "compliance", "md"],
    sso: true,
  },
  {
    id: "verify-desk",
    name: "Verify Desk",
    description: "Document and identity verification",
    href: "https://verifydesk.netlify.app/auth/sso",
    icon: "shield-check",
    iconColor: "#0F7B6C",
    roles: ["admin", "operations", "sales", "md"],
    sso: true,
  },
  {
    id: "commitment-tracker",
    name: "Commitment Tracker",
    description: "Track investment commitments",
    href: "https://transworldct.netlify.app/auth/sso",
    icon: "check-circle",
    iconColor: "#B8954A",
    roles: ["admin", "finance", "sales", "md"],
    sso: true,
  },
  {
    id: "treasury",
    name: "Transworld Treasury",
    description: "Treasury management and reporting",
    href: "https://twfin.netlify.app/auth/sso",
    icon: "landmark",
    iconColor: "#B8954A",
    roles: ["admin", "finance", "md"],
    sso: true,
  },
  {
    id: "portal",
    name: "Transworld Portal",
    description: "Policies, procedures and workflow forms",
    href: "https://transworld-portal.vercel.app/api/auth/sso",
    icon: "book-open",
    iconColor: "#0B1D3A",
    roles: ["admin", "operations", "compliance", "finance", "sales", "md"],
    sso: true,
  },
  {
    id: "accounting",
    name: "Accounting",
    description: "General ledger, journals and financial reporting",
    href: "https://transworld-accounting.vercel.app/api/auth/sso",
    icon: "calculator",
    iconColor: "#B8954A",
    roles: ["admin", "finance", "md"],
    sso: true,
  },
  {
    id: "cashflow",
    name: "Cash Flow Planner",
    description: "Cash flow planning, forecasting and approvals",
    href: "https://transworld-cashflow.vercel.app/api/auth/sso",
    icon: "banknote",
    iconColor: "#B8954A",
    roles: ["admin", "finance", "md"],
    sso: true,
  },
  {
    // `id` is stamped into the SSO token as the audience, and each tool checks
    // it against its own AUDIENCE constant (lib/workspaceSso.mjs over there).
    // Renaming this id rejects every token until that constant matches again.
    id: "engagement",
    name: "Transworld Engagement",
    // 33 chars. line-clamp-1 at 3-col truncates around 36; the longer
    // "Client greetings, documents and bookings" lost its last word.
    description: "Greetings, documents and bookings",
    href: "https://engage.transworldltd.com.ng/api/auth/sso",
    icon: "cake",
    iconColor: "#0B1D3A",
    roles: ["admin", "operations", "compliance", "sales", "bdrm", "md"],
    sso: true,
  },
  {
    // See the note on `engagement` above: this id is the token audience and
    // must match AUDIENCE in lib/auth/workspace-sso.ts over there.
    id: "peopleops",
    name: "Transworld PeopleOps",
    description: "HR, payroll and performance",
    href: "https://transworld-peopleops.vercel.app/api/auth/sso",
    icon: "user-round-cog",
    // Navy, not teal: the v3 colour-by-domain rule reserves teal for
    // compliance/verification. HR is general, even though the app happens to
    // carry payroll and a compliance LMS inside it.
    iconColor: "#0B1D3A",
    roles: [
      "admin",
      "operations",
      "compliance",
      "finance",
      "sales",
      "bdrm",
      "research",
      "md",
    ],
    sso: true,
  },
  {
    // Self-hosted Chatwoot (client chat + call capture), not first-party code.
    // Link-only for now: real SSO into Chatwoot CE would need either a
    // super-admin platform token or a maintained fork, and it cannot carry
    // client traffic until the host moves to Nigeria. See the Omnichannel repo,
    // engineering-decisions/2026-07-20-workspace-sso-bridge.md. Staff use their
    // own Chatwoot login until then, so no workspace token is issued.
    id: "omnichannel",
    name: "Transworld Omnichannel",
    description: "Client chat & calls · separate login",
    href: "https://chat.transworldltd.com.ng",
    icon: "messages-square",
    iconColor: "#0B1D3A",
    roles: [
      "admin",
      "operations",
      "compliance",
      "sales",
      "bdrm",
      "md",
    ],
    sso: false,
  },
  {
    // Third-party product on trial with Transworld, not a Transworld system.
    // Staff sign in with their own Matamba credentials, so this tool never
    // receives a workspace token. The named trial group is Okezie, Dan and
    // Clement — `roles` cannot express three people, so this lists everyone
    // and Matamba's own login is what actually gates entry.
    id: "matamba",
    name: "Matamba",
    description: "Market intelligence · separate login",
    href: "https://matamba.matambahq.workers.dev",
    icon: "activity",
    iconColor: "#0B1D3A",
    roles: [
      "admin",
      "operations",
      "compliance",
      "finance",
      "sales",
      "bdrm",
      "research",
      "md",
    ],
    sso: false,
  },
  {
    id: "tcis",
    name: "TCIS",
    description: "Transworld Central Information System",
    href: "#",
    icon: "database",
    iconColor: "#0B1D3A",
    roles: ["admin", "md"],
    sso: true,
  },
  {
    id: "insight-desk",
    name: "Insight Desk",
    description: "Research and market insights",
    href: "#",
    icon: "lightbulb",
    iconColor: "#0B1D3A",
    roles: ["admin", "research", "md"],
    sso: true,
  },
];

export function getToolsForRole(role: string): Tool[] {
  return TOOLS.filter((tool) => tool.roles.includes(role));
}
