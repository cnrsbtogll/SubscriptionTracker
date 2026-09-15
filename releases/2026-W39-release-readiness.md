# Subwise — W39 Release Readiness Report

**App:** Subwise (slug: `subwise`)
**PRD:** `strategy/2026-W39-prd.md`
**Report date:** 2026-09-15 (Friday, W39 end)
**Schedule:** `0 13 * * 5` — weekly release preflight

## Executive Summary

**🔴 NOT READY — Development has not started.**

The W39 Subwise project exists only as a `package.json` with 4 core dependencies (expo, expo-router, react, react-native). No source code, no tests, no configuration, no app shell has been built. PRD §9 acceptance criteria cannot be evaluated because zero project files exist beyond the package manifest.

**Blockers: ALL — zero code written.**

---

## 1. Build / Test Status

| Check | Status | Detail |
|-------|--------|--------|
| `npx tsc --noEmit` | ❌ BLOCKED | No `tsconfig.json`, no source files |
| `npx jest --ci` | ❌ BLOCKED | No tests, no `__tests__/` dir, no fixtures |
| `npx expo-doctor` | ❌ BLOCKED | No `node_modules/`, no `app.json` |
| `npm install` | ⏳ NOT RUN | `node_modules/` absent |

**PRD §9 acceptance criteria — 0/5 green:**

- [ ] `npx expo-doctor` clean — **NO** (no project to check)
- [ ] `npx tsc --noEmit` = 0 errors — **NO** (no tsconfig)
- [ ] `npx jest --ci` renewals + csv tests pass — **NO** (no tests)
- [ ] Manual onboarding < 60s — **NO** (no screens)
- [ ] Remote repo current — **YES** (package.json pushed)

---

## 2. Required Privacy Disclosures

Per PRD §8, the app collects **zero data** — offline-first, no backend, no accounts, no analytics.

| Item | Status | Detail |
|------|--------|--------|
| App Store Privacy Nutrition Label | ⚠️ NOT FILED | Should be "Data Not Collected" |
| `PRIVACY.md` | ❌ MISSING | PRD requires it |
| Google Play Data Safety | ⚠️ NOT FILED | "No data collected" declaration needed |

**Risk: LOW** — Privacy posture is trivially strong (zero data collection). Filing is mechanical.

---

## 3. Permissions

| Permission | Usage | Status |
|------------|-------|--------|
| `expo-notifications` (local) | Renewal reminders | ⚠️ Not implemented |
| Camera | None | N/A |
| Location | None | N/A |
| Contacts | None | N/A |

**Risk: NONE** — Only local notifications requested. PRD mandates graceful degradation when denied. No other permissions needed.

---

## 4. Account Deletion

**N/A** — No user accounts, no backend, no cloud sync. Account deletion policy does not apply.

---

## 5. Store Listing Copy

| Element | PRD | Status |
|---------|-----|--------|
| App name | "Subwise" | ✅ Defined |
| Category | Finance, 4+ | ✅ Defined |
| EN description hook | "every subscription, one total. No bank login — your data never leaves your phone." | ✅ Defined |
| TR description | Same file, not written | ❌ Missing |
| Keywords | subscription tracker, abonelik takip, renewal reminder, yenileme hatırlatıcı, offline | ✅ Defined |
| What's New template | Not defined | ⚠️ Missing |

**Risk: LOW** — Copy exists in PRD but needs formatting for store metadata fields.

---

## 6. Screenshot Requirements

| Platform | PRD requirement | Status |
|----------|----------------|--------|
| iOS (6.5" + 5.5") | 3 frames: dashboard totals, add form, notification sample | ⚠️ Planned, not created |
| Android (phone) | Same frames | ⚠️ Planned, not created |
| iPad | Not mentioned in PRD | N/A for MVP |

**Risk: MEDIUM** — Screenshots require running app. Cannot create until code exists.

---

## 7. Bundle IDs / Application IDs

| Platform | Bundle/App ID | Status |
|----------|---------------|--------|
| iOS | `com.subwise.app` | ✅ Defined in PRD §6 |
| Android | `com.subwise.app` | ✅ Defined in PRD §6 |
| `app.json` configured | — | ❌ Not created |

**Risk: LOW** — IDs defined; `app.json` just needs to be created during scaffold.

---

## 8. Policy Risks

| Risk | Assessment |
|------|------------|
| IAP-free paywall "coming soon" | ✅ Safe — no purchase flow, no external links |
| No bank/financial data connection | ✅ Safe — differentiator from Rocket Money |
| Local-only data model | ✅ Safe — strongest privacy posture possible |
| Notification misuse | ✅ Mitigated — local only, scheduled by user, no server push |
| Age rating | ✅ Safe — Finance category, 4+, no objectionable content |
| Google Play financial services | ✅ Safe — no financial data handling |

**Risk: NONE** — Privacy-first, offline-only design avoids all policy traps.

---

## 9. Signing / Submission Prerequisites

| Item | Status |
|------|--------|
| Apple Developer account | ⚠️ Known (dutchinnova team), not verified current |
| Google Play Console | ⚠️ Not verified |
| EAS project | ❌ Not created |
| EAS build profiles | ❌ Not configured |
| `app.json` / `eas.json` | ❌ Not created |
| `.env.example` | ❌ Not created |
| Store submission approval | 🔴 BLOCKED — PRD rule: explicit approval required |

---

## 10. Dependency Audit

| Dependency | PRD | package.json | Issue |
|------------|-----|-------------|-------|
| `expo ~57.0.0` | ✅ | ✅ | — |
| `expo-router ^3.5.0` | ✅ | ✅ | — |
| `zustand` | ✅ Required | ❌ MISSING | Needed for state management |
| `expo-notifications` | ✅ Required | ❌ MISSING | Needed for renewal reminders |
| `expo-sharing` | ✅ Required | ❌ MISSING | Needed for CSV export |
| `expo-file-system` | ✅ Required | ❌ MISSING | Needed for CSV file creation |
| `uuid` | ❌ PRD says YOK | ❌ Not needed | — |

3 required dependencies are missing from `package.json`. These need to be added during scaffold.

---

## 11. Overall Verdict

| Category | Status |
|----------|--------|
| Code exists | 🔴 NO |
| Tests exist | 🔴 NO |
| Build compiles | 🔴 NO |
| Privacy docs | 🔴 NO |
| Store listing ready | 🟡 Partially defined in PRD |
| Screenshots ready | 🔴 NO |
| Signing configured | 🔴 NO |
| **Release ready** | **🔴 NO** |

**Bottom line:** W39 Subwise development has not begun. The project is a `package.json` manifest only. No source code, tests, configuration, or documentation files have been written. PRD §9's 5 acceptance criteria show 0/5 green.

### What needs to happen (in order):

1. **Gün 1 — Scaffold**: `npm install`, `app.json`, `tsconfig.json`, folder structure, `expo-doctor` + `tsc` green
2. **Gün 2 — State/DB**: Schema, storage, state management, renewals logic, tests
3. **Gün 3 — UI**: Screens, components, i18n, CSV export, notification wiring
4. **Gün 4 — Verification**: All checks green, PRIVACY.md, screenshot plan, commit + push

### Recommendation

**Do not proceed to release.** This app needs full development before any preflight can be meaningful. The next run of this cron should ideally trigger after code exists — or this cron should be paused until development completes.

No approval requested — there is nothing ready for external action.

---
*Generated by weekly-release-preflight cron · 2026-09-15*
