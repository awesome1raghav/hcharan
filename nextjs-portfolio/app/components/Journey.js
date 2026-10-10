'use client';

import { useEffect, useRef } from 'react';

export default function Journey() {
  const timelineRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const timeline = timelineRef.current;
      const fill = fillRef.current;
      if (!timeline || !fill) return;
      const vh = window.innerHeight;
      const r = timeline.getBoundingClientRect();
      const start = vh * 0.75;
      const span = r.height + start - vh * 0.4;
      let p = (start - r.top) / span;
      p = Math.max(0, Math.min(1, p));
      fill.style.height = (p * 100) + '%';
    };
    const onScroll = () => {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="journey" id="journey">
      <div className="wrap">
        <p className="eyebrow reveal">// 04 — JOURNEY</p>
        <h2 className="section-title reveal">THE EVOLUTION</h2>

        <div className="timeline" ref={timelineRef}>
          <div className="timeline__track">
            <div className="timeline__fill" ref={fillRef}></div>
          </div>

          <div className="tl-year reveal">
            <span className="tl-year__label">2024</span>
            <ul className="tl-year__items">
              <li>Started — first lines of code, first real curiosity.</li>
            </ul>
          </div>
          <div className="tl-year reveal">
            <span className="tl-year__label">2025</span>
            <ul className="tl-year__items">
              <li>Built projects end to end.</li>
              <li>Experimented with ML &amp; backends.</li>
              <li>Competitions &amp; hackathons.</li>
            </ul>
          </div>
          <div className="tl-year reveal">
            <span className="tl-year__label">2026</span>
            <ul className="tl-year__items">
              <li>Deeper into AI.</li>
              <li>Agentic systems.</li>
              <li>Real-world projects.</li>
            </ul>
          </div>
          <div className="tl-year tl-year--now reveal">
            <span className="tl-year__label">NOW</span>
            <ul className="tl-year__items">
              <li>Building systems that think.</li>
            </ul>
          </div>
          <div className="tl-year tl-year--next reveal">
            <span className="tl-year__label">WHAT&apos;S NEXT?</span>
            <ul className="tl-year__items">
              <li>Something worth building. Let&apos;s talk.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
