"use client";

import { useState, useEffect, useRef } from "react";
import "./Slider.css";
import { galleries, DEFAULT_BACKGROUND } from "./sliderData";
import { preloadAndDecode } from "./imageUtils";

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Slider() {
  /* -----------------------------
     STATE
  ----------------------------- */

  const [activeGallery, setActiveGallery] = useState(0);
  const currentGallery = galleries[activeGallery];

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [isClosing, setIsClosing] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState(null);
  const [isSliding, setIsSliding] = useState(false);

  const [showIntro, setShowIntro] = useState(true);

  const [currentBg, setCurrentBg] = useState(galleries[0].background);
  const [nextBg, setNextBg] = useState(galleries[0].background);
  const [fade, setFade] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  /* -----------------------------
     REFS (touch handling)
  ----------------------------- */

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);
  const wasSwiping = useRef(false);

  /* =========================================================
     EFFECTS
  ========================================================= */

  // Mobile detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Intro timer
  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Preload images
  useEffect(() => {
    const load = (gallery) => {
      preloadAndDecode(gallery.background.src);
      gallery.images.forEach((i) => preloadAndDecode(i.src));
    };

    load(currentGallery);

    const idle =
      typeof window !== "undefined"
        ? window.requestIdleCallback || ((cb) => setTimeout(cb, 200))
        : (cb) => setTimeout(cb, 200);

    idle(() => {
      load(galleries[(activeGallery + 1) % galleries.length]);
      load(
        galleries[(activeGallery - 1 + galleries.length) % galleries.length],
      );
    });
  }, [activeGallery]);

  // Background crossfade
  useEffect(() => {
    const newBg =
      typeof currentGallery.background === "string"
        ? {
            src: currentGallery.background,
            position: "center",
            mobilePosition: "center",
          }
        : currentGallery.background || DEFAULT_BACKGROUND;

    preloadAndDecode(newBg.src);

    setNextBg(newBg);

    requestAnimationFrame(() => {
      setFade(true);

      setTimeout(() => {
        setCurrentBg(newBg);
        setFade(false);
      }, 400);
    });
  }, [activeGallery]);

  // Modal preload
  useEffect(() => {
    if (selectedIndex === null) return;

    const imgs = currentGallery.images;
    const len = imgs.length;

    preloadAndDecode(imgs[(selectedIndex + 1) % len].src);
    preloadAndDecode(imgs[(selectedIndex - 1 + len) % len].src);
  }, [selectedIndex, activeGallery]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      if (e.repeat) return;

      if (e.key === "Escape" && selectedImage) closeModal();

      if (selectedImage) {
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
      } else {
        if (e.key === "ArrowRight") nextGallery();
        if (e.key === "ArrowLeft") prevGallery();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedImage, selectedIndex, activeGallery]);

  /* =========================================================
     NAVIGATION LOGIC
  ========================================================= */

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedImage(null);
      setSelectedIndex(null);
      setIsClosing(false);
    }, 300);
  };

  const changeImage = (newIndex, direction) => {
    if (isSliding) return;

    setSlideDirection(direction);
    setIsSliding(true);

    setTimeout(() => {
      setSelectedIndex(newIndex);
      setSelectedImage(currentGallery.images[newIndex].src);
      setIsSliding(false);
    }, 400);
  };

  const nextImage = () =>
    changeImage((selectedIndex + 1) % currentGallery.images.length, "left");

  const prevImage = () =>
    changeImage(
      (selectedIndex - 1 + currentGallery.images.length) %
        currentGallery.images.length,
      "right",
    );

  const nextGallery = () => {
    setTransitioning(true);
    setTimeout(() => {
      setActiveGallery((p) => (p + 1) % galleries.length);
      setTransitioning(false);
    }, 200);
  };

  const prevGallery = () => {
    setTransitioning(true);
    setTimeout(() => {
      setActiveGallery((p) => (p === 0 ? galleries.length - 1 : p - 1));
      setTransitioning(false);
    }, 200);
  };

  /* =========================================================
     TOUCH HANDLING
  ========================================================= */

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = performance.now();
    wasSwiping.current = false;
  };

  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;

    const dt = performance.now() - touchStartTime.current;
    const velocity = Math.abs(dx) / dt;

    const isFast = velocity > 0.5;
    const horizontal = Math.abs(dx) > Math.abs(dy);
    const threshold = Math.min(window.innerWidth * 0.15, 80);
    const valid = Math.abs(dx) > (isFast ? 20 : threshold);

    // ✅ THIS is my swipe guard
    wasSwiping.current = horizontal && valid;

    if (wasSwiping.current) {
      const direction = dx < 0 ? 1 : -1;

      let steps = 1;

      if (velocity > 1.2) steps = 3;
      else if (velocity > 0.6) steps = 2;

      // ✅ clamp goes RIGHT HERE
      steps = Math.min(steps, 3);

      const newIndex =
        (selectedIndex + direction * steps + currentGallery.images.length) %
        currentGallery.images.length;

      changeImage(newIndex, direction === 1 ? "left" : "right");

      return;
    }
  };

  /* =========================================================
     RENDER
========================================================= */

  return (
    <div className="slider-container">
      {showIntro && (
        <div className="intro-overlay">
          <p className="intro-text">Photography by Katelin</p>
        </div>
      )}

      {/* BACKGROUND */}
      <div className="background-wrapper">
        <div
          className="background"
          style={{
            backgroundImage: `url(${currentBg.src})`,
            backgroundPosition: isMobile
              ? currentBg.mobilePosition || currentBg.position
              : currentBg.position,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            opacity: fade ? 0 : 1,
          }}
        />

        <div
          className="background"
          style={{
            backgroundImage: `url(${nextBg.src})`,
            backgroundPosition: isMobile
              ? nextBg.mobilePosition || nextBg.position
              : nextBg.position,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            opacity: fade ? 1 : 0,
          }}
        />
      </div>

      {/* NAV */}
      <button onClick={prevGallery} id="prev" aria-label="Previous Gallery">
        ‹
      </button>
      <button onClick={nextGallery} id="next" aria-label="Next Gallery">
        ›
      </button>

      {/* GRID */}
      <div className="window box">
        <h1 className="gallery-title">{currentGallery.name}</h1>

        <div className={`gallery-grid ${transitioning ? "out" : "in"}`}>
          {currentGallery.images.map((imgObj, i) => (
            <div className="img-wrap" key={`${activeGallery}-${i}`}>
              <img
                src={imgObj.src}
                alt={imgObj.alt || currentGallery.name}
                style={{
                  animationDelay: `${i * 100}ms`,
                  objectFit: "cover",
                  objectPosition: imgObj.position || "center",
                }}
                onClick={() => {
                  setSelectedImage(imgObj.src);
                  setSelectedIndex(i);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedImage && (
        <div
          className={`modal ${isClosing ? "closing" : ""}`}
          onClick={(e) => {
            if (!wasSwiping.current) closeModal();
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="modal-header">
            {selectedIndex + 1} / {currentGallery.images.length}
          </div>
          <button
            className="modal-nav left"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            aria-label="Previous Image"
          >
            ‹
          </button>

          <img
            key={selectedImage}
            src={selectedImage}
            className={`modal-img ${
              isSliding
                ? slideDirection === "left"
                  ? "slide-left"
                  : "slide-right"
                : ""
            }`}
            aria-label="Next Image"
          />

          <button
            className="modal-nav right"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
