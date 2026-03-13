export interface Tool {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: string;
  roles: string[];
}

export const TOOLS: Tool[] = [
  {
    id: "crm",
    name: "Transworld CRM",
    description: "Customer relationship management",
    href: "#",
    icon: "users",
    roles: ["admin", "sales", "bdrm", "md"],
  },
  {
    id: "service-requests",
    name: "Service Requests",
    description: "Track and manage client service requests",
    href: "#",
    icon: "clipboard-list",
    roles: ["admin", "operations", "sales", "md"],
  },
  {
    id: "pod3-ops",
    name: "Pod 3 Ops Tracker",
    description: "Operations tracking for Pod 3",
    href: "#",
    icon: "activity",
    roles: ["admin", "operations", "md"],
  },
  {
    id: "cash-planning",
    name: "Cash Planning",
    description: "Cash flow planning and forecasting",
    href: "#",
    icon: "banknote",
    roles: ["admin", "finance", "md"],
  },
  {
    id: "verify-desk",
    name: "Verify Desk",
    description: "Document and identity verification",
    href: "https://verifydesk.netlify.app/sign-in",
    icon: "shield-check",
    roles: ["admin", "operations", "sales", "md"],
  },
  {
    id: "commitment-tracker",
    name: "Commitment Tracker",
    description: "Track investment commitments",
    href: "https://transworldct.netlify.app/",
    icon: "check-circle",
    roles: ["admin", "finance", "sales", "md"],
  },
  {
    id: "treasury",
    name: "Transworld Treasury",
    description: "Treasury management and reporting",
    href: "https://twfin.netlify.app/",
    icon: "landmark",
    roles: ["admin", "finance", "md"],
  },
  {
    id: "tcis",
    name: "TCIS",
    description: "Transworld Central Information System",
    href: "#",
    icon: "database",
    roles: ["admin", "md"],
  },
  {
    id: "insight-desk",
    name: "Insight Desk",
    description: "Research and market insights",
    href: "#",
    icon: "lightbulb",
    roles: ["admin", "research", "md"],
  },
];

export function getToolsForRole(role: string): Tool[] {
  return TOOLS.filter((tool) => tool.roles.includes(role));
}
