import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// ============================================
// TRACKS
// ============================================
const tracks = [
  {
    title: 'Not Like <em>Us</em>',
    titleWords: ['Not', 'Like Us'],
    artist: 'Kendrick Lamar',
    album: 'GNX',
    producer: 'Mustard',
    year: '2024',
    catalog: 'KL-001',
    number: '01',
    src: 'not-like-us.mp3',
    labelColor: '#d32f2f',
    accentColor: '#ff5722',
    quote: '"They not like us"',
    location: 'Los Angeles, CA',
    sample: 'Original',
    cover: 'covers/notlikeus.jpg',
    // Original video for ASCII shader
    asciiBg: 'videos/not-like-us.mp4',
    // Soul parameters - aggressive, triumphant
    soul: {
      colorA: [0.83, 0.18, 0.18],    // Red
      colorB: [1.0, 0.34, 0.13],     // Orange fire
      noiseScale: 1.5,
      noiseSpeed: 0.25,
      baseDisplacement: 0.4,
      bassReactivity: 1.0,
      highReactivity: 0.5,
      fresnelPower: 2.0,
      opacity: 0.9
    }
  },
  {
    title: 'All The <em>Stars</em>',
    titleWords: ['All', 'The', 'Stars'],
    artist: 'Kendrick Lamar & SZA',
    album: 'Black Panther',
    producer: 'Sounwave, Top Dawg',
    year: '2018',
    catalog: 'KL-002',
    number: '02',
    src: 'all-the-stars.mp3',
    labelColor: '#c9a227',
    accentColor: '#ffd54f',
    quote: '"This may be the night that my dreams might let me know"',
    location: 'TDE Studios, Los Angeles',
    sample: 'Original',
    cover: 'covers/blackpanther.jpg',
    asciiBg: 'videos/all-the-stars.mp4',
    // Soul parameters - cosmic, golden, triumphant
    soul: {
      colorA: [0.79, 0.64, 0.15],    // Gold
      colorB: [1.0, 0.84, 0.31],     // Bright gold
      noiseScale: 1.4,
      noiseSpeed: 0.18,
      baseDisplacement: 0.35,
      bassReactivity: 0.8,
      highReactivity: 0.6,
      fresnelPower: 2.2,
      opacity: 0.85
    }
  },
  {
    title: '<em>Juicy</em>',
    titleWords: ['Juicy'],
    artist: 'The Notorious B.I.G.',
    album: 'Ready to Die',
    producer: 'Poke & Tone, Pete Rock',
    year: '1994',
    catalog: 'BIG-003',
    number: '03',
    src: 'juicy.mp3',
    labelColor: '#8e24aa',
    accentColor: '#ab47bc',
    quote: '"It was all a dream"',
    location: 'The Hit Factory, NYC',
    sample: '"Juicy Fruit" by Mtume',
    cover: 'covers/readytodie.jpg',
    asciiBg: 'videos/juicy.mp4',
    // Soul parameters - celebratory, nostalgic, triumphant
    soul: {
      colorA: [0.56, 0.14, 0.67],    // Purple
      colorB: [0.67, 0.28, 0.74],    // Lighter purple
      noiseScale: 1.3,
      noiseSpeed: 0.15,
      baseDisplacement: 0.3,
      bassReactivity: 0.9,
      highReactivity: 0.4,
      fresnelPower: 2.5,
      opacity: 0.85
    }
  },
  {
    title: '<em>HUMBLE.</em>',
    titleWords: ['HUMBLE.'],
    artist: 'Kendrick Lamar',
    album: 'DAMN.',
    producer: 'Mike WiLL Made-It',
    year: '2017',
    catalog: 'KL-008',
    number: '08',
    src: 'humble.mp3',
    labelColor: '#c41e1e',
    accentColor: '#ff1744',
    quote: '"Sit down, be humble"',
    location: 'Top Dawg Studios, Carson',
    sample: 'Original Composition',
    cover: 'covers/damn.jpg',
    // Original video for ASCII shader
    asciiBg: 'videos/humble.mp4',
    // Soul parameters - aggressive, hard-hitting, sharp
    soul: {
      colorA: [0.77, 0.12, 0.12],    // Deep red
      colorB: [1.0, 0.09, 0.27],     // Hot red
      noiseScale: 3.0,
      noiseSpeed: 0.3,
      baseDisplacement: 0.5,
      bassReactivity: 1.5,
      highReactivity: 0.7,
      fresnelPower: 1.8,
      opacity: 1.0
    }
  },
  {
    title: 'Lucid <em>Dreams</em>',
    titleWords: ['Lucid', 'Dreams'],
    artist: 'Juice WRLD',
    album: 'Goodbye & Good Riddance',
    producer: 'Nick Mira',
    year: '2018',
    catalog: 'JW-005',
    number: '05',
    src: 'lucid-dreams.mp3',
    labelColor: '#7b1fa2',
    accentColor: '#ba68c8',
    quote: '"I still see your shadows in my room"',
    location: 'Los Angeles, CA',
    sample: '"Shape of My Heart" by Sting',
    cover: 'covers/gbgr.jpg',
    asciiBg: 'videos/lucid-dreams.mp4',
    // Soul parameters - dreamy, melancholic, purple haze
    soul: {
      colorA: [0.48, 0.12, 0.64],    // Deep purple
      colorB: [0.73, 0.41, 0.78],    // Light purple
      noiseScale: 1.6,
      noiseSpeed: 0.14,
      baseDisplacement: 0.35,
      bassReactivity: 0.8,
      highReactivity: 0.5,
      fresnelPower: 2.4,
      opacity: 0.8
    }
  },
  {
    title: 'Blinding <em>Lights</em>',
    titleWords: ['Blinding', 'Lights'],
    artist: 'The Weeknd',
    album: 'After Hours',
    producer: 'Max Martin, Oscar Holter',
    year: '2020',
    catalog: 'TW-010',
    number: '10',
    src: 'blinding-lights.mp3',
    labelColor: '#e80b0b',
    accentColor: '#ff1744',
    quote: '"I\'m blinded by the lights"',
    location: 'Conway Recording Studios, LA',
    sample: 'Original Composition',
    cover: 'covers/afterhours.jpg',
    // Original video for ASCII shader
    asciiBg: 'videos/blinding-lights.mp4',
    // Soul parameters - 80s synth, neon, pulsing
    soul: {
      colorA: [0.91, 0.04, 0.04],    // Neon red
      colorB: [1.0, 0.2, 0.4],       // Hot pink
      noiseScale: 2.0,
      noiseSpeed: 0.35,
      baseDisplacement: 0.4,
      bassReactivity: 1.1,
      highReactivity: 0.8,
      fresnelPower: 2.5,
      opacity: 0.95
    }
  },
  {
    title: 'SICKO <em>MODE</em>',
    titleWords: ['SICKO', 'MODE'],
    artist: 'Travis Scott',
    album: 'Astroworld',
    producer: 'Hit-Boy, Tay Keith',
    year: '2018',
    catalog: 'TS-011',
    number: '11',
    src: 'sicko-mode.mp3',
    labelColor: '#d4a84b',
    accentColor: '#ffb74d',
    quote: '"Sun is down, freezin\' cold"',
    location: 'Record Plant, Los Angeles',
    sample: '"Like a Light" by Big Hawk',
    cover: 'covers/astroworld.jpg',
    asciiBg: 'videos/sicko-mode.mp4',
    // Soul parameters - psychedelic, shifting, multiple modes
    soul: {
      colorA: [0.83, 0.66, 0.29],    // Astroworld gold
      colorB: [1.0, 0.72, 0.30],     // Warm orange
      noiseScale: 2.8,
      noiseSpeed: 0.28,
      baseDisplacement: 0.45,
      bassReactivity: 1.3,
      highReactivity: 0.6,
      fresnelPower: 2.0,
      opacity: 0.9
    }
  },
  {
    title: '<em>Congratulations</em>',
    titleWords: ['Congratulations'],
    artist: 'Post Malone ft. Quavo',
    album: 'Stoney',
    producer: 'Metro Boomin, Frank Dukes',
    year: '2016',
    catalog: 'PM-014',
    number: '14',
    src: 'congratulations.mp3',
    labelColor: '#8b7355',
    accentColor: '#bcaaa4',
    quote: '"They said I wouldn\'t be nothin\'"',
    location: 'Republic Studios, Los Angeles',
    sample: 'Original Composition',
    cover: 'covers/stoney.jpg',
    asciiBg: 'videos/congratulations.mp4',
    // Soul parameters - celebratory, warm, victorious
    soul: {
      colorA: [0.55, 0.45, 0.33],    // Warm brown
      colorB: [0.74, 0.67, 0.64],    // Stone beige
      noiseScale: 1.4,
      noiseSpeed: 0.15,
      baseDisplacement: 0.3,
      bassReactivity: 0.85,
      highReactivity: 0.4,
      fresnelPower: 2.5,
      opacity: 0.82
    }
  }
];

let currentTrack = 0;
let isPlaying = false;

// ============================================
// DOM
// ============================================
const audio = document.getElementById('audio');
const canvas = document.getElementById('vinyl-canvas');
const trackNumber = document.getElementById('track-number');
const bgTrackNumber = document.getElementById('bg-track-number');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const producer = document.getElementById('producer');
const album = document.getElementById('album');
const year = document.getElementById('year');
const pullQuote = document.getElementById('pull-quote');
const storyLocation = document.getElementById('story-location');
const storySample = document.getElementById('story-sample');
const storyBlocks = document.querySelectorAll('.story-block');
const albumAtmosphere = document.getElementById('album-atmosphere');
const strikeLine = document.getElementById('strike-line');
const timeCurrent = document.getElementById('time-current');
const timeTotal = document.getElementById('time-total');
const progressBar = document.getElementById('progress-bar');
const progressFill = document.getElementById('progress-fill');
const scrubber = document.getElementById('scrubber');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const visualizer = document.getElementById('visualizer');
const bars = visualizer ? visualizer.querySelectorAll('.bar') : [];
const vizCanvas = document.getElementById('viz-canvas');
const vizCtx = vizCanvas ? vizCanvas.getContext('2d') : null;

// New UI elements
const auroraCanvas = document.getElementById('aurora-canvas');
const playPill = document.getElementById('play-pill');
const vizBars = document.getElementById('viz-bars');
const vizBarsCtx = vizBars ? vizBars.getContext('2d') : null;

// ASCII shader elements
const asciiCanvas = document.getElementById('ascii-canvas');
const asciiSource = document.getElementById('ascii-source');

// Menu elements
const menuBtn = document.getElementById('menu-btn');
const menuOverlay = document.getElementById('menu-overlay');
const songMenu = document.getElementById('song-menu');
const menuClose = document.getElementById('menu-close');
const menuList = document.getElementById('menu-list');
const nowPlayingCover = document.getElementById('now-playing-cover');
const nowPlayingTitle = document.getElementById('now-playing-title');

// Menu mini player elements
const menuPlayerCover = document.getElementById('menu-player-cover');
const menuPlayerTitle = document.getElementById('menu-player-title');
const menuPlayerArtist = document.getElementById('menu-player-artist');
const menuPlayBtn = document.getElementById('menu-play-btn');
const menuNextBtn = document.getElementById('menu-next-btn');

// ============================================
// THREE.JS SETUP
// ============================================
let scene, camera, renderer;
let turntable, tonearm, vinyl;
let compositionGroup;
let time = 0;

// Parallax mouse tracking
const mouse = { x: 0, y: 0 };
const targetRotation = { x: 0, y: 0 };
const currentRotation = { x: 0, y: 0 };

// Vinyl positions - on turntable vs off (initial state)
const vinylOnPosition = { x: -18, y: 33.5, z: 46 };
const vinylOffPosition = { x: -18, y: 120, z: 46 }; // Directly above turntable
const vinylPosition = { ...vinylOnPosition }; // Start ON turntable
let vinylAnimating = false;

// Vinyl spin control
let vinylSpinSpeed = 0; // 0 = stopped, 0.025 = normal playing speed
let tonearmInPosition = false;

function initThree() {
  scene = new THREE.Scene();
  // No background - transparent to show visualizer behind

  const aspect = canvas.parentElement.clientWidth / canvas.parentElement.clientHeight;
  camera = new THREE.PerspectiveCamera(35, aspect, 0.1, 1000);
  camera.position.set(0, 220, 400);
  camera.lookAt(0, 60, 0);

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(canvas.parentElement.clientWidth, canvas.parentElement.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  // Environment map
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();
  const envGeo = new THREE.SphereGeometry(50, 32, 32);
  const envMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    vertexShader: `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: `
      varying vec3 vWorldPosition;
      void main() {
        vec3 dir = normalize(vWorldPosition);
        float y = dir.y * 0.5 + 0.5;
        vec3 color = mix(vec3(0.02), vec3(0.12), y);
        gl_FragColor = vec4(color, 1.0);
      }
    `
  });
  envScene.add(new THREE.Mesh(envGeo, envMat));
  scene.environment = pmremGenerator.fromScene(envScene).texture;

  // Create composition group for parallax
  compositionGroup = new THREE.Group();
  scene.add(compositionGroup);

  setupLighting();
  loadTurntable();
  createVinyl();

  window.addEventListener('resize', onResize);

  // Mouse parallax tracking
  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.parentElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
  });

  canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.x = 0;
    mouse.y = 0;
  });

  animate();
}

function setupLighting() {
  // Warm ambient for organic feel
  scene.add(new THREE.AmbientLight(0xfff5e6, 0.15));

  // Key light - warm, main illumination from upper right
  const keyLight = new THREE.DirectionalLight(0xfff0e0, 1.0);
  keyLight.position.set(100, 200, 180);
  scene.add(keyLight);

  // Fill light - cool blue tint for contrast
  const fillLight = new THREE.DirectionalLight(0xd0e0ff, 0.25);
  fillLight.position.set(-120, 100, 80);
  scene.add(fillLight);

  // Rim light - back lighting for depth
  const rimLight = new THREE.DirectionalLight(0xffeedd, 0.4);
  rimLight.position.set(-50, 150, -100);
  scene.add(rimLight);

  // Main spotlight on vinyl
  const vinylSpot = new THREE.SpotLight(0xfff8f0, 1.8, 500, Math.PI / 6, 0.7, 1.5);
  vinylSpot.position.set(80, 220, 160);
  vinylSpot.target.position.set(vinylOnPosition.x, vinylOnPosition.y, vinylOnPosition.z);
  scene.add(vinylSpot);
  scene.add(vinylSpot.target);

  // Secondary accent spotlight
  const accentSpot = new THREE.SpotLight(0xffe0c0, 0.8, 400, Math.PI / 7, 0.8, 1.8);
  accentSpot.position.set(-100, 180, 140);
  accentSpot.target.position.set(vinylOnPosition.x, vinylOnPosition.y, vinylOnPosition.z);
  scene.add(accentSpot);
  scene.add(accentSpot.target);

  // Top-down light
  const topLight = new THREE.DirectionalLight(0xffffff, 0.15);
  topLight.position.set(0, 300, 0);
  scene.add(topLight);

  // Warm point light
  const warmGlow = new THREE.PointLight(0xffcc88, 0.3, 300, 2);
  warmGlow.position.set(50, 80, 100);
  scene.add(warmGlow);

  // Cool point light
  const coolGlow = new THREE.PointLight(0x88aaff, 0.15, 250, 2);
  coolGlow.position.set(-80, 60, 80);
  scene.add(coolGlow);

  // Bounce light
  const bounceLight = new THREE.DirectionalLight(0xfff8f0, 0.1);
  bounceLight.position.set(0, -50, 100);
  scene.add(bounceLight);
}

function loadTurntable() {
  const loader = new GLTFLoader();
  loader.load('Untitled.gltf', (gltf) => {
    turntable = gltf.scene;

    const box = new THREE.Box3().setFromObject(turntable);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    turntable.position.sub(center);
    const scale = 150 / Math.max(size.x, size.y, size.z);
    turntable.scale.setScalar(scale);
    turntable.position.set(0, 0, 0);

    turntable.traverse((child) => {
      const name = child.name.toLowerCase();
      if (name.includes('arm') || name.includes('tone') || name.includes('needle')) {
        if (!tonearm) {
          tonearm = child;
          tonearm.userData.startRotation = child.rotation.clone();
          tonearm.userData.startPosition = child.position.clone();
        }
      }
    });

    compositionGroup.add(turntable);
  });
}

function createVinylNormalMap() {
  const size = 1024;
  const cvs = document.createElement('canvas');
  cvs.width = size;
  cvs.height = size;
  const ctx = cvs.getContext('2d');
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 4;

  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.fillRect(0, 0, size, size);

  for (let r = radius - 20; r > 140; r -= 2.0) {
    ctx.strokeStyle = 'rgb(90, 128, 255)';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgb(166, 128, 255)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(cx, cy, r - 1, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.beginPath();
  ctx.arc(cx, cy, 140, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = 'rgb(165, 128, 255)';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(cx, cy, 140, 0, Math.PI * 2);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(cvs);
  texture.anisotropy = 16;
  return texture;
}

let vinylShadow;

function createVinyl() {
  const track = tracks[currentTrack];
  const radius = 48;
  const geometry = new THREE.CylinderGeometry(radius, radius, 1.5, 64);

  const normalMap = createVinylNormalMap();

  const material = new THREE.MeshPhysicalMaterial({
    normalMap: normalMap,
    normalScale: new THREE.Vector2(0.5, 0.5),
    color: 0xaaaaaa,
    roughness: 0.15,
    metalness: 0.3,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    reflectivity: 0.8,
    envMapIntensity: 1.5
  });

  vinyl = new THREE.Mesh(geometry, material);
  vinyl.position.set(vinylOnPosition.x, vinylOnPosition.y, vinylOnPosition.z);
  vinyl.rotation.x = 0; // Flat on platter from start
  compositionGroup.add(vinyl);

  // Create shadow/glow beneath vinyl
  const shadowGeometry = new THREE.CircleGeometry(radius * 0.9, 64);
  const shadowMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide
  });
  vinylShadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
  vinylShadow.rotation.x = -Math.PI / 2;
  vinylShadow.position.set(vinylOnPosition.x, vinylOnPosition.y - 2, vinylOnPosition.z);
  compositionGroup.add(vinylShadow);

  // Load texture with cover image
  createVinylTextureWithCover(track).then(texture => {
    vinyl.material.map = texture;
    vinyl.material.needsUpdate = true;
  });
}

function createVinylTextureWithCover(track) {
  return new Promise((resolve) => {
    const size = 2048;
    const cvs = document.createElement('canvas');
    cvs.width = size;
    cvs.height = size;
    const ctx = cvs.getContext('2d');
    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 8;
    const labelRadius = 280;

    // Load cover image first
    const coverImg = new Image();
    coverImg.crossOrigin = 'anonymous';

    const drawVinyl = () => {
      // Base
      const baseGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      baseGradient.addColorStop(0, '#c5c5c8');
      baseGradient.addColorStop(0.4, '#b0b0b3');
      baseGradient.addColorStop(0.7, '#a0a0a3');
      baseGradient.addColorStop(1, '#909093');
      ctx.fillStyle = baseGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#707075';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx, cy, radius - 2, 0, Math.PI * 2);
      ctx.stroke();

      for (let r = radius - 25; r > labelRadius + 15; r -= 1.8) {
        ctx.strokeStyle = 'rgba(70, 70, 75, 0.6)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      const trackRings = [radius - 60, radius - 150, radius - 240, radius - 330, radius - 420];
      trackRings.forEach(r => {
        if (r > labelRadius + 20) {
          ctx.strokeStyle = '#454550';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();

          ctx.strokeStyle = 'rgba(200, 200, 205, 0.5)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(cx, cy, r - 2, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      ctx.strokeStyle = '#505055';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx, cy, radius - 15, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = '#505055';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, labelRadius + 12, 0, Math.PI * 2);
      ctx.stroke();

      for (let r = radius - 40; r > labelRadius + 30; r -= 8) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const shineGradient = ctx.createLinearGradient(0, 0, size, size);
      shineGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      shineGradient.addColorStop(0.35, 'rgba(255, 255, 255, 0.15)');
      shineGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.25)');
      shineGradient.addColorStop(0.65, 'rgba(255, 255, 255, 0.1)');
      shineGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = shineGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, radius - 10, 0, Math.PI * 2);
      ctx.arc(cx, cy, labelRadius + 5, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.restore();

      // Label with cover image
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, labelRadius, 0, Math.PI * 2);
      ctx.clip();

      if (coverImg.complete && coverImg.naturalWidth > 0) {
        // Draw full cover image to fit within the circle
        const imgSize = Math.max(coverImg.width, coverImg.height);
        const scale = (labelRadius * 2) / imgSize;
        const drawW = coverImg.width * scale;
        const drawH = coverImg.height * scale;
        ctx.drawImage(coverImg, cx - drawW / 2, cy - drawH / 2, drawW, drawH);
      } else {
        // Fallback gradient
        const labelGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, labelRadius);
        labelGradient.addColorStop(0, '#e8d4b0');
        labelGradient.addColorStop(0.3, track.labelColor);
        labelGradient.addColorStop(0.7, '#b8944a');
        labelGradient.addColorStop(1, '#a07830');
        ctx.fillStyle = labelGradient;
        ctx.fill();
      }
      ctx.restore();

      // Subtle overlay for vinyl look
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, labelRadius, 0, Math.PI * 2);
      ctx.clip();
      const overlayGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, labelRadius);
      overlayGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      overlayGradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
      overlayGradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
      ctx.fillStyle = overlayGradient;
      ctx.fill();
      ctx.restore();

      // Center hole
      const holeGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28);
      holeGradient.addColorStop(0, '#1a1a1a');
      holeGradient.addColorStop(0.5, '#252525');
      holeGradient.addColorStop(0.8, '#3a3a3a');
      holeGradient.addColorStop(1, '#505050');
      ctx.fillStyle = holeGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, 28, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(150, 150, 155, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 26, Math.PI * 0.7, Math.PI * 1.7);
      ctx.stroke();

      const texture = new THREE.CanvasTexture(cvs);
      texture.anisotropy = 16;
      resolve(texture);
    };

    if (track.cover) {
      coverImg.onload = drawVinyl;
      coverImg.onerror = drawVinyl;
      coverImg.src = track.cover;
    } else {
      drawVinyl();
    }
  });
}

function createVinylTexture(track) {
  const size = 2048;
  const cvs = document.createElement('canvas');
  cvs.width = size;
  cvs.height = size;
  const ctx = cvs.getContext('2d');
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 8;

  // Base
  const baseGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  baseGradient.addColorStop(0, '#c5c5c8');
  baseGradient.addColorStop(0.4, '#b0b0b3');
  baseGradient.addColorStop(0.7, '#a0a0a3');
  baseGradient.addColorStop(1, '#909093');
  ctx.fillStyle = baseGradient;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#707075';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(cx, cy, radius - 2, 0, Math.PI * 2);
  ctx.stroke();

  const labelRadius = 280;

  for (let r = radius - 25; r > labelRadius + 15; r -= 1.8) {
    ctx.strokeStyle = 'rgba(70, 70, 75, 0.6)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  const trackRings = [radius - 60, radius - 150, radius - 240, radius - 330, radius - 420];
  trackRings.forEach(r => {
    if (r > labelRadius + 20) {
      ctx.strokeStyle = '#454550';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(200, 200, 205, 0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, r - 2, 0, Math.PI * 2);
      ctx.stroke();
    }
  });

  ctx.strokeStyle = '#505055';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(cx, cy, radius - 15, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#505055';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, labelRadius + 12, 0, Math.PI * 2);
  ctx.stroke();

  for (let r = radius - 40; r > labelRadius + 30; r -= 8) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  const shineGradient = ctx.createLinearGradient(0, 0, size, size);
  shineGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
  shineGradient.addColorStop(0.35, 'rgba(255, 255, 255, 0.15)');
  shineGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.25)');
  shineGradient.addColorStop(0.65, 'rgba(255, 255, 255, 0.1)');
  shineGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = shineGradient;
  ctx.beginPath();
  ctx.arc(cx, cy, radius - 10, 0, Math.PI * 2);
  ctx.arc(cx, cy, labelRadius + 5, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  // Label
  const labelGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, labelRadius);
  labelGradient.addColorStop(0, '#e8d4b0');
  labelGradient.addColorStop(0.3, track.labelColor);
  labelGradient.addColorStop(0.7, '#b8944a');
  labelGradient.addColorStop(1, '#a07830');
  ctx.fillStyle = labelGradient;
  ctx.beginPath();
  ctx.arc(cx, cy, labelRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-Math.PI / 2);

  ctx.fillStyle = 'rgba(40, 30, 20, 0.7)';
  ctx.font = '500 44px "JetBrains Mono"';
  ctx.textAlign = 'center';
  ctx.fillText(track.catalog, 0, -100);

  ctx.fillStyle = 'rgba(30, 20, 10, 0.9)';
  ctx.font = '600 52px "Playfair Display"';
  ctx.fillText(track.title.replace(/<[^>]*>/g, ''), 0, -20);

  ctx.fillStyle = 'rgba(40, 30, 20, 0.7)';
  ctx.font = '400 36px "Playfair Display"';
  ctx.fillText(track.artist, 0, 40);

  ctx.font = '400 24px "JetBrains Mono"';
  ctx.fillStyle = 'rgba(40, 30, 20, 0.5)';
  ctx.fillText('33⅓ RPM', 0, 90);

  ctx.restore();

  // Center hole
  const holeGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28);
  holeGradient.addColorStop(0, '#1a1a1a');
  holeGradient.addColorStop(0.5, '#252525');
  holeGradient.addColorStop(0.8, '#3a3a3a');
  holeGradient.addColorStop(1, '#505050');
  ctx.fillStyle = holeGradient;
  ctx.beginPath();
  ctx.arc(cx, cy, 28, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = 'rgba(150, 150, 155, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, 26, Math.PI * 0.7, Math.PI * 1.7);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(cvs);
  texture.anisotropy = 16;
  return texture;
}

function onResize() {
  const width = canvas.parentElement.clientWidth;
  const height = canvas.parentElement.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

// ============================================
// ANIMATION
// ============================================
function animate() {
  requestAnimationFrame(animate);
  time += 0.016;

  // Parallax effect
  targetRotation.x = mouse.y * 0.08;
  targetRotation.y = mouse.x * 0.12;
  currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
  currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;

  if (compositionGroup) {
    compositionGroup.rotation.x = currentRotation.x;
    compositionGroup.rotation.z = -currentRotation.y * 0.3;
  }

  if (vinyl) {
    // Spin at current speed (controlled by play/pause)
    vinyl.rotation.y += vinylSpinSpeed;

    // Update tonearm position when playing
    if (isPlaying && audio.duration && tonearm && !tonearmAnimating) {
      const songProgress = audio.currentTime / audio.duration;
      updateTonearmPosition(songProgress);
    }

    // Shadow responds to vinyl height
    if (vinylShadow) {
      const heightDiff = vinyl.position.y - vinylOnPosition.y;
      const shadowOpacity = Math.max(0, 0.35 - heightDiff * 0.004);
      const shadowScale = 1 + heightDiff * 0.008;
      vinylShadow.material.opacity = shadowOpacity;
      vinylShadow.scale.setScalar(shadowScale);
    }
  }

  renderer.render(scene, camera);
}

// ============================================
// AUDIO & SOUND-REACTIVE SYSTEM
// ============================================
let audioContext, analyser, dataArray;
let bassAnalyser, bassDataArray;

// Sound reactive state
const soundState = {
  bass: 0,
  mid: 0,
  high: 0,
  bassSmooth: 0,
  highSmooth: 0,
  lastBassHit: 0,
  lastHighHit: 0
};

function setupAudio() {
  if (audioContext) return;
  audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Main analyser for highs/mids
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;
  dataArray = new Uint8Array(analyser.frequencyBinCount);

  // Bass analyser with larger FFT for low frequency precision
  bassAnalyser = audioContext.createAnalyser();
  bassAnalyser.fftSize = 512;
  bassDataArray = new Uint8Array(bassAnalyser.frequencyBinCount);

  const source = audioContext.createMediaElementSource(audio);
  source.connect(analyser);
  source.connect(bassAnalyser);
  analyser.connect(audioContext.destination);
}

function updateSoundReactive() {
  if (!analyser || !isPlaying) return;

  analyser.getByteFrequencyData(dataArray);
  bassAnalyser.getByteFrequencyData(bassDataArray);

  // Calculate frequency bands
  let bassSum = 0;
  for (let i = 0; i < 8; i++) {
    bassSum += bassDataArray[i];
  }
  soundState.bass = bassSum / 8 / 255;

  let highSum = 0;
  for (let i = 20; i < 60; i++) {
    highSum += dataArray[i];
  }
  soundState.high = highSum / 40 / 255;

  // Smooth values
  soundState.bassSmooth += (soundState.bass - soundState.bassSmooth) * 0.12;
  soundState.highSmooth += (soundState.high - soundState.highSmooth) * 0.15;

  // Update visualizer bars
  updateVisualizer();

  requestAnimationFrame(updateSoundReactive);
}

function updateVisualizer() {
  if (!analyser || !bars.length) return;

  const step = Math.floor(dataArray.length / bars.length);
  bars.forEach((bar, i) => {
    const value = dataArray[i * step];
    const height = Math.max(3, (value / 255) * 32);
    bar.style.height = `${height}px`;
  });
}

// ============================================
// AURORA WEBGL BACKGROUND
// ============================================
let auroraGl, auroraProgram, auroraTime = 0;
let auroraBassSmooth = 0, auroraHighSmooth = 0;
let auroraPlaying = 0; // 0 = paused/greyscale, 1 = playing/color
let auroraMouseX = 0.5, auroraMouseY = 0.5; // Target mouse position (0-1)
let auroraMouseSmoothX = 0.5, auroraMouseSmoothY = 0.5; // Smoothed mouse position

// Album palette colors (will be updated per track)
const auroraColors = [
  [0.77, 0.64, 0.35], // Gold
  [0.15, 0.12, 0.08], // Dark brown
  [0.4, 0.3, 0.2],    // Warm brown
  [0.1, 0.08, 0.06]   // Near black
];

function initAurora() {
  if (!auroraCanvas) return;

  auroraGl = auroraCanvas.getContext('webgl') || auroraCanvas.getContext('experimental-webgl');
  if (!auroraGl) return;

  const gl = auroraGl;

  // Vertex shader
  const vsSource = `
    attribute vec2 a_position;
    varying vec2 v_uv;
    void main() {
      v_uv = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  // Fragment shader - Aurora/Gradient mesh effect
  const fsSource = `
    precision mediump float;
    varying vec2 v_uv;
    uniform float u_time;
    uniform float u_bass;
    uniform float u_high;
    uniform float u_playing;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform vec3 u_color1;
    uniform vec3 u_color2;
    uniform vec3 u_color3;
    uniform vec3 u_color4;

    // Simplex noise functions
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                         -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                              + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                              dot(x12.zw,x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    float fbm(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;
      for (int i = 0; i < 4; i++) {
        value += amplitude * snoise(p);
        p *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }

    void main() {
      vec2 uv = v_uv;
      vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);

      // Mouse influence - subtle offset (centered at 0.5, 0.5)
      vec2 mouseOffset = (u_mouse - 0.5) * 0.15;

      // Slow time with bass-reactive breathing
      float t = u_time * 0.08;
      float breathe = 1.0 + u_bass * 0.15;

      // Create organic blob shapes - mouse subtly shifts the noise
      float n1 = fbm(uv * 1.5 * aspect + vec2(t * 0.3, t * 0.2) + mouseOffset);
      float n2 = fbm(uv * 2.0 * aspect + vec2(-t * 0.25, t * 0.15) + 5.0 - mouseOffset * 0.7);
      float n3 = fbm(uv * 1.2 * aspect + vec2(t * 0.2, -t * 0.3) + 10.0 + mouseOffset * 0.5);

      // Add high-frequency turbulence on highs
      float turbulence = u_high * 0.3;
      n1 += fbm(uv * 4.0 + t) * turbulence;

      // Mix colors based on noise
      vec3 color = mix(u_color1, u_color2, smoothstep(-0.3, 0.5, n1));
      color = mix(color, u_color3, smoothstep(-0.2, 0.6, n2));
      color = mix(color, u_color4, smoothstep(0.0, 0.8, n3));

      // Add subtle glow in center
      float centerGlow = 1.0 - length((uv - 0.5) * aspect) * 1.2;
      centerGlow = max(0.0, centerGlow);
      color += u_color1 * centerGlow * 0.15 * breathe;

      // Subtle desaturation when paused (keep 60% color)
      float grey = dot(color, vec3(0.299, 0.587, 0.114));
      vec3 desaturated = mix(vec3(grey), color, 0.6);
      color = mix(desaturated, color, u_playing);

      // Slightly dimmer when paused
      float alpha = mix(0.1, 0.12 + u_bass * 0.03, u_playing);

      gl_FragColor = vec4(color, alpha);
    }
  `;

  // Compile shaders
  const vs = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vs, vsSource);
  gl.compileShader(vs);
  if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
    console.error('Vertex shader error:', gl.getShaderInfoLog(vs));
  }

  const fs = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fs, fsSource);
  gl.compileShader(fs);
  if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
    console.error('Fragment shader error:', gl.getShaderInfoLog(fs));
  }

  // Create program
  auroraProgram = gl.createProgram();
  gl.attachShader(auroraProgram, vs);
  gl.attachShader(auroraProgram, fs);
  gl.linkProgram(auroraProgram);
  if (!gl.getProgramParameter(auroraProgram, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(auroraProgram));
  }
  gl.useProgram(auroraProgram);

  // Set up geometry (full-screen quad)
  const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  const posLoc = gl.getAttribLocation(auroraProgram, 'a_position');
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  // Enable blending
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  resizeAurora();
  window.addEventListener('resize', resizeAurora);

  // Mouse tracking for subtle fog movement
  document.addEventListener('mousemove', (e) => {
    auroraMouseX = e.clientX / window.innerWidth;
    auroraMouseY = e.clientY / window.innerHeight;
  });
}

function resizeAurora() {
  if (!auroraCanvas || !auroraGl) return;
  auroraCanvas.width = window.innerWidth;
  auroraCanvas.height = window.innerHeight;
  auroraGl.viewport(0, 0, auroraCanvas.width, auroraCanvas.height);
}

function updateAurora() {
  if (!auroraGl || !auroraProgram) {
    requestAnimationFrame(updateAurora);
    return;
  }

  const gl = auroraGl;

  // Smooth mouse interpolation (very smooth, minimal)
  auroraMouseSmoothX += (auroraMouseX - auroraMouseSmoothX) * 0.02;
  auroraMouseSmoothY += (auroraMouseY - auroraMouseSmoothY) * 0.02;

  // Only advance time when playing
  if (isPlaying) {
    auroraTime += 0.016;
  }

  // Smooth transition for playing state
  const targetPlaying = isPlaying ? 1 : 0;
  auroraPlaying += (targetPlaying - auroraPlaying) * 0.03;

  // Smooth audio values
  if (analyser && isPlaying) {
    analyser.getByteFrequencyData(dataArray);
    let bass = 0, high = 0;
    for (let i = 0; i < 8; i++) bass += dataArray[i];
    for (let i = 20; i < 60; i++) high += dataArray[i];
    bass = bass / 8 / 255;
    high = high / 40 / 255;
    auroraBassSmooth += (bass - auroraBassSmooth) * 0.08;
    auroraHighSmooth += (high - auroraHighSmooth) * 0.1;
  } else {
    auroraBassSmooth *= 0.95;
    auroraHighSmooth *= 0.95;
  }

  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(auroraProgram);

  // Set uniforms
  gl.uniform1f(gl.getUniformLocation(auroraProgram, 'u_time'), auroraTime);
  gl.uniform1f(gl.getUniformLocation(auroraProgram, 'u_bass'), auroraBassSmooth);
  gl.uniform1f(gl.getUniformLocation(auroraProgram, 'u_high'), auroraHighSmooth);
  gl.uniform1f(gl.getUniformLocation(auroraProgram, 'u_playing'), auroraPlaying);
  gl.uniform2f(gl.getUniformLocation(auroraProgram, 'u_resolution'), auroraCanvas.width, auroraCanvas.height);
  gl.uniform2f(gl.getUniformLocation(auroraProgram, 'u_mouse'), auroraMouseSmoothX, auroraMouseSmoothY);
  gl.uniform3fv(gl.getUniformLocation(auroraProgram, 'u_color1'), auroraColors[0]);
  gl.uniform3fv(gl.getUniformLocation(auroraProgram, 'u_color2'), auroraColors[1]);
  gl.uniform3fv(gl.getUniformLocation(auroraProgram, 'u_color3'), auroraColors[2]);
  gl.uniform3fv(gl.getUniformLocation(auroraProgram, 'u_color4'), auroraColors[3]);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  requestAnimationFrame(updateAurora);
}

// ============================================
// SONG SOUL - Audio-reactive form above vinyl
// ============================================
let songSoul, songSoulMaterial;
let soulTime = 0;

// Simplex noise for shader
const simplexNoiseGLSL = `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`;

function createSongSoul() {
  const track = tracks[currentTrack];
  const soul = track.soul || {
    colorA: [0.77, 0.64, 0.35],
    colorB: [0.55, 0.76, 0.29],
    noiseScale: 1.5,
    noiseSpeed: 0.2,
    baseDisplacement: 0.3,
    bassReactivity: 0.8,
    highReactivity: 0.4,
    fresnelPower: 2.5,
    opacity: 0.85
  };

  // Icosahedron with subdivisions for smooth morphing
  const geometry = new THREE.IcosahedronGeometry(25, 4);

  // Custom shader material
  songSoulMaterial = new THREE.ShaderMaterial({
    uniforms: {
      u_time: { value: 0 },
      u_bass: { value: 0 },
      u_high: { value: 0 },
      u_noiseScale: { value: soul.noiseScale },
      u_noiseSpeed: { value: soul.noiseSpeed },
      u_baseDisplacement: { value: soul.baseDisplacement },
      u_bassReactivity: { value: soul.bassReactivity },
      u_highReactivity: { value: soul.highReactivity },
      u_colorA: { value: new THREE.Vector3(...soul.colorA) },
      u_colorB: { value: new THREE.Vector3(...soul.colorB) },
      u_fresnelPower: { value: soul.fresnelPower },
      u_opacity: { value: soul.opacity }
    },
    vertexShader: `
      ${simplexNoiseGLSL}

      uniform float u_time;
      uniform float u_bass;
      uniform float u_high;
      uniform float u_noiseScale;
      uniform float u_noiseSpeed;
      uniform float u_baseDisplacement;
      uniform float u_bassReactivity;
      uniform float u_highReactivity;

      varying vec3 vNormal;
      varying vec3 vPosition;
      varying float vDisplacement;

      void main() {
        vNormal = normalize(normalMatrix * normal);

        // Calculate displacement based on noise and audio
        vec3 noisePos = position * u_noiseScale + u_time * u_noiseSpeed;
        float noise = snoise(noisePos);

        // Layer multiple noise octaves for more organic feel
        float noise2 = snoise(noisePos * 2.0 + 100.0) * 0.5;
        float noise3 = snoise(noisePos * 4.0 + 200.0) * 0.25;
        float combinedNoise = noise + noise2 + noise3;

        // Audio-reactive displacement
        float bassInfluence = u_bass * u_bassReactivity;
        float highInfluence = u_high * u_highReactivity;

        // Base displacement + bass breathing + high spikiness
        float displacement = u_baseDisplacement * (1.0 + bassInfluence * 0.5);
        displacement += combinedNoise * (displacement + highInfluence * 0.8);

        vDisplacement = displacement;

        // Displace along normal
        vec3 newPosition = position + normal * displacement * 10.0;

        // Add subtle scale breathing with bass
        newPosition *= 1.0 + bassInfluence * 0.15;

        vPosition = newPosition;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 u_colorA;
      uniform vec3 u_colorB;
      uniform float u_fresnelPower;
      uniform float u_opacity;
      uniform float u_bass;

      varying vec3 vNormal;
      varying vec3 vPosition;
      varying float vDisplacement;

      void main() {
        // Fresnel effect for edge glow
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), u_fresnelPower);

        // Mix colors based on displacement and fresnel
        vec3 color = mix(u_colorA, u_colorB, vDisplacement * 2.0 + fresnel * 0.5);

        // Add glow intensity based on fresnel and bass
        float glow = fresnel * (1.0 + u_bass * 0.5);
        color += u_colorB * glow * 0.6;

        // Slight HDR bloom effect
        color = color / (color + vec3(1.0)) * 1.2;

        // Opacity with fresnel edge fade
        float alpha = u_opacity * (0.6 + fresnel * 0.4);

        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  songSoul = new THREE.Mesh(geometry, songSoulMaterial);

  // Position above the vinyl
  songSoul.position.set(vinylOnPosition.x, vinylOnPosition.y + 70, vinylOnPosition.z);

  compositionGroup.add(songSoul);
}

function updateSongSoul() {
  if (!songSoul || !songSoulMaterial) return;

  // Advance time (slower when paused)
  if (isPlaying) {
    soulTime += 0.016;
  } else {
    soulTime += 0.004; // Subtle movement when paused
  }

  songSoulMaterial.uniforms.u_time.value = soulTime;

  // Update audio reactivity
  if (analyser && isPlaying) {
    analyser.getByteFrequencyData(dataArray);

    // Calculate bass (low frequencies)
    let bass = 0;
    for (let i = 0; i < 8; i++) bass += dataArray[i];
    bass = bass / 8 / 255;

    // Calculate highs
    let high = 0;
    for (let i = 20; i < 60; i++) high += dataArray[i];
    high = high / 40 / 255;

    // Smooth interpolation
    const currentBass = songSoulMaterial.uniforms.u_bass.value;
    const currentHigh = songSoulMaterial.uniforms.u_high.value;

    songSoulMaterial.uniforms.u_bass.value += (bass - currentBass) * 0.15;
    songSoulMaterial.uniforms.u_high.value += (high - currentHigh) * 0.2;
  } else {
    // Decay when paused
    songSoulMaterial.uniforms.u_bass.value *= 0.95;
    songSoulMaterial.uniforms.u_high.value *= 0.95;
  }

  // Subtle rotation
  songSoul.rotation.y += 0.002;
  songSoul.rotation.x = Math.sin(soulTime * 0.3) * 0.1;
}

function updateSongSoulParams() {
  if (!songSoulMaterial) return;

  const track = tracks[currentTrack];
  const soul = track.soul;
  if (!soul) return;

  // Smoothly transition to new track's soul parameters
  const uniforms = songSoulMaterial.uniforms;

  uniforms.u_colorA.value.set(...soul.colorA);
  uniforms.u_colorB.value.set(...soul.colorB);
  uniforms.u_noiseScale.value = soul.noiseScale;
  uniforms.u_noiseSpeed.value = soul.noiseSpeed;
  uniforms.u_baseDisplacement.value = soul.baseDisplacement;
  uniforms.u_bassReactivity.value = soul.bassReactivity;
  uniforms.u_highReactivity.value = soul.highReactivity;
  uniforms.u_fresnelPower.value = soul.fresnelPower;
  uniforms.u_opacity.value = soul.opacity;
}

// ============================================
// ASCII SHADER BACKGROUND
// ============================================
let asciiGl, asciiProgram, asciiTexture;
let asciiActive = false;
let asciiColor = [1.0, 0.09, 0.27]; // Default red
let asciiBass = 0, asciiHigh = 0; // Audio reactivity

const asciiVertexShader = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const asciiFragmentShader = `
  precision highp float;
  varying vec2 v_uv;
  uniform sampler2D u_texture;
  uniform vec2 u_resolution;
  uniform vec2 u_videoSize;
  uniform vec3 u_color;
  uniform float u_cellSize;
  uniform float u_time;
  uniform float u_bass;
  uniform float u_high;
  uniform float u_playing;

  // Character bitmaps encoded as floats (5x7 grid = 35 bits)
  // Characters: " .:-=+*#%@"
  float getChar(int index, vec2 pos) {
    // Clamp position to 5x7 grid
    if (pos.x < 0.0 || pos.x >= 5.0 || pos.y < 0.0 || pos.y >= 7.0) return 0.0;

    int x = int(pos.x);
    int y = int(pos.y);
    int bit = y * 5 + x;

    // Character patterns (simplified 5x7)
    // Space
    if (index == 0) return 0.0;

    // . (dot)
    if (index == 1) {
      if (y == 6 && x == 2) return 1.0;
      return 0.0;
    }

    // : (colon)
    if (index == 2) {
      if (x == 2 && (y == 2 || y == 5)) return 1.0;
      return 0.0;
    }

    // - (dash)
    if (index == 3) {
      if (y == 3 && x >= 1 && x <= 3) return 1.0;
      return 0.0;
    }

    // = (equals)
    if (index == 4) {
      if ((y == 2 || y == 4) && x >= 1 && x <= 3) return 1.0;
      return 0.0;
    }

    // + (plus)
    if (index == 5) {
      if ((y == 3 && x >= 1 && x <= 3) || (x == 2 && y >= 1 && y <= 5)) return 1.0;
      return 0.0;
    }

    // * (asterisk)
    if (index == 6) {
      if (x == 2 && y >= 1 && y <= 5) return 1.0;
      if (y == 3 && x >= 0 && x <= 4) return 1.0;
      if ((x == 1 || x == 3) && (y == 2 || y == 4)) return 1.0;
      return 0.0;
    }

    // # (hash)
    if (index == 7) {
      if ((x == 1 || x == 3) && y >= 0 && y <= 6) return 1.0;
      if ((y == 2 || y == 4) && x >= 0 && x <= 4) return 1.0;
      return 0.0;
    }

    // % (percent)
    if (index == 8) {
      if ((x == 0 || x == 1) && (y == 0 || y == 1)) return 1.0;
      if ((x == 3 || x == 4) && (y == 5 || y == 6)) return 1.0;
      if (x == y - 1 || x == y || x == y + 1) return 1.0;
      return 0.0;
    }

    // @ (at)
    if (index == 9) {
      if (y == 0 && x >= 1 && x <= 3) return 1.0;
      if (y == 6 && x >= 1 && x <= 4) return 1.0;
      if (x == 0 && y >= 1 && y <= 5) return 1.0;
      if (x == 4 && y >= 1 && y <= 4) return 1.0;
      if (y == 2 && x >= 2 && x <= 3) return 1.0;
      if (y == 4 && x >= 2 && x <= 4) return 1.0;
      if (x == 2 && y == 3) return 1.0;
      if (x == 3 && y == 3) return 1.0;
      return 0.0;
    }

    return 0.0;
  }

  void main() {
    vec2 cellSize = vec2(u_cellSize * 0.6, u_cellSize); // Aspect ratio for chars
    vec2 cell = floor(gl_FragCoord.xy / cellSize);
    vec2 cellUV = cell * cellSize / u_resolution;

    // Cover-style UV calculation with extra zoom to crop black borders
    float screenAspect = u_resolution.x / u_resolution.y;
    float videoAspect = u_videoSize.x / u_videoSize.y;
    float zoom = 1.4; // Zoom in to crop black borders from video

    vec2 coverUV = cellUV;
    if (screenAspect > videoAspect) {
      // Screen is wider - scale by width, crop top/bottom
      float scale = screenAspect / videoAspect * zoom;
      coverUV.y = (cellUV.y - 0.5) / scale + 0.5;
      coverUV.x = (cellUV.x - 0.5) / zoom + 0.5;
    } else {
      // Screen is taller - scale by height, crop sides
      float scale = videoAspect / screenAspect * zoom;
      coverUV.x = (cellUV.x - 0.5) / scale + 0.5;
      coverUV.y = (cellUV.y - 0.5) / zoom + 0.5;
    }

    // Sample center of cell (flip Y for correct orientation)
    vec2 flippedUV = vec2(coverUV.x, 1.0 - coverUV.y);
    vec4 texColor = texture2D(u_texture, flippedUV);

    // Calculate brightness
    float brightness = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));

    // Map brightness to character index (0-9)
    int charIndex = int(brightness * 9.99);

    // Position within character grid
    vec2 posInCell = mod(gl_FragCoord.xy, cellSize);
    vec2 charPos = posInCell / cellSize * vec2(5.0, 7.0);

    // Get character pixel
    float charPixel = getChar(charIndex, floor(charPos));

    // Audio-reactive intensity
    float bassBoost = 1.0 + u_bass * 0.8;
    float highBoost = 1.0 + u_high * 0.3;

    // Compress bright areas (clouds) - keeps darks visible, tames highlights
    float compressedBrightness = pow(brightness, 1.5); // Darkens bright areas more than dark areas

    // Clamp maximum brightness to prevent blown-out clouds
    float maxBrightness = mix(0.35, 0.5, u_playing); // Lower max when paused
    compressedBrightness = min(compressedBrightness, maxBrightness);

    // Output color - pulses with bass
    vec3 bgColor = vec3(0.0);
    vec3 finalColor = mix(bgColor, u_color, charPixel * compressedBrightness * 0.9 * bassBoost);

    // Add subtle glow that reacts to audio
    finalColor += u_color * compressedBrightness * 0.1 * highBoost;

    // Opacity
    float alpha = charPixel > 0.5 ? 0.9 : compressedBrightness * 0.25;
    alpha *= (0.8 + u_bass * 0.2);

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

function initAsciiShader() {
  if (!asciiCanvas) return;

  asciiGl = asciiCanvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
  if (!asciiGl) return;

  const gl = asciiGl;

  // Compile shaders
  const vs = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vs, asciiVertexShader);
  gl.compileShader(vs);

  const fs = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fs, asciiFragmentShader);
  gl.compileShader(fs);
  if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
    console.error('ASCII fragment shader error:', gl.getShaderInfoLog(fs));
  }

  asciiProgram = gl.createProgram();
  gl.attachShader(asciiProgram, vs);
  gl.attachShader(asciiProgram, fs);
  gl.linkProgram(asciiProgram);
  gl.useProgram(asciiProgram);

  // Geometry
  const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  const posLoc = gl.getAttribLocation(asciiProgram, 'a_position');
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  // Create texture for video
  asciiTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, asciiTexture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  // Blending
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  resizeAsciiCanvas();
  window.addEventListener('resize', resizeAsciiCanvas);
}

function resizeAsciiCanvas() {
  if (!asciiCanvas || !asciiGl) return;
  asciiCanvas.width = window.innerWidth;
  asciiCanvas.height = window.innerHeight;
  asciiGl.viewport(0, 0, asciiCanvas.width, asciiCanvas.height);
}

function updateAsciiShader() {
  if (!asciiGl || !asciiProgram || !asciiActive) {
    if (asciiActive) requestAnimationFrame(updateAsciiShader);
    return;
  }
  if (!asciiSource || asciiSource.readyState < 2) {
    requestAnimationFrame(updateAsciiShader);
    return;
  }

  const gl = asciiGl;

  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(asciiProgram);

  // Update video texture
  gl.bindTexture(gl.TEXTURE_2D, asciiTexture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, asciiSource);

  // Get audio data for reactivity
  if (analyser && isPlaying) {
    analyser.getByteFrequencyData(dataArray);
    let bass = 0, high = 0;
    for (let i = 0; i < 8; i++) bass += dataArray[i];
    for (let i = 20; i < 60; i++) high += dataArray[i];
    bass = bass / 8 / 255;
    high = high / 40 / 255;
    asciiBass += (bass - asciiBass) * 0.15;
    asciiHigh += (high - asciiHigh) * 0.2;
  } else {
    asciiBass *= 0.9;
    asciiHigh *= 0.9;
  }

  // Set uniforms
  gl.uniform2f(gl.getUniformLocation(asciiProgram, 'u_resolution'), asciiCanvas.width, asciiCanvas.height);
  gl.uniform2f(gl.getUniformLocation(asciiProgram, 'u_videoSize'), asciiSource.videoWidth || 1920, asciiSource.videoHeight || 1080);
  gl.uniform3fv(gl.getUniformLocation(asciiProgram, 'u_color'), asciiColor);
  gl.uniform1f(gl.getUniformLocation(asciiProgram, 'u_cellSize'), 12.0); // Character size
  gl.uniform1f(gl.getUniformLocation(asciiProgram, 'u_time'), performance.now() / 1000);
  gl.uniform1f(gl.getUniformLocation(asciiProgram, 'u_bass'), asciiBass);
  gl.uniform1f(gl.getUniformLocation(asciiProgram, 'u_high'), asciiHigh);
  gl.uniform1f(gl.getUniformLocation(asciiProgram, 'u_playing'), isPlaying ? 1.0 : 0.0);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  requestAnimationFrame(updateAsciiShader);
}

function updateAsciiBg(track) {
  if (!asciiCanvas || !asciiSource) return;

  if (track.asciiBg) {
    asciiSource.src = track.asciiBg;
    asciiCanvas.classList.add('active');
    asciiActive = true;

    // Set color from track
    const rgb = hexToRgb(track.accentColor || '#ff1744');
    if (rgb) {
      asciiColor = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
    }

    if (isPlaying) {
      asciiSource.play();
      updateAsciiShader();
    }
  } else {
    asciiCanvas.classList.remove('active');
    asciiActive = false;
    asciiSource.src = '';
    asciiSource.pause();
  }
}

function syncAsciiBg() {
  if (!asciiSource || !asciiSource.src) return;

  if (isPlaying && asciiActive) {
    asciiSource.play();
    updateAsciiShader();
  } else {
    asciiSource.pause();
  }
}

// ============================================
// ARC BARS VISUALIZER (behind vinyl)
// ============================================
const numBars = 20;
const smoothedBarValues = new Array(numBars).fill(0);

function initVizBars() {
  if (!vizBars) return;
  resizeVizBars();
  window.addEventListener('resize', resizeVizBars);
  // Start animation loop immediately so bars can animate down when paused
  updateVizBars();
}

function resizeVizBars() {
  if (!vizBars || !vizBars.parentElement) return;
  vizBars.width = vizBars.parentElement.clientWidth;
  vizBars.height = vizBars.parentElement.clientHeight;
}

function updateVizBars() {
  if (!vizBarsCtx) {
    requestAnimationFrame(updateVizBars);
    return;
  }

  const w = vizBars.width;
  const h = vizBars.height;

  if (w === 0 || h === 0) {
    resizeVizBars();
    requestAnimationFrame(updateVizBars);
    return;
  }

  vizBarsCtx.clearRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h * 0.65;

  // Get target values - either from audio or zero when paused
  const targetValues = new Array(numBars).fill(0);

  if (isPlaying && analyser && dataArray) {
    analyser.getByteFrequencyData(dataArray);
    for (let i = 0; i < numBars; i++) {
      const dataIndex = Math.floor((i / numBars) * (dataArray.length / 2));
      targetValues[i] = dataArray[dataIndex] / 255;
    }
  }

  // Smooth interpolation - bars rise fast, fall slower
  for (let i = 0; i < numBars; i++) {
    const target = targetValues[i];
    const current = smoothedBarValues[i];
    if (target > current) {
      // Rise fast
      smoothedBarValues[i] += (target - current) * 0.3;
    } else {
      // Fall slower (smooth decay)
      smoothedBarValues[i] += (target - current) * 0.08;
    }
  }

  // Calculate overall fade factor for smooth disappearance
  const avgValue = smoothedBarValues.reduce((a, b) => a + b, 0) / numBars;

  // Skip drawing only when completely faded
  if (avgValue < 0.001) {
    requestAnimationFrame(updateVizBars);
    return;
  }

  // Fade multiplier - kicks in when average drops below 0.15
  const fadeMult = Math.min(1, avgValue / 0.15);

  const arcStart = -Math.PI;
  const arcEnd = 0;

  vizBarsCtx.lineCap = 'round';
  for (let i = 0; i < numBars; i++) {
    const angle = arcStart + (i / (numBars - 1)) * (arcEnd - arcStart);
    const value = smoothedBarValues[i];

    // Scale bar length with fade - shrinks to inner radius as it fades
    const baseLength = value * 270 + 60;
    const barLength = 30 + (baseLength - 30) * fadeMult;

    const x1 = cx + Math.cos(angle) * 30;
    const y1 = cy + Math.sin(angle) * 30;
    const x2 = cx + Math.cos(angle) * barLength;
    const y2 = cy + Math.sin(angle) * barLength;

    const centerDist = Math.abs(i - numBars / 2) / (numBars / 2);
    // Scale opacity with fade - goes to 0 as it disappears
    const baseOpacity = 0.4 + value * 0.5 - centerDist * 0.1;
    const opacity = baseOpacity * fadeMult;

    const accent = tracks[currentTrack]?.accentColor || tracks[currentTrack]?.labelColor;
    const rgb = hexToRgb(accent);
    vizBarsCtx.strokeStyle = rgb
      ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
      : `rgba(196, 163, 90, ${opacity})`;
    vizBarsCtx.lineWidth = 30;
    vizBarsCtx.beginPath();
    vizBarsCtx.moveTo(x1, y1);
    vizBarsCtx.lineTo(x2, y2);
    vizBarsCtx.stroke();
  }

  requestAnimationFrame(updateVizBars);
}

// ============================================
// PLAY CONTROLS
// ============================================
function initPlayControls() {
  if (playPill) {
    playPill.addEventListener('click', togglePlay);
  }
}

// ============================================
// STORY BLOCKS - Contextual info reveal
// ============================================
let storyRevealTimers = [];

function startStoryReveal() {
  // Clear any existing timers
  storyRevealTimers.forEach(t => clearTimeout(t));
  storyRevealTimers = [];

  // Hide all blocks first
  storyBlocks.forEach(block => block.classList.remove('visible'));

  // Reveal blocks based on their data-delay attribute (in seconds)
  storyBlocks.forEach(block => {
    const delay = parseInt(block.dataset.delay || '30', 10) * 1000;
    const timer = setTimeout(() => {
      block.classList.add('visible');
    }, delay);
    storyRevealTimers.push(timer);

    // Hide again after showing for a while, then loop
    const hideTimer = setTimeout(() => {
      block.classList.remove('visible');
    }, delay + 15000);
    storyRevealTimers.push(hideTimer);
  });
}

function stopStoryReveal() {
  storyRevealTimers.forEach(t => clearTimeout(t));
  storyRevealTimers = [];
  storyBlocks.forEach(block => block.classList.remove('visible'));
}

// ============================================
// TONEARM
// ============================================
let tonearmAnimating = false;

const tonearmSettings = {
  restRotY: 0,
  restPosX: 0,
  restPosZ: 0,
  startRotY: -0.51,
  startPosX: -150,
  startPosZ: -47,
  endRotY: -0.9,
  endPosX: -190,
  endPosZ: -80
};

function updateTonearmPosition(songProgress) {
  if (!tonearm) return;

  const rotY = tonearmSettings.startRotY + (tonearmSettings.endRotY - tonearmSettings.startRotY) * songProgress;
  const posX = tonearmSettings.startPosX + (tonearmSettings.endPosX - tonearmSettings.startPosX) * songProgress;
  const posZ = tonearmSettings.startPosZ + (tonearmSettings.endPosZ - tonearmSettings.startPosZ) * songProgress;

  tonearm.rotation.y = tonearm.userData.startRotation.y + rotY;
  tonearm.position.x = tonearm.userData.startPosition.x + posX;
  tonearm.position.z = tonearm.userData.startPosition.z + posZ;
}

function animateTonearm(playing) {
  if (!tonearm) return;
  tonearmAnimating = true;
  const duration = 800;
  const start = performance.now();
  const startRot = tonearm.rotation.y;
  const startPosX = tonearm.position.x;
  const startPosZ = tonearm.position.z;

  const targetRot = playing
    ? tonearm.userData.startRotation.y + tonearmSettings.startRotY
    : tonearm.userData.startRotation.y + tonearmSettings.restRotY;
  const targetPosX = playing
    ? tonearm.userData.startPosition.x + tonearmSettings.startPosX
    : tonearm.userData.startPosition.x + tonearmSettings.restPosX;
  const targetPosZ = playing
    ? tonearm.userData.startPosition.z + tonearmSettings.startPosZ
    : tonearm.userData.startPosition.z + tonearmSettings.restPosZ;

  function tick() {
    const progress = Math.min((performance.now() - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    tonearm.rotation.y = startRot + (targetRot - startRot) * eased;
    tonearm.position.x = startPosX + (targetPosX - startPosX) * eased;
    tonearm.position.z = startPosZ + (targetPosZ - startPosZ) * eased;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      tonearmAnimating = false;
    }
  }
  tick();
}

function animateVinylSpeed(from, to, duration) {
  const start = performance.now();
  function tick(time) {
    const progress = Math.min((time - start) / duration, 1);
    const eased = to > from
      ? 1 - Math.pow(1 - progress, 2) // ease-out for speeding up
      : progress * progress; // ease-in for slowing down
    vinylSpinSpeed = from + (to - from) * eased;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// Accelerate vinyl to peak speed
function vinylSpeedUp(duration = 350) {
  return new Promise(resolve => {
    const startTime = performance.now();
    const normalSpeed = 0.025;
    const peakSpeed = 0.2;
    const startSpeed = vinylSpinSpeed;

    function tick(time) {
      const progress = Math.min((time - startTime) / duration, 1);
      // Ease-out for quick acceleration
      const eased = 1 - Math.pow(1 - progress, 2);
      vinylSpinSpeed = startSpeed + (peakSpeed - startSpeed) * eased;

      if (progress >= 1) {
        vinylSpinSpeed = peakSpeed;
        resolve();
        return;
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

// Decelerate vinyl back to normal/stopped
function vinylSlowDown(duration = 400) {
  return new Promise(resolve => {
    const startTime = performance.now();
    const peakSpeed = vinylSpinSpeed;
    const targetSpeed = isPlaying ? 0.025 : 0;

    function tick(time) {
      const progress = Math.min((time - startTime) / duration, 1);
      // Ease-out for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      vinylSpinSpeed = peakSpeed - (peakSpeed - targetSpeed) * eased;

      if (progress >= 1) {
        vinylSpinSpeed = targetSpeed;
        resolve();
        return;
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

// Swap vinyl texture (call during peak speed)
function swapVinylTexture(newIndex) {
  const track = tracks[newIndex];
  createVinylTextureWithCover(track).then(texture => {
    vinyl.material.map = texture;
    vinyl.material.needsUpdate = true;
  });
}

// ============================================
// PLAYBACK
// ============================================
function togglePlay() {
  setupAudio();
  if (isPlaying) {
    isPlaying = false;
    audio.pause();
    document.body.classList.remove('playing');
    // Just decelerate vinyl - tonearm stays
    animateVinylSpeed(0.025, 0, 400);
    stopStoryReveal();
    syncAsciiBg();
  } else {
    isPlaying = true;
    audio.play();
    document.body.classList.add('playing');
    // Accelerate vinyl back to speed
    animateVinylSpeed(0, 0.025, 400);
    // Only animate tonearm if it's not already in position
    if (!tonearmInPosition) {
      animateTonearm(true);
      tonearmInPosition = true;
    }
    updateSoundReactive();
    updateVizBars();
    startStoryReveal();
    syncAsciiBg();
  }
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function loadTrack(index) {
  const track = tracks[index];
  audio.src = track.src;

  // Set accent color CSS custom properties
  const accent = track.accentColor || track.labelColor;
  document.documentElement.style.setProperty('--track-accent', accent);

  // Update aurora colors based on track accent
  const rgb = hexToRgb(accent);
  if (rgb) {
    // Set RGB for CSS animations
    document.documentElement.style.setProperty('--track-accent-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);

    auroraColors[0] = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
    auroraColors[1] = [rgb.r / 255 * 0.2, rgb.g / 255 * 0.2, rgb.b / 255 * 0.2];
    auroraColors[2] = [rgb.r / 255 * 0.5, rgb.g / 255 * 0.5, rgb.b / 255 * 0.5];
    auroraColors[3] = [rgb.r / 255 * 0.1, rgb.g / 255 * 0.1, rgb.b / 255 * 0.1];
  }

  // Update track number
  trackNumber.textContent = track.number;
  bgTrackNumber.textContent = track.number;

  // Update title with word splitting for animation
  trackTitle.innerHTML = track.titleWords.map((word, i) =>
    `<span class="title-word ${i === track.titleWords.length - 1 ? 'title-emphasis' : ''}">` +
    `${i === track.titleWords.length - 1 ? '<em>' + word + '</em>' : word}</span>`
  ).join(' ');

  trackArtist.textContent = track.artist;
  producer.textContent = track.producer;
  album.textContent = track.album;
  year.textContent = track.year;

  // Update pull quote
  if (pullQuote) {
    pullQuote.querySelector('.quote-text').textContent = track.quote;
  }

  // Update story blocks
  if (storyLocation) storyLocation.textContent = track.location;
  if (storySample) storySample.textContent = track.sample;

  // Update album atmosphere background
  if (albumAtmosphere && track.cover) {
    albumAtmosphere.style.backgroundImage = `url(${track.cover})`;
  }

  // Update ASCII background if track has one
  updateAsciiBg(track);

  // Update now playing button
  if (nowPlayingCover) {
    nowPlayingCover.style.backgroundImage = track.cover ? `url(${track.cover})` : '';
    nowPlayingCover.style.backgroundColor = track.labelColor;
  }
  if (nowPlayingTitle) {
    nowPlayingTitle.textContent = track.title.replace(/<[^>]*>/g, '');
  }
  const nowPlayingArtist = document.getElementById('now-playing-artist');
  if (nowPlayingArtist) {
    nowPlayingArtist.textContent = track.artist;
  }

  // Note: Vinyl texture is updated by flipVinylToNewTrack() during transitions
  // This is only needed for initial load
  if (vinyl && !isTransitioning) {
    createVinylTextureWithCover(track).then(texture => {
      vinyl.material.map = texture;
      vinyl.material.needsUpdate = true;
    });
  }
}

// Track transition state
let isTransitioning = false;
const trackHeader = document.getElementById('track-header');

async function transitionToTrack(newIndex) {
  if (isTransitioning || newIndex === currentTrack) return;
  isTransitioning = true;

  // Remember if we were playing
  const wasPlaying = isPlaying;

  // Phase 1: EXIT - text slides out + vinyl speeds up (in parallel)
  if (trackHeader) trackHeader.classList.add('exit');

  await Promise.all([
    vinyl ? vinylSpeedUp(350) : Promise.resolve(),
    new Promise(r => setTimeout(r, 350))
  ]);

  // Phase 2: SWAP - everything changes at peak speed
  if (trackHeader) {
    trackHeader.classList.remove('exit');
    trackHeader.classList.add('enter');
  }

  // Swap vinyl texture during fast spin
  if (vinyl) swapVinylTexture(newIndex);

  currentTrack = newIndex;
  loadTrack(currentTrack);

  // Update menu if open
  if (menuOpen) {
    updateMenuPlayer();
    populateMenu();
  }

  // Resume playback if we were playing
  if (wasPlaying) {
    audio.play();
  }

  void trackHeader?.offsetWidth;

  // Phase 3: ENTER - text slides in + vinyl slows down (in parallel)
  if (trackHeader) trackHeader.classList.remove('enter');

  await Promise.all([
    vinyl ? vinylSlowDown(400) : Promise.resolve(),
    new Promise(r => setTimeout(r, 400))
  ]);

  isTransitioning = false;
}

function nextTrack() {
  transitionToTrack((currentTrack + 1) % tracks.length);
}

function prevTrack() {
  transitionToTrack((currentTrack - 1 + tracks.length) % tracks.length);
}

// ============================================
// PROGRESS
// ============================================
audio.addEventListener('timeupdate', () => {
  const pct = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = `${pct}%`;
  if (scrubber) scrubber.style.left = `${pct}%`;
  timeCurrent.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
  timeTotal.textContent = formatTime(audio.duration);
});

audio.addEventListener('ended', () => {
  // Check queue first, then auto-advance
  if (trackQueue.length > 0) {
    const nextIndex = trackQueue.shift();
    transitionToTrack(nextIndex);
  } else {
    nextTrack();
  }
});

function seekToPosition(clientX) {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  const rect = bar.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));

  if (!audio.duration || isNaN(audio.duration) || audio.duration <= 0) {
    console.log('Audio duration not ready');
    return;
  }

  const newTime = pct * audio.duration;

  // Debug info
  console.log('=== SEEK DEBUG ===');
  console.log('Target time:', newTime);
  console.log('Duration:', audio.duration);
  console.log('ReadyState:', audio.readyState);
  console.log('NetworkState:', audio.networkState);
  console.log('Paused:', audio.paused);
  console.log('Src:', audio.src);

  // Check buffered ranges
  console.log('Buffered ranges:');
  for (let i = 0; i < audio.buffered.length; i++) {
    console.log(`  Range ${i}: ${audio.buffered.start(i)} - ${audio.buffered.end(i)}`);
  }

  // Check if target is in buffered range
  let inBuffer = false;
  for (let i = 0; i < audio.buffered.length; i++) {
    if (newTime >= audio.buffered.start(i) && newTime <= audio.buffered.end(i)) {
      inBuffer = true;
      break;
    }
  }
  console.log('Target in buffer:', inBuffer);

  // Try the seek
  audio.currentTime = newTime;
  console.log('After set, currentTime:', audio.currentTime);
  console.log('=== END DEBUG ===');
}

// Single click handler on progress bar
if (progressBar) {
  progressBar.addEventListener('click', (e) => {
    e.stopPropagation();
    seekToPosition(e.clientX);
  });
}

// Progress bar tooltip
const progressTooltip = document.getElementById('progress-tooltip');
progressBar.addEventListener('mousemove', (e) => {
  const rect = progressBar.getBoundingClientRect();
  const pct = (e.clientX - rect.left) / rect.width;
  const time = pct * audio.duration;
  if (progressTooltip && !isNaN(time)) {
    progressTooltip.textContent = formatTime(time);
    progressTooltip.style.left = `${e.clientX - rect.left}px`;
  }
});

function formatTime(s) {
  if (isNaN(s)) return '0:00';
  return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
}

// ============================================
// SONG MENU
// ============================================
let menuOpen = false;

function openMenu() {
  menuOpen = true;
  populateMenu();
  updateMenuPlayer();

  // Step 1: Hide button, start menu at button size
  menuBtn.classList.add('hidden');
  songMenu.classList.remove('closing');
  songMenu.classList.remove('shrunk');
  songMenu.style.width = '180px';
  songMenu.style.height = '48px';
  songMenu.classList.add('open');
  songMenu.classList.add('expanding');
  menuOverlay.classList.add('open');

  // Step 2: Expand to full size
  setTimeout(() => {
    if (menuOpen) {
      songMenu.style.width = '';
      songMenu.style.height = '';
      songMenu.classList.remove('expanding');
    }
  }, 50);
}

function closeMenu() {
  menuOpen = false;

  // Lock current dimensions
  const currentHeight = songMenu.offsetHeight;
  const currentWidth = songMenu.offsetWidth;
  songMenu.style.height = currentHeight + 'px';
  songMenu.style.width = currentWidth + 'px';

  // Start closing - content fades first
  songMenu.classList.add('closing');
  menuOverlay.classList.remove('open');

  // After content mostly faded, start shrinking
  setTimeout(() => {
    if (!menuOpen) {
      songMenu.style.height = '48px';
      songMenu.style.width = '180px';
      songMenu.classList.add('shrunk');
    }
  }, 100); // Was 50ms, now 100ms - wait for content

  // Button fades in as menu shrinks - crossfade
  setTimeout(() => {
    if (!menuOpen) menuBtn.classList.remove('hidden');
  }, 150); // Was 80ms, now 150ms - better crossfade

  // Clean up after animation completes
  setTimeout(() => {
    if (!menuOpen) {
      songMenu.classList.remove('open');
      songMenu.classList.remove('closing');
      songMenu.classList.remove('shrunk');
      songMenu.style.height = '';
      songMenu.style.width = '';
    }
  }, 350);
}

function toggleMenu() {
  if (menuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

function populateMenu() {
  menuList.innerHTML = '';

  tracks.forEach((track, index) => {
    const item = document.createElement('div');
    item.className = `song-item${index === currentTrack ? ' active' : ''}`;

    // Create cover with fallback color gradient
    const coverStyle = track.cover
      ? `background-image: url('${track.cover}'); background-color: ${track.labelColor}`
      : `background: linear-gradient(135deg, ${track.labelColor} 0%, #1a1a1a 100%)`;

    item.innerHTML = `
      <div class="song-cover" style="${coverStyle}"></div>
      <div class="song-info">
        <div class="song-title">${track.title.replace(/<[^>]*>/g, '')}</div>
        <div class="song-artist">${track.artist}</div>
      </div>
      <div class="song-item-controls">
        <button class="song-item-btn play-btn" data-index="${index}" aria-label="Play now">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
        <button class="song-item-btn queue-btn" data-index="${index}" aria-label="Play next">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14"/>
            <path d="M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
      <div class="song-playing">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>
    `;

    // Click on song info to select
    item.querySelector('.song-info').addEventListener('click', () => {
      selectTrack(index);
    });
    item.querySelector('.song-cover').addEventListener('click', () => {
      selectTrack(index);
    });

    // Play button
    item.querySelector('.play-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      playTrackNow(index);
    });

    // Queue button (play next)
    item.querySelector('.queue-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      addToQueue(index);
    });

    menuList.appendChild(item);
  });
}

// Track queue
let trackQueue = [];

function playTrackNow(index) {
  closeMenu();
  transitionToTrack(index);
  // Start playing if not already
  if (!isPlaying) {
    setTimeout(() => togglePlay(), 500);
  }
}

function addToQueue(index) {
  trackQueue.push(index);
  // Show feedback
  const btn = document.querySelector(`.queue-btn[data-index="${index}"]`);
  if (btn) {
    btn.classList.add('queued');
    btn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
    `;
    setTimeout(() => {
      btn.classList.remove('queued');
      btn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14"/>
          <path d="M12 5l7 7-7 7"/>
        </svg>
      `;
    }, 1500);
  }
}

function selectTrack(index) {
  if (index === currentTrack) {
    closeMenu();
    return;
  }

  closeMenu();
  transitionToTrack(index);
}

// Menu event listeners
menuBtn.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', closeMenu);
menuClose.addEventListener('click', closeMenu);

// Menu mini player controls
if (menuPlayBtn) {
  menuPlayBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePlay();
  });
}

if (menuNextBtn) {
  menuNextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    nextTrack();
    updateMenuPlayer();
  });
}

function updateMenuPlayer() {
  const track = tracks[currentTrack];
  if (menuPlayerCover) {
    menuPlayerCover.style.backgroundImage = track.cover ? `url(${track.cover})` : '';
    menuPlayerCover.style.backgroundColor = track.labelColor;
  }
  if (menuPlayerTitle) {
    menuPlayerTitle.textContent = track.title.replace(/<[^>]*>/g, '');
  }
  if (menuPlayerArtist) {
    menuPlayerArtist.textContent = track.artist;
  }
}

// ============================================
// BUTTON ANIMATIONS
// ============================================
function addRipple(button) {
  button.classList.remove('ripple');
  void button.offsetWidth;
  button.classList.add('ripple');
  setTimeout(() => button.classList.remove('ripple'), 600);
}

function addShoot(button) {
  button.classList.remove('shoot');
  void button.offsetWidth;
  button.classList.add('shoot');
  setTimeout(() => button.classList.remove('shoot'), 300);
}

// ============================================
// EVENTS
// ============================================
canvas.addEventListener('click', () => {
  if (playPill) addRipple(playPill);
  togglePlay();
});

playPill.addEventListener('click', () => {
  addRipple(playPill);
});

prevBtn.addEventListener('click', () => {
  addShoot(prevBtn);
  prevTrack();
});

nextBtn.addEventListener('click', () => {
  addShoot(nextBtn);
  nextTrack();
});

document.addEventListener('keydown', (e) => {
  // Close menu on Escape
  if (e.code === 'Escape' && menuOpen) {
    closeMenu();
    return;
  }

  // Don't process other keys when menu is open
  if (menuOpen) return;

  if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
  if (e.code === 'ArrowRight') nextTrack();
  if (e.code === 'ArrowLeft') prevTrack();
});

// ============================================
// INIT
// ============================================
initThree();
initAurora();
initAsciiShader();
initVizBars();
initPlayControls();
loadTrack(0);

// Start aurora animation loop
requestAnimationFrame(updateAurora);
