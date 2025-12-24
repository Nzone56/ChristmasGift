# Setup Guide - Christmas Gift Game Coupons

This guide will help you set up the audio and image assets for the game-themed Christmas gift coupons.

## Quick Start

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Add Audio Files**
   - Download "Alicia" by Lorien Testard
   - Download "Down by the River" by Borislav Slavov
   - Place them in `/public/audio/` as:
     - `alicia.mp3` (for Clair Obscur: Expedition 33)
     - `down-by-the-river.mp3` (for Baldur's Gate 3)

3. **Add Game Images**
   - Find high-quality images for both games
   - Place them in `/public/images/` as:
     - `expedition33.jpg`
     - `baldursgate3.jpg`

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Theme System

The application features two distinct themes:

### Clair Obscur: Expedition 33

- **Font**: Cinzel (serif)
- **Colors**: Deep charcoals, aged gold, rich purples, steel grays
- **Audio**: "Alicia" by Lorien Testard
- **Aesthetic**: Dark fantasy, chiaroscuro style

### Baldur's Gate 3

- **Font**: Lora (serif)
- **Colors**: Burgundy, light wisteria, chalky gold, warm rust
- **Audio**: "Down by the River" by Borislav Slavov
- **Aesthetic**: High fantasy, D&D style

## Features

- ✨ **Dynamic Theming**: Background, colors, and fonts change based on selection
- 🎵 **Audio Transitions**: Smooth fade-in/fade-out between theme songs
- 🎨 **Animated Transitions**: All theme changes are smoothly animated
- 📱 **Mobile-First**: Optimized for mobile devices and QR code access
- ⚛️ **React Components**: Clean, maintainable component architecture

## Customization

### Modify Game Themes

Edit `src/config/themes.ts` to customize:

- Colors
- Fonts
- Audio paths
- Coupon content
- Instructions

### Adjust Animation Timings

Edit `src/contexts/ThemeContext.tsx` to modify:

- Audio fade duration
- Theme transition speed
- Volume levels

### Update Styles

Edit `src/styles/global.css` for:

- Global CSS variables
- Transition timings
- Font imports

## Audio Requirements

- **Format**: MP3
- **Bitrate**: 192kbps or higher recommended
- **Licensing**: Ensure you have proper rights to use the music

## Image Requirements

- **Format**: JPG or PNG
- **Size**: 800x600px recommended
- **Quality**: High-resolution game artwork
- **Licensing**: Ensure you have rights to use the images

## Deployment

The project is configured for Vercel deployment:

```bash
npm run build
```

Then connect your repository to Vercel for automatic deployment.

## Browser Compatibility

- Modern browsers with ES6+ support
- Audio autoplay may be blocked - users may need to interact with the page first
- CSS custom properties support required

## Troubleshooting

### Audio Not Playing

- Check browser console for autoplay restrictions
- Ensure audio files are in correct location
- Try interacting with the page first (click/tap)

### Theme Not Switching

- Check browser console for errors
- Verify theme configuration in `themes.ts`
- Ensure CSS variables are supported

### Images Not Showing

- Verify image paths in `themes.ts`
- Check file names match exactly
- Ensure images are in `/public/images/`

## License

MIT
