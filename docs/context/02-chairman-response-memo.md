# Chairman's Response — Workspace Integration Brief
**From:** Chairman Okezie Ofoegbu
**To:** Max Ayobami
**Date:** March 2026
**Company:** Transworld Investment & Securities Ltd
**Classification:** Confidential — Internal Use Only

---

## 1. Overview
Chairman approved the workspace direction. Wants Max to have a complete picture of all existing tools before building.

## 2. Complete Tool Inventory

| Tool Name | Primary Users | Platform | Status |
|-----------|--------------|----------|--------|
| Transworld CRM | Sales & BD Team | Flask Web App (Python/SQLite) | LIVE |
| Service Requests Tracker | All Staff / IT | React Web App | LIVE |
| Pod 3 Ops Tracker | Client Operations | Next.js / Vercel / Supabase | LIVE |
| Cash Planning Tool | Finance / Treasury | React / Excel | LIVE |
| Commitment Tracker | Management | TBC (Max built) | LIVE |
| Transworld Treasury | Treasury Team | TBC (Max built) | LIVE |
| TCIS | TBC | TBC | IN DEV |
| Insight Desk | TBC | TBC | IN DEV |

**Total: 8 tools (6 live, 2 in development)**

## 2.1 Transworld CRM
- Full BD and pipeline management app for Sales team
- Covers complete sales funnel across all Nigerian regions (Lagos, Abuja, South East, North, North Central, etc.)
- Role-based access already built in (BDRMs, Sales Managers, MD)
- Built in Python Flask with SQLite database and single-page frontend

## 2.2 Service Requests Tracker
- Internal ticketing system for service requests across the firm
- Handles request creation, assignment, SLA monitoring, status tracking, reporting
- Supports configurable workflow statuses
- Tracks request channels (phone, email, walk-in, WhatsApp)
- Built as a React web application

## 2.3 Pod 3 Client Operations Tracker
- Used by Client Operations team to log daily/weekly metrics
- Account creation, onboarding completions, KYC processing, service ticket counts
- Generates automated weekly, monthly, quarterly reports with traffic-light indicators and PDF downloads
- Deployed on Vercel with Supabase database backend
- **Chairman notes:** May be redundant due to Service Requests Tracker reporting overlap

## 2.4 Cash Planning Tool
- Cash flow forecasting and planning for Finance/Treasury
- Weekly cash inflows/outflows by category
- Compare actuals vs forecasts, track runway
- Export board-ready Excel reports in NGN
- Built as React application, no persistent backend
- Similar to the Treasury tool Max built — shared for completeness/reference

## 3. Integration Steps (Chairman's Plan)

| # | Step | What To Do | Expected Outcome |
|---|------|-----------|-----------------|
| 1 | Audit Existing URLs | Collect live URL for each deployed tool | Master URL registry |
| 2 | Define Roles & Access Matrix | List every staff role and tool access | Access control blueprint |
| 3 | Connect Authentication | Add workspace token check to each tool | SSO working end to end |
| 4 | Register Tools in Workspace | Add tool tiles to dashboard with role assignment | Tools visible to right people |
| 5 | Build New Tools Workspace-Ready | TCIS and Insight Desk accept workspace token from day one | Seamless experience |
| 6 | Test & Roll Out | Test each role sees correct tools, no double login | Clean verified go-live |

## 3.1 SSO — The Key Technical Task
- Workspace assigns logged-in user a session token
- Token passed to tool when user clicks a tile
- Each tool checks: valid token = skip login, no token = redirect to workspace login
- Pod 3 Tracker (Supabase Auth) needs special discussion re: bridging approach

## 3.2 Per-Tool Integration Notes

**Transworld CRM (Flask):**
- Add middleware to validate workspace token on every request
- If valid: proceed; if missing/invalid: redirect to workspace login
- Existing role system (BDRM, Sales Manager, MD) can be retained or merged with workspace roles

**Service Requests Tracker (React):**
- Token check on app initial load
- Pass workspace token via URL parameter or shared cookie
- No token = redirect to workspace login

**Pod 3 Client Operations Tracker (Next.js/Vercel):**
- Currently uses Supabase Auth — needs bridging to workspace SSO
- Options: shared JWT, OAuth federation, or proxy login layer
- Supabase supports custom JWTs which may simplify this

**Cash Planning Tool (React):**
- Same approach as Service Requests Tracker
- No persistent backend, so no database-side changes

**TCIS and Insight Desk (in development):**
- Build workspace-ready from day one
- No separate login, accept workspace token directly
- Align role structure with workspace access model

## 4. Chairman's Key Question
**What authentication system will the workspace use?**
- Options: Google Workspace (G Suite), Microsoft/Active Directory, or custom username/password with JWT
- Chairman's preference: Google or Microsoft login (reduces passwords, works on mobile)
- Needs Max's recommendation

## 5. Chairman's Suggested Integration Order
1. Stand up workspace portal and authentication system
2. Connect Pod 3 Tracker first (already live, easy to test)
3. Connect CRM and Service Requests Tracker
4. Connect Cash Planning and existing tools (Commitment Tracker, Treasury)
5. Build TCIS and Insight Desk workspace-ready and connect on completion

## Action Required
Max to respond with:
- Recommended authentication approach
- Timeline
