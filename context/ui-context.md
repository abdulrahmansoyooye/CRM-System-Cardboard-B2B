# UI Context

## Purpose

This document defines the visual language, design system, layout principles, component standards, accessibility requirements, and UI implementation rules for the entire application.

Every UI implementation must follow this document.

Consistency is more important than creativity.

Never introduce a new visual pattern when an existing one satisfies the requirement.

---

# Design Philosophy

The website should communicate:

* Professionalism
* Reliability
* Industrial expertise
* Precision
* Quality manufacturing
* Corporate trust
* Modern engineering

The visual style should feel like a premium industrial company rather than a generic template or startup landing page.

Design priorities:

* Clean
* Spacious
* Structured
* Consistent
* Accessible
* Fast
* Mobile-first

---

# Theme

The application uses a **light-first corporate theme**.

Dark mode is not included in the current project scope.

Large white surfaces are balanced with light-gray sections to improve readability and create visual hierarchy.

Accent colors should be used sparingly to emphasize calls to action and interactive elements.

---

# Color System

All colors must be defined using CSS Custom Properties.

Hardcoded color values are prohibited inside components.

## CSS Variables

| Role                 | CSS Variable         | Value     |
| -------------------- | -------------------- | --------- |
| Primary Background   | `--bg-base`          | `#FFFFFF` |
| Secondary Background | `--bg-surface`       | `#F8FAFC` |
| Elevated Surface     | `--bg-card`          | `#FFFFFF` |
| Primary Text         | `--text-primary`     | `#1E293B` |
| Secondary Text       | `--text-secondary`   | `#475569` |
| Muted Text           | `--text-muted`       | `#64748B` |
| Heading Text         | `--text-heading`     | `#0F172A` |
| Primary Brand        | `--accent-primary`   | `#0F4C81` |
| Primary Hover        | `--accent-hover`     | `#0B3A63` |
| Secondary Accent     | `--accent-secondary` | `#F97316` |
| Success              | `--state-success`    | `#16A34A` |
| Warning              | `--state-warning`    | `#F59E0B` |
| Error                | `--state-error`      | `#DC2626` |
| Border               | `--border-default`   | `#E2E8F0` |
| Divider              | `--border-light`     | `#CBD5E1` |
| Focus Ring           | `--focus-ring`       | `#2563EB` |

---

# Brand Identity

Primary Brand Color

Industrial Blue

Used for:

* Navigation
* Buttons
* Links
* Primary CTAs
* Highlights

Secondary Brand Color

Industrial Orange

Used for:

* Request Quote buttons
* Active states
* Highlights
* Statistics
* Promotional sections

Avoid excessive orange usage.

Blue should remain the dominant brand color.

---

# Typography

## Primary Font

| Role      | Font           | Variable      |
| --------- | -------------- | ------------- |
| UI Text   | Inter          | `--font-sans` |
| Monospace | JetBrains Mono | `--font-mono` |

---

## Heading Scale

H1

* 48–60px
* Bold
* Tight line-height

H2

* 36–42px
* Bold

H3

* 28–32px
* Semi-bold

H4

* 24px

H5

* 20px

Body

* 16px

Small Text

* 14px

Captions

* 12px

---

# Spacing System

Use an 8-point spacing system.

Allowed spacing values:

* 4px
* 8px
* 16px
* 24px
* 32px
* 40px
* 48px
* 64px
* 80px
* 96px
* 120px

Avoid arbitrary spacing values.

---

# Border Radius

| Context  | Tailwind       |
| -------- | -------------- |
| Buttons  | `rounded-md`   |
| Inputs   | `rounded-md`   |
| Cards    | `rounded-xl`   |
| Sections | `rounded-2xl`  |
| Dialogs  | `rounded-2xl`  |
| Images   | `rounded-xl`   |
| Badges   | `rounded-full` |

Maintain consistency across the application.

---

# Shadows

Use subtle elevation.

Levels:

Small

`shadow-sm`

Medium

`shadow-md`

Large

`shadow-lg`

Avoid dramatic shadows.

---

# Component Library

The project uses:

* Tailwind CSS
* shadcn/ui
* Radix UI

Shared UI components live inside:

```text
/components/ui
```

Feature-specific components live inside:

```text
/features/{feature}/components
```

Never duplicate existing UI components.

Use the shadcn CLI when introducing new primitives.

---

# Button Standards

Primary

* Blue background
* White text

Secondary

* White background
* Blue border

Outline

* Transparent
* Border only

Ghost

* Transparent background

Danger

* Red

Buttons should support:

* Hover
* Focus
* Active
* Disabled
* Loading states

---

# Card Design

Cards should include:

* White background
* Rounded corners
* Light border
* Subtle shadow
* Comfortable padding
* Clear hierarchy

Avoid cluttered layouts.

---

# Form Design

Every form should include:

* Labels
* Placeholder text where appropriate
* Validation messages
* Accessible error states
* Loading state
* Success feedback

Forms must support keyboard navigation.

---

# Layout Patterns

## Public Website

```
Header
Hero
Content Sections
CTA
Footer
```

---

## Admin Dashboard

```
Sidebar
Top Navigation
Page Header
Content Area
Footer
```

---

## Product Listing

```
Hero Banner

Filters

Grid

Pagination
```

---

## Product Details

```
Gallery

Information

Specifications

CTA

Related Products
```

---

## Blog

```
Search

Categories

Blog Grid

Pagination
```

---

## Contact Page

```
Contact Information

Map

Inquiry Form
```

---

# Grid System

Mobile

1 column

Tablet

2 columns

Desktop

3–4 columns

Large Desktop

4–5 columns where appropriate

---

# Responsive Strategy

Design mobile first.

Breakpoints:

* Mobile
* Tablet
* Laptop
* Desktop
* Wide Screen

Avoid horizontal scrolling.

---

# Navigation

Desktop

Sticky top navigation.

Dropdown mega menu for Products.

Highlighted Request Quote button.

Mobile

Hamburger menu.

Collapsible navigation.

Large touch targets.

---

# Icons

Use:

Lucide React

Rules:

* Stroke icons only
* Consistent stroke width
* Avoid filled icons

Sizes:

Inline

```
h-4 w-4
```

Buttons

```
h-5 w-5
```

Feature Icons

```
h-8 w-8
```

Hero Icons

```
h-12 w-12
```

---

# Images

Every image should:

* Use the Next.js Image component
* Include descriptive alt text
* Be lazy-loaded where appropriate
* Maintain aspect ratio
* Be optimized for performance

Avoid layout shifts.

---

# Animation Guidelines

Animations should be subtle.

Allowed:

* Fade
* Scale
* Slide
* Hover elevation
* Button transitions

Avoid:

* Flashing
* Excessive bouncing
* Long animations
* Distracting motion

Respect `prefers-reduced-motion`.

---

# Accessibility Standards

Every UI component must support:

* Keyboard navigation
* Visible focus indicators
* Semantic HTML
* Proper heading hierarchy
* Screen reader compatibility
* Accessible labels
* WCAG AA color contrast

Accessibility is mandatory.

---

# SEO Considerations

Every public page should include:

* One H1
* Logical heading hierarchy
* Semantic HTML
* Crawlable content
* Optimized images
* Metadata support

---

# UI Invariants

The following rules must never be violated:

1. Never hardcode colors inside components.
2. Never create duplicate UI components.
3. Always reuse shared design tokens.
4. Every page must be fully responsive.
5. Every interactive element must include hover, focus, and disabled states.
6. Every image must include meaningful alt text.
7. Forms must provide validation feedback.
8. Components must remain accessible.
9. Typography, spacing, and layout must follow the defined design system.
10. New UI patterns require updates to this document before implementation.

---

# Definition of Done (UI)

A UI implementation is complete only when:

* Responsive across all supported breakpoints.
* Consistent with the design system.
* Uses shared components where applicable.
* Meets accessibility requirements.
* Passes visual review.
* Avoids layout shifts.
* Maintains performance.
* Requires no hardcoded design values.
* Preserves a professional industrial corporate appearance.
