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
    href: "https://transworld-service-tracker.vercel.app/auth/sso",
    icon: "clipboard-list",
    roles: ["admin", "operations", "sales", "md"],
  },
  {
    id: "compliance",
    name: "Compliance",
    description: "Regulatory compliance and reporting",
    href: "https://transworld-compliance.vercel.app/api/auth/sso",
    icon: "shield",
    roles: ["admin", "compliance", "md"],
  },
{
    id: "verify-desk",
    name: "Verify Desk",
    description: "Document and identity verification",
    href: "https://verifydesk.netlify.app/auth/sso",
    icon: "shield-check",
    roles: ["admin", "operations", "sales", "md"],
  },
  {
    id: "commitment-tracker",
    name: "Commitment Tracker",
    description: "Track investment commitments",
    href: "https://transworldct.netlify.app/auth/sso",
    icon: "check-circle",
    roles: ["admin", "finance", "sales", "md"],
  },
  {
    id: "treasury",
    name: "Transworld Treasury",
    description: "Treasury management and reporting",
    href: "https://twfin.netlify.app/auth/sso",
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
