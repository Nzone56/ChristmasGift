# Fonts Setup

This directory should contain the Alegreya font files for the Baldur's Gate 3 theme.

## Required Files

### Alegreya Font Family

Place the following font files in `/public/fonts/`:

1. **Alegreya-Regular.ttf**
   - Weight: 400 (Regular)
   - Used for: Body text in Baldur's Gate 3 theme

2. **Alegreya-Bold.ttf**
   - Weight: 700 (Bold)
   - Used for: Headings and emphasis in Baldur's Gate 3 theme

## Font Sources

You can download Alegreya from:

- [Google Fonts](https://fonts.google.com/specimen/Alegreya)
- Direct download from the font repository

## Installation

1. Download the Alegreya font family
2. Extract the TTF files
3. Place `Alegreya-Regular.ttf` and `Alegreya-Bold.ttf` in this directory
4. The fonts will be automatically loaded via `@font-face` in `global.css`

## Font Usage

- **Clair Obscur: Expedition 33**: Uses Cinzel (loaded from Google Fonts)
- **Baldur's Gate 3**: Uses Alegreya (loaded from local files)
  - All text rendered in UPPERCASE for visual impact
- **Neutral Theme**: Uses system fonts (no custom fonts)

## Notes

- Alegreya is a serif font designed for long-form reading
- The uppercase styling for BG3 is applied via CSS `text-transform`
- Font files should be in TTF format for best compatibility
