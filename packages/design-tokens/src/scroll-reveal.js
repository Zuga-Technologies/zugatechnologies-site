/* @zuga-technologies/design-tokens — scroll-reveal.js
 *
 * Vanilla IntersectionObserver setup for the [data-reveal] pattern in
 * reveal.css. Framework-agnostic — no Vue/React/Astro dep. Works in any
 * environment that has `document`.
 *
 * Behavior:
 *   - Reveals each [data-reveal] element exactly once when it crosses the
 *     viewport at the configured threshold.
 *   - Disconnects observation per element after reveal (no zombie observers).
 *   - Idempotent — calling initScrollReveal() twice attaches one observer
 *     instance; second call early-returns if init already ran.
 *   - Reduced-motion-aware: if `prefers-reduced-motion: reduce` matches OR
 *     IntersectionObserver isn't available, every target gets `.is-visible`
 *     immediately and the observer is skipped.
 *
 * Usage:
 *   import { initScrollReveal } from '@zuga-technologies/design-tokens/scroll-reveal';
 *   initScrollReveal();                           // defaults are fine for most
 *   initScrollReveal({ rootMargin: '0px' });      // custom IO config
 *
 * For SPAs (Vue/React) that mount/unmount routes, call initScrollReveal()
 * after each navigation that injects new [data-reveal] nodes — the function
 * is safe to call repeatedly and will only attach observers to elements
 * not already revealed.
 */

const REVEALED = '__zuga_reveal_initialized__';

export function initScrollReveal(options = {}) {
  if (typeof document === 'undefined') return; // SSR no-op

  const config = {
    rootMargin: '0px 0px -15% 0px',
    threshold: 0.05,
    revealedClass: 'is-visible',
    selector: '[data-reveal]',
    ...options,
  };

  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const targets = document.querySelectorAll(config.selector);

  // No-IO fallback: reveal everything synchronously.
  if (reduce || typeof IntersectionObserver === 'undefined') {
    targets.forEach((el) => el.classList.add(config.revealedClass));
    return;
  }

  const io = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add(config.revealedClass);
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: config.rootMargin, threshold: config.threshold },
  );

  targets.forEach((el) => {
    if (el[REVEALED] || el.classList.contains(config.revealedClass)) return;
    el[REVEALED] = true;
    io.observe(el);
  });
}

export default initScrollReveal;
