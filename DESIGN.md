---
name: Artisanal Market Guide
colors:
  surface: '#fdf9f4'
  surface-dim: '#ddd9d5'
  surface-bright: '#fdf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3ee'
  surface-container: '#f1ede8'
  surface-container-high: '#ebe8e3'
  surface-container-highest: '#e6e2dd'
  on-surface: '#1c1c19'
  on-surface-variant: '#55433d'
  inverse-surface: '#31302d'
  inverse-on-surface: '#f4f0eb'
  outline: '#88726c'
  outline-variant: '#dbc1b9'
  surface-tint: '#984629'
  primary: '#954427'
  on-primary: '#ffffff'
  primary-container: '#b45c3d'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb59c'
  secondary: '#566246'
  on-secondary: '#ffffff'
  secondary-container: '#dae8c4'
  on-secondary-container: '#5c684c'
  tertiary: '#7b5500'
  on-tertiary: '#ffffff'
  tertiary-container: '#9b6c00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcf'
  primary-fixed-dim: '#ffb59c'
  on-primary-fixed: '#390c00'
  on-primary-fixed-variant: '#793014'
  secondary-fixed: '#dae8c4'
  secondary-fixed-dim: '#becba9'
  on-secondary-fixed: '#141f08'
  on-secondary-fixed-variant: '#3f4b30'
  tertiary-fixed: '#ffdeac'
  tertiary-fixed-dim: '#f9bc50'
  on-tertiary-fixed: '#281900'
  on-tertiary-fixed-variant: '#5f4100'
  background: '#fdf9f4'
  on-background: '#1c1c19'
  surface-variant: '#e6e2dd'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 64px
---

## Brand & Style
The design system is built on the concept of "The Digital Linen Tote"—it is functional, durable, yet possesses a tactile, human quality. It aims to evoke the sensory experience of a Milanese street market: the smell of fresh produce, the feel of weathered wood, and the charm of hand-painted signage.

The visual style is **Minimalist with a Playful Organic twist**. By stripping away corporate gloss and high-tech gradients, the UI prioritizes warmth and approachability. It targets a multi-generational audience, from young treasure hunters at flea markets to elderly residents buying daily groceries. The emotional response should be one of "effortless discovery"—simple enough to be invisible, yet charming enough to feel curated.

## Colors
The palette is rooted in an organic, "second-hand" aesthetic. The foundation is **Warm Cream**, which acts as a softer, more paper-like alternative to stark white. **Terracotta** serves as the primary action color, providing a sun-baked, earthen energy. 

**Sage** is used for secondary elements and success states, grounding the UI in nature. **Mustard Yellow** and **Faded Denim** are utilized sparingly for vintage-inspired accents, such as category tags or highlights. Text is rendered in a deep, desaturated charcoal-green rather than pure black to maintain a softer contrast that is easier on the eyes during outdoor use.

## Typography
This design system utilizes **Manrope** exclusively to ensure a balance between modern geometric clarity and a friendly, open personality. The typeface was chosen for its high x-height and excellent legibility, making it accessible for users of all ages navigating busy markets.

Headlines use a tighter letter-spacing and heavier weights to mimic the impact of vintage poster blocks. Body text remains airy and spacious, ensuring that long descriptions of market history or vendor lists are comfortable to read. All typography is "optically balanced," meaning the weights feel consistent even as the scale shifts from desktop to mobile.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a heavy emphasis on generous "safe margins" to maintain a minimal, uncluttered feel. On desktop, a 12-column grid is used with wide gutters to allow content to breathe. On mobile, this collapses to a single column with a 20px side margin to prevent the UI from feeling cramped.

The spacing rhythm is based on an 8px baseline. Large vertical gaps (48px to 80px) are used between major sections to reinforce the "hand-curated" editorial feel, rather than a dense, data-heavy dashboard.

## Elevation & Depth
Depth is achieved through **Tonal Layers** rather than realistic shadows. Surfaces do not "float" in a virtual space; instead, they sit atop one another like sheets of paper or fabric. 

High-priority elements use subtle, low-opacity tints of the background color (e.g., a Sage-tinted container on a Cream background) to create hierarchy. When shadows are necessary for functional clarity (like a sticky navigation bar), they are extremely soft, extra-diffused, and use a warm Terracotta-tinted shadow color instead of grey, maintaining the organic warmth of the design system.

## Shapes
The shape language is defined by **Soft, Rounded Corners**. There are no sharp points in the interface, reinforcing the friendly and approachable brand personality. 

A standard radius of 0.5rem (8px) is applied to cards and inputs, while buttons and tags use larger, more pill-like radii (1.5rem) to make them feel "touchable" and distinct from structural containers. This softening of the geometry helps the UI feel less like a "technical tool" and more like a physical companion guide.

## Components
- **Buttons:** Use a solid Terracotta fill for primary actions with bold, centered Manrope labels. Secondary buttons use a Sage outline with no fill. Interaction states involve a slight "press-in" scale effect rather than a color change, emphasizing the tactile nature.
- **Cards:** Market vendor cards should have a thin, low-contrast border in a darker shade of Cream. They should feature generous internal padding (24px) to keep photography and text distinct.
- **Chips & Tags:** Use the vintage accent colors (Mustard, Denim) with a full pill radius. These are used for categories like "Organic," "Antique," or "Street Food."
- **Input Fields:** These are styled with a soft background color (a 5% darker Cream) and a subtle bottom-border. Labels should always be visible above the field in a medium weight.
- **Lists:** Market listings should be separated by thin, dashed lines that evoke the feel of a perforated notebook page or a receipt.
- **Checkboxes/Radios:** These should be slightly oversized (24px) to ensure they are easy to toggle while walking through a crowded market.