# Christmas Gift Coupons 🎁

A mobile-first web application built with Astro and React, featuring animated Christmas gift coupons that can be accessed via QR code.

## Features

- 🎄 Beautiful intro animations with GSAP (no double animations)
- 📱 Mobile-first responsive design
- 🎁 Two interactive gift coupon options
- ✨ Smooth flip animations on coupons
- 🎨 Tailwind CSS styling with Christmas theme
- ⚛️ React components for better maintainability
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

## Tech Stack

- **Framework**: Astro 4.16
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Animations**: GSAP + CSS Keyframes
- **Language**: TypeScript
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

- **App.tsx**: Main component managing loader state
- **Loader.tsx**: Handles intro animations with GSAP (prevents double animations with useRef)
- **GiftSelector.tsx**: Manages tab state and coupon transitions
- **TabSelector.tsx**: Reusable tab UI component
- **CouponCard.tsx**: Reusable coupon card with flip animation

## Customization

### Modify Gift Coupons

Edit the `coupons` array in `src/components/GiftSelector.tsx`:

```tsx
const coupons = [
  {
    id: 1,
    frontIcon: "🎁",
    frontTitle: "Premium Gift",
    // ... other properties
  },
  // Add more coupons
];
```

### Update Theme Colors

Modify `tailwind.config.mjs`:

```js
colors: {
  christmas: {
    red: '#C41E3A',
    green: '#165B33',
    gold: '#FFD700',
  }
}
```

### Adjust Animations

- **Intro animations**: Edit `src/components/Loader.tsx`
- **Coupon transitions**: Edit `src/components/GiftSelector.tsx`
- **Flip animations**: Edit styles in `src/pages/index.astro`

## Key Improvements

- ✅ Fixed double animation issues using React useRef
- ✅ Eliminated tab style flicker with proper state management
- ✅ Separated concerns into reusable React components
- ✅ Improved code maintainability and readability
- ✅ Better animation control with GSAP timelines

## License

MIT
