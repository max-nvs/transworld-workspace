# Design Council Decision: Dashboard v3 — Visual Elevation

**Screen:** Dashboard
**Date:** 2026-03-18
**Version:** v3 (anti-slop pass)
**Confidence:** HIGH
**Status:** Implementing

---

## Context

Max flagged the dashboard as looking like AI slop. Requested Google-level craft. AI slop check triggered 4 items (moderate severity). Full 3 rounds.

**Builds on:** dashboard-v2-2026-03-13.md (Stripe-inspired layout retained, visual layer upgraded)

## Agreed Changes

1. **Kill subtitle** (Kael) — "Your workspace is ready" removed. Dead weight.
2. **Gold underline on user's name** (Mara) — `border-b-2 border-[#C9A64D] pb-0.5` on the display name span. Single brand moment.
3. **Coming Soon state for inactive tools** (Tunde, non-negotiable) — `opacity-50`, "Coming Soon" badge, no hover, no arrow. Pushed to bottom of grid.
4. **3-column grid on desktop** (Kael/Tunde) — `lg:grid-cols-3` reduces scrolling. Cards keep horizontal layout.
5. **Icon color coding by domain** (Mara) — Navy for admin/general, bronze for finance, teal for compliance/verification.
6. **Search input replaces "Applications" label** (Tunde) — Client-side filter by tool name.
7. **Remove footer** (Kael) — Internal tool, nobody reads it.
8. **Single-line descriptions** (all) — `line-clamp-1` on card descriptions for 3-col density.

## Trade-offs

- Mara's background noise texture dropped — Kael argued < 2% visual impact for maintenance cost.
- Kael's "Frequent vs More" tool split dropped — Tunde pointed out no usage data to back it.

## Files Changed

- `app/src/app/page.tsx`
- `app/src/components/tool-card.tsx`
- `app/src/lib/tools.ts`
