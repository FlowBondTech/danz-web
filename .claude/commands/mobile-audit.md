---
allowed-tools: [Read, Grep, Glob, Edit, Bash]
description: "Audit and fix mobile/accessibility UI issues in React components using Tailwind CSS"
---

# /mobile-audit - Mobile & Accessibility UI Audit

## Purpose
Scan React/Tailwind components for mobile UI anti-patterns that break at large accessibility text sizes, small viewports, or high zoom levels. Optionally auto-fix them.

## Usage
```
/mobile-audit [target] [--fix] [--report-only]
```

## Arguments
- `target` - File path, directory, or glob pattern to audit (defaults to current page or `app/` directory)
- `--fix` - Auto-apply fixes for detected issues
- `--report-only` - Only report findings, don't fix (default behavior)

## Anti-Patterns to Detect

### Critical (breaks layout at large text)

1. **Forced multi-column on mobile**
   - `grid-cols-2` / `grid-cols-3` / `grid-cols-4` without `grid-cols-1` base
   - Fix: Add `grid-cols-1 sm:grid-cols-2` (or appropriate breakpoint)

2. **Text overflow in flex rows**
   - `flex` + `justify-between` without `min-w-0` on text container
   - Fix: Add `min-w-0` to flex children containing text, `truncate` on text elements

3. **Fixed-size content elements**
   - `w-24 h-24`, `w-20 h-20` etc. on logos/avatars without responsive variants
   - Fix: Add responsive sizing like `w-16 h-16 sm:w-24 sm:h-24`

4. **Large text without responsive scaling**
   - `text-2xl`, `text-3xl`, `text-4xl` without smaller mobile variant
   - Fix: Add `text-xl sm:text-2xl` pattern

### Moderate (degrades experience)

5. **Icons without shrink-0 in flex**
   - Icon components inside `flex` layout without `shrink-0` or `flex-shrink-0`
   - Fix: Add `shrink-0` class or `className="shrink-0"` to icon wrapper

6. **Thin interactive/progress elements**
   - Progress bars with `h-1` or `h-1.5` (hard to see at high zoom)
   - Fix: Increase to `h-2` minimum

7. **Fixed padding without responsive variants**
   - `p-6`, `p-8` without `p-4 sm:p-6` pattern
   - Fix: Add responsive padding with smaller mobile value

8. **Full-width images on mobile**
   - Fixed `h-32` / `h-40` on image containers without responsive variant
   - Fix: Add `h-28 sm:h-32` pattern

### Low (polish)

9. **Touch target size**
   - Buttons/links with `py-1` or `py-1.5` (below 44px minimum)
   - Fix: Ensure minimum `py-2` or `py-2.5` on mobile

10. **Horizontal scroll tabs without short labels**
    - Tab labels that could be shortened on mobile with `sm:hidden` / `hidden sm:inline` pattern

## Execution Steps

1. **Discovery**: Glob for `.tsx` files in target path
2. **Scan**: For each file, grep for anti-patterns listed above
3. **Classify**: Group findings by severity (critical/moderate/low)
4. **Report**: Show findings with line numbers and suggested fixes
5. **Fix** (if `--fix`): Apply fixes using Edit tool, preserving existing responsive classes

## Fix Rules
- NEVER remove existing responsive classes, only add missing ones
- NEVER change desktop appearance, only improve mobile/small screen behavior
- Add `min-w-0` to flex children, not flex parents
- Add `shrink-0` to icons and fixed-size elements, not text
- Use the project's existing breakpoint pattern (mobile-first: base -> `sm:` -> `lg:`)
- Preserve all existing Tailwind class ordering conventions

## Grep Patterns for Detection
```
# Forced multi-column (no grid-cols-1 base)
"grid grid-cols-[2-4]" without nearby "grid-cols-1"

# Text overflow risk
"flex.*justify-between" in same component without "min-w-0"

# Fixed dimensions on content
"(w|h)-(16|20|24|28|32)" without "(sm|md|lg):(w|h)-"

# Large unresponsive text
"text-(2xl|3xl|4xl)" without "(sm|md|lg):text-"

# Missing shrink on icons in flex
Fi[A-Z] or icon component in flex parent without "shrink-0"

# Thin bars
"h-1 " or "h-1.5 " on progress/bar elements

# Fixed padding
" p-(6|8) " without "sm:p-" or "p-4 sm:p-"
```

## Output Format
```
## Mobile Audit: [filename]

### Critical
- Line XX: `grid-cols-2` forced on mobile -> suggest `grid-cols-1 sm:grid-cols-2`
- Line XX: text overflow risk in flex row -> add `min-w-0` to text container

### Moderate
- Line XX: icon missing `shrink-0` in flex layout

### Low
- Line XX: button touch target `py-1.5` -> suggest `py-2.5 sm:py-1.5`

**Summary**: X critical, Y moderate, Z low issues found
```
