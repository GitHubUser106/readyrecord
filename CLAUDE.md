# ReadyRecord — Project Rules

## Architecture
- Next.js 15 App Router, TypeScript strict mode
- All data in localStorage, NEVER send to any server
- Zero external API calls from the client (no analytics, no tracking)

## Design
- Minimum 18px body text, 24px+ for section headers
- All interactive elements minimum 44px touch target
- Color contrast must pass WCAG AAA
- No animations that could cause motion sickness
- Every form field gets a visible label (no placeholder-only)

## Form Behavior
- Auto-save to localStorage on every field blur
- "Add row" button for repeatable sections (debts, accounts, etc.)
- Tab key moves between fields naturally
- Currency fields: CAD, two decimal places, comma separators
- Phone fields: accept any format, display as (XXX) XXX-XXXX
- SIN fields: mask after entry, show as XXX-XXX-XXX

## Testing
- Test with browser zoom at 150% and 200%
- Test with system font size set to "large"
- Keyboard-only navigation must work for every action
- Screen reader: all form fields must have aria-labels

## Privacy
- No cookies, no analytics, no tracking pixels
- No data leaves the browser
- "Clear All Data" button must be prominent and require confirmation
- Privacy page must clearly state: "Your data never leaves your device"

## PDF
- Generate client-side only (jsPDF or similar)
- Include date, name, page numbers
- Mask sensitive fields (SIN, card numbers) by default with option to show
