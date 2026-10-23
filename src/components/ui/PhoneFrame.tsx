import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import styles from "./PhoneFrame.module.css";

type PhoneFrameProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** The caller's own screen contents (see PhoneScreen), in place of `src`'s screenshot. */
  children?: ReactNode;
};

/** Pixel size of each menu screenshot, so the screen can take the screenshot's own shape. */
const SHOT_SIZE: Record<string, [number, number]> = {
  "/images/menu-preview-dishnav.jpg": [428, 765],
  "/images/menu-preview-orderlist.jpg": [428, 765],
  "/images/menu-preview-dishpage.webp": [720, 1556],
  "/images/host/screens/greet.webp": [720, 1556],
  "/images/host/screens/suggest.webp": [720, 1556],
  "/images/host/screens/guide.webp": [720, 1556],
  "/images/host/screens/story.webp": [720, 1556],
  "/images/host/screens/history.webp": [720, 1556],
  "/images/host/screens/bill.webp": [720, 1556],
};

/** Colours at the top and bottom edge of the shorter screenshots (sampled from the files),
 *  for the status bar above them and the home-bar strip below. */
const SHOT_TONE: Record<string, { top: string; bottom: string; topInk: string }> = {
  "/images/menu-preview-dishnav.jpg": { top: "#f8f0e7", bottom: "#f1efea", topInk: "var(--ink)" },
  "/images/menu-preview-orderlist.jpg": { top: "#605b55", bottom: "#f1ebe0", topInk: "var(--paper)" },
};
const DEFAULT_TONE = { top: "#f3ebdd", bottom: "#f3ebdd", topInk: "var(--ink)" };

/* Device geometry, as fractions of the device's width. BEZEL matches the 3.2% padding in
   PhoneFrame.module.css; the classic device is 1:2, which leaves a screen of 0.936 × 1.936. */
const BEZEL = 0.032;
const SCREEN_W = 1 - BEZEL * 2;
const CLASSIC_SCREEN_H = 2 - BEZEL * 2;
const CLASSIC_SCREEN_RATIO = SCREEN_W / CLASSIC_SCREEN_H;
/** Status bar height as a share of the screen's height; the camera island sits inside it. */
const STATUS_BAR = 0.066;

const round = (n: number) => Math.round(n * 10000) / 10000;
const pct = (n: number) => `${round(n * 100)}%`;

/** The screen's shape (width / height) that shows `src` whole: its own shape when it is taller
 *  than the classic screen, the classic screen otherwise (and for unlisted images). */
export function screenRatioOf(src: string): number {
  const size = SHOT_SIZE[src];
  return size ? Math.min(size[0] / size[1], CLASSIC_SCREEN_RATIO) : CLASSIC_SCREEN_RATIO;
}

/** The device's proportions around a screen of `screenRatio`. */
function deviceVars(screenRatio: number): CSSProperties {
  const phoneRatio = 1 / (SCREEN_W / screenRatio + BEZEL * 2);
  return { "--phone-r": round(phoneRatio), "--screen-r": round(screenRatio) } as CSSProperties;
}

type PhoneScreenProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes: string;
  /** The shape of the screen it sits in (see screenRatioOf). */
  screenRatio: number;
};

/**
 * One KNOMI menu screenshot inside a screen of the given shape, always whole and unaltered:
 * edge to edge when it has the screen's shape, otherwise at full width between a status bar
 * (holding the camera island) and a home-bar strip, each in the screenshot's own edge colour.
 * Callers that cross-fade several screenshots in one device (MenuChapter) stack these.
 */
export function PhoneScreen({ src, alt, priority, sizes, screenRatio }: PhoneScreenProps) {
  const size = SHOT_SIZE[src];
  const ratio = size ? size[0] / size[1] : screenRatio;

  if (!size || ratio <= screenRatio + 0.001) {
    return (
      <>
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={`${styles.img} ${size ? "" : styles.imgTop}`} />
        {!size && <span className={styles.island} aria-hidden="true" />}
      </>
    );
  }

  const tone = SHOT_TONE[src] ?? DEFAULT_TONE;
  const shotH = screenRatio / ratio;
  const top = Math.min(STATUS_BAR, 1 - shotH);
  const bottom = Math.max(0, 1 - shotH - top);
  return (
    <span className={styles.fill} style={{ background: `linear-gradient(${tone.top} 50%, ${tone.bottom} 50%)` }}>
      <span
        className={styles.statusBar}
        style={{ height: `calc(${pct(top)} + 1px)`, backgroundColor: tone.top, color: tone.topInk }}
        aria-hidden="true"
      >
        <StatusBar />
      </span>
      <span className={styles.homeBar} style={{ height: `calc(${pct(bottom)} + 1px)`, backgroundColor: tone.bottom }} aria-hidden="true">
        <span className={styles.homeIndicator} />
      </span>
      <span className={styles.shot} style={{ top: pct(top), height: pct(shotH), "--shot-r": round(ratio) } as CSSProperties}>
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={styles.img} />
      </span>
      <span className={styles.island} aria-hidden="true" />
    </span>
  );
}

/**
 * A quiet, warm-black device frame around a KNOMI menu screenshot, which is always shown
 * whole and unaltered: nothing is cropped and nothing is drawn over it.
 *
 * - Full-height screenshots (720×1556, a modern phone's shape) fill the screen edge to edge,
 *   and the device takes their shape (about 1:2.09).
 * - Shorter screenshots (428×765) keep the classic 1:2 device and sit at full width between a
 *   status bar (holding the camera island) and a home-bar strip, each in the screenshot's own
 *   edge colour. Their own rounded screen corners are kept round, as the device's screen
 *   corners round the full-height ones.
 * - With `children`, the device takes `src`'s shape and the caller fills the screen, usually
 *   with stacked PhoneScreens (pass the tallest screenshot as `src`, so every one fits whole).
 */
export default function PhoneFrame({ src, alt, priority, sizes, className, children }: PhoneFrameProps) {
  const screenRatio = screenRatioOf(src);
  const sizesHint = sizes ?? "(max-width: 768px) 70vw, 340px";

  return (
    <div className={`${styles.phone} ${className ?? ""}`} style={deviceVars(screenRatio)}>
      <div className={styles.screen}>
        {children ?? <PhoneScreen src={src} alt={alt} priority={priority} sizes={sizesHint} screenRatio={screenRatio} />}
      </div>
    </div>
  );
}

/** Clock, signal and battery, drawn to scale with the device (viewBox matches the bar's shape). */
function StatusBar() {
  return (
    <svg className={styles.statusSvg} viewBox="0 0 220 30" preserveAspectRatio="xMidYMid meet">
      <text x="24" y="18" dominantBaseline="central" fontSize="10" fontWeight="600" fill="currentColor">
        9:41
      </text>
      <g transform="translate(176 14.1) scale(0.71)" fill="currentColor">
        <rect x="0" y="7" width="2.6" height="4" rx="0.8" />
        <rect x="4.2" y="5" width="2.6" height="6" rx="0.8" />
        <rect x="8.4" y="2.6" width="2.6" height="8.4" rx="0.8" />
        <rect x="12.6" y="0.4" width="2.6" height="10.6" rx="0.8" />
        <rect x="19.5" y="0.9" width="12" height="9.2" rx="2.6" fill="none" stroke="currentColor" strokeOpacity="0.45" />
        <rect x="21" y="2.4" width="7.6" height="6.2" rx="1.4" />
        <path d="M32.6 4.2v2.6" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    </svg>
  );
}
