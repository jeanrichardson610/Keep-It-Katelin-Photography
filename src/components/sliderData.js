// sliderData.js

/* =========================================================
   DEFAULTS
========================================================= */
export const DEFAULT_BACKGROUND = [
  {
    src: "/images/background-main.png",
    position: "center",
    mobilePosition: "center",
  },
];

/* =========================================================
   IMAGE DATA
========================================================= */

// Highlights
const highlightsImages = [
  { src: "/images/highlights1.jpg", position: "center" },
  { src: "/images/highlights2.jpg", position: "50% 70%" },
  { src: "/images/highlights3.jpg", position: "50% 30%" },
  { src: "/images/highlights4.jpg", position: "50% 20%" },
  { src: "/images/highlights5.jpg", position: "50% 10%" },
  { src: "/images/highlights6.jpg", position: "50% 80%" },
];

// Events
const eventImages = [
  { src: "/images/event1.jpg", position: "center" },
  { src: "/images/event2.jpg", position: "50% 70%" },
  { src: "/images/event3.jpg", position: "50% 20%" },
  { src: "/images/event4.jpg", position: "50% 20%" },
  { src: "/images/event5.jpg", position: "50% 60%" },
  { src: "/images/event6.jpg", position: "50% 30%" },
];

// Editorial
const editorialImages = [
  { src: "/images/editorial1.jpg", position: "50% 20%" },
  { src: "/images/editorial2.jpg", position: "50% 20%" },
  { src: "/images/editorial3.jpg", position: "50% 20%" },
  { src: "/images/editorial4.jpg", position: "50% 20%" },
  { src: "/images/editorial5.jpg", position: "50% 40%" },
  { src: "/images/editorial6.webp", position: "50% 10%" },
];

// Portrait
const portraitImages = [
  { src: "/images/portrait1.jpg", position: "50% 80%" },
  { src: "/images/portrait2.jpg", position: "center" },
  { src: "/images/portrait3.jpg", position: "50% 30%" },
  { src: "/images/portrait4.jpg", position: "50% 30%" },
  { src: "/images/portrait5.jpg", position: "50% 20%" },
  { src: "/images/portrait6.jpg", position: "50% 40%" },
];

// Grads
const gradImages = [
  { src: "/images/grad1.jpg", position: "center" },
  { src: "/images/grad2.jpg", position: "50% 70%" },
  { src: "/images/grad3.jpg", position: "50% 10%" },
  { src: "/images/grad4.jpg", position: "50% 60%" },
  { src: "/images/grad5.jpg", position: "50% 10%" },
  { src: "/images/grad6.jpg", position: "50% 20%" },
];

// Mental
const mentalImages = [
  { src: "/images/mental1.jpg", position: "50% 15%" },
  { src: "/images/mental2.jpg", position: "50% 80%" },
  { src: "/images/mental3.jpg", position: "50% 30%" },
  { src: "/images/mental4.jpg", position: "50% 20%" },
  { src: "/images/mental5.jpg", position: "50% 10%" },
  { src: "/images/mental6.jpg", position: "50% 40%" },
];

// Teatime
const teatimeImages = [
  { src: "/images/teatime1.jpg", position: "center" },
  { src: "/images/teatime2.jpg", position: "50% 10%" },
  { src: "/images/teatime3.jpg", position: "50% 10%" },
  { src: "/images/teatime4.jpg", position: "50% 20%" },
  { src: "/images/teatime5.jpg", position: "50% 10%" },
  { src: "/images/teatime6.jpg", position: "50% 40%" },
];

// About
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

export const galleries = [
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