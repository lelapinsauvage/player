# Vinyl Music Player

A beautiful, interactive vinyl record player built with Three.js and Web Audio API. Features a realistic 3D turntable with animated tonearm and vinyl records.

## Features

- **3D Vinyl Turntable**: Realistic 3D model with spinning vinyl and animated tonearm
- **Audio Visualizer**: Real-time frequency visualization with elegant bars
- **Vinyl Label Design**: Procedurally generated vinyl records with custom labels
- **Editorial Design**: Inspired by high-end music magazines and liner notes
- **Keyboard Controls**: Space to play/pause, arrow keys to navigate tracks
- **Progress Bar**: Click to seek through tracks

## Tech Stack

- **Three.js**: 3D graphics and rendering
- **Web Audio API**: Audio playback and analysis
- **Vanilla JavaScript**: No frameworks, pure ES6 modules
- **CSS Custom Properties**: Elegant theming system

## Getting Started

1. Open `index.html` in a modern web browser
2. Click on the vinyl or press Space to play/pause
3. Use the navigation buttons or arrow keys to switch tracks

## Project Structure

```
player/
├── index.html       # Main HTML structure
├── main.js          # Three.js setup, audio handling, and interactions
├── style.css        # Editorial-inspired styling
├── money-trees.mp3  # Audio track
├── Untitled.gltf    # 3D turntable model
├── Untitled.bin     # 3D model binary data
└── 3D/              # Source 3D model files
```

## Customization

### Adding Tracks

Edit the `tracks` array in `main.js`:

```javascript
const tracks = [
  {
    title: 'Track <em>Title</em>',
    artist: 'Artist Name',
    album: 'Album Name',
    producer: 'Producer Name',
    year: '2024',
    catalog: 'CAT-001',
    number: '01',
    src: 'audio-file.mp3',
    labelColor: '#c4a35a'
  }
];
```

### Styling

All colors and design tokens are defined as CSS custom properties in `style.css`:

```css
:root {
  --bg: #0a0a0a;
  --cream: #f5f0e8;
  --brass: #c4a35a;
  --vinyl-black: #1a1a1a;
}
```

## Browser Support

Works best in modern browsers with WebGL support:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Credits

Design inspired by editorial music publications and vintage vinyl aesthetics.

## License

MIT
