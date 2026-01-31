import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// ============================================
// TRACKS
// ============================================
const tracks = [
  {
    title: 'Money <em>Trees</em>',
    artist: 'Kendrick Lamar',
    album: 'good kid, m.A.A.d city',
    producer: 'DJ Dahi',
    year: '2012',
    catalog: 'KL-001',
    number: '01',
    src: 'money-trees.mp3',
    labelColor: '#c4a35a'
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
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const producer = document.getElementById('producer');
const album = document.getElementById('album');
const year = document.getElementById('year');
const timeCurrent = document.getElementById('time-current');
const timeTotal = document.getElementById('time-total');
const progressBar = document.getElementById('progress-bar');
const progressFill = document.getElementById('progress-fill');
const scrubber = document.getElementById('scrubber');
const visualizer = document.getElementById('visualizer');
const bars = visualizer.querySelectorAll('.bar');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

// ============================================
// THREE.JS SETUP
// ============================================
let scene, camera, renderer;
let turntable, tonearm, vinyl;

function initThree() {
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0a0a);

  // Camera - zoomed out, centered
  const aspect = canvas.parentElement.clientWidth / canvas.parentElement.clientHeight;
  camera = new THREE.PerspectiveCamera(35, aspect, 0.1, 1000);
  camera.position.set(0, 180, 400);
  camera.lookAt(0, 20, 0);

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(canvas.parentElement.clientWidth, canvas.parentElement.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  // Environment map for reflections
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x222222);
  const envTexture = pmremGenerator.fromScene(envScene).texture;
  scene.environment = envTexture;

  // Lighting
  setupLighting();

  // Load models
  loadTurntable();
  createVinyl();

  // Start animation
  animate();

  // Handle resize
  window.addEventListener('resize', onResize);
}

function setupLighting() {
  // Ambient
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);

  // Key light - warm
  const keyLight = new THREE.DirectionalLight(0xfff5e6, 1.0);
  keyLight.position.set(100, 200, 150);
  keyLight.castShadow = true;
  scene.add(keyLight);

  // Fill light - cool
  const fillLight = new THREE.DirectionalLight(0xe6f0ff, 0.3);
  fillLight.position.set(-100, 100, 100);
  scene.add(fillLight);

  // Rim light
  const rimLight = new THREE.DirectionalLight(0xffffff, 0.5);
  rimLight.position.set(0, 100, -150);
  scene.add(rimLight);

  // Accent light - brass tint
  const accentLight = new THREE.PointLight(0xc4a35a, 0.4, 300);
  accentLight.position.set(50, 50, 100);
  scene.add(accentLight);
}

function loadTurntable() {
  const loader = new GLTFLoader();
  loader.load('Untitled.gltf', (gltf) => {
    turntable = gltf.scene;

    // Center and scale
    const box = new THREE.Box3().setFromObject(turntable);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    turntable.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 150 / maxDim;
    turntable.scale.setScalar(scale);

    turntable.position.set(0, 0, 0);

    // Find tonearm
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

    scene.add(turntable);
  });
}

// Vinyl position (tuned)
const vinylPosition = { x: -18, y: 33.5, z: 46 };

function createVinyl() {
  const track = tracks[currentTrack];

  // Vinyl geometry
  const radius = 48;
  const thickness = 1.5;
  const geometry = new THREE.CylinderGeometry(radius, radius, thickness, 64);

  // Create vinyl texture
  const texture = createVinylTexture(track);

  // Material - realistic black vinyl
  const material = new THREE.MeshPhysicalMaterial({
    map: texture,
    color: 0x1a1a1a,
    roughness: 0.15,
    metalness: 0.0,
    clearcoat: 0.9,
    clearcoatRoughness: 0.1,
    reflectivity: 0.5,
    envMapIntensity: 0.8,
    sheen: 0.3,
    sheenRoughness: 0.3,
    sheenColor: new THREE.Color(0x222233)
  });

  vinyl = new THREE.Mesh(geometry, material);
  vinyl.position.set(vinylPosition.x, vinylPosition.y, vinylPosition.z);

  scene.add(vinyl);
}

function createVinylTexture(track) {
  const size = 2048; // Higher res for detail
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 8;

  // Base - deep black vinyl
  ctx.fillStyle = '#0a0a0a';
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();

  // Outer rim - slight bevel
  const rimGradient = ctx.createRadialGradient(cx, cy, radius - 15, cx, cy, radius);
  rimGradient.addColorStop(0, 'transparent');
  rimGradient.addColorStop(0.5, 'rgba(40, 40, 42, 0.8)');
  rimGradient.addColorStop(1, 'rgba(25, 25, 27, 1)');
  ctx.fillStyle = rimGradient;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();

  // Lead-in area (outer smooth area)
  ctx.strokeStyle = 'rgba(30, 30, 32, 0.6)';
  for (let r = radius - 8; r > radius - 40; r -= 3) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Main grooves - dense, realistic
  const labelRadius = 280;
  const grooveStart = radius - 45;
  const grooveEnd = labelRadius + 30;

  for (let r = grooveStart; r > grooveEnd; r -= 0.8) {
    // Vary the groove appearance for realism
    const noiseVal = Math.sin(r * 0.7) * Math.cos(r * 0.3);
    const baseGrey = 18 + noiseVal * 4;
    const alpha = 0.4 + Math.abs(noiseVal) * 0.2;

    ctx.strokeStyle = `rgba(${baseGrey}, ${baseGrey}, ${baseGrey + 2}, ${alpha})`;
    ctx.lineWidth = 0.3 + Math.random() * 0.2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Lead-out area (near label)
  for (let r = labelRadius + 25; r > labelRadius + 5; r -= 2.5) {
    ctx.strokeStyle = 'rgba(25, 25, 27, 0.5)';
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }

  // Light reflection bands (the rainbow effect on real vinyl)
  ctx.save();
  ctx.globalCompositeOperation = 'screen';

  // Primary reflection arc
  const reflectGradient = ctx.createConicGradient(Math.PI * 0.25, cx, cy);
  reflectGradient.addColorStop(0, 'rgba(60, 60, 70, 0)');
  reflectGradient.addColorStop(0.1, 'rgba(80, 70, 90, 0.08)');
  reflectGradient.addColorStop(0.15, 'rgba(70, 80, 100, 0.12)');
  reflectGradient.addColorStop(0.2, 'rgba(60, 90, 80, 0.08)');
  reflectGradient.addColorStop(0.25, 'rgba(90, 80, 70, 0.1)');
  reflectGradient.addColorStop(0.3, 'rgba(60, 60, 70, 0)');
  reflectGradient.addColorStop(0.5, 'rgba(60, 60, 70, 0)');
  reflectGradient.addColorStop(0.6, 'rgba(70, 75, 90, 0.06)');
  reflectGradient.addColorStop(0.65, 'rgba(90, 70, 80, 0.08)');
  reflectGradient.addColorStop(0.7, 'rgba(60, 60, 70, 0)');
  reflectGradient.addColorStop(1, 'rgba(60, 60, 70, 0)');

  ctx.fillStyle = reflectGradient;
  ctx.beginPath();
  ctx.arc(cx, cy, radius - 20, 0, Math.PI * 2);
  ctx.arc(cx, cy, labelRadius + 5, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  // Specular highlight
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  const specGradient = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.3, 0, cx, cy, radius);
  specGradient.addColorStop(0, 'rgba(255, 255, 255, 0.06)');
  specGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.02)');
  specGradient.addColorStop(0.6, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = specGradient;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
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

  // Label paper texture
  ctx.save();
  ctx.globalCompositeOperation = 'multiply';
  for (let i = 0; i < 3000; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * labelRadius;
    const x = cx + Math.cos(angle) * dist;
    const y = cy + Math.sin(angle) * dist;
    ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.03})`;
    ctx.fillRect(x, y, 1, 1);
  }
  ctx.restore();

  // Label edge shadow
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, labelRadius, 0, Math.PI * 2);
  ctx.stroke();

  // Label text
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

  // Small details
  ctx.font = '400 24px "JetBrains Mono"';
  ctx.fillStyle = 'rgba(40, 30, 20, 0.5)';
  ctx.fillText('33⅓ RPM', 0, 90);

  ctx.restore();

  // Center hole with spindle adapter look
  const holeGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28);
  holeGradient.addColorStop(0, '#050505');
  holeGradient.addColorStop(0.6, '#0a0a0a');
  holeGradient.addColorStop(0.85, '#1a1a1a');
  holeGradient.addColorStop(1, '#252525');
  ctx.fillStyle = holeGradient;
  ctx.beginPath();
  ctx.arc(cx, cy, 28, 0, Math.PI * 2);
  ctx.fill();

  // Hole inner rim highlight
  ctx.strokeStyle = 'rgba(60, 60, 60, 0.5)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx, cy, 26, Math.PI * 0.75, Math.PI * 1.75);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
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

  // Spin vinyl when playing (around Y axis since it's rotated)
  if (vinyl && isPlaying) {
    vinyl.rotation.y += 0.02;
  }

  renderer.render(scene, camera);
}

// ============================================
// AUDIO CONTEXT & ANALYSER
// ============================================
let audioContext, analyser, dataArray;

function setupAudio() {
  if (audioContext) return;

  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 64;
  dataArray = new Uint8Array(analyser.frequencyBinCount);

  const source = audioContext.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioContext.destination);
}

function updateVisualizer() {
  if (!analyser || !isPlaying) return;

  analyser.getByteFrequencyData(dataArray);

  const step = Math.floor(dataArray.length / bars.length);
  bars.forEach((bar, i) => {
    const value = dataArray[i * step];
    const height = Math.max(4, (value / 255) * 40);
    bar.style.height = `${height}px`;
  });

  requestAnimationFrame(updateVisualizer);
}

// ============================================
// TONEARM ANIMATION
// ============================================
const tonearmPlaying = {
  rotY: -0.7,
  posX: -164,
  posZ: -65
};

function animateTonearm(playing) {
  if (!tonearm) return;

  const duration = 800;
  const start = performance.now();
  const startRot = tonearm.rotation.y;
  const startPosX = tonearm.position.x;
  const startPosZ = tonearm.position.z;

  const targetRot = playing
    ? tonearm.userData.startRotation.y + tonearmPlaying.rotY
    : tonearm.userData.startRotation.y;
  const targetPosX = playing
    ? tonearm.userData.startPosition.x + tonearmPlaying.posX
    : tonearm.userData.startPosition.x;
  const targetPosZ = playing
    ? tonearm.userData.startPosition.z + tonearmPlaying.posZ
    : tonearm.userData.startPosition.z;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function tick() {
    const elapsed = performance.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);

    tonearm.rotation.y = startRot + (targetRot - startRot) * eased;
    tonearm.position.x = startPosX + (targetPosX - startPosX) * eased;
    tonearm.position.z = startPosZ + (targetPosZ - startPosZ) * eased;

    if (progress < 1) {
      requestAnimationFrame(tick);
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
    audio.pause();
    document.body.classList.remove('playing');
    animateTonearm(false);
  } else {
    audio.play();
    document.body.classList.add('playing');
    animateTonearm(true);
    updateVisualizer();
  }

  isPlaying = !isPlaying;
}

function loadTrack(index) {
  const track = tracks[index];

  audio.src = track.src;
  trackNumber.textContent = track.number;
  trackTitle.innerHTML = track.title;
  trackArtist.textContent = track.artist;
  producer.textContent = track.producer;
  album.textContent = track.album;
  year.textContent = track.year;

  // Update vinyl texture
  if (vinyl) {
    vinyl.material.map = createVinylTexture(track);
    vinyl.material.needsUpdate = true;
  }
}

function nextTrack() {
  if (isPlaying) {
    audio.pause();
    document.body.classList.remove('playing');
    animateTonearm(false);
    isPlaying = false;
  }

  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
}

function prevTrack() {
  if (isPlaying) {
    audio.pause();
    document.body.classList.remove('playing');
    animateTonearm(false);
    isPlaying = false;
  }

  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
}

// ============================================
// PROGRESS BAR
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
  isPlaying = false;
});

progressBar.addEventListener('click', (e) => {
  const rect = progressBar.getBoundingClientRect();
  const pct = (e.clientX - rect.left) / rect.width;
  audio.currentTime = pct * audio.duration;
});

function formatTime(s) {
  if (isNaN(s)) return '0:00';
  const mins = Math.floor(s / 60);
  const secs = Math.floor(s % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

// ============================================
// EVENT LISTENERS
// ============================================
canvas.addEventListener('click', togglePlay);

prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    togglePlay();
  }
  if (e.code === 'ArrowRight') nextTrack();
  if (e.code === 'ArrowLeft') prevTrack();
});

// ============================================
// INIT
// ============================================
initThree();
loadTrack(0);
