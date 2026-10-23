/*
 * Knomi Sense, drawn as a hand-made brass armillary instrument: a glowing core
 * inside five engraved rings (one per module), a polar axis with its meridian,
 * and a ticked dial around the whole thing. Fine filaments run from each ring's
 * bead to the core, with small sparks travelling along them.
 *
 * Vanilla three.js. SenseCore loads this file with import() only when the
 * section is close to the screen, so three never ships in the main bundle.
 * It renders on demand: the loop runs only while something is moving and the
 * instrument is on screen and the tab is visible. Reduced motion gets a single
 * still frame per state change.
 */
import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  CylinderGeometry,
  DirectionalLight,
  Euler,
  Group,
  InstancedMesh,
  LineBasicMaterial,
  LineLoop,
  LineSegments,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  PointLight,
  Points,
  PointsMaterial,
  Quaternion,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  SRGBColorSpace,
  TorusGeometry,
  Vector3,
  WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export type AstrolabeOptions = {
  canvas: HTMLCanvasElement;
  /** Name tag that follows the active ring's bead. Positioned from here, every frame.
   *  Expected markup: root > [data-tag] (the pill). */
  label?: HTMLElement | null;
  reducedMotion: boolean;
  onContextLost?: () => void;
};

export type AstrolabeHandle = {
  /** Which module ring is in focus (0-4). */
  setActive(index: number): void;
  /** Section scroll progress, 0-1. Turns the instrument. */
  setScroll(progress: number): void;
  /** Pointer position over the instrument, -1..1 on each axis. */
  setPointer(x: number, y: number): void;
  /** On screen or not. `ratio` (0-1) starts the entrance once enough of it shows. */
  setVisible(visible: boolean, ratio?: number): void;
  /** Freezes the idle motion (rotation, orbits, sparks). User-driven motion still plays. */
  setPaused(paused: boolean): void;
  setReducedMotion(reduced: boolean): void;
  dispose(): void;
};

/* ---------- Design ---------- */

const BRASS = new Color(0xb08d57);
const BRASS_FRAME = new Color(0x8a693d);
const BRASS_GLOW = new Color(0xe2ac60);
const SHEATH = new Color(0xffa95c);

/** Visible half-height the camera frames (world units). The dial ticks reach 2.86. */
const FRAME_HALF = 3.12;
const FOV = 30;

const DIAL_R = 2.6;
const TICKS = 120;
const CORE_R = 0.4;

/** The wide, soft bloom around the core. Kept low so the brass reads before the glow. */
const OUTER_HALO = 0.25;

const INTRO_SECONDS = 2.6;
/** Longest side of the drawing buffer, in device pixels, before the pixel ratio is capped. */
const MAX_BUFFER = 1600;

type RingSpec = {
  radius: number;
  /** Inclination of the ring's normal from vertical (rad). 0 = a flat, horizontal ring. */
  incl: number;
  /** Starting azimuth of the normal (rad) and its idle precession (rad/s). */
  az: number;
  spin: number;
  /** Extra precession across the section's scroll (rad). */
  turn: number;
  /** Bead phase (rad) and orbit speed (rad/s). */
  bead: number;
  orbit: number;
};

/* One ring per module, in content order: canvas, host, pulse, dash, compass. */
const RINGS: RingSpec[] = [
  { radius: 1.0, incl: 0.5, az: 0.5, spin: 0.15, turn: 1.5, bead: 0.9, orbit: 0.46 },
  { radius: 1.3, incl: 1.18, az: 2.3, spin: -0.11, turn: -1.2, bead: 2.6, orbit: 0.38 },
  { radius: 1.6, incl: 0.84, az: 4.2, spin: 0.085, turn: 1.0, bead: 4.4, orbit: 0.31 },
  { radius: 1.9, incl: 1.36, az: 1.2, spin: -0.065, turn: -0.8, bead: 5.6, orbit: 0.25 },
  { radius: 2.2, incl: 0.62, az: 5.4, spin: 0.05, turn: 0.65, bead: 1.7, orbit: 0.2 },
];

/* The pose a ring swings to when it is in focus: almost facing the viewer, a touch
   up and to the left so it still reads as a ring in space. */
const FOCUS = new Quaternion().setFromEuler(new Euler(-0.2, -0.24, 0));

/* ---------- Helpers ---------- */

type Spring = { x: number; v: number };

/** Critically damped spring, solved exactly for this step (frame-rate independent).
 *  Starts from rest, glides, settles without overshoot. Returns true while moving. */
function spring(s: Spring, target: number, omega: number, dt: number): boolean {
  const e = s.x - target;
  const k = s.v + omega * e;
  const decay = Math.exp(-omega * dt);
  const next = (e + k * dt) * decay;
  s.v = (s.v - omega * k * dt) * decay;
  s.x = target + next;
  if (Math.abs(next) < 1e-4 && Math.abs(s.v) < 1e-3) {
    s.x = target;
    s.v = 0;
    return false;
  }
  return true;
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - clamp01(t), 3);
const easeInOutSine = (t: number) => 0.5 - Math.cos(Math.PI * clamp01(t)) / 2;
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/** Small deterministic PRNG, so the dust sits in the same place every visit. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function radialTexture(stops: [number, string][], size = 256): CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    for (const [offset, color] of stops) g.addColorStop(offset, color);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

/* ---------- The core: a slow, living ember ---------- */

const CORE_VERTEX = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPos;
  void main() {
    vPos = position;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const CORE_FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform float uPower;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPos;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x), mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x), mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
      f.z
    );
  }

  void main() {
    float facing = clamp(dot(normalize(vNormal), normalize(vView)), 0.0, 1.0);
    float edge = 1.0 - facing;
    vec3 p = vPos * 5.5;
    float n = noise(p + vec3(0.0, uTime * 0.21, uTime * 0.13)) * 0.62
            + noise(p * 2.3 - vec3(uTime * 0.16, 0.0, uTime * 0.09)) * 0.38;

    vec3 hot = vec3(1.0, 0.6, 0.3);
    vec3 ember = vec3(0.86, 0.3, 0.08);
    vec3 deep = vec3(0.42, 0.09, 0.03);

    // Molten swirls: brighter veins drift across the surface.
    float veins = smoothstep(0.45, 0.85, n);
    vec3 col = mix(hot, ember, smoothstep(0.0, 0.75, edge + (0.5 - n) * 0.7));
    col = mix(col, deep, smoothstep(0.55, 1.0, edge) * 0.6);
    col += vec3(1.0, 0.72, 0.42) * veins * (1.0 - edge) * 0.35;
    col += vec3(1.0, 0.55, 0.25) * pow(edge, 3.0) * 0.7;
    col *= uPower;

    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

/* ---------- The instrument ---------- */

export function createAstrolabe({ canvas, label = null, reducedMotion, onContextLost }: AstrolabeOptions): AstrolabeHandle | null {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    return null;
  }

  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const disposables: { dispose(): void }[] = [];
  const keep = <T extends { dispose(): void }>(item: T): T => {
    disposables.push(item);
    return item;
  };

  const scene = new Scene();
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 60);

  /* Light: a soft room reflected in the brass, a warm key from upper left,
     a low amber rim from behind, and the core's own glow. */
  const pmrem = new PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const envTarget = pmrem.fromScene(room, 0.04);
  room.dispose();
  pmrem.dispose();
  scene.environment = envTarget.texture;

  const key = new DirectionalLight(0xffe2bd, 2.3);
  key.position.set(-4, 5, 6);
  const rim = new DirectionalLight(0xffa35a, 1.3);
  rim.position.set(5, -2, -4);
  scene.add(key, rim);

  /* Hierarchy: parallax (pointer) > rig (base tilt + scroll) > parts. */
  const parallax = new Group();
  const rig = new Group();
  parallax.add(rig);
  scene.add(parallax);

  // Materials
  const frameMat = keep(
    new MeshStandardMaterial({ color: BRASS_FRAME, metalness: 1, roughness: 0.46, envMapIntensity: 0.85 }),
  );
  const hairMat = keep(new LineBasicMaterial({ color: BRASS, transparent: true, opacity: 0.32, depthWrite: false }));

  /* --- Core --- */
  const coreUniforms = { uTime: { value: 0 }, uPower: { value: 1 } };
  const core = new Mesh(
    keep(new SphereGeometry(CORE_R, 64, 48)),
    keep(new ShaderMaterial({ uniforms: coreUniforms, vertexShader: CORE_VERTEX, fragmentShader: CORE_FRAGMENT })),
  );
  rig.add(core);

  const haloTexture = keep(
    radialTexture([
      [0, "rgba(255, 214, 160, 1)"],
      [0.18, "rgba(255, 168, 96, 0.55)"],
      [0.42, "rgba(214, 102, 48, 0.16)"],
      [0.7, "rgba(160, 64, 30, 0.04)"],
      [1, "rgba(0, 0, 0, 0)"],
    ]),
  );
  const haloInnerMat = keep(
    new SpriteMaterial({ map: haloTexture, transparent: true, blending: AdditiveBlending, depthWrite: false, opacity: 0.95 }),
  );
  const haloOuterMat = keep(
    new SpriteMaterial({ map: haloTexture, transparent: true, blending: AdditiveBlending, depthWrite: false, opacity: OUTER_HALO }),
  );
  const haloInner = new Sprite(haloInnerMat);
  haloInner.scale.setScalar(2.1);
  const haloOuter = new Sprite(haloOuterMat);
  haloOuter.scale.setScalar(5.6);
  rig.add(haloInner, haloOuter);

  const coreLight = new PointLight(0xff9a50, 6, 0, 2);
  rig.add(coreLight);

  // Two fine gimbals turning around the core: the mechanism at work.
  const gimbalGeo = keep(new TorusGeometry(0.58, 0.007, 8, 120));
  const gimbalGeo2 = keep(new TorusGeometry(0.68, 0.006, 8, 120));
  const gimbalA = new Mesh(gimbalGeo, frameMat);
  const gimbalB = new Mesh(gimbalGeo2, frameMat);
  rig.add(gimbalA, gimbalB);

  /* --- Dial: the outer limb with engraved ticks --- */
  const dial = new Group();
  rig.add(dial);
  dial.add(new Mesh(keep(new TorusGeometry(DIAL_R, 0.028, 12, 256)), frameMat));
  dial.add(new Mesh(keep(new TorusGeometry(DIAL_R - 0.075, 0.006, 6, 256)), frameMat));

  const ticks = new InstancedMesh(keep(new BoxGeometry(1, 1, 1)), frameMat, TICKS);
  {
    const m = new Matrix4();
    const q = new Quaternion();
    const p = new Vector3();
    const s = new Vector3();
    const z = new Vector3(0, 0, 1);
    for (let k = 0; k < TICKS; k++) {
      const a = (k / TICKS) * Math.PI * 2;
      const major = k % 10 === 0;
      const mid = k % 5 === 0;
      const len = major ? 0.2 : mid ? 0.13 : 0.07;
      const r = DIAL_R + 0.05 + len / 2;
      p.set(Math.cos(a) * r, Math.sin(a) * r, 0);
      q.setFromAxisAngle(z, a - Math.PI / 2);
      s.set(major ? 0.016 : 0.009, len, major ? 0.016 : 0.009);
      m.compose(p, q, s);
      ticks.setMatrixAt(k, m);
    }
    ticks.instanceMatrix.needsUpdate = true;
  }
  dial.add(ticks);

  const circle = (r: number, segments = 256) => {
    const pts = new Float32Array(segments * 3);
    for (let k = 0; k < segments; k++) {
      const a = (k / segments) * Math.PI * 2;
      pts[k * 3] = Math.cos(a) * r;
      pts[k * 3 + 1] = Math.sin(a) * r;
    }
    const g = keep(new BufferGeometry());
    g.setAttribute("position", new BufferAttribute(pts, 3));
    return g;
  };
  dial.add(new LineLoop(circle(2.42), hairMat));
  dial.add(new LineLoop(circle(0.84, 128), hairMat));

  /* --- Polar axis and its meridian --- */
  const axis = new Group();
  axis.rotation.z = -0.41; // 23.4°, like a globe's tilt
  rig.add(axis);
  axis.add(new Mesh(keep(new CylinderGeometry(0.011, 0.011, 4.9, 10)), frameMat));
  const finialGeo = keep(new SphereGeometry(0.045, 16, 12));
  const finialTop = new Mesh(finialGeo, frameMat);
  finialTop.position.y = 2.47;
  const finialBottom = new Mesh(finialGeo, frameMat);
  finialBottom.position.y = -2.47;
  axis.add(finialTop, finialBottom);
  const meridian = new Group();
  axis.add(meridian);
  meridian.add(new Mesh(keep(new TorusGeometry(2.42, 0.011, 8, 200)), frameMat));

  /* --- Module rings --- */
  const beadGeo = keep(new SphereGeometry(0.072, 24, 16));
  const beadHaloTexture = keep(
    radialTexture([
      [0, "rgba(255, 220, 170, 1)"],
      [0.3, "rgba(255, 170, 100, 0.4)"],
      [1, "rgba(0, 0, 0, 0)"],
    ], 128),
  );

  type Ring = {
    spec: RingSpec;
    pivot: Group;
    mat: MeshStandardMaterial;
    sheathMat: MeshBasicMaterial;
    bead: Mesh;
    beadHalo: Sprite;
    beadHaloMat: SpriteMaterial;
    focus: Spring;
  };

  const rings: Ring[] = RINGS.map((spec) => {
    const pivot = new Group();
    const mat = keep(
      new MeshStandardMaterial({
        color: BRASS.clone(),
        metalness: 1,
        roughness: 0.4,
        envMapIntensity: 1,
        emissive: BRASS_GLOW,
        emissiveIntensity: 0,
      }),
    );
    const sheathMat = keep(
      new MeshBasicMaterial({ color: SHEATH, transparent: true, opacity: 0, blending: AdditiveBlending, depthWrite: false }),
    );
    pivot.add(new Mesh(keep(new TorusGeometry(spec.radius, 0.022, 14, 220)), mat));
    pivot.add(new Mesh(keep(new TorusGeometry(spec.radius, 0.06, 10, 160)), sheathMat));
    const bead = new Mesh(beadGeo, mat);
    pivot.add(bead);
    const beadHaloMat = keep(
      new SpriteMaterial({ map: beadHaloTexture, transparent: true, blending: AdditiveBlending, depthWrite: false, opacity: 0 }),
    );
    const beadHalo = new Sprite(beadHaloMat);
    beadHalo.scale.setScalar(0.62);
    pivot.add(beadHalo);
    rig.add(pivot);
    return { spec, pivot, mat, sheathMat, bead, beadHalo, beadHaloMat, focus: { x: 0, v: 0 } };
  });

  /* --- Filaments (core to each bead) and the sparks that travel along them --- */
  const filamentPositions = new Float32Array(RINGS.length * 2 * 3);
  const filamentColors = new Float32Array(RINGS.length * 2 * 3);
  const filamentGeo = keep(new BufferGeometry());
  filamentGeo.setAttribute("position", new BufferAttribute(filamentPositions, 3));
  filamentGeo.setAttribute("color", new BufferAttribute(filamentColors, 3));
  const filaments = new LineSegments(
    filamentGeo,
    keep(new LineBasicMaterial({ vertexColors: true, transparent: true, blending: AdditiveBlending, depthWrite: false })),
  );
  filaments.frustumCulled = false;
  scene.add(filaments);

  const dotTexture = keep(
    radialTexture([
      [0, "rgba(255, 236, 205, 1)"],
      [0.35, "rgba(255, 190, 120, 0.55)"],
      [1, "rgba(0, 0, 0, 0)"],
    ], 64),
  );

  const SPARKS_PER_RING = 2;
  const sparkPositions = new Float32Array(RINGS.length * SPARKS_PER_RING * 3);
  const sparkColors = new Float32Array(RINGS.length * SPARKS_PER_RING * 3);
  const sparkGeo = keep(new BufferGeometry());
  sparkGeo.setAttribute("position", new BufferAttribute(sparkPositions, 3));
  sparkGeo.setAttribute("color", new BufferAttribute(sparkColors, 3));
  const sparks = new Points(
    sparkGeo,
    keep(
      new PointsMaterial({
        size: 0.15,
        map: dotTexture,
        vertexColors: true,
        transparent: true,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    ),
  );
  sparks.frustumCulled = false;
  scene.add(sparks);

  /* --- Dust: a little warm air around the instrument --- */
  const DUST = 140;
  const dustPositions = new Float32Array(DUST * 3);
  {
    const rand = mulberry32(7);
    for (let k = 0; k < DUST; k++) {
      const r = 1.1 + rand() * 2.1;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      dustPositions[k * 3] = r * Math.sin(phi) * Math.cos(theta);
      dustPositions[k * 3 + 1] = r * Math.cos(phi) * 0.8;
      dustPositions[k * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
  }
  const dustGeo = keep(new BufferGeometry());
  dustGeo.setAttribute("position", new BufferAttribute(dustPositions, 3));
  const dust = new Points(
    dustGeo,
    keep(
      new PointsMaterial({
        size: 0.045,
        map: dotTexture,
        color: 0xc9935a,
        transparent: true,
        opacity: 0.55,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    ),
  );
  parallax.add(dust);

  /* ---------- State ---------- */

  const state = {
    active: 0,
    visible: false,
    hidden: typeof document !== "undefined" ? document.hidden : false,
    paused: false,
    reduced: reducedMotion,
    scroll: 0.5,
    pointerX: 0,
    pointerY: 0,
    introStarted: reducedMotion,
    intro: reducedMotion ? 1 : 0,
    width: 1,
    height: 1,
    disposed: false,
  };
  rings[0].focus.x = 1;

  const scrollSpring: Spring = { x: 0.5, v: 0 };
  const pointerX: Spring = { x: 0, v: 0 };
  const pointerY: Spring = { x: 0, v: 0 };

  /** Idle clock (s). Advances only while idle motion is allowed. */
  let clock = 0;
  let raf = 0;
  let last = 0;

  /* ---------- Per-frame layout ---------- */

  const qRest = new Quaternion();
  const qTilt = new Quaternion();
  const qAz = new Quaternion();
  const qFocus = new Quaternion();
  const qRigInverse = new Quaternion();
  const X_AXIS = new Vector3(1, 0, 0);
  const Y_AXIS = new Vector3(0, 1, 0);
  const world = new Vector3();
  const projected = new Vector3();

  let tag: HTMLElement | null = label ? label.querySelector<HTMLElement>("[data-tag]") : null;
  let tagW = 0;
  let tagH = 0;
  let flipped = false;

  const measureLabel = () => {
    tag = label ? label.querySelector<HTMLElement>("[data-tag]") : null;
    tagW = tag?.offsetWidth ?? 0;
    tagH = tag?.offsetHeight ?? 0;
  };

  function layout() {
    const s = scrollSpring.x;
    const introCore = easeOutCubic(state.intro / 0.7);

    parallax.rotation.set(pointerY.x * 0.12, pointerX.x * 0.17, 0);
    // Base tilt, the turn across the scroll, and a slow idle sway of the whole piece.
    rig.rotation.set(
      0.42 - (s - 0.5) * 0.36 + Math.sin(clock * 0.09 + 1.2) * 0.035,
      (s - 0.5) * 0.75 + Math.sin(clock * 0.13) * 0.16,
      Math.sin(clock * 0.07 + 0.4) * 0.025,
    );
    qRigInverse.copy(rig.quaternion).invert();
    qFocus.copy(qRigInverse).multiply(FOCUS);

    // Core: breathing ember
    coreUniforms.uTime.value = clock;
    const breath = state.reduced ? 0 : Math.sin(clock * 1.05) * 0.07;
    coreUniforms.uPower.value = (0.98 + breath) * (0.3 + 0.7 * introCore);
    haloInnerMat.opacity = 0.95 * introCore;
    haloOuterMat.opacity = (OUTER_HALO + breath * 0.5) * introCore;
    coreLight.intensity = 6 * introCore;
    gimbalA.rotation.set(clock * 0.42 + 0.6, clock * 0.31, 0.2);
    gimbalB.rotation.set(-clock * 0.27 + 1.4, 0.4, clock * 0.36);

    // Frame: the dial and meridian turn with the scroll
    const introFrame = easeOutCubic(state.intro);
    dial.rotation.z = clock * 0.025 + s * 1.5 - (1 - introFrame) * 0.7;
    meridian.rotation.y = clock * 0.11 + s * 2.4 + 0.6;
    dust.rotation.y = clock * 0.018;

    rings.forEach((ring, i) => {
      const { spec } = ring;
      const k = easeOutCubic((state.intro - i * 0.07) / 0.72);
      const az = spec.az + clock * spec.spin + s * spec.turn + (1 - k) * 1.5;
      qAz.setFromAxisAngle(Y_AXIS, az);
      qTilt.setFromAxisAngle(X_AXIS, spec.incl - Math.PI / 2);
      qRest.copy(qAz).multiply(qTilt);
      const w = easeInOutSine(ring.focus.x);
      ring.pivot.quaternion.slerpQuaternions(qRest, qFocus, w);
      ring.pivot.scale.setScalar(0.84 + 0.16 * k);

      const phi = spec.bead + clock * spec.orbit;
      ring.bead.position.set(Math.cos(phi) * spec.radius, Math.sin(phi) * spec.radius, 0);
      ring.beadHalo.position.copy(ring.bead.position);

      const f = ring.focus.x;
      ring.mat.color.copy(BRASS).multiplyScalar(0.46 + 0.54 * f);
      ring.mat.emissiveIntensity = 0.55 * f;
      ring.mat.roughness = 0.42 - 0.14 * f;
      ring.mat.envMapIntensity = 0.75 + 0.45 * f;
      ring.sheathMat.opacity = 0.15 * f * k;
      ring.beadHaloMat.opacity = 0.9 * f * k;
    });

    scene.updateMatrixWorld(true);

    // Filaments and sparks, in world space (the core sits at the origin).
    const sparkPhase = clock * 0.26;
    rings.forEach((ring, i) => {
      ring.bead.getWorldPosition(world);
      const f = ring.focus.x;
      const k = easeOutCubic((state.intro - 0.25 - i * 0.07) / 0.6);
      const glow = (0.16 + 0.62 * f) * k;
      const o = i * 6;
      filamentPositions[o] = 0;
      filamentPositions[o + 1] = 0;
      filamentPositions[o + 2] = 0;
      filamentPositions[o + 3] = world.x;
      filamentPositions[o + 4] = world.y;
      filamentPositions[o + 5] = world.z;
      filamentColors[o] = 1.0 * glow;
      filamentColors[o + 1] = 0.56 * glow;
      filamentColors[o + 2] = 0.26 * glow;
      filamentColors[o + 3] = 0.5 * glow;
      filamentColors[o + 4] = 0.36 * glow;
      filamentColors[o + 5] = 0.2 * glow;

      for (let j = 0; j < SPARKS_PER_RING; j++) {
        const u = (sparkPhase + i * 0.23 + j * 0.5) % 1;
        // Even sparks flow in (the core learns), odd ones flow out (it guides).
        const t = j % 2 === 0 ? 1 - easeInOutSine(u) : easeInOutSine(u);
        const b = Math.sin(Math.PI * u) * (0.3 + 0.95 * f) * k;
        const p = (i * SPARKS_PER_RING + j) * 3;
        sparkPositions[p] = world.x * t;
        sparkPositions[p + 1] = world.y * t;
        sparkPositions[p + 2] = world.z * t;
        sparkColors[p] = 1.0 * b;
        sparkColors[p + 1] = 0.72 * b;
        sparkColors[p + 2] = 0.42 * b;
      }
    });
    filamentGeo.attributes.position.needsUpdate = true;
    filamentGeo.attributes.color.needsUpdate = true;
    sparkGeo.attributes.position.needsUpdate = true;
    sparkGeo.attributes.color.needsUpdate = true;
  }

  function placeLabel() {
    if (!label) return;
    const ring = rings[state.active];
    if (!ring) return;
    ring.bead.getWorldPosition(world);
    const behind = world.z < 0;
    projected.copy(world).project(camera);
    const x = (projected.x * 0.5 + 0.5) * state.width;
    const y = (-projected.y * 0.5 + 0.5) * state.height;

    // Fade out while the bead passes behind the glowing core.
    const cx = state.width / 2;
    const cy = state.height / 2;
    const coreR = (CORE_R / FRAME_HALF) * (state.height / 2) * 1.15;
    const dist = Math.hypot(x - cx, y - cy);
    const occluded = behind ? 1 - smoothstep(coreR * 0.9, coreR * 1.8, dist) : 0;
    const opacity = Math.pow(ring.focus.x, 2) * (1 - occluded) * easeOutCubic((state.intro - 0.5) / 0.5);

    const margin = 8;
    const half = tagW / 2;
    const clampedX = Math.min(Math.max(x, half + margin), state.width - half - margin);
    const shift = tagW ? clampedX - x : 0;

    const room = y - tagH - 26;
    const shouldFlip = flipped ? room < 18 : room < 6;
    if (shouldFlip !== flipped) {
      flipped = shouldFlip;
      label.dataset.flip = flipped ? "true" : "false";
    }

    label.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    label.style.opacity = opacity.toFixed(3);
    label.style.setProperty("--shift", `${shift.toFixed(1)}px`);
  }

  function draw() {
    layout();
    renderer.render(scene, camera);
    placeLabel();
  }

  /* ---------- Loop ---------- */

  function frame(now: number) {
    raf = 0;
    if (state.disposed) return;
    if (last) watchFrameTime(now - last);
    const dt = last ? Math.min((now - last) / 1000, 1 / 20) : 1 / 60;
    last = now;

    const idle = !state.paused && !state.reduced;
    if (idle) clock += dt;

    let moving = idle;
    if (state.introStarted && state.intro < 1) {
      state.intro = state.reduced ? 1 : Math.min(1, state.intro + dt / INTRO_SECONDS);
      moving = true;
    }

    const snap = state.reduced;
    rings.forEach((ring, i) => {
      const target = i === state.active ? 1 : 0;
      if (snap) {
        ring.focus.x = target;
        ring.focus.v = 0;
      } else if (spring(ring.focus, target, 4.2, dt)) {
        moving = true;
      }
    });
    if (snap) {
      scrollSpring.x = 0.5;
      scrollSpring.v = 0;
      pointerX.x = pointerY.x = 0;
      pointerX.v = pointerY.v = 0;
    } else {
      if (spring(scrollSpring, state.scroll, 5.5, dt)) moving = true;
      if (spring(pointerX, state.pointerX, 3.2, dt)) moving = true;
      if (spring(pointerY, state.pointerY, 3.2, dt)) moving = true;
    }

    draw();

    if (moving) schedule();
    else last = 0;
  }

  function schedule() {
    if (raf || state.disposed || !state.visible || state.hidden) return;
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    last = 0;
  }

  /* ---------- Size & resolution ---------- */

  /* Drawing-buffer resolution: device pixels up to 2x, capped so a very large canvas
     stays near MAX_BUFFER px, and lowered a step at a time if frames run slow. */
  let quality = 1;
  let frameEma = 16.7;
  let framesSinceChange = 0;

  const pixelRatio = () => {
    const device = Math.min(window.devicePixelRatio || 1, 2);
    const capped = Math.min(device, MAX_BUFFER / Math.max(state.width, state.height));
    return Math.max(Math.min(1, device), capped * quality);
  };

  function watchFrameTime(ms: number) {
    if (ms > 250) return; // a stall (tab switch, GC), not a trend
    frameEma = frameEma * 0.9 + ms * 0.1;
    framesSinceChange += 1;
    if (frameEma > 24 && framesSinceChange > 90 && quality > 0.6) {
      quality = Math.max(0.6, quality * 0.8);
      framesSinceChange = 0;
      frameEma = 16.7;
      renderer.setPixelRatio(pixelRatio());
      renderer.setSize(state.width, state.height, false);
    }
  }

  function resize() {
    const w = Math.max(1, canvas.clientWidth);
    const h = Math.max(1, canvas.clientHeight);
    state.width = w;
    state.height = h;
    renderer.setPixelRatio(pixelRatio());
    renderer.setSize(w, h, false);
    const aspect = w / h;
    camera.aspect = aspect;
    const half = Math.tan(((FOV / 2) * Math.PI) / 180);
    camera.position.set(0, 0, FRAME_HALF / (half * Math.min(1, aspect)));
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    measureLabel();
    // setSize clears the drawing buffer: repaint straight away so it never flashes.
    draw();
  }

  const resizeObserver = new ResizeObserver(() => resize());
  resizeObserver.observe(canvas);

  const onVisibility = () => {
    state.hidden = document.hidden;
    if (state.hidden) stop();
    else schedule();
  };
  document.addEventListener("visibilitychange", onVisibility);

  const onLost = (event: Event) => {
    event.preventDefault();
    stop();
    onContextLost?.();
  };
  canvas.addEventListener("webglcontextlost", onLost);

  resize();

  /* ---------- Handle ---------- */

  return {
    setActive(index) {
      const next = Math.min(rings.length - 1, Math.max(0, Math.round(index)));
      if (next !== state.active) {
        state.active = next;
        flipped = false;
        if (label) label.dataset.flip = "false";
      }
      measureLabel();
      if (state.reduced) draw();
      schedule();
    },
    setScroll(progress) {
      const next = clamp01(progress);
      if (Math.abs(next - state.scroll) < 1e-4) return;
      state.scroll = next;
      schedule();
    },
    setPointer(x, y) {
      state.pointerX = Math.max(-1, Math.min(1, x));
      state.pointerY = Math.max(-1, Math.min(1, y));
      schedule();
    },
    setVisible(visible, ratio = visible ? 1 : 0) {
      state.visible = visible;
      if (visible && !state.introStarted && ratio >= 0.2) state.introStarted = true;
      if (visible) schedule();
      else stop();
    },
    setPaused(paused) {
      state.paused = paused;
      schedule();
    },
    setReducedMotion(reduced) {
      state.reduced = reduced;
      if (reduced) {
        state.intro = 1;
        state.introStarted = true;
      }
      schedule();
    },
    dispose() {
      state.disposed = true;
      stop();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost);
      for (const item of disposables) item.dispose();
      envTarget.dispose();
      scene.environment = null;
      renderer.dispose();
    },
  };
}
