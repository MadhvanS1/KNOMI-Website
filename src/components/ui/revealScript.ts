/* The reveal bootstrap, kept in its own file with no CSS import: layout.tsx inlines it,
   and importing Reveal.tsx there would pull Reveal.module.css into the root layout ahead of
   globals.css, which flips the cascade so global classes (.display, .lead…) override the
   section modules that refine them. */

/**
 * Inlined in <head> by layout.tsx, so it runs before first paint and needs nothing
 * from React. Marks reveal elements as in view ([data-in]) from just before they
 * enter (once they are within 6% of the screen's height below its bottom edge, so the
 * 0.7s rise is under way as they arrive), and anything already scrolled past straight away.
 * A MutationObserver picks up elements added later (streaming, client navigation).
 * If the observer first reports more than 2.3s after the first frame (when the CSS
 * failsafe's 2.5s clock starts), it stands down and removes `js`, leaving everything
 * visible rather than hiding it a second time. Timing from the first frame, not from
 * load, keeps reveals working in tabs opened in the background.
 */
export const REVEAL_SCRIPT = `(function(){var w=window,d=document,h=d.documentElement;if(!("IntersectionObserver" in w)||!w.MutationObserver)return;h.classList.add("js");var f0=-1,live=0,io,mo;w.requestAnimationFrame(function(t){f0=t});function stop(){mo.disconnect();io.disconnect();h.classList.remove("js")}io=new IntersectionObserver(function(es){if(!live){if(f0>=0&&performance.now()-f0>2300){stop();return}live=1;h.setAttribute("data-reveal-live","")}for(var i=0;i<es.length;i++){var e=es[i];if(e.isIntersecting||e.boundingClientRect.bottom<=0){e.target.setAttribute("data-in","");io.unobserve(e.target)}}},{rootMargin:"0px 0px 6% 0px"});function add(n){if(n.nodeType!==1)return;if(n.hasAttribute("data-reveal")&&!n.hasAttribute("data-in"))io.observe(n);var l=n.querySelectorAll("[data-reveal]:not([data-in])");for(var i=0;i<l.length;i++)io.observe(l[i])}mo=new MutationObserver(function(rs){for(var i=0;i<rs.length;i++){var a=rs[i].addedNodes;for(var j=0;j<a.length;j++)add(a[j])}});mo.observe(h,{childList:true,subtree:true});add(h)})();`;
