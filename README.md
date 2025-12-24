# Christmas Gift Game Coupons 🎮

A mobile-first web application built with Astro and React, featuring immersive game-themed Christmas gift coupons for **Clair Obscur: Expedition 33** and **Baldur's Gate 3**. Access via QR code for a magical gifting experience.

## Features

- 🎄 Beautiful intro animations with GSAP
- 🎮 Two distinct game themes with unique aesthetics
- 🎵 Dynamic audio that changes with each theme
- 🎨 Adaptive color palettes and fonts per game
- ✨ Smooth flip animations on coupons
- 🔄 Seamless theme transitions with GSAP
- 📱 Mobile-first responsive design
- ⚛️ React components with TypeScript
- 🚀 Optimized for Vercel deployment

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:4321` (or the port shown in terminal) to view the application.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment

This project is configured for Vercel deployment. Simply connect your repository to Vercel and it will automatically deploy.

### QR Code Access

After deployment, generate a QR code pointing to your Vercel URL for easy mobile access.

## Game Themes

### 🗡️ Clair Obscur: Expedition 33

- **Font**: Cinzel (elegant serif)
- **Palette**: Deep charcoals, aged gold, rich purples, steel grays
- **Audio**: "Alicia" by Lorien Testard
- **Style**: Dark fantasy with chiaroscuro aesthetics

### 🎲 Baldur's Gate 3

- **Font**: Lora (classic serif)
- **Palette**: Burgundy, light wisteria, chalky gold, warm rust
- **Audio**: "Down by the River" by Borislav Slavov
- **Style**: High fantasy D&D adventure

## Tech Stack

- **Framework**: Astro 4.16
- **UI Library**: React 18
- **Styling**: Tailwind CSS + CSS Variables
- **Animations**: GSAP + CSS Keyframes
- **Language**: TypeScript
- **Audio**: HTML5 Audio API with GSAP
- **Deployment**: Vercel

## Project Structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/          # React components
│   │   ├── App.tsx          # Main app component
│   │   ├── Loader.tsx       # Intro animation loader
│   │   ├── GiftSelector.tsx # Gift selection logic
│   │   ├── TabSelector.tsx  # Tab switching UI
│   │   └── CouponCard.tsx   # Individual coupon card
│   ├── layouts/
│   │   └── Layout.astro     # Base HTML layout
│   ├── pages/
│   │   └── index.astro      # Entry point
│   ├── styles/
│   │   └── global.css       # Global styles
│   └── env.d.ts
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

## Component Architecture

The application is built with a clean separation of concerns:

- **App.tsx**: Main component with ThemeProvider wrapper
- **Loader.tsx**: Handles intro animations with GSAP (prevents double animations with useRef)
- **GiftSelector.tsx**: Manages tab state, theme switching, and coupon display
- **TabSelector.tsx**: Reusable tab UI component with theme-aware styling
- **CouponCard.tsx**: Reusable coupon card with flip animation and theme support
- **ThemeContext.tsx**: Context provider for theme state and audio management
- **themes.ts**: Theme configuration with colors, fonts, and content

## Setup Instructions

### 1. Add Audio Files

Place the following audio files in `/public/audio/`:

- `alicia.mp3` - "Alicia" by Lorien Testard (for Expedition 33)
- `down-by-the-river.mp3` - "Down by the River" by Borislav Slavov (for BG3)

See `/public/audio/README.md` for details.

### 2. Add Game Images

Place game artwork in `/public/images/`:

- `expedition33.jpg` - Clair Obscur: Expedition 33 artwork
- `baldursgate3.jpg` - Baldur's Gate 3 artwork

See `/public/images/README.md` for details.

### 3. Run the Application

```bash
npm run dev
```

For detailed setup instructions, see `SETUP.md`.

## Customization

### Modify Game Themes

Edit `src/config/themes.ts` to customize:

- Color palettes
- Fonts
- Audio paths
- Coupon content and instructions

### Adjust Theme Transitions

Edit `src/contexts/ThemeContext.tsx` to modify:

- Audio fade duration (default: 1.5s)
- Theme transition speed (default: 1s)
- Audio volume (default: 0.4)

### Update Animations

- **Intro animations**: Edit `src/components/Loader.tsx`
- **Theme transitions**: Edit `src/contexts/ThemeContext.tsx`
- **Coupon animations**: Edit `src/components/GiftSelector.tsx`
- **Flip animations**: Edit styles in `src/pages/index.astro`

## Key Features

- **Dynamic Theming**: Complete visual transformation based on game selection
- **Audio Integration**: Smooth fade transitions between theme songs
- **CSS Variables**: Real-time theme updates without page reload
- **No Double Animations**: React useRef prevents animation replays
- **Clean Architecture**: Separated concerns with React Context
- **Type Safety**: Full TypeScript support throughout
- **Smooth Transitions**: GSAP-powered animations for all theme changes

## How It Works

1. **Initial Load**: Displays animated intro with "Merry Christmas" message
2. **Theme Selection**: User chooses between two game coupons
3. **Theme Switch**:
   - Background colors transition smoothly
   - Fonts change dynamically
   - Previous audio fades out while new audio fades in
   - All UI elements update to match the theme
4. **Coupon Interaction**: Click/tap to flip and reveal game details

## License

MIT
