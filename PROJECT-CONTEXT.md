# Vinyl Player - Project Context for Claude

## What This Is

An art-directed vinyl music player that visualizes songs through multiple layered effects. Built for X (Twitter) virality - the goal is to create scroll-stopping, shareable moments that showcase the intersection of music, WebGL, and creative development.

**Created by:** Karim Saab ([@mawzeeeee](https://x.com/mawzeeeee))

---

## Tech Stack

- **Three.js** - 3D vinyl turntable with imported GLTF model
- **WebGL Shaders** - ASCII video background, aurora clouds
- **Web Audio API** - Real-time frequency analysis (bass/high extraction)
- **Canvas 2D** - Arc visualizer bars behind vinyl
- **Vanilla JS** - No frameworks, module-based

---

## Core Visual Elements

### 1. ASCII Video Background
- Full-screen shader converts video footage to ASCII characters
- Each track has its own video (`videos/[track].mp4`)
- Audio-reactive: RGB split on bass, brightness responds to audio levels
- **Shows only when playing**, fades out on pause (clean pause state)

### 2. Arc Visualizer
- 20 bars in a semi-circle arc above the vinyl
- **Each track has a custom 16-color gradient palette** (`vizColors` array)
- Colors map to frequency position: bass (left) → highs (right)
- Full opacity, positioned at 70% down the canvas

### 3. Aurora Clouds (WebGL)
- Noise-based organic blob shapes
- Track accent color tints the clouds
- **Hidden while playing**, visible on pause (creates state distinction)

### 4. 3D Vinyl Turntable
- Imported GLTF model with custom vinyl disc
- Vinyl has album cover in center label
- Realistic physics: wobble while spinning, inertia on stop
- Tonearm animates in on play (with bounce), out on pause

---

## Track-Specific Customization

Each track in the `tracks` array has:

```javascript
{
  title: 'Track <em>Name</em>',      // HTML allowed for styling
  titleWords: ['Track', 'Name'],     // For animations
  artist: 'Artist Name',
  album: 'Album Name',
  producer: 'Producer',
  year: '2024',
  src: 'track.mp3',
  cover: 'covers/track.jpg',
  asciiBg: 'videos/track.mp4',       // ASCII background video
  labelColor: '#hex',                 // Primary color
  accentColor: '#hex',                // Secondary color
  vizColors: [/* 16 colors */],       // Visualizer gradient
  soul: {/* shader params */},        // Song soul orb (currently hidden)
  typography: {                       // Per-track title styling
    style: 'aggressive',              // aggressive | elegant | dreamy | retro | bold
    weight: 700,                      // Font weight
    letterSpacing: '-0.02em',
    textTransform: 'uppercase'        // none | uppercase
  }
}
```

---

## Current Track Palettes & Rationale

| Track | Palette Concept | Vibe |
|-------|----------------|------|
| **Not Like Us** | Blood red → Fire orange → Gold → White | West Coast aggression, triumphant fire |
| **All The Stars** | Bronze → Gold → Starlight | Cosmic, warm, golden stars emerging |
| **Juicy** | Deep purple → Violet → Pink → Champagne gold | 90s Brooklyn luxury, celebration |
| **HUMBLE.** | Near-black → Blood red → Hot red → White flash | DAMN. brutality, stark contrast |
| **Lucid Dreams** | Midnight blue → Purple → Lavender → Soft white | Dreamscape, melancholic, ethereal |
| **Blinding Lights** | Magenta → Hot pink → Neon red → Orange → Yellow | 80s synthwave, neon signs |
| **SICKO MODE** | Earth brown → Orange → Gold → Neon green flash | Astroworld psychedelic, unexpected |
| **Congratulations** | Bronze → Copper → Gold → Champagne → Cream | Victory celebration, warm trophy gold |

---

## Creative Direction Principles

### 1. Every Song Has a Visual Identity
Don't just use random colors. Ask: What does this song **feel** like? What **era** is it from? What **story** does it tell?

### 2. The Gradient Tells a Story
- Bass frequencies (left side) = deeper, warmer colors
- High frequencies (right side) = brighter, lighter colors
- The gradient should flow naturally, no jarring transitions

### 3. Less is More
We removed speakers because they competed for attention. The composition is now:
- Playing: ASCII background + Visualizer arc + Vinyl
- Paused: Aurora clouds (moody) + Vinyl

### 4. State Distinction
- **Playing** = Active, energetic (ASCII visible, aurora hidden)
- **Paused** = Moody, atmospheric (Aurora visible, ASCII hidden)

### 5. Viral-First Thinking
- First frame must stop the scroll
- 30-second video capture with song playing
- The visualizer is the hero element
- Music must be audible in recordings

---

## File Structure

```
/player
├── index.html          # Main HTML
├── main.js             # All JS (Three.js, shaders, audio, UI)
├── style.css           # All styles
├── covers/             # Album artwork (jpg)
├── videos/             # ASCII background videos (mp4)
├── turntable.glb       # 3D turntable model
└── *.mp3               # Audio files
```

---

## Key Code Sections in main.js

- **Lines 1-430**: Track definitions with all metadata (including typography)
- **Lines 480-550**: Three.js initialization
- **Lines 680-725**: Vinyl creation (custom mesh)
- **Lines 1100-1120**: Sound state (includes drop detection state)
- **Lines 1190-1240**: Drop effect trigger system
- **Lines 1250-1450**: Aurora WebGL shader
- **Lines 1750-1960**: ASCII WebGL shader (with glitch effects)
- **Lines 2130-2260**: Arc visualizer (vizBars with explosion)
- **Lines 2380-2410**: Tonearm animations
- **Lines 2580-2620**: Play/pause toggle
- **Lines 2625-2660**: Typography application

---

## What NOT to Do

- Don't add features that compete for visual attention
- Don't use colors that don't match the song's vibe
- Don't create jarring color transitions in gradients
- Don't over-engineer - this is art direction, not a product
- Don't add time estimates when discussing work

---

## New Features (Feb 2026)

### 1. Drop Detection + Glitch System
The "holy shit" moment - detects sudden bass spikes and triggers coordinated chaos:
- **ASCII Glitch**: Horizontal slice displacement, character scrambling, RGB split boost, scanlines
- **Visualizer Explosion**: Bars scatter outward with angle jitter, width pulses
- **Camera Shake**: Brief composition group shake on drops
- **Vinyl Flash**: Shadow briefly flashes white, vinyl speed surges

### 2. Turntable Reactivity
The turntable is now part of the scene:
- **Shadow Pulses**: Vinyl shadow opacity and scale respond to bass
- **Color Reflection**: Shadow tints with track accent color on bass hits
- Creates depth - turntable feels grounded, not floating

### 3. Per-Track Typography
Each track's title now has its own visual identity:

| Style | Effect | Used For |
|-------|--------|----------|
| `aggressive` | Sans-serif, uppercase, glitch flicker | "Not Like Us", "HUMBLE." |
| `elegant` | Serif italic, refined | "All The Stars", "Congratulations" |
| `dreamy` | Light weight, soft glow pulse | "Lucid Dreams" |
| `retro` | Wide letter-spacing, neon glow flicker | "Blinding Lights" |
| `bold` | Heavy sans-serif, uppercase | "SICKO MODE" |

---

## Future Considerations

- Mobile responsiveness (currently desktop-focused)
- More tracks with carefully curated palettes
- Video export/recording feature
- Potential: lyrics visualization, beat-synced effects

---

*Last updated: February 2026*
