import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// ============================================
// TRACKS
// ============================================
const tracks = [
  {
    title: 'Money <em>Trees</em>',
    titleWords: ['Money', 'Trees'],
    artist: 'Kendrick Lamar',
    album: 'good kid, m.A.A.d city',
    producer: 'DJ Dahi',
    year: '2012',
    catalog: 'KL-001',
    number: '01',
    src: 'money-trees.mp3',
    labelColor: '#c4a35a',
    quote: '"it go Halle Berry or hallelujah"',
    location: 'TDE Studios, Carson, CA',
    sample: '"Silver Soul" by Beach House',
    cover: 'cover.jpg'
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

const vinylPosition = { x: -18, y: 33.5, z: 46 };

function initThree() {
  scene = new THREE.Scene();
  // No background - transparent to show visualizer behind

  const aspect = canvas.parentElement.clientWidth / canvas.parentElement.clientHeight;
  camera = new THREE.PerspectiveCamera(35, aspect, 0.1, 1000);
  camera.position.set(0, 180, 400);
  camera.lookAt(0, 20, 0);

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
  vinylSpot.target.position.set(vinylPosition.x, vinylPosition.y, vinylPosition.z);
  scene.add(vinylSpot);
  scene.add(vinylSpot.target);

  // Secondary accent spotlight
  const accentSpot = new THREE.SpotLight(0xffe0c0, 0.8, 400, Math.PI / 7, 0.8, 1.8);
  accentSpot.position.set(-100, 180, 140);
  accentSpot.target.position.set(vinylPosition.x, vinylPosition.y, vinylPosition.z);
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

function createVinyl() {
  const track = tracks[currentTrack];
  const radius = 48;
  const geometry = new THREE.CylinderGeometry(radius, radius, 1.5, 64);

  const texture = createVinylTexture(track);
  const normalMap = createVinylNormalMap();

  const material = new THREE.MeshPhysicalMaterial({
    map: texture,
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
  vinyl.position.set(vinylPosition.x, vinylPosition.y, vinylPosition.z);
  compositionGroup.add(vinyl);
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

  if (vinyl && isPlaying) {
    vinyl.rotation.y += 0.025;

    if (vinyl.material.sheenColor) {
      const pulse = Math.sin(time * 2) * 0.1;
      vinyl.material.sheen = 0.5 + pulse;
    }

    if (audio.duration && tonearm && !tonearmAnimating) {
      const songProgress = audio.currentTime / audio.duration;
      updateTonearmPosition(songProgress);
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
  // Bass: 0-150Hz (first ~6 bins at 44100Hz sample rate with 512 FFT)
  let bassSum = 0;
  for (let i = 0; i < 8; i++) {
    bassSum += bassDataArray[i];
  }
  soundState.bass = bassSum / 8 / 255;

  // High: 4000-12000Hz (bins 23-70 roughly)
  let highSum = 0;
  for (let i = 20; i < 60; i++) {
    highSum += dataArray[i];
  }
  soundState.high = highSum / 40 / 255;

  // Smooth values for gradual effects
  soundState.bassSmooth += (soundState.bass - soundState.bassSmooth) * 0.1;
  soundState.highSmooth += (soundState.high - soundState.highSmooth) * 0.15;

  // Detect bass hits (sudden increase)
  const now = performance.now();
  const bassThreshold = 0.6;
  const highThreshold = 0.5;

  if (soundState.bass > bassThreshold && now - soundState.lastBassHit > 150) {
    soundState.lastBassHit = now;
    triggerBassHit();
  }

  if (soundState.high > highThreshold && now - soundState.lastHighHit > 100) {
    soundState.lastHighHit = now;
    triggerHighHit();
  }

  // Update CSS custom properties for sound-reactive styles
  const root = document.documentElement;
  root.style.setProperty('--bass-scale', 1 + soundState.bassSmooth * 0.02);
  root.style.setProperty('--bass-glow', soundState.bassSmooth);
  root.style.setProperty('--breathe', 1 + soundState.bassSmooth * 0.015);

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
// LARGE BACKGROUND VISUALIZER - Filled Arc Bars
// ============================================
let prevBass = 0;
let prevHigh = 0;

function initVizCanvas() {
  if (!vizCanvas) return;
  setTimeout(resizeVizCanvas, 200);
  window.addEventListener('resize', resizeVizCanvas);
}

function resizeVizCanvas() {
  if (!vizCanvas || !vizCanvas.parentElement) return;
  vizCanvas.width = vizCanvas.parentElement.clientWidth || 800;
  vizCanvas.height = vizCanvas.parentElement.clientHeight || 600;
}

function clearVizCanvas() {
  if (!vizCtx) return;
  vizCtx.clearRect(0, 0, vizCanvas.width, vizCanvas.height);
  prevBass = 0;
  prevHigh = 0;
}

function updateLargeVisualizer() {
  if (!vizCtx || !isPlaying) return;

  const w = vizCanvas.width;
  const h = vizCanvas.height;

  if (w === 0 || h === 0) {
    resizeVizCanvas();
    requestAnimationFrame(updateLargeVisualizer);
    return;
  }

  if (!analyser) {
    requestAnimationFrame(updateLargeVisualizer);
    return;
  }

  // Clear canvas
  vizCtx.clearRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h * 0.55;

  // Get frequency data
  analyser.getByteFrequencyData(dataArray);

  // Calculate bass (kicks) - low frequencies
  let bass = 0;
  for (let i = 0; i < 6; i++) bass += dataArray[i];
  bass = bass / 6 / 255;

  // Calculate high-mids (snares) - 2-8kHz range
  let high = 0;
  for (let i = 15; i < 40; i++) high += dataArray[i];
  high = high / 25 / 255;

  let totalEnergy = 0;
  for (let i = 0; i < dataArray.length; i++) totalEnergy += dataArray[i];
  totalEnergy = totalEnergy / dataArray.length / 255;

  // Transient detection - detect sudden increases (actual hits)
  const bassTransient = bass - prevBass;
  const highTransient = high - prevHigh;
  prevBass = bass * 0.7 + prevBass * 0.3; // Smooth for comparison
  prevHigh = high * 0.7 + prevHigh * 0.3;

  // Only draw if there's actual sound
  if (totalEnergy < 0.02) {
    requestAnimationFrame(updateLargeVisualizer);
    return;
  }

  const arcStart = -Math.PI;
  const arcEnd = 0;
  const numBars = 20;

  // Draw filled arc bars - from center outward
  vizCtx.lineCap = 'round';
  for (let i = 0; i < numBars; i++) {
    const angle = arcStart + (i / (numBars - 1)) * (arcEnd - arcStart);
    const dataIndex = Math.floor((i / numBars) * (dataArray.length / 2));
    const value = dataArray[dataIndex] / 255;

    const barLength = value * 350 + 80;
    const x1 = cx + Math.cos(angle) * 30;
    const y1 = cy + Math.sin(angle) * 30;
    const x2 = cx + Math.cos(angle) * barLength;
    const y2 = cy + Math.sin(angle) * barLength;

    const centerDist = Math.abs(i - numBars / 2) / (numBars / 2);
    const opacity = 0.4 + value * 0.5 - centerDist * 0.1;

    vizCtx.strokeStyle = `rgba(196, 163, 90, ${Math.max(0.15, opacity)})`;
    vizCtx.lineWidth = 30;
    vizCtx.beginPath();
    vizCtx.moveTo(x1, y1);
    vizCtx.lineTo(x2, y2);
    vizCtx.stroke();
  }

  requestAnimationFrame(updateLargeVisualizer);
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

// ============================================
// PLAYBACK
// ============================================
function togglePlay() {
  setupAudio();
  if (isPlaying) {
    isPlaying = false;
    audio.pause();
    document.body.classList.remove('playing');
    animateTonearm(false);
    stopStoryReveal();
    clearVizCanvas();
  } else {
    isPlaying = true;
    audio.play();
    document.body.classList.add('playing');
    animateTonearm(true);
    updateSoundReactive();
    updateLargeVisualizer();
    startStoryReveal();
  }
}

function loadTrack(index) {
  const track = tracks[index];
  audio.src = track.src;

  // Update track number
  trackNumber.textContent = track.number;
  bgTrackNumber.textContent = track.number;

  // Update title with word splitting for animation
  trackTitle.innerHTML = track.titleWords.map((word, i) =>
    `<span class="title-word ${i === track.titleWords.length - 1 ? 'title-emphasis' : ''}">` +
    `${i === track.titleWords.length - 1 ? '<em>' + word + '</em>' : word}</span>`
  ).join('');

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

  if (vinyl) {
    vinyl.material.map = createVinylTexture(track);
    vinyl.material.needsUpdate = true;
  }
}

function nextTrack() {
  if (isPlaying) togglePlay();
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
}

function prevTrack() {
  if (isPlaying) togglePlay();
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
}

// ============================================
// PROGRESS
// ============================================
audio.addEventListener('timeupdate', () => {
  const pct = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = `${pct}%`;
  scrubber.style.left = `${pct}%`;
  timeCurrent.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
  timeTotal.textContent = formatTime(audio.duration);
});

audio.addEventListener('ended', () => {
  document.body.classList.remove('playing');
  animateTonearm(false);
  stopStoryReveal();
  isPlaying = false;
  clearVizCanvas();
});

progressBar.addEventListener('click', (e) => {
  const rect = progressBar.getBoundingClientRect();
  audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
});

function formatTime(s) {
  if (isNaN(s)) return '0:00';
  return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
}

// ============================================
// EVENTS
// ============================================
canvas.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
  if (e.code === 'ArrowRight') nextTrack();
  if (e.code === 'ArrowLeft') prevTrack();
});

// ============================================
// INIT
// ============================================
initThree();
initVizCanvas();
loadTrack(0);
