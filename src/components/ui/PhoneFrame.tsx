import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./PhoneFrame.module.css";

type PhoneFrameProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Overlays rendered inside the screen, above the screenshot. */
  children?: ReactNode;
};

/**
 * A quiet, warm-black device frame around a menu screenshot.
 * Aspect 1:2 so both the tall and the shorter screenshots crop cleanly from the top.
 */
export default function PhoneFrame({ src, alt, priority, sizes, className, children }: PhoneFrameProps) {
  return (
    <div className={`${styles.phone} ${className ?? ""}`}>
      <div className={styles.screen}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes ?? "(max-width: 768px) 70vw, 340px"}
          className={styles.img}
        />
        <span className={styles.island} aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}
