---
name: Paywall
summary: Gating pattern for upgrade prompts across hard walls, soft walls, and retroactive limit-hit scenarios.
components:
  - Modal
  - Button
  - Card
  - Badge
  - Toast
flow:
  - "Step 1: Detect gate trigger — premium feature access attempt, usage limit hit, or plan comparison visit"
  - "Step 2: Classify placement: hard wall (full-screen Modal), soft wall (inline Card), or retroactive (Toast + inline)"
  - "Step 3: Render plan comparison with current plan highlighted and recommended plan marked via Badge"
  - "Step 4: Primary CTA routes to billing partner checkout with pre-selected plan"
  - "Step 5: On successful upgrade, dismiss paywall and unlock the feature immediately without page reload"
  - "Step 6: Restore-purchases path available for users who have already subscribed"
a11y: Hard wall Modal traps focus; plan comparison table uses proper thead/th markup; Badge used for recommended plan must include accessible text (not color alone); ZugaTokens cost and fiat equivalent both stated for screen reader users.
---

# Paywall

## When to use

A paywall renders when a user attempts to access a feature or crosses a usage limit that requires a paid plan. There are three placement strategies — choose based on the interruption level appropriate to the context:

**Hard wall:** Full-screen Modal takeover. Use when the feature cannot be partially experienced for free and the user has explicitly navigated to it (e.g., clicking into a premium ZugaLife coaching session). The user cannot interact with the underlying page until they upgrade or dismiss.

**Soft wall:** Inline Card within the feature area. Use when part of the feature is accessible for free and the premium upgrade enhances it (e.g., ZugaThemes marketplace showing locked premium themes inline with free ones). The user can continue using the free tier without modal interruption.

**Retroactive:** The user completes an action that hits a limit (e.g., ZugaLife habit limit of 5 on the free plan after logging habit 6). A Toast announces the limit and links to upgrade. The action may or may not be allowed to complete depending on whether the soft limit permits it.

## Visual / structural anatomy

### Hard wall (Modal)

```
┌──────────────────────────────────────────────────┐
│  Modal                                           │
│                                                  │
│  Unlock ZugaLife Pro                             │  ← h2
│                                                  │
│  ┌─────────────────┐  ┌─────────────────────┐    │
│  │  Free           │  │  Pro        [Best]  │    │  ← Badge "Best" on recommended
│  │                 │  │                     │    │
│  │  5 habits       │  │  Unlimited habits   │    │
│  │  Basic insights │  │  AI coaching        │    │
│  │  —              │  │  Export data        │    │
│  │                 │  │                     │    │
│  │  Current plan   │  │  500 ZugaTokens/mo  │    │
│  │                 │  │  (~$9.99/mo)        │    │  ← ZugaTokens + fiat
│  └─────────────────┘  └─────────────────────┘    │
│                                                  │
│         ┌──────────────────────────────┐          │
│         │   Upgrade to Pro             │          │  ← Button primary
│         └──────────────────────────────────────┘ │
│                                                  │
│   Already subscribed?  [Restore purchases]       │  ← ghost Button
│                                                  │
│                              [Maybe later]       │  ← ghost, dismisses
└──────────────────────────────────────────────────┘
```

### Soft wall (inline Card)

```
┌──────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────┐  │
│  │  Card  [Pro]                               │  │  ← Badge in Card header
│  │                                            │  │
│  │  AI coaching sessions                      │  │
│  │  Get personalized daily plans from your    │  │
│  │  Zuga wellness AI.                         │  │
│  │                                            │  │
│  │  [Unlock for 500 ZugaTokens/mo]            │  │  ← Button primary (inline)
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

## Components used

- [Modal](../11-components/modal.md) — hard wall container. Focus trapped. Dismissible via "Maybe later" ghost Button only — not via backdrop click or Escape, because the user must consciously choose to defer rather than accidentally dismissing.
- [Button](../11-components/button.md) — primary "Upgrade to [Plan]"; ghost "Restore purchases"; ghost "Maybe later" (dismisses hard wall only). Do not use danger variant anywhere in a paywall — upgrade is a positive action.
- [Card](../11-components/card.md) — plan comparison cards within the Modal; soft wall inline container.
- [Badge](../11-components/badge.md) — marks the recommended plan ("Best", "Most popular"). The Badge must not rely on color alone — the text label is the primary signal.
- [Toast](../11-components/toast.md) — retroactive limit-hit notification. Announces the limit and links to the upgrade path. Toast for paywalls must be persistent (no auto-dismiss) because the information is actionable and the user must consciously dismiss it.

## Flow

### Hard wall

1. User navigates to a premium feature surface. Gate check fires before rendering the premium content.
2. Hard wall Modal opens. The premium content is not rendered behind it — not blurred, not partially visible. The Modal presents the plan comparison.
3. The recommended plan is highlighted with a Badge and a distinct Card border. The current plan is marked "Current plan."
4. Each plan column states the ZugaTokens cost per month and the fiat equivalent in parentheses (e.g., "500 ZugaTokens/mo (~$9.99/mo)"). Both figures are required — see ZugaTokens voice in §3.
5. Primary CTA "Upgrade to Pro" routes to the billing partner checkout with the plan pre-selected. The checkout is hosted by the billing partner — not an in-app card form.
6. On successful payment: the billing partner redirects back to the studio with a success parameter. The paywall Modal dismisses. The premium feature unlocks without a full page reload (the session plan flag updates via a webhook-triggered refresh or a post-redirect re-fetch).
7. "Maybe later" dismisses the Modal and returns the user to wherever they were.

### Soft wall

1. User browses a mixed free/premium feature surface (e.g., ZugaThemes marketplace).
2. Premium items render inline with a Badge overlay and a subtle locked state (reduced opacity is acceptable here because the locked state is visually supported by the Badge text — not conveyed by opacity alone).
3. Clicking a locked item renders the soft wall Card inline, below the item. The Card explains the feature and presents the upgrade CTA.
4. The rest of the page remains interactive — no Modal, no focus trap.
5. CTA routes to billing checkout. On return, locked items unlock in-place.

### Retroactive limit-hit

1. User performs an action that crosses a free-tier limit (e.g., adding a 6th habit when the limit is 5).
2. The action completes or is rejected depending on the limit type (soft vs hard limit — document the limit type per studio).
3. A persistent Toast fires: "You've reached your habit limit. Upgrade to Pro for unlimited habits." with an inline "Upgrade" link.
4. The Toast must not auto-dismiss — the user must read and consciously dismiss it. Use `role="alert"` for immediate announcement.
5. A soft wall Card also renders on the list view the next time it loads, to ensure the message persists beyond the Toast lifecycle.

### Restore purchases

1. A "Restore purchases" ghost Button is present on every hard wall paywall.
2. On click: fires a check against the billing partner to verify existing subscription status. If active, updates the plan flag and dismisses the paywall immediately.
3. On no active subscription found: Toast: "No active subscription found for this account." The upgrade path remains open.
4. This flow is required for web parity with iOS/Android app store restore behavior.

## Accessibility

### Keyboard

- Hard wall Modal: focus trapped. Tab cycles through plan cards and Buttons within the Modal. Escape does not close the hard wall — "Maybe later" is the only dismiss path.
- Soft wall: no focus trap. The upgrade Card is in the normal tab sequence.
- Plan comparison table (if rendered as `<table>`): column headers in `<thead>/<th>` with `scope="col"`. Row headers for plan names with `scope="row"`.

### Screen reader script

- **Hard wall on open:** "Unlock ZugaLife Pro. [heading] Free plan: 5 habits, basic insights, current plan. Pro plan, recommended: unlimited habits, AI coaching, export data, 500 ZugaTokens per month, approximately 9.99 USD per month. Upgrade to Pro, button. Restore purchases, button. Maybe later, button."
- **Badge on recommended plan:** "Recommended" — the Badge text is the accessible signal. Do not use aria-label to say "recommended" separately if the Badge already renders the word visibly.
- **Retroactive Toast:** `role="alert"` fires immediately: "You've reached your habit limit. Upgrade to Pro for unlimited habits. Upgrade, link."
- **Plan pricing:** Both ZugaTokens and fiat figures must be in the visible text so screen readers announce them. Do not put the fiat equivalent only in a `title` attribute.

### Focus management

- Hard wall Modal open: focus moves to the Modal heading (h2). Plan comparison is presented in reading order below.
- Hard wall dismiss ("Maybe later"): focus returns to the element that triggered the paywall (the locked feature button or navigation link).
- Restore purchases success: Modal dismisses; focus moves to the now-unlocked feature surface.

### prefers-reduced-motion

Hard wall Modal entrance (if animated) must be gated on `prefers-reduced-motion: no-preference`. Soft wall Card inline expansion similarly. Under reduced motion, both appear immediately.

## Don'ts

| ❌ Don't | Why |
|---|---|
| Interrupt the user mid-action with a hard wall | If a user is filling out a form and hits a limit mid-input, do not open a Modal that destroys their progress. Complete or save the in-progress action first, then surface the paywall. |
| Use "are you sure you don't want to upgrade?" confirmation | This is a dark pattern. "Maybe later" dismisses cleanly and without guilt-tripping. |
| Blur premium content behind the paywall | Blurred content implies the feature is broken or loading. It also inadvertently trains users to think the content exists and is being withheld, which increases frustration. Show the locked state honestly. |
| Convey plan tier via color alone | Badge color alone fails WCAG 1.4.1 (Use of Color). Include a visible text label ("Recommended", "Pro") alongside any color distinction. |
| Show paywalls on every navigation to a premium feature | After the user dismisses "Maybe later," respect a cooldown period (e.g., 48 hours or until next session) before showing the hard wall again on the same feature. |
| State only ZugaTokens cost without fiat equivalent | Users who are not familiar with ZugaTokens cannot evaluate cost. Always pair them: "500 ZugaTokens/mo (~$9.99/mo)". See §3 voice for ZugaTokens naming conventions. |

## Pattern-specific notes

**ZugaTokens and fiat:** The Zuga billing model uses ZugaTokens as the primary currency unit for in-app purchases. All paywall UI must state both the ZugaTokens amount and the approximate fiat equivalent so users can evaluate cost regardless of their token balance. The exact fiat conversion may fluctuate — display "approximately" and round to the nearest cent.

**ZugaThemes marketplace:** The marketplace uses the soft wall pattern exclusively. No full-screen hard walls — the browsing experience is core, the premium unlock is secondary. Theme creators earn 90% of the token transaction; the paywall must not appear extractive given this split.

**ZugaLife Pro:** ZugaLife's paywall is commercially highest-priority given the Stripe-review blocked launch. The paywall must be tested end-to-end in staging before Stripe review submission — the billing partner integration and plan flag update flow are the launch blocker, not the paywall UI itself.

**Billing partner abstraction:** This pattern references "billing partner" and "billing partner checkout" rather than naming a specific payment processor. The bible documents the product pattern, not the implementation dependency. Studios implement the billing integration against the ZugaApp billing service, which abstracts the processor.
