# That's Cool

A compact, dependency-free landing page for the That's Cool studio and its launched products. The studio mark sits center-stage on a warm-paper field with a quiet dot grid and photocopy grain; product stickers and the Cool Guy die-cut sticker are scattered around it, all draggable. Tiny mono edge notes pin the corners — one of them rotates through sassy studio one-liners.

## Run locally

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173`.

## Design system (canon)

The canonical That's Cool design system lives in the Claude Design project
[That's Cool — Design System](https://claude.ai/design/p/84b8a5a6-fcdd-4ec3-925d-face9f1f2c42) (tokens, components, guidelines, and the `ui_kits/studio` landing-page kit this page implements). Where anything in this repo disagrees with that project, the design project wins. The load-bearing rules:

- **Color**: landing uses warm paper `#f6f2e8`, ink `#0a0a0a`, and one loud green `#11ed32`. **Sticker wall rule** — studio level is ink + paper + that green ONLY; each product picks its own loud pair (STRIDE owns electric blue `#315cff` + hot pink `#ff2e88`).
- **Studio green is one green**: `#11ed32` wherever the That's Cool mark appears. (The old `#18df3d` on the STRIDE page was an inconsistency, now unified.)
- **Type**: the landing page deliberately uses unfussy system faces — Arial for text, Courier New for mono labels. Product pages use Inter 900 headlines (line-height 0.84) + DM Mono labels.
- **Texture**: 20px dot grid at 9% ink plus a subtle SVG-noise grain, kept quiet — zine, not Swiss.
- **Shadows**: hard offset shadows, never soft for chrome. Logos get a colored drop-shadow (green offset + a soft dark blur underneath).
- **Rotation**: nearly everything important is slightly rotated (−6° to 7°); stickers wobble toward level and lift 5px on hover, and are draggable. No tape on the landing wall — taped things don't drag.
- **No rounded corners** on chrome, except the 999px pill on the skip-link. (Blurred decorative glows, like the ellipse behind the logo, aren't chrome.)
- **Edge notes carry the attitude**: ALL-CAPS mono, slash-numbered sections (`STUDIO / 03`), and rotating sass lines ("NO BUSINESS MODEL, NO PROBLEM").
- **No icon system**: arrows are Unicode text (`←`, `↗`, `→`, `↻`, `✓`) set in mono.

## Assets

The supplied logo is preserved in `assets/thatscool-source.png`; `assets/thatscool-logo.png` is the background-removed web asset.

The supplied `assets/coolguy.png` is the canonical Cool Guy artwork. `assets/coolguy-sticker.png` is the die-cut sticker version generated from it (white cut border + green edge) — use the sticker version on pages, since the source PNG has a baked white background. The optimized favicon lives at `assets/coolguy-favicon.png`.

The product stickers are standalone SVG assets:

- `assets/stride-work-in-stride.svg`
- `assets/longish-attitude-sticker.svg`

Each sticker can be dragged with a pointer or moved with the arrow keys. Press `Escape` to return a focused sticker to its original position. Clicking Cool Guy pops a comic speech bubble that follows him around.

## Cool Guy usage

Cool Guy is a signature, not a header. On the landing page he is one of the scattered draggable stickers with the click-bubble. On product pages he sits static in the bottom-left corner, feet cropped by the viewport edge, same click-bubble. Never next to the logotype at full size, never in a product page's middle, never as a pattern.

## Product pages

`stride/` is the first product detail page and establishes the shared narrative architecture for future That's Cool launches:

1. Above the fold: the product name, one memorable logline, and one visual gesture.
2. State the big idea in a single, oversized beat.
3. Explain the main things the product does with short, concrete copy.
4. Say what is real now rather than presenting a speculative roadmap.
5. End with a direct open-source contribution and code path.

Every product page closes with the core "Built by That's Cool" sticker. Product-specific concepts should appear only where they make the product easier to understand; avoid adding a glossary to compensate for unclear positioning.

## Identity architecture

That's Cool is the lab, maker, and endorser. Its products are sovereign identities rather than color-swapped expressions of one house theme. They share choreography and standards—not appearance.

- **That's Cool owns the edges:** the back/source rail, blunt editorial voice, accessibility baseline, open-source path, physical sticker behavior, the Cool Guy corner sticker, and maker endorsement.
- **Each product owns the middle:** its wordmark, palette, display typography, visual metaphors, and product-shaped proof objects.
- **The homepage stickers are canonical launch badges:** recognizable shorthand for social images, READMEs, merch, and the hub, derived from identities that can work without a sticker outline.
- **Shared narrative, product-specific composition:** name and logline, big idea, capabilities, proof, open path, maker signature. The sequence may recur; the layout should not.
- **Internal systems remain subordinate:** AmbientMind belongs inside STRIDE's identity. Implementations can say "Built on STRIDE" without becoming peer brands.

For STRIDE, electric blue `#315cff` means connected intelligence, off-white and black form the operating field, and hot pink `#ff2e88` marks completed or retained memory. Its signature devices are loops, provenance, operating-system structures, and memory receipts. Future products should build their own worlds from their product concepts rather than borrowing these devices.
