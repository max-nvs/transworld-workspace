# Design Council Decision: Dashboard v4 — The Link-Only Tile

**Screen:** Dashboard
**Date:** 2026-07-16
**Version:** v4 (third tile behaviour)
**Confidence:** HIGH
**Status:** Implemented

---

## Context

Matamba joins the dashboard as a **link-only** tile: a third-party product on
trial with Transworld, with its own login. Unlike every other active tile, it
receives no workspace SSO token — staff sign in with their own Matamba account.

**Builds on:** dashboard-v3-2026-03-18.md (colour-by-domain, single-line
descriptions, 3-col grid, search — all retained).

The design question: a link-only tile behaves differently from an SSO tile
(you land on a login form instead of being logged in). Does it need a visual
marker, or does it look identical?

## Agreed Changes

1. **No badge, no opacity, no third visual state** (Kael) — the system holds at
   two. A "Third-Party" badge was rejected outright; v3 killed the footer for
   the same reason.
2. **`ArrowRight` → `ExternalLink` for link-only tiles** (Kael) — same slot, same
   16px, same hover-reveal. Kael conceded the glyph informs nothing (every tile
   already opens a new tab via `window.open`); it is swapped so the card stops
   promising forward navigation it isn't doing. Tunde agreed on that basis only.
3. **The description carries the expectation** (Tunde, veto-backed) —
   `"Market intelligence · separate login"`. The only element on the card that
   can say "separate login". 35 chars, verified against the `line-clamp-1`
   budget: it renders on one line where Accounting's 48 chars truncates.
4. **Icon `activity`** (Mara) — unused chart-line glyph, distinct from Insight
   Desk's lightbulb. Two research tools must not share a glyph.
5. **Colour navy `#0B1D3A`** (Mara) — follows the Insight Desk research
   precedent under the v3 colour-by-domain rule. Not a new colour.
6. **Sorts with the active tools**, not the Coming Soon block — it works today.

## Trade-offs

- Mara gave up Matamba's own brand colour. A third-party colour inside a
  colour-coded family breaks the code for the other eleven tiles. The guest
  does not repaint the room.
- Kael gave up his objection to copy carrying interface meaning, on the grounds
  that the description adds no new elements.
- Tunde's original description (52 chars) was cut to 35 after Mara showed it
  would truncate exactly at the caveat, leaving `"…sign in with your…"` — a
  promise with the warning eaten.

## Unresolved Tension (Tunde — logged, not resolved)

Until role filtering exists, **every staff member sees a tile only the trial
group (Okezie, Dan, Clement) can open**. `getToolsForRole` is dead code;
`page.tsx:30` renders every tool to every user. "Separate login" sets the
expectation honestly; it does not make the tile theirs.

Max chose this sequencing deliberately (see D2, 2026-07-16). The description is
a mitigation, not a fix.

## Files Changed

- `app/src/lib/tools.ts` — `Tool.sso: boolean` (required), matamba entry
- `app/src/components/tool-card.tsx` — `sso` prop, glyph swap, token skip,
  `calculator` added to `ICON_MAP`
- `app/src/components/dashboard-content.tsx` — passes `sso` through
- `app/src/app/api/sso/token/route.ts` — refuses to mint for link-only tools

## Follow-Up

- Revisit tile visibility once a role source exists. Decide then whether
  Matamba stays visible to all staff or narrows to the trial group.
- If Matamba moves to a custom domain, update `href` in `tools.ts`.
