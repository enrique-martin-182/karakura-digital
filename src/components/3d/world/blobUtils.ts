/** Deterministic seed from biome id string. */
export function blobSeedFor(id: string): number {
  let s = 0;
  for (let k = 0; k < id.length; k++) s += id.charCodeAt(k) * (k + 1);
  return s;
}

/** Normalised blob radius [≈0.55..1.05] at a given angle, seeded per biome. */
export function blobRadiusNorm(angle: number, seed: number): number {
  return 0.78
    + Math.sin(angle * 3 + seed * 0.7) * 0.10
    + Math.sin(angle * 5 + seed * 1.3) * 0.07
    + Math.sin(angle * 7 + seed * 0.4) * 0.04
    + Math.sin(angle * 2 + seed * 2.1) * 0.06;
}

export const ISLAND_HALF = 3.0; // PlaneGeometry size=6, half=3
