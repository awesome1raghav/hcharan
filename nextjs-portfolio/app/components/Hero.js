'use client';

import { useEffect, useRef, useState } from 'react';
import HeroBackground from './HeroBackground';

export default function Hero() {
  const contentRef = useRef(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Dissolve hero content on scroll
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const el = contentRef.current;
      if (!el) return;
      const y = window.pageYOffset || document.documentElement.scrollTop;
      const vh = window.innerHeight;
      if (y < vh) {
        const t = Math.min(y / (vh * 0.7), 1);
        el.style.opacity = String(1 - t);
        el.style.transform = `translateY(${-t * 40}px)`;
      }
    };
    const onScroll = () => {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Detect video playing state from HeroBackground
  useEffect(() => {
    const checkVideo = () => {
      const video = document.querySelector('.hero__video');
      if (!video) return;
      const onPlaying = () => setVideoPlaying(true);
      const onEmptied = () => setVideoPlaying(false);
      const onError = () => setVideoPlaying(false);
      video.addEventListener('playing', onPlaying);
      video.addEventListener('emptied', onEmptied);
      video.addEventListener('error', onError);
      if (!video.paused) setVideoPlaying(true);
    };
    // Small delay to ensure HeroBackground has mounted
    const timer = setTimeout(checkVideo, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`hero${videoPlaying ? ' is-playing' : ''}`} id="home">
      <HeroBackground />

      {/* Corner decorative marks */}
      <div className="hero__corner-tl" aria-hidden="true"></div>
      <div className="hero__corner-tr" aria-hidden="true"></div>

      {/* Thin vertical guide lines */}
      <div className="hero__guide-left" aria-hidden="true"></div>
      <div className="hero__guide-right" aria-hidden="true"></div>

      {/* Left editorial metadata */}
      <div className="hero__left-meta" aria-hidden="true">
        <div className="hero__meta-group">
          <span className="hero__meta-word">SYSTEMS</span>
          <span className="hero__meta-word">INTELLIGENCE</span>
          <span className="hero__meta-word">AUTOMATION</span>
          <span className="hero__meta-word">AT SCALE</span>
        </div>
        <div className="hero__meta-divider"></div>
        <div className="hero__meta-group">
          <span className="hero__meta-word">BUILD</span>
          <span className="hero__meta-word">LEARN</span>
          <span className="hero__meta-word">SOLVE</span>
          <span className="hero__meta-word">REPEAT</span>
        </div>
      </div>

      {/* Right editorial metadata */}
      <div className="hero__right-meta" aria-hidden="true">
        <div className="hero__meta-group">
          <span className="hero__meta-word">IDEAS</span>
          <span className="hero__meta-word">CODE</span>
          <span className="hero__meta-word">SYSTEMS</span>
          <span className="hero__meta-word">REAL IMPACT</span>
        </div>
        <div className="hero__right-accent"></div>
      </div>

      {/* Hero content (identity + CTA) — centered */}
      <div className="hero__content-wrap" ref={contentRef}>
        <div className="hero__identity">
          <p className="hero__eyebrow">// PORTFOLIO — 2026</p>
          <h1 className="hero__title">HIMA CHARAN</h1>
          <p className="hero__tagline">AI&nbsp; &nbsp;|&nbsp; &nbsp;BACKEND&nbsp; &nbsp;|&nbsp; &nbsp;AGENTIC&nbsp;AI</p>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="hero__actions">
        <a className="btn btn--primary" href="#projects">VIEW WORK</a>
        <a className="btn btn--ghost" href="#contact">GET IN TOUCH</a>
      </div>

      {/* Bottom-left micro label */}
      <div className="hero__bottom-label" aria-hidden="true">
        <span className="hero__bottom-label-text">// MORE THAN A PORTFOLIO</span>
        <span className="hero__bottom-label-line"></span>
      </div>

      {/* Bottom-right coordinates */}
      <div className="hero__coordinates" aria-hidden="true">
        <div className="hero__coord-line">17.3850° N</div>
        <div className="hero__coord-line">78.4867° E</div>
      </div>

      {/* Scroll indicator */}
      <a className="hero__scroll" href="#about" aria-label="Scroll to about">
        <div className="hero__scroll-mouse">
          <span className="hero__scroll-dot"></span>
        </div>
        <span className="hero__scroll-text">SCROLL</span>
      </a>
    </section>
  );
}
