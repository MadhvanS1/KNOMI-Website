"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { bookHref, contact, nav, navLabels, tagline } from "@/content/site";
import { getLenis } from "@/lib/lenis";
import { ArrowRight } from "./ui/Icons";
import Wordmark from "./ui/Wordmark";
import { EASE_DRAWER, EASE_OUT } from "./ui/Reveal";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  // Past the hero (whose own button books a walkthrough): phones then show "Book" in the bar.
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  // True when the menu closed because the visitor jumped to a section.
  const navigatedRef = useRef(false);

  /* A ground under the bar once the page scrolls; tuck away while scrolling down, return on
     the way up. Pages without a hero (#top) count as "past" it after 60% of the first screen. */
  useEffect(() => {
    const hero = document.getElementById("top");
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      if (!hero) setPastHero(y > window.innerHeight * 0.6);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 480);
        lastY = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    // On the homepage: the hero's bottom edge passing under the bar.
    let heroWatch: IntersectionObserver | undefined;
    if (hero) {
      heroWatch = new IntersectionObserver(
        ([entry]) => setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0),
        { rootMargin: "-64px 0px 0px 0px" },
      );
      heroWatch.observe(hero);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      heroWatch?.disconnect();
    };
  }, [pathname]);

  /* Highlight the homepage section currently in view. */
  useEffect(() => {
    if (!isHome) return;
    // Watch every section, not only the ones in the nav, so reading the FAQ or
    // the booking form doesn't leave "What it's worth" highlighted.
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  const close = useCallback(() => setOpen(false), []);

  /* Menu-card links: close the card first, then glide to the section once the
     scroll lock has been released (smooth scrolling is paused while it's open). */
  const goTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    const id = href.startsWith("/#") ? href.slice(2) : null;
    const target = id && isHome ? document.getElementById(id) : null;
    if (!target) {
      setOpen(false);
      return;
    }
    e.preventDefault();
    navigatedRef.current = true;
    setOpen(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        // The header offset comes from `scroll-padding-top` in globals.css.
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(target, { duration: 1 });
        else target.scrollIntoView({ behavior: "auto" });
        history.replaceState(null, "", `#${id}`);
        // Move keyboard focus with the visitor, so the next Tab continues in the section.
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }),
    );
  };

  /* Full-screen menu: lock scroll, Escape to close, return focus on close. */
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    // The menu is for narrow screens: widening past the inline links closes it.
    const wide = window.matchMedia("(min-width: 981px)");
    const onWide = () => {
      if (wide.matches) setOpen(false);
    };
    wide.addEventListener("change", onWide);
    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus({ preventScroll: true }), 250);
    const toggle = toggleRef.current;
    // Keep focus and assistive tech inside the header + menu while it is open.
    const header = toggle?.closest("header");
    const outside = Array.from(document.body.children).filter(
      (el) => el !== header && el.id !== "site-menu" && el.tagName !== "SCRIPT",
    );
    outside.forEach((el) => el.setAttribute("inert", ""));
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
      window.clearTimeout(focusTimer);
      outside.forEach((el) => el.removeAttribute("inert"));
      if (!navigatedRef.current) {
        setHidden(false);
        toggle?.focus();
      }
      navigatedRef.current = false;
    };
  }, [open]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${hidden && !open ? styles.hidden : ""} ${open ? styles.menuOpen : ""}`}
        id="navbar"
        data-motion-safe
      >
        <nav className={styles.bar} aria-label="Main">
          <Link href="/" className={styles.logo} aria-label="KNOMI home" onClick={close}>
            <Wordmark className={styles.logoImg} />
          </Link>

          <ul className={styles.links}>
            {nav.map((link) => {
              const id = link.href.startsWith("/#") ? link.href.slice(2) : null;
              const isActive = id ? active === id : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`${styles.link} ${isActive ? styles.active : ""}`}
                    aria-current={isActive ? (id ? "location" : "page") : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className={styles.actions}>
            {/* Phones: a compact "Book", shown once the hero (with its own button) is behind the visitor. */}
            <a
              href={bookHref}
              className={`btn btn--ink btn--sm ${styles.cta} ${pastHero ? styles.ctaShown : ""}`}
              aria-label={navLabels.book}
              inert={open}
            >
              <span className={styles.ctaFull}>{navLabels.book}</span>
              <span className={styles.ctaShort}>{navLabels.bookShort}</span>
              <ArrowRight className={`btn__arrow ${styles.ctaArrow}`} size={14} />
            </a>
            <button
              ref={toggleRef}
              type="button"
              className={`pressable ${styles.toggle} ${open ? styles.toggleOpen : ""}`}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
            >
              <span className={styles.toggleLabel}>{open ? navLabels.close : navLabels.sections}</span>
              <span className={styles.toggleIcon} aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </nav>
      </header>
      <span id="main-content" tabIndex={-1} className={styles.skipTarget} />

      {/* The sheet drops in from the top (0.4s) and fades away when closed (0.25s), so a jump
          to a section is never held up. Reduced motion: framer-motion's "user" setting (see
          SmoothScroll) drops the movement and keeps the fades. */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            className={`theme-dark ${styles.overlay}`}
            aria-label="Site menu"
            data-lenis-prevent
            initial={{ y: "-100%", opacity: 0 }}
            animate={{
              y: "0%",
              opacity: 1,
              transition: { y: { duration: 0.4, ease: EASE_DRAWER }, opacity: { duration: 0.15, ease: "linear" } },
            }}
            exit={{ opacity: 0, transition: { duration: 0.25, ease: EASE_OUT } }}
          >
            <div className={styles.overlayInner}>
              <ul className={styles.overlayLinks}>
                {nav.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.12 + i * 0.04, ease: EASE_OUT }}
                  >
                    <a
                      href={link.href}
                      ref={i === 0 ? firstLinkRef : undefined}
                      className={styles.overlayLink}
                      onClick={(e) => goTo(e, link.href)}
                    >
                      <span className={styles.overlayLabel}>{link.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                className={styles.overlayFoot}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.2, ease: EASE_OUT }}
              >
                <a href={bookHref} className="btn btn--ink btn--lg" onClick={(e) => goTo(e, bookHref)}>
                  {navLabels.book}
                  <ArrowRight className="btn__arrow" />
                </a>
                <div className={styles.overlayContact}>
                  <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
                  <a href={`mailto:${contact.salesEmail}`}>{contact.salesEmail}</a>
                </div>
                <p className={styles.overlayTagline}>{tagline.join(" ")}</p>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
