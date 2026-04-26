---
name: Settings
summary: User and studio settings panel pattern with a sticky save bar, section tabs, and destructive-action confirmation.
components:
  - Tabs
  - Input
  - Select
  - Button
  - Card
  - Toast
  - Checkbox
flow:
  - "Step 1: Render settings page; Tabs navigate between sections (Profile, Notifications, Privacy, Billing, Danger Zone)"
  - "Step 2: Each panel loads current values into form fields from the API; fields start clean"
  - "Step 3: User edits any field; sticky save bar animates in at page bottom with Save and Discard buttons"
  - "Step 4: Save Button triggers validation; on failure, error appears inline on the offending field"
  - "Step 5: On valid submit, Button shifts to loading state; patch request fires"
  - "Step 6: On success, save bar disappears; Toast announces 'Settings saved'"
  - "Step 7: On server error, save bar stays; Toast announces the failure with a retry option"
  - "Step 8: Destructive actions (delete account, revoke all sessions) require a confirmation Modal before firing"
a11y: Tab panels announced via aria-selected and aria-controls; unsaved change state announced via an aria-live polite region when the save bar appears; destructive actions require explicit confirmation to prevent accidental irreversible operations.
---

# Settings

## When to use

The Settings pattern is the canonical surface for any preference, configuration, or account management action. Every Zuga studio has a settings route. The pattern applies at both the user level (cross-studio account preferences) and the studio level (per-studio configuration).

ZugaLife uses it for notification frequency, privacy controls, and wellness goal targets. ZugaTrader uses it for risk-level defaults and API key management. The pattern is the same shell — the sections and fields inside differ per studio.

## Visual / structural anatomy

```
┌─────────────────────────────────────────────────────┐
│  Settings                                           │  ← Page heading
│                                                     │
│  [Profile] [Notifications] [Privacy] [Billing]      │  ← Tabs
│            [Danger Zone]                            │
│  ─────────────────────────────────────────────────  │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │  Card (active Tab panel content)             │   │
│  │                                              │   │
│  │  Label: Display name                         │   │
│  │  ┌──────────────────────────────────────┐    │   │
│  │  │ Antonio Delgado                      │    │   │
│  │  └──────────────────────────────────────┘    │   │
│  │                                              │   │
│  │  Label: Timezone                             │   │
│  │  ┌──────────────────────────────────────┐    │   │
│  │  │ America/New_York                   ▼ │    │   │
│  │  └──────────────────────────────────────┘    │   │
│  └──────────────────────────────────────────────┘   │
│                                                     │
│  ╔═════════════════════════════════════════════════╗ │
│  ║  Unsaved changes           [Discard] [Save]    ║ │  ← Sticky save bar (appears on dirty)
│  ╚═════════════════════════════════════════════════╝ │
└─────────────────────────────────────────────────────┘
```

The sticky save bar is fixed to the viewport bottom. It uses a border-top and slight shadow to separate from page content. It only exists in the DOM while there are unsaved changes — it is removed (not just hidden) on clean state so it does not occupy accessible tab space.

## Components used

- [Tabs](../11-components/tabs.md) — top-level section navigation. Each Tab maps to one panel: Profile, Notifications, Privacy, Billing, Danger Zone. Tab state is local to the settings page — deep-linking to a tab via URL hash is recommended.
- [Input](../11-components/input.md) — text, email, number, and password fields inside each panel.
- [Select](../11-components/select.md) — dropdowns for options with bounded value sets (timezone, language, notification cadence).
- [Button](../11-components/button.md) — primary "Save" in the sticky bar; secondary "Discard"; danger "Delete account" in Danger Zone.
- [Card](../11-components/card.md) — wraps each panel's form fields to give a contained white surface inside the settings layout.
- [Toast](../11-components/toast.md) — success and failure feedback after save. Success Toast is dismissible; failure Toast includes a retry action link.
- [Checkbox](../11-components/checkbox.md) — binary preference toggles (email notifications on/off, marketing emails, etc.).

## Flow

1. Page mounts. Active Tab is Profile by default (or last-visited if persisted). Tab panel loads field values from the API.
2. All fields render with current values. Dirty state is `false`. Sticky save bar is not in the DOM.
3. User modifies any field. Dirty state flips to `true`. Sticky save bar animates into the viewport from the bottom. An `aria-live="polite"` region announces "You have unsaved changes."
4. User clicks "Discard": all fields reset to their last-loaded values. Dirty state → `false`. Save bar is removed from the DOM. No Toast.
5. User clicks "Save":
   - Client-side validation runs. Inline errors appear on offending fields; focus moves to the first invalid field.
   - If validation passes: Save Button shifts to loading variant. PATCH request fires.
   - On success: dirty state → `false`, save bar removed, success Toast: "Settings saved."
   - On server error: save bar stays, failure Toast: "Couldn't save settings. Try again." with a retry Button inline.
6. Switching Tab while dirty: a confirmation dialog asks "You have unsaved changes. Discard them?" before Tab switches. Use the browser-native `beforeunload` equivalent for in-app navigation (a Modal is cleaner than a browser prompt).
7. Danger Zone actions (delete account, revoke all active sessions) require a confirmation Modal with explicit typed confirmation ("Type DELETE to confirm") before the destructive API call fires.

## Accessibility

### Keyboard

- Tab key: moves through the Tab list, then through form fields in the active panel, then to the sticky save bar buttons.
- Arrow keys: move focus between Tab buttons within the Tab list (roving tabindex pattern — only the active Tab is in the tab sequence; Left/Right arrow moves between tabs).
- Escape: if a destructive-action Modal is open, Escape closes it and returns focus to the trigger Button.
- Enter on Save Button: submits the active panel's changes.

### Screen reader script

- **Tab list:** "Settings tabs. Profile, tab, selected, 1 of 5." Arrow to next: "Notifications, tab, 2 of 5."
- **Dirty state:** aria-live polite region fires "You have unsaved changes." when the save bar first appears.
- **Save loading:** Button label reads "Saving…, button" — label update is sufficient; no separate aria-live needed.
- **Save success:** Toast announces "Settings saved." Focus stays on the Save Button (now back to default label "Save").
- **Danger Zone confirm Modal:** "Delete account. Type DELETE to confirm. Edit text. Delete account, button. Cancel, button."

### Focus management

- Switching tabs: focus moves to the new panel's first interactive element (not the panel container heading).
- Opening a destructive Modal: focus moves into the Modal, trapped there. On close: focus returns to the trigger Button.
- After successful save: focus stays where it is (on the Save Button). No movement — the Toast handles the announcement.

### prefers-reduced-motion

The sticky save bar slide-up animation must be wrapped in `@media (prefers-reduced-motion: no-preference)`. Under reduced motion, the bar appears immediately without transition. Tab panel cross-fades (if any) are similarly gated.

## Don'ts

| ❌ Don't | Why |
|---|---|
| Auto-save on blur or change | Auto-save without explicit user intent is surprising, especially for Billing and Danger Zone sections. A dirty indicator plus explicit save is always safer. |
| Show a success Toast for each individual field save | Granular per-field saves fragment the UX. Save the whole panel and confirm once. |
| Put destructive actions outside Danger Zone | "Delete account" appearing in Profile or Billing trains users to ignore the danger variant. Grouping all destructive actions in one named section sets expectations. |
| Switch tabs without warning about unsaved changes | The user loses their edits silently. Intercept tab switches and prompt — or auto-draft the changes across tabs. |
| Disable Save without telling the user why | If the form is invalid, identify which field is wrong before or instead of disabling Submit. A disabled Save with no visible invalid state is a dead end. |
| Show the sticky save bar when the panel has no editable fields | Danger Zone and info-only panels should not trigger dirty state. Read-only panels are presentation, not forms. |

## Pattern-specific notes

**Section order:** Profile → Notifications → Privacy → Billing → Danger Zone. This order is deliberate: most frequent use (Profile) first, highest-stakes actions (Danger Zone) last. Do not reorder without a strong reason.

**Billing panel:** Never store or display full card numbers. Show masked card ending (e.g., "Visa ···· 4242"). The Billing panel surfaces plan, usage, and payment method management — it routes to the billing partner's hosted page for card updates, not an in-app card form.

**Danger Zone:** Every action in this section requires an explicit confirmation. "Revoke all sessions" is recoverable — warn and confirm. "Delete account" is not recoverable — require typed confirmation, then show a 30-second grace period countdown with an "Undo" button before actually deleting.

**Settings across studios:** User-level settings (display name, email, password, billing) are managed in ZugaApp core. Studio-specific settings (ZugaLife goal targets, ZugaTrader risk level) are managed within the studio. The settings pattern applies in both contexts with the same shell.
