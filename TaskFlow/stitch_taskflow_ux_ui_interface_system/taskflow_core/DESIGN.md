---
name: TaskFlow Core
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006398'
  on-secondary: '#ffffff'
  secondary-container: '#5bb8fe'
  on-secondary-container: '#00476e'
  tertiary: '#006329'
  on-tertiary: '#ffffff'
  tertiary-container: '#007f36'
  on-tertiary-container: '#c7ffca'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#7ffc97'
  tertiary-fixed-dim: '#62df7d'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#005320'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: '0'
  body-lg:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1.125rem
    letterSpacing: '0'
  label-lg:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: 0.875rem
    letterSpacing: 0.03em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-md: 1.5rem
  gutter-lg: 2rem
  margin: 1rem
  margin-md: 1.5rem
  margin-lg: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

The design system is architected around the principles of radical usability, cognitive clarity, and strict adherence to Nielsen's 10 Usability Heuristics. Tailored for knowledge workers, product teams, and individuals managing high-density personal workloads, the system eliminates visual noise to prioritize task execution and state recognition.

The visual expression blends **Corporate / Modern** precision with **Functional Minimalism**:
- **Visibility of System Status:** Explicit visual, textual, and iconographic indicators communicate system and task progress instantly.
- **Match Between System and Real World:** Workflows mimic natural task triage (inbox, active context, archival) using plain language.
- **Recognition Rather Than Recall:** Interactive options, contextual actions, and keyboard short-cuts remain persistently discoverable without cognitive strain.
- **Error Prevention & Recovery:** Destructive actions demand confirmation modals or provide immediate undo toasts; form fields surface clear inline constraints.
- **Aesthetic and Minimalist Design:** No gratuitous decoration, excessive shadows, or decorative gradients. Visual weight strictly correlates with operational priority.

## Colors

The color palette is engineered for WCAG AA/AAA compliance across all interface surfaces. Semantic states are strictly paired with iconography and text labels to avoid color-only information encoding.

### Palette Architecture
- **Primary / Action (`#2563EB`):** High-contrast Royal Indigo for primary CTAs, active selections, and interactive focus indicators.
- **Secondary / Progress (`#0284C7`):** Corporate Sky Blue denoting active, in-flight work ("Em Andamento").
- **Tertiary / Success (`#16A34A`):** Accessible Emerald Green for completed tasks, resolved states, and confirmation cues.
- **Neutral / Boundary (`#64748B`):** Muted Slate for secondary actions, standard metadata, structural icons, and unstarted items ("A Fazer").

### Semantic & Feedback Tones
- **Critical / Overdue (`#DC2626`):** High-contrast deep red used for overdue deadlines and destructive prompts.
- **Priority High (`#E11D48`):** Crimson rose reserved for immediate-attention tags.
- **Priority Medium (`#D97706`):** Warm amber for moderate-urgency tasks.
- **Priority Low (`#475569`):** Deep slate grey for low-urgency tasks.

### Surface Hierarchy
- **Canvas Base:** `#F8FAFC` (Slate 50) establishes a soft, glare-free working background.
- **Card & Modal Surface:** `#FFFFFF` (Pure White) isolates interactive items and data groupings.
- **Dividers & Borders:** `#E2E8F0` (Slate 200) for standard card borders; `#CBD5E1` (Slate 300) for hover states and focused input boundaries.

## Typography

The typographic system utilizes **Inter** across all roles to maximize legibility at small sizes and high information densities. Proportional vertical rhythm is maintained with an 8px base grid baseline.

- **Headlines:** Reserved for structural navigation, view headers, and board column titles. Negative letter-spacing tightens display scale on desktop layouts.
- **Body:** Built for scanning. `body-md` is the primary interface standard for task titles, item descriptions, and user notes.
- **Labels:** Rendered in medium and semi-bold weights for badge indicators, table column headers, timestamps, and input hints.
- **Fallback Stack:** `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`.

## Layout & Spacing

The layout is grounded in a strict 4px/8px incremental grid. All touch targets must adhere to a minimum dimension of 44x44px (`min-height: 2.75rem`).

### Grid & Canvas Structure
- **Desktop (1024px+):** Fluid 12-column grid with a fixed collapsible left navigation drawer (256px). Gutter: `gutter-lg` (`2rem`). Page Margins: `margin-lg` (`2.5rem`).
- **Tablet (768px – 1023px):** Fluid 8-column layout. Gutter: `gutter-md` (`1.5rem`). Page Margins: `margin-md` (`1.5rem`). Sidebar collapses to an off-canvas drawer or icon rail (64px).
- **Mobile (<768px):** Single-column stacked layout. Gutter: `gutter` (`1rem`). Outer Margin: `margin` (`1rem`). Bottom navigation bar hosts primary destinations.

### Internal Spacing Rhythm
- `space-xs` (4px): Micro gaps between icons and adjacent copy, or internal padding for miniature status pills.
- `space-sm` (8px): Distance between compact list items, chip margins, and multi-input row gaps.
- `space-md` (16px): Standard padding within task cards, modal bodies, and input field interiors.
- `space-lg` (24px): Card stack separations, list group breaks, and view sub-sections.
- `space-xl` (32px): Primary section demarcations and container paddings.

## Elevation & Depth

In line with functional minimalism and usability best practices, spatial hierarchy relies on tonal layering and low-contrast outlines rather than deep or dramatic drop-shadows.

### Layering Rules
- **Base Canvas (Level 0):** Hex `#F8FAFC`. Houses background boards, list columns, and structural canvas frames. Flat, zero elevation.
- **Card & Container Layer (Level 1):** Hex `#FFFFFF` with a 1px solid `#E2E8F0` border. Shadow is ambient and subtle: `0 1px 3px 0 rgba(15, 23, 42, 0.05)`.
- **Active / Dragged Elements (Level 2):** Elevated cards in drag-and-drop boards receive an increased ambient shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)` and border tone `#CBD5E1`.
- **Flyouts & Dropdowns (Level 3):** Context menus, date-pickers, and action sheets use `0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)` with a 1px border (`#E2E8F0`).
- **Overlays & Modals (Level 4):** Centered view overlays set against a 40% opacity backdrop (`rgba(15, 23, 42, 0.4)`), bounded by a subtle outline and `0 20px 25px -5px rgba(15, 23, 42, 0.1)`.

## Shapes

The design system uses a **Soft** corner language (`roundedness: 1`), conveying order, discipline, and architectural clarity.

### Implementation Tokens
- **Base Radius (`0.25rem` / 4px):** Applied to badges, table cell markers, check-boxes, radio frames, and segmented controls.
- **Medium / Large Radius (`rounded-lg: 0.5rem` / 8px):** Standard for cards, input containers, action buttons, flyout menus, and status chips.
- **Extra Large Radius (`rounded-xl: 0.75rem` / 12px):** Reserved for dialog modals and drawer containers.
- **Pill Exceptions (`9999px`):** Avatar thumbnails, circular counter badges, and standalone quick-add action triggers only.

## Components

### Buttons
- **Primary:** Filled `#2563EB`, text `#FFFFFF`, radius `0.5rem`, minimum height `2.75rem` (44px), horizontal padding `1.25rem`. Hover state transitions to `#1D4ED8`. Focus state uses an accessible 2px offset ring (`ring-2 ring-offset-2 ring-blue-600`).
- **Secondary:** Surface `#FFFFFF`, border 1px solid `#CBD5E1`, text `#334155`. Hover shifts to `#F1F5F9`.
- **Destructive:** Surface `#DC2626`, text `#FFFFFF`. Hover `#B91C1C`.
- **Ghost:** Transparent background, text `#475569`, hover `#F1F5F9`.

### Chips & Status Badges
- Chips must always pair an explicit text label with an identifiable iconography token (e.g., Check icon for Completed, Clock icon for In-Progress, Alert Triangle icon for Overdue).
- **Backgrounds:** Tinted pastel variant (e.g., `#FEF2F2` for High Priority/Critical, `#F0FDF4` for Completed, `#F0F9FF` for In-Progress).
- **Borders & Text:** 1px matching solid border and high-contrast saturated text (minimum 4.5:1 ratio against chip tint).

### Task Cards
- Pure white background (`#FFFFFF`), enclosed in 1px solid `#E2E8F0`.
- Internal padding is strictly `1rem` (`space-md`).
- Hover shifts border color to `#CBD5E1`.
- Task rows feature persistent drag handles for keyboard/mouse reordering and prominent check target areas (minimum 44x44px click zone).

### Form Inputs & Selects
- 1px border `#CBD5E1` with background `#FFFFFF`. Height `2.75rem` (44px) to guarantee mobile accessibility.
- Label sits directly above input (`label-lg`), with helper text or error feedback positioned below (`body-sm`).
- Active focus state: border `#2563EB` paired with an external 2px focus ring (`rgba(37, 99, 235, 0.2)`).

### Checkboxes & Radios
- Size `1.25rem` (20px) centered within an invisible `2.75rem` (44px) tap target.
- Rounded corner for checkboxes (`0.25rem`); fully circular for radios.
- Unchecked: 1.5px border `#94A3B8`, background `#FFFFFF`.
- Checked: Background `#2563EB`, border `#2563EB`, with an interior white checkmark / inner dot. Completed task states strike through parent card copy and attenuate title opacity to 60%.

### Empty States & Confirmations
- Empty board/list states must present an informative icon, clear descriptive context explaining the absence of items, and a single, unambiguous primary CTA to create the first record (preventing user disorientation).
- Destructive workflows enforce an explicit, two-step confirmation dialog with descriptive button labels (e.g., "Excluir Tarefa" instead of a vague "OK").