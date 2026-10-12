import type Lenis from "lenis";

/* The page-wide Lenis instance, so overlays can pause smooth scrolling. */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}
