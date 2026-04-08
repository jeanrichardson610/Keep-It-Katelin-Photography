"use client";

import { useState, useEffect, useRef } from "react";
import "./Slider.css";

/* =========================================================
   DEFAULTS
========================================================= */

const DEFAULT_BACKGROUND = [
  { src: "/images/background-main.png",
  position: "center",
  mobilePosition: "center" }
  ];

/* =========================================================
   IMAGE DATA
========================================================= */

// -----------------------------
// Highlights
// -----------------------------
const highlightsImages = [
  { src: "/images/highlights1.jpg", position: "center" },
  { src: "/images/highlights2.jpg", position: "50% 70%" },
  { src: "/images/highlights3.jpg", position: "50% 30%" },
  { src: "/images/highlights4.jpg", position: "50% 20%" },
  { src: "/images/highlights5.jpg", position: "50% 10%" },
  { src: "/images/highlights6.jpg", position: "50% 80%" },
];

// -----------------------------
// Events
// -----------------------------
const eventImages = [
  { src: "/images/event1.jpg", position: "center" },
  { src: "/images/event2.jpg", position: "50% 70%" },
  { src: "/images/event3.jpg", position: "50% 20%" },
  { src: "/images/event4.jpg", position: "50% 20%" },
  { src: "/images/event5.jpg", position: "50% 60%" },
  { src: "/images/event6.jpg", position: "50% 30%" },
];

// -----------------------------
// Editorial
// -----------------------------
const editorialImages = [
  { src: "/images/editorial1.jpg", position: "50% 20%" },
  { src: "/images/editorial2.jpg", position: "50% 20%" },
  { src: "/images/editorial3.jpg", position: "50% 20%" },
  { src: "/images/editorial4.jpg", position: "50% 20%" },
  { src: "/images/editorial5.jpg", position: "50% 40%" },
  { src: "/images/editorial6.webp", position: "50% 10%" },
];

// -----------------------------
// Portrait
// -----------------------------
const portraitImages = [
  { src: "/images/portrait1.jpg", position: "50% 80%" },
  { src: "/images/portrait2.jpg", position: "center" },
  { src: "/images/portrait3.jpg", position: "50% 30%" },
  { src: "/images/portrait4.jpg", position: "50% 30%" },
  { src: "/images/portrait5.jpg", position: "50% 20%" },
  { src: "/images/portrait6.jpg", position: "50% 40%" },
];

// -----------------------------
// Grads
// -----------------------------
const gradImages = [
  { src: "/images/grad1.jpg", position: "center" },
  { src: "/images/grad2.jpg", position: "50% 70%" },
  { src: "/images/grad3.jpg", position: "50% 10%" },
  { src: "/images/grad4.jpg", position: "50% 60%" },
  { src: "/images/grad5.jpg", position: "50% 10%" },
  { src: "/images/grad6.jpg", position: "50% 20%" },
];

// -----------------------------
// Mental
// -----------------------------
const mentalImages = [
  { src: "/images/mental1.jpg", position: "50% 15%" },
  { src: "/images/mental2.jpg", position: "50% 80%" },
  { src: "/images/mental3.jpg", position: "50% 30%" },
  { src: "/images/mental4.jpg", position: "50% 20%" },
  { src: "/images/mental5.jpg", position: "50% 10%" },
  { src: "/images/mental6.jpg", position: "50% 40%" },
];

// -----------------------------
// Teatime
// -----------------------------
const teatimeImages = [
  { src: "/images/teatime1.jpg", position: "center" },
  { src: "/images/teatime2.jpg", position: "50% 10%" },
  { src: "/images/teatime3.jpg", position: "50% 10%" },
  { src: "/images/teatime4.jpg", position: "50% 20%" },
  { src: "/images/teatime5.jpg", position: "50% 10%" },
  { src: "/images/teatime6.jpg", position: "50% 40%" },
];

// -----------------------------
// About Me
// -----------------------------
const aboutImages = [
  { src: "/images/aboutme.jpg", position: "center" },
  { src: "/images/editorial-pricing.jpg", position: "50% 5%" },
  { src: "/images/event-pricing.jpg", position: "50% 5%" },
  { src: "/images/portrait-pricing.jpg", position: "50% 5%" },
  { src: "/images/senior-session-pricing.jpg", position: "50% 10%" },
];


/* =========================================================
   GALLERIES CONFIG
========================================================= */

const galleries = [
  {
    name: "Highlights",
    images: highlightsImages,
    background: {
      src: "/images/background-main.png",
      position: "center",
      mobilePosition: "center",
    },
  },
  {
    name: "Events",
    images: eventImages,
    background: {
      src: "/images/background-event.jpg",
      position: "center",
      mobilePosition: "35% 40%",
    },
  },
  {
    name: "Editorial",
    images: editorialImages,
    background: {
      src: "/images/background-editorial.jpg",
      position: "50% 10%",
      mobilePosition: "80% 40%",
    },
  },
  {
    name: "Portrait",
    images: portraitImages,
    background: {
      src: "/images/background-portrait.jpg",
      position: "center",
      mobilePosition: "center",
    },
  },
  {
    name: "Grads",
    images: gradImages,
    background: {
      src: "/images/background-grad.jpg",
      position: "center",
      mobilePosition: "center",
    },
  },
  {
    name: "Concept - Mental",
    images: mentalImages,
    background: {
      src: "/images/background-mental.jpg",
      position: "center",
      mobilePosition: "45% 20%",
    },
  },
  {
    name: "Teatime",
    images: teatimeImages,
    background: {
      src: "/images/background-teatime.jpg",
      position: "center",
      mobilePosition: "center",
    },
  },
  {
    name: "About Me & Pricing",
    images: aboutImages,
    background: {
      src: "/images/background-about.jpg",
      position: "center",
      mobilePosition: "center",
    },
  },
];

/* =========================================================
   IMAGE CACHE
========================================================= */

const decodedCache = new Set();

const preloadAndDecode = (src) => {
  if (!src || decodedCache.has(src)) return;

  const img = new Image();
  img.src = src;

  if (img.decode) img.decode().catch(() => {});
  decodedCache.add(src);
};

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
