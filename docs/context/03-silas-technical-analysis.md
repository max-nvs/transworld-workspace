# Silas Technical Analysis — Transworld Workspace
**Date:** March 11, 2026
**Role:** CTO / Senior Engineering Partner

---

## Key Observations

### Scope is Larger Than Initially Discussed
- Max initially described 4 tools on Supabase with React
- Reality: 8 tools across mixed stacks (Flask/Python, React, Next.js, Supabase, SQLite, no-backend)
- This changes the architecture approach — cannot assume Supabase-only environment

### Mixed Tech Stack Breakdown

| Tool | Frontend | Backend | Database | Auth Today |
|------|----------|---------|----------|-----------|
| CRM | Single-page | Flask (Python) | SQLite | Flask's own |
| Service Requests | React | TBC | TBC | Its own |
| Pod 3 Ops Tracker | Next.js | Vercel serverless | Supabase | Supabase Auth |
| Cash Planning | React | None | None | Unclear |
| Commitment Tracker | TBC | TBC | TBC | TBC |
| Transworld Treasury | TBC | TBC | TBC | TBC |
| TCIS | TBC | TBC | TBC | Not built |
| Insight Desk | TBC | TBC | TBC | Not built |

### Architecture Recommendation: Gateway Pattern (Option A) Still Valid
- Mixed stacks actually strengthen the case for a central auth layer
- JWTs are stack-agnostic — Flask, React, Next.js can all validate them
- Workspace Supabase project acts as the identity hub

## Auth Recommendation

### Google Workspace Login via Supabase Auth
**Rationale:**
- Supabase Auth supports Google OAuth natively — zero custom auth code
- If Transworld uses Google Workspace, every employee already has credentials
- JWTs from Supabase can be validated by any stack
- Satisfies chairman's preference: fewer passwords, works on mobile
- If they use Microsoft 365 instead, Supabase Auth supports that too

**Prerequisite question:** Does Transworld use Google Workspace or Microsoft 365?

## Flags and Concerns

### 1. CRM Role System
- CRM already has roles (BDRM, Sales Manager, MD)
- Recommendation: DON'T merge with workspace roles
- Workspace controls "who can access CRM" (access layer)
- CRM keeps its own internal roles (application layer)
- Two-layer approach: building access vs desk assignment

### 2. Pod 3 Tracker May Be Redundant
- Chairman himself noted this
- Recommendation: Move Pod 3 to LAST in integration order, not first
- Don't invest integration effort on a tool that may get retired

### 3. Token Passing Security
- Chairman's memo suggests "URL parameter or shared cookie" for token passing
- URL parameters leak into browser history, logs, referrer headers
- Recommendation: Use HttpOnly, Secure, SameSite cookies instead

### 4. Missing: Audit Logging
- With 8 tools and RBAC, need to track who accessed what and when
- Build into workspace from day one, even if just a simple log table

### 5. Adjusted Integration Order (Silas Recommendation)
1. Stand up workspace portal + auth system (Google/Microsoft via Supabase)
2. Connect Service Requests Tracker first (all staff use it, React = simple token check)
3. Connect CRM (Flask middleware addition)
4. Connect Cash Planning Tool and Max's tools (Commitment Tracker, Treasury)
5. Connect Pod 3 last (may be retired, Supabase Auth bridging is more complex)
6. Build TCIS and Insight Desk workspace-ready from day one

## Next Steps
- Confirm Google vs Microsoft (ask chairman)
- Draft formal auth recommendation response to chairman
- Build technical architecture spec
- Define roles & access matrix
- Create timeline
