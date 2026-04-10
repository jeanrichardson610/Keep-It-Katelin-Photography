/* =========================================================
   IMAGE CACHE + PRELOAD
========================================================= */

const decodedCache = new Set();

export const preloadAndDecode = (src) => {
  if (!src || decodedCache.has(src)) return;

  const img = new Image();
  img.src = src;

  if (img.decode) {
    img.decode().catch(() => {});
  }

  decodedCache.add(src);
};