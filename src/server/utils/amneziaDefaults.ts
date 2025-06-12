/**
 * Generate random default values for AmneziaWG parameters
 * Based on reference implementation from w0rng/amnezia-wg-easy
 */

/**
 * Generate random value between min and max (inclusive)
 */
function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate random AmneziaWG defaults for new interface
 */
export function generateAmneziaDefaults() {
  return {
    jc: randomBetween(3, 10), // Junk packet count: random 3-10
    jmin: 50, // Junk packet minimum size: fixed 50
    jmax: 1000, // Junk packet maximum size: fixed 1000
    s1: randomBetween(15, 150), // Init packet junk size: random 15-150
    s2: randomBetween(15, 150), // Response packet junk size: random 15-150
    h1: randomBetween(1, 2147483647), // Init packet magic header: random
    h2: randomBetween(1, 2147483647), // Response packet magic header: random
    h3: randomBetween(1, 2147483647), // Underload packet magic header: random
    h4: randomBetween(1, 2147483647), // Transport packet magic header: random
  };
}

/**
 * Validate AmneziaWG parameters are within acceptable ranges
 */
export function validateAmneziaParams(params: {
  jc: number;
  jmin: number;
  jmax: number;
  s1: number;
  s2: number;
  h1: number;
  h2: number;
  h3: number;
  h4: number;
}): boolean {
  return (
    params.jc >= 1 && params.jc <= 255 &&
    params.jmin >= 1 && params.jmin <= 65535 &&
    params.jmax >= 1 && params.jmax <= 65535 &&
    params.s1 >= 1 && params.s1 <= 65535 &&
    params.s2 >= 1 && params.s2 <= 65535 &&
    params.h1 >= 1 && params.h1 <= 2147483647 &&
    params.h2 >= 1 && params.h2 <= 2147483647 &&
    params.h3 >= 1 && params.h3 <= 2147483647 &&
    params.h4 >= 1 && params.h4 <= 2147483647
  );
}
