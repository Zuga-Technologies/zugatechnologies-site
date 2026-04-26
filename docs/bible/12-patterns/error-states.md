---
name: Error States
summary: Consistent error presentation for 404, 500, network failures, and permission errors — classified by severity and recovery path.
components:
  - Toast
  - Button
  - Input
  - Card
flow:
  - "Step 1: Catch error at the boundary — network interceptor, error boundary component, or form validation"
  - "Step 2: Classify error: 404 (not found), 500 (server fault), network (offline/timeout), permission (401/403), or validation (inline)"
  - "Step 3: Render the appropriate error UI — inline Input error, Toast, or full-page error view"
  - "Step 4: Offer the correct recovery action: retry, navigate back, re-auth, or contact support"
a11y: Inline validation errors use aria-invalid + aria-describedby on the field; Toast errors use role=alert for immediate announcement; page-level errors have a descriptive h1 and a focused recovery Button on mount.
---

# Error States

## When to use

Every Zuga studio touches external APIs, auth sessions, and user-entered data. Errors are not exceptional — they are part of the normal operating envelope. This pattern defines how each error class is surfaced so the user always knows what happened and what to do next.

Classify the error first, then pick the UI. Do not default to a generic "Something went wrong" page for every failure.

## Error classification

```
Error type        Scope           Primary UI          Recovery action
─────────────────────────────────────────────────────────────────────
Validation        Field-level     Inline Input error  Fix and resubmit
Network/timeout   In-place        Banner or Toast     Retry button
401 (re-auth)     Session         Re-auth Modal       Log in again
403 (forbidden)   Page or feature Inline Card         Contact owner
404 (not found)   Page            Full-page view      Back to known route
500 (server)      Page            Full-page view      Retry + report
```

## Visual / structural anatomy

### Inline validation error (field-level)

```
  Label: Email address
  ┌──────────────────────────────────────────────┐
  │ not-an-email                                 │  ← aria-invalid="true"
  └──────────────────────────────────────────────┘  ← --component-input-border-error
  ⚠ Enter a valid email address.                    ← role="alert", aria-describedby
```

### Network error (in-place banner)

```
┌──────────────────────────────────────────────────┐
│  ⚠  Connection lost. Your changes are queued.   │
│                              [Retry]             │  ← Button secondary
└──────────────────────────────────────────────────┘
```

### Full-page error (404 / 500)

```
┌──────────────────────────────────────────────────┐
│                                                  │
│              [Error illustration]                │
│                                                  │
│            404 — Page not found                  │  ← h1
│                                                  │
│   The page you're looking for doesn't exist      │
│   or has moved.                                  │
│                                                  │
│   ┌──────────────────┐  ┌────────────────────┐   │
│   │   Go to dashboard │  │   Report this bug  │   │
│   └──────────────────┘  └────────────────────┘   │
└──────────────────────────────────────────────────┘
```

## Components used

- [Input](../11-components/input.md) — carries the error variant for field-level validation failures. Error text appears below the field; `aria-invalid="true"` and `aria-describedby` are set on the `<input>` element.
- [Toast](../11-components/toast.md) — surface transient errors that do not block the user's primary task (e.g., a background sync failure while the user continues browsing). Toast errors use `role="alert"` for immediate screen reader announcement. Cross-link: see §11 toast.md for the error variant specifics.
- [Button](../11-components/button.md) — recovery actions. Retry uses secondary variant. Navigation ("Go to dashboard") uses primary. Report-bug uses ghost. Never use danger variant for error recovery — danger signals destructive intent.
- [Card](../11-components/card.md) — wraps in-place 403 errors when the forbidden feature is embedded within a larger page (e.g., a locked studio feature inside a dashboard panel).

## Flow by error class

### Validation errors

1. User submits a form. Client-side validation runs first.
2. Each invalid field receives `aria-invalid="true"` and the error message element below it gets `role="alert"`. The error text is linked to the field via `aria-describedby`.
3. Focus moves to the first invalid field.
4. Server-side validation errors returned in the API response are applied to the same inline error slots — not shown in a banner.
5. On correction and resubmit, `aria-invalid` is removed and the error text element is cleared.

### Network / timeout errors

1. API call fails with a network error or times out (no 2xx/4xx/5xx response received).
2. The in-place banner appears inline above or below the content area that tried to load — not a full-page takeover.
3. Banner copy: "Couldn't load [section name]. Check your connection and try again." with a "Retry" Button.
4. If the user is offline for an extended period, a persistent top banner announces the offline state globally. Individual panel retry buttons remain active.
5. Actions the user takes while offline are queued and replayed when connection resumes. The banner copy acknowledges this: "Connection lost. Your changes are saved locally and will sync when you're back online."

### 401 — Session expired / not authenticated

1. Any API call returns 401 during an active session.
2. Global interceptor catches the 401 before it reaches individual error handlers.
3. Re-auth Modal opens (see [auth.md](auth.md) — session-expiry flow). The user does not lose their in-progress state.
4. After successful re-auth, the failed request is replayed automatically.
5. If the user is unauthenticated on initial load (not a session expiry), redirect to the login route rather than showing a Modal.

### 403 — Forbidden / access denied

1. The user is authenticated but does not have permission for this resource.
2. This is not a recoverable error through re-auth. Do not show the re-auth Modal.
3. For page-level 403: render the full-page error view with h1 "Access denied" and copy explaining who to contact to request access. Include the studio contact or admin email where known.
4. For feature-level 403 (embedded in a dashboard): render an inline Card with the same information. Do not hide or collapse the feature area silently.
5. Distinguish 403 clearly from 404 — "Access denied" tells the user the resource exists; "Not found" does not.

### 404 — Page not found

1. Route does not match any known path.
2. Render the full-page 404 view. h1: "Page not found." Supporting copy: "This page doesn't exist or may have moved."
3. Primary Button: "Go to dashboard." Ghost Button: "Report this link as broken" (pre-fills a bug report with the 404 URL).
4. Do not expose internal routing details in the error copy.

### 500 — Server error

1. API returns 5xx or the app throws an unhandled exception.
2. Render the full-page 500 view. h1: "Something went wrong on our end." Supporting copy: "This isn't your fault. We've been notified and are looking into it."
3. Two actions: "Retry" (secondary Button, replays the request or refreshes the page) and "Report this error" (ghost Button, captures error ID and routes to support).
4. If an error ID or trace ID is available from the API response, surface it in small text ("Error ID: abc-1234") so users can provide it to support without having to describe the error from memory.
5. Do not expose stack traces, internal service names, or raw SQL errors to the user.

## Accessibility

### Keyboard

- Full-page error views: on mount, focus moves to the primary recovery Button. The h1 is the first content in reading order.
- Toast errors: do not shift focus to the Toast. `role="alert"` handles announcement. The user's focus stays on their current task.
- In-place network banners: the "Retry" Button is reachable via normal tab sequence.

### Screen reader script

- **Inline validation:** "Email address, edit text, invalid entry — Enter a valid email address." (Triggered by `aria-invalid` + `aria-describedby` when the field receives focus.)
- **Toast error:** Immediately announced due to `role="alert"`: "Couldn't save your changes. Try again."
- **Full-page 404:** "Page not found. [heading] This page doesn't exist or may have moved. Go to dashboard, button. Report this link as broken, button."
- **403 in-place Card:** "Access denied. [heading] You don't have permission to view this feature. Contact your admin at admin@example.com."

### Focus management

- Full-page errors (404, 500): focus moves to the primary recovery Button on mount — not to the h1, because the h1 is not interactive. Screen readers read the heading as part of the linear reading order regardless.
- Validation errors: focus moves to the first invalid Input.
- Toast errors: no focus movement.
- 401 re-auth Modal: focus moves into the Modal, trapped there (see [auth.md](auth.md)).

### prefers-reduced-motion

Error Toast slide-in animations must be gated on `prefers-reduced-motion: no-preference`. Under reduced motion, Toast appears immediately at full opacity. In-place banner animations follow the same rule.

## Don'ts

| ❌ Don't | Why |
|---|---|
| Show "Something went wrong" for every error class | Users cannot act on vague errors. Classify and explain — "Couldn't load your habits" is actionable; "Something went wrong" is not. |
| Show a re-auth Modal on 403 | 403 means the session is valid but the user lacks permission. Prompting them to log in again will not help and erodes trust. |
| Expose raw error messages from the server | Internal service names and stack traces reveal architecture to attackers and confuse users. Translate all server errors to user-readable copy. |
| Use Toast for errors that block the user's primary action | If the user cannot complete their task because of the error, they need a persistent in-place error UI, not a Toast that auto-dismisses in 5 seconds. |
| Route to a 404 page for permission errors | 403 and 404 have different meanings. Conflating them (returning 404 for forbidden resources to hide their existence) is sometimes appropriate for security, but the UI error page should still be honest with the authenticated user. |
| Show validation errors only at the top of the form in a summary banner | A summary banner at the top plus no inline errors forces the user to match each error message to its field by name — double work. Put errors inline on the field. |

## Pattern-specific notes

**Error IDs:** When the API returns a trace ID or request ID with a 5xx response, always surface it to the user in the 500 error page copy. Support conversations resolve faster when users can quote an ID rather than describe symptoms.

**Recoverable vs non-recoverable:** Network errors and 5xx errors are recoverable with a retry. 404 and 403 are not — retrying a 403 will not grant permission. The UI must reflect this distinction: retryable errors show a Retry Button; non-retryable errors show navigation away from the error.

**Offline queue:** Studios that allow offline actions (ZugaLife habit logging, ZugaTrader alert creation) must implement an offline queue with local persistence. The network error banner copy must honestly reflect whether the action was queued ("saved locally") or lost ("couldn't be saved — please retry when online").
