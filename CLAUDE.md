# Transworld Workspace — Project Context

## Project Overview
**Client:** Transworld Investment & Securities Ltd
**Chairman:** Okezie Ofoegbu
**Developer:** Max Ayobami
**CTO/Engineering Partner:** Silas

## What This Is
A unified internal tools workspace — a single gateway/dashboard where all Transworld employees log in once and access the tools they need based on their role. Each tool remains independently built and maintained.

## Tool Inventory (8 total)

| Tool | Stack | Status |
|------|-------|--------|
| Transworld CRM | Flask/Python/SQLite | LIVE |
| Service Requests Tracker | React | LIVE |
| Pod 3 Ops Tracker | Next.js/Vercel/Supabase | LIVE |
| Cash Planning Tool | React (no backend) | LIVE |
| Commitment Tracker | TBC (Max built) | LIVE |
| Transworld Treasury | TBC (Max built) | LIVE |
| TCIS | TBC | IN DEV |
| Insight Desk | TBC | IN DEV |

## Architecture Decisions (Confirmed)
- Gateway pattern — workspace is the access layer, tools stay independent
- Supabase project for workspace auth, roles, permissions
- Google or Microsoft OAuth via Supabase Auth (pending confirmation from chairman)
- JWT-based SSO — workspace issues token, tools validate it
- RBAC — workspace controls tool access, tools keep their own internal roles
- Token passing via secure cookies (NOT URL parameters)

## Key Docs
- `docs/context/01-initial-architecture-brief.md` — Max's original proposal
- `docs/context/02-chairman-response-memo.md` — Chairman's response with full tool inventory
- `docs/context/03-silas-technical-analysis.md` — Silas's technical review and recommendations

## Open Questions
1. Does Transworld use Google Workspace or Microsoft 365? (determines OAuth provider)
2. Pod 3 Tracker — retire or integrate? (chairman flagged possible redundancy)
3. Commitment Tracker and Treasury — what stack are these built on?

## Status
- Phase: Pre-build — gathering requirements, awaiting auth decision
- Next: Draft response to chairman with auth recommendation + timeline
