---
name: Onboarding
summary: Multi-step first-run experience that guides new users to initial value without gating core product access.
components:
  - Modal
  - Button
  - Input
  - Avatar
  - Checkbox
flow:
  - "Step 1: Detect first-login flag on session; trigger onboarding Modal or route"
  - "Step 2: Welcome screen — studio name, one-sentence value proposition, Continue and Skip buttons"
  - "Step 3: Minimal profile step — display name, avatar upload (optional); Skip available"
  - "Step 4: Studio-specific setup step — ask one targeted question relevant to the studio's core feature"
  - "Step 5: Permission request step (if applicable) — notifications or location; include 'Why we ask' disclosure"
  - "Step 6: Completion screen — confirm setup, show one concrete next action, dismiss to product"
a11y: Step progress announced via aria-live on each step transition; Modal focus trap active throughout; skip path available at every step via keyboard; step heading receives focus on each transition.
---

# Onboarding

## When to use

Onboarding fires once per user, on their first login to a studio. It is a guided setup sequence that collects the minimum information needed to personalize the experience and surfaces one core feature before dismissing.

The hard rule: **do not gate product value behind onboarding completion.** The user must be able to reach the product after any step. Onboarding is an invitation, not a prerequisite. A captive onboarding that forces completion before showing anything real increases drop-off and is not the Zuga pattern.

ZugaLife uses onboarding to collect wellness focus area, notification preference, and the first habit goal. ZugaTrader uses it to set a default risk level and connect the first data source. Each studio defines its own 2–5 steps — the shell and flow mechanics are shared.

## Visual / structural anatomy

```
┌──────────────────────────────────────────────────┐
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Modal (full-screen on mobile, centered    │  │
│  │         800px max-width on desktop)        │  │
│  │                                            │  │
│  │  ● ● ○ ○ ○                    [Skip]       │  │  ← Dot progress + skip
│  │  Step 2 of 5                               │  │
│  │                                            │  │
│  │  Set up your profile                       │  │  ← Step heading (h2)
│  │                                            │  │
│  │  Label: Display name                       │  │
│  │  ┌──────────────────────────────────────┐  │  │
│  │  │ Antonio                              │  │  │
│  │  └──────────────────────────────────────┘  │  │
│  │                                            │  │
│  │  [Avatar upload — optional]                │  │
│  │                                            │  │
│  │              [Back]  [Continue]            │  │  ← Button secondary + primary
│  └────────────────────────────────────────────┘  │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Progress indicator:** Use dots (●○) for ≤5 steps. Use a progress bar with step counter for 6+ steps. Display the numeric counter ("Step 2 of 5") adjacent to either indicator — it removes ambiguity for screen readers and low-vision users.

## Components used

- [Modal](../11-components/modal.md) — the onboarding shell. Full-screen on mobile viewports; constrained centered panel on desktop. Focus trap is active throughout. The Modal is not dismissible via the standard Escape/backdrop-click path — the Skip button is the explicit dismissal.
- [Button](../11-components/button.md) — primary "Continue" advances the step; secondary "Back" returns; ghost "Skip" exits onboarding. The Skip Button is present on every step.
- [Input](../11-components/input.md) — collects profile data (display name, goals). Only text and select variants in onboarding — no complex inputs.
- [Avatar](../11-components/avatar.md) — upload component for optional profile photo on the profile step. Avatar upload must be labeled as optional and skippable.
- [Checkbox](../11-components/checkbox.md) — binary preference selections within a step (e.g., "Send me weekly progress summaries via email").

## Flow

1. On first login, the first-login flag is detected. Onboarding Modal opens.
2. **Welcome step (step 1):** Studio logo + name, one sentence: "ZugaLife helps you build daily wellness habits with AI coaching." Two Buttons: "Get started" (primary, advances to step 2) and "Skip for now" (ghost, exits to product immediately).
3. **Profile step (step 2):** Display name Input (pre-filled with signup name if available). Avatar upload (optional, labeled "Add a photo — optional"). Back and Continue Buttons. Skip Button.
4. **Studio-specific step(s) (step 3–4):** One targeted question per step. Examples: ZugaLife — "What's your main wellness goal?" (Select with 4–6 options). ZugaTrader — "What's your default risk level?" (Select). Steps may be conditional on previous answers (a user who selected "stress reduction" sees a different step 4 than one who selected "fitness").
5. **Permission step (if applicable):** If the studio requires notifications or location, this step presents the permission request with a "Why we ask this" disclosure: "We use notifications to remind you of your daily check-in. You can change this any time in Settings." Two Buttons: "Enable notifications" (primary, triggers the OS permission prompt) and "Not now" (secondary, advances without enabling).
6. **Completion step:** "You're set up." Confirmation copy summarizing what was configured. One concrete next action Button: "Log your first habit", "Connect your first asset", etc. This Button exits the Modal and routes to the first-action surface.

## Accessibility

### Keyboard

- Tab order within each step: heading (non-interactive, in reading order) → form fields → Back → Continue → Skip.
- Enter in a text Input does not advance the step — it submits the input (default form behavior). Only the Continue Button advances.
- Skip is reachable from any step without Tab-cycling through all inputs. Position Skip consistently (top-right of the Modal header).
- Escape: does not close the Modal during onboarding (unlike standard Modals). Pressing Escape should surface a "Are you sure you want to skip setup?" inline prompt — or simply do nothing and let the Skip Button be the only exit path. Document the choice per studio.

### Screen reader script

- **Step transition:** aria-live="polite" region fires when the step changes: "Step 3 of 5: Set your wellness goal." Focus moves to the step heading.
- **Welcome step:** "Welcome to ZugaLife. [heading] ZugaLife helps you build daily wellness habits with AI coaching. Get started, button. Skip for now, button."
- **Permission step:** "Enable notifications. [heading] We use notifications to remind you of your daily check-in. You can change this any time in Settings. Enable notifications, button. Not now, button."
- **Progress dots:** Each dot is a non-interactive decoration — `aria-hidden="true"`. The step counter text ("Step 2 of 5") provides the equivalent information in text form.

### Focus management

- On each step transition (Continue or Back), focus moves to the step heading (`h2`). The heading must be focusable (`tabindex="-1"`) for programmatic focus to work — it should not appear in the natural tab sequence.
- On Skip: Modal closes; focus returns to whichever element on the underlying page is the logical starting point for new users (typically the primary CTA on the empty-state dashboard).
- Avatar upload Input: must be keyboard accessible. The upload trigger must be a `<button>` or `<label>` with an associated `<input type="file">`.

### prefers-reduced-motion

Step transitions in onboarding commonly use slide or crossfade animations. All transitions must be gated on `@media (prefers-reduced-motion: no-preference)` — see §10.5. Under reduced motion, steps appear immediately without animation. The progress dot fill (animated) must also be static under reduced motion.

## Don'ts

| ❌ Don't | Why |
|---|---|
| Remove the Skip button from any step | Captive onboarding is a dark pattern. Users who are forced to complete setup before seeing the product churn faster than users who discover value first and complete setup later. |
| Ask for more than one piece of information per step | Cognitive load per step must stay low. If a step has three inputs, split it into three steps. |
| Gate the product behind onboarding completion | If the user clicks Skip at any point, they land in the product immediately — not a "complete setup to continue" gate. |
| Use placeholder text instead of labels in onboarding forms | Onboarding forms are the user's first experience with your inputs. An accessible, labeled form sets a trust baseline; unlabeled forms do the opposite. |
| Show the OS permission prompt without a pre-prompt step | iOS and Android allow each permission request once. If the user dismisses the native prompt without understanding why it appeared, you cannot re-prompt. The "Why we ask this" step converts permission requests. |
| Trigger onboarding again after password reset or re-auth | Onboarding is per-user, per-studio, once. The first-login flag is set on account creation, not on each login. |

## Pattern-specific notes

**Conditional steps:** Studios with branching onboarding (step 4 varies based on step 3's answer) must implement the branch server-side, not via client-side DOM manipulation. The step count should reflect the user's actual remaining steps — don't show "Step 3 of 5" if the branch has eliminated step 5.

**Pre-filling from signup:** If the user provided a name at signup, pre-fill the profile step display name Input. Do not pre-fill the avatar — that requires explicit upload intent. Pre-filling reduces friction and signals that the app is paying attention.

**Skip analytics:** Track which step users Skip from. If step 3 has a high skip rate, the question being asked is wrong or the value of answering it is not clear. Step skip rates are a product signal, not just a drop-off metric.

**Resuming after interruption:** If the user exits mid-onboarding (closes the browser, app crash), resume from the last completed step on next login — not from the beginning. First-login flag remains set until the completion step fires. The step state is persisted server-side, not in localStorage.
