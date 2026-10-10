'use client';

import { useEffect, useRef, useState } from 'react';

export default function HeroBackground() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const sourceRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const DEFAULT_SRC = '/assets/hero-bg.mp4';
  const DB_NAME = 'hima-hero';
  const STORE = 'media';
  const KEY = 'bgVideo';

  // IndexedDB helpers
  function openDB() {
    return new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) return reject(new Error('no idb'));
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => req.result.createObjectStore(STORE);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  function idbGet() {
    return openDB().then((db) => {
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readonly');
        const r = tx.objectStore(STORE).get(KEY);
        r.onsuccess = () => resolve(r.result || null);
        r.onerror = () => reject(r.error);
      });
    });
  }

  function playSafely() {
    const video = videoRef.current;
    if (!video) return;
    const p = video.play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => { /* autoplay blocked */ });
    }
  }

  function applyBlob(blob) {
    const video = videoRef.current;
    const source = sourceRef.current;
    if (!video || !source) return;
    const url = URL.createObjectURL(blob);
    source.setAttribute('src', url);
    if (blob.type) source.setAttribute('type', blob.type);
    video.load();
    playSafely();
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlaying = () => setIsPlaying(true);
    const onEmptied = () => setIsPlaying(false);
    const onError = () => setIsPlaying(false);

    video.addEventListener('playing', onPlaying);
    video.addEventListener('emptied', onEmptied);
    video.addEventListener('error', onError);

    // Try to restore saved video, otherwise play default
    idbGet()
      .then((blob) => {
        if (blob) {
          applyBlob(blob);
        } else {
          playSafely();
        }
      })
      .catch(() => playSafely());

    return () => {
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('emptied', onEmptied);
      video.removeEventListener('error', onError);
    };
  }, []);

  return (
    <div className={`hero__bg`} data-playing={isPlaying}>
      <video
        className="hero__video"
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/assets/hero-poster.svg"
      >
        <source ref={sourceRef} src={DEFAULT_SRC} type="video/mp4" />
      </video>
      <div className="hero__fallback" aria-hidden="true" style={{ opacity: isPlaying ? 0 : 1 }}></div>
      <div className="hero__overlay" aria-hidden="true"></div>
      <div className="hero__dissolve" aria-hidden="true"></div>
    </div>
  );
}
