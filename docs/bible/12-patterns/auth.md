---
name: Auth
summary: Login, signup, forgot-password, and 2FA flows used across all Zuga studios.
components:
  - Input
  - Button
  - Card
  - Modal
  - Checkbox
flow:
  - "Login 1: Render email + password fields inside Card; focus lands on email Input on mount"
  - "Login 2: User submits; Button shifts to loading variant; aria-live announces 'Signing in'"
  - "Login 3: On validation failure, focus moves to first invalid Input; error linked via aria-describedby"
  - "Login 4: On success, session cookie set; redirect to dashboard"
  - "Signup 1: Render name, email, password, confirm-password; password Input shows strength hint via helper text"
  - "Signup 2: Submit triggers server-side account creation; on duplicate email, inline Input error appears"
  - "Signup 3: On success, session created; redirect to onboarding (see onboarding.md)"
  - "Forgot-password 1: User clicks 'Forgot password?' link; modal or dedicated route renders email-only form"
  - "Forgot-password 2: Submit sends reset email; success state replaces form with confirmation copy"
  - "2FA 1: After valid credentials, 2FA challenge screen renders with 6-digit code Input"
  - "2FA 2: On correct code, session promoted to fully authenticated; redirect to dashboard"
  - "2FA 3: On incorrect code, Input error shown; after 5 failures lock challenge and surface recovery-code path"
a11y: All form fields have explicit visible labels linked via for/id; error messages linked via aria-describedby; auth errors announced via aria-live polite region; 2FA code Input uses inputmode=numeric; session-expiry re-auth uses in-modal flow, not full-page redirect, so context is preserved.
---

# Auth

## When to use

Every Zuga studio gates its dashboard behind auth. The Auth pattern covers the four flows that bring a user in or back: **login** (primary), **signup**, **forgot-password**, and **2FA challenge**. Login is the primary flow — the pattern is tuned for returning users first, new users second. Signup is a variant reached via a "Create account" link, not a separate route hierarchy.

Session expiry mid-session triggers a re-auth Modal rather than a full-page redirect, preserving in-progress state.

## Visual / structural anatomy

```
┌──────────────────────────────────────────────┐
│           Zuga logo / studio wordmark         │
│                                              │
│  ┌─────────────────────────────────────────┐ │
│  │  Card                                   │ │
│  │                                         │ │
│  │  [Tab: Log in] [Tab: Sign up]           │ │  ← Tabs or link pair
│  │                                         │ │
│  │  Label: Email                           │ │
│  │  ┌───────────────────────────────────┐  │ │
│  │  │ email@example.com                 │  │ │
│  │  └───────────────────────────────────┘  │ │
│  │                                         │ │
│  │  Label: Password          Forgot?       │ │
│  │  ┌───────────────────────────────────┐  │ │
│  │  │ ••••••••                     [👁] │  │ │
│  │  └───────────────────────────────────┘  │ │
│  │  [error text if present]                │ │
│  │                                         │ │
│  │  [Remember this device  □]              │ │
│  │                                         │ │
│  │  ┌─────────────────────────────────┐    │ │
│  │  │          Log in                 │    │ │  ← Button primary
│  │  └─────────────────────────────────┘    │ │
│  └─────────────────────────────────────────┘ │
│                                              │
│       No account? Create one                 │
└──────────────────────────────────────────────┘
```

2FA challenge replaces the Card body — email and password fields are hidden; a single 6-digit code Input is shown with a "Use a recovery code instead" ghost Button below.

## Components used

- [Input](../11-components/input.md) — email, password (with reveal toggle), 6-digit code. Each has an explicit `<label>`.
- [Button](../11-components/button.md) — primary "Log in" / "Create account"; ghost "Forgot password?" link-style; danger is never used in auth flows.
- [Card](../11-components/card.md) — wraps the form on the standalone auth page. Provides the white surface container and shadow.
- [Modal](../11-components/modal.md) — session-expiry re-auth and forgot-password flow when triggered mid-session.
- [Checkbox](../11-components/checkbox.md) — "Remember this device" on 2FA screens.

## Flow

### Login (primary)

1. Page renders with Card containing email and password Inputs. Focus lands on email Input on mount (`autofocus` on first field).
2. User fills fields and clicks "Log in" Button (or presses Enter in any field — form submit fires).
3. Button shifts to loading variant: label becomes "Signing in…", `aria-busy="true"`. The `aria-live="polite"` region in the page root announces "Signing in."
4. Credentials validated server-side.
5. **On error:** Button returns to default state. First invalid Input receives `aria-invalid="true"`, error text appears below it, focus moves to that Input. The `aria-live` region announces the error.
6. **On success:** Session cookie set; redirect to dashboard (or the originally requested route).

### Signup variant

1. Reached via "Create account" link/tab. Card swaps to signup fields: name, email, password, confirm-password.
2. Password Input includes helper text: "At least 8 characters." Confirm-password validates match client-side on blur.
3. Submit triggers account creation. On duplicate email: inline Input error "An account with this email already exists. Log in instead?" with an inline link.
4. On success: session created; route to onboarding pattern.

### Forgot-password variant

1. "Forgot password?" link: opens a minimal Modal (mid-session) or navigates to `/forgot-password` route (unauthenticated).
2. Single email Input. Submit Button. No password field.
3. On submit: regardless of whether the email exists, display the same confirmation copy: "If this email is registered, you'll receive a reset link within a few minutes." (Prevents email enumeration.)
4. Reset link in email leads to a `/reset-password` route with a new-password + confirm form. Session is not created until the user explicitly logs in after reset.

### 2FA challenge

1. Appears after valid login credentials when the account has 2FA enabled.
2. A single Input (`type="text"`, `inputmode="numeric"`, `maxlength="6"`, `autocomplete="one-time-code"`) centered in the Card. Label: "Enter your 6-digit code."
3. Submit can fire automatically when 6 digits are entered (no separate Button press needed), but a Button must also be present for users who paste codes or use autofill.
4. On correct code: session promoted; redirect.
5. On incorrect code: error appears inline; Input is cleared and refocused. After 5 consecutive failures: Input is disabled, a "Too many attempts" message appears, and a "Use a recovery code instead" ghost Button becomes the primary path.
6. Recovery-code flow: replaces the 6-digit Input with a single-line text Input (`autocomplete="off"`) accepting a recovery code.
7. "Remember this device" Checkbox saves a trusted-device cookie so 2FA is skipped for 30 days on this browser.

## Accessibility

### Keyboard

- Tab order through the form: label → Input → submit Button → secondary links. Never break the natural DOM order.
- Enter in any Input submits the form (native form behavior — no JavaScript shortcut needed).
- Escape in a forgot-password Modal closes it and returns focus to the "Forgot password?" trigger.
- 2FA auto-submit fires without focus leaving the Input; users who press Enter manually instead get the same result.

### Screen reader script

- **Empty login form:** "Log in. Email address, edit text. Password, edit text. Remember this device, checkbox, unchecked. Log in, button."
- **After submit error:** "Email address, edit text, invalid entry — Enter a valid email address." (focus is on the field; aria-invalid triggers the announcement automatically).
- **Loading state:** aria-live region fires "Signing in." Button label reads "Signing in…, button."
- **2FA challenge:** "Enter your 6-digit code, edit text. We sent a code to your authenticator app."

### Focus management

- On page load: `autofocus` on the email Input.
- On submit error: focus moves programmatically to the first invalid field. Do not move focus to a generic error banner at the top — the field-level error is the right anchor.
- On session-expiry Modal open: focus trapped inside Modal. On dismiss (re-auth success or manual close): focus returns to the element that was active before the Modal opened.
- On 2FA incorrect code: Input is cleared and `focus()` is called on it so the user can immediately re-enter.

### prefers-reduced-motion

No motion-sensitive animations are inherent to auth flows. The Card appearing on page load should have no entrance transition. If the forgot-password Modal uses a slide-in animation, wrap it in a `@media (prefers-reduced-motion: no-preference)` block (see §10.5).

## Don'ts

| ❌ Don't | Why |
|---|---|
| Use placeholder text as a label substitute | Placeholder disappears on input. Screen readers and users with cognitive disabilities lose context the moment they start typing. |
| Move focus to a generic error banner at the top of the form | The user is on a keyboard; "Error — check your inputs" at the top forces them to navigate back through every field to find which one failed. Move focus to the first invalid field. |
| Surface different errors for "email not found" vs "wrong password" | Email enumeration lets attackers confirm which emails are registered. Return a single "Email or password incorrect" message for both cases. |
| Full-page redirect on session expiry | The user loses their in-progress state (a draft, a form, a selected tab). Re-auth in a Modal preserves context. |
| Auto-submit the 2FA code without a fallback Button | Paste behavior is inconsistent across browsers; assistive technology users may navigate to the field without triggering the character events that fire auto-submit. |
| Skip `autocomplete="one-time-code"` on the 2FA Input | iOS and Android surface the OTP from SMS/email with a single tap when this attribute is present; omitting it forces manual code entry on mobile. |
| Hide password requirements until validation fails | Surface minimum rules as helper text from the moment the password Input renders. Hidden rules force users to guess and retry — every retry is friction the bible exists to prevent. |

## Pattern-specific notes

**Session expiry re-auth:** When the API returns 401 mid-session, intercept it globally and show the re-auth Modal rather than routing to `/login`. After re-auth, replay the failed request. This is a systemic pattern — auth should not be sprinkled per-route.

**"Remember this device" scope:** The trusted-device cookie skips 2FA only, not the initial login. The user still enters their password every session. The Checkbox label must be explicit about this: "Skip 2FA for 30 days on this browser" is better than "Remember me."

**Password strength:** On signup, the password Input helper text updates as the user types — minimum-met, good, strong — but do not block submission based on "strength score" beyond the minimum rule. A long passphrase that fails a complexity heuristic is still a good password.

**Recovery codes:** Each code is single-use. After a code is consumed, the system should surface a warning on the next settings visit: "You have N recovery codes remaining. Generate more in Security Settings."
