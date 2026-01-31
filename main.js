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
let time = 0;

const vinylPosition = { x: -18, y: 33.5, z: 46 };

function initThree() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0a0a);

  const aspect = canvas.parentElement.clientWidth / canvas.parentElement.clientHeight;
  camera = new THREE.PerspectiveCamera(35, aspect, 0.1, 1000);
  camera.position.set(0, 180, 400);
  camera.lookAt(0, 20, 0);

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
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

  setupLighting();
  loadTurntable();
  createVinyl();

  window.addEventListener('resize', onResize);
  animate();
}

function setupLighting() {
  scene.add(new THREE.AmbientLight(0xffffff, 0.25));

  const keyLight = new THREE.DirectionalLight(0xfff8f0, 1.2);
  keyLight.position.set(80, 250, 200);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xe0e8ff, 0.3);
  fillLight.position.set(-150, 80, 100);
  scene.add(fillLight);

  const spotLight = new THREE.SpotLight(0xffffff, 2.0, 400, Math.PI / 5, 0.5, 1);
  spotLight.position.set(60, 200, 150);
  spotLight.target.position.set(vinylPosition.x, vinylPosition.y, vinylPosition.z);
  scene.add(spotLight);
  scene.add(spotLight.target);

  const spotLight2 = new THREE.SpotLight(0xffe8d0, 1.0, 350, Math.PI / 6, 0.6, 1);
  spotLight2.position.set(-80, 180, 120);
  spotLight2.target.position.set(vinylPosition.x, vinylPosition.y, vinylPosition.z);
  scene.add(spotLight2);
  scene.add(spotLight2.target);
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

    scene.add(turntable);
  });
}

function createVinylNormalMap() {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 4;

  // Base neutral normal
  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.fillRect(0, 0, size, size);

  // Groove normals - creates depth illusion that catches light
  for (let r = radius - 20; r > 140; r -= 2.0) {
    // Inner edge of groove (shadow side)
    ctx.strokeStyle = 'rgb(90, 128, 255)';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    // Outer edge of groove (highlight side)
    ctx.strokeStyle = 'rgb(166, 128, 255)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(cx, cy, r - 1, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Label area - flat
  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.beginPath();
  ctx.arc(cx, cy, 140, 0, Math.PI * 2);
  ctx.fill();

  // Label raised edge
  ctx.strokeStyle = 'rgb(165, 128, 255)';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(cx, cy, 140, 0, Math.PI * 2);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
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
    normalScale: new THREE.Vector2(0.4, 0.4),
    color: 0xffffff,
    roughness: 0.02,
    metalness: 1.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0,
    reflectivity: 1.0,
    envMapIntensity: 3.0,
    sheen: 0.1,
    sheenRoughness: 0.05,
    sheenColor: new THREE.Color(0xffffff)
  });

  vinyl = new THREE.Mesh(geometry, material);
  vinyl.position.set(vinylPosition.x, vinylPosition.y, vinylPosition.z);
  scene.add(vinyl);
}

function createVinylTexture(track) {
  const size = 2048;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 8;

  // Base - bright polished silver/chrome
  const baseGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  baseGradient.addColorStop(0, '#f5f5f7');
  baseGradient.addColorStop(0.3, '#e8e8ea');
  baseGradient.addColorStop(0.6, '#dcdcde');
  baseGradient.addColorStop(1, '#c8c8ca');
  ctx.fillStyle = baseGradient;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();

  // Rim - polished chrome edge
  const rimGradient = ctx.createRadialGradient(cx, cy, radius - 20, cx, cy, radius);
  rimGradient.addColorStop(0, 'transparent');
  rimGradient.addColorStop(0.4, 'rgba(245, 245, 250, 0.7)');
  rimGradient.addColorStop(0.7, 'rgba(210, 210, 215, 0.9)');
  rimGradient.addColorStop(1, 'rgba(170, 170, 175, 1)');
  ctx.fillStyle = rimGradient;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();

  // Vinyl grooves - visible shiny circles
  const labelRadius = 280;

  // Dark groove lines
  for (let r = radius - 40; r > labelRadius + 25; r -= 2.0) {
    ctx.strokeStyle = 'rgba(80, 80, 85, 0.4)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Shiny highlight between grooves
  for (let r = radius - 41; r > labelRadius + 26; r -= 2.0) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Extra fine detail grooves
  for (let r = radius - 40; r > labelRadius + 25; r -= 4.0) {
    ctx.strokeStyle = 'rgba(60, 60, 65, 0.25)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Bright metallic shine - diagonal reflection
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  const shineGradient = ctx.createLinearGradient(0, 0, size, size);
  shineGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
  shineGradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.3)');
  shineGradient.addColorStop(0.45, 'rgba(255, 255, 255, 0.5)');
  shineGradient.addColorStop(0.55, 'rgba(255, 255, 255, 0.4)');
  shineGradient.addColorStop(0.75, 'rgba(255, 255, 255, 0.15)');
  shineGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = shineGradient;
  ctx.beginPath();
  ctx.arc(cx, cy, radius - 10, 0, Math.PI * 2);
  ctx.arc(cx, cy, labelRadius + 5, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  // Rainbow iridescence - more visible
  ctx.save();
  ctx.globalCompositeOperation = 'overlay';
  const iridescentGradient = ctx.createConicGradient(Math.PI * 0.3, cx, cy);
  iridescentGradient.addColorStop(0, 'rgba(255, 180, 180, 0.15)');
  iridescentGradient.addColorStop(0.17, 'rgba(255, 255, 180, 0.12)');
  iridescentGradient.addColorStop(0.33, 'rgba(180, 255, 180, 0.15)');
  iridescentGradient.addColorStop(0.5, 'rgba(180, 255, 255, 0.12)');
  iridescentGradient.addColorStop(0.67, 'rgba(180, 180, 255, 0.15)');
  iridescentGradient.addColorStop(0.83, 'rgba(255, 180, 255, 0.12)');
  iridescentGradient.addColorStop(1, 'rgba(255, 180, 180, 0.15)');
  ctx.fillStyle = iridescentGradient;
  ctx.beginPath();
  ctx.arc(cx, cy, radius - 15, 0, Math.PI * 2);
  ctx.arc(cx, cy, labelRadius + 10, 0, Math.PI * 2, true);
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

  ctx.font = '400 24px "JetBrains Mono"';
  ctx.fillStyle = 'rgba(40, 30, 20, 0.5)';
  ctx.fillText('33⅓ RPM', 0, 90);

  ctx.restore();

  // Center hole - dark for contrast
  const holeGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28);
  holeGradient.addColorStop(0, '#1a1a1a');
  holeGradient.addColorStop(0.5, '#252525');
  holeGradient.addColorStop(0.8, '#3a3a3a');
  holeGradient.addColorStop(1, '#505050');
  ctx.fillStyle = holeGradient;
  ctx.beginPath();
  ctx.arc(cx, cy, 28, 0, Math.PI * 2);
  ctx.fill();

  // Hole inner rim highlight
  ctx.strokeStyle = 'rgba(150, 150, 155, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, 26, Math.PI * 0.7, Math.PI * 1.7);
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
  time += 0.016;

  if (vinyl && isPlaying) {
    vinyl.rotation.y += 0.025;

    if (vinyl.material.sheenColor) {
      const pulse = Math.sin(time * 2) * 0.1;
      vinyl.material.sheen = 0.5 + pulse;
    }
  }

  renderer.render(scene, camera);
}

// ============================================
// AUDIO
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
    bar.style.height = `${Math.max(4, (value / 255) * 40)}px`;
  });
  requestAnimationFrame(updateVisualizer);
}

// ============================================
// TONEARM
// ============================================
const tonearmPlaying = { rotY: -0.7, posX: -164, posZ: -65 };

function animateTonearm(playing) {
  if (!tonearm) return;
  const duration = 800;
  const start = performance.now();
  const startRot = tonearm.rotation.y;
  const startPosX = tonearm.position.x;
  const startPosZ = tonearm.position.z;

  const targetRot = playing ? tonearm.userData.startRotation.y + tonearmPlaying.rotY : tonearm.userData.startRotation.y;
  const targetPosX = playing ? tonearm.userData.startPosition.x + tonearmPlaying.posX : tonearm.userData.startPosition.x;
  const targetPosZ = playing ? tonearm.userData.startPosition.z + tonearmPlaying.posZ : tonearm.userData.startPosition.z;

  function tick() {
    const progress = Math.min((performance.now() - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    tonearm.rotation.y = startRot + (targetRot - startRot) * eased;
    tonearm.position.x = startPosX + (targetPosX - startPosX) * eased;
    tonearm.position.z = startPosZ + (targetPosZ - startPosZ) * eased;
    if (progress < 1) requestAnimationFrame(tick);
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
  isPlaying = false;
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
loadTrack(0);
