"use client";

import * as THREE from "three";

// Atmospheric scattering shell: a slightly-larger-than-ocean sphere rendered from the inside
// (BackSide) with a fresnel function that's opaque at the limb and fully transparent at center.
// No per-frame update needed — the camera moves, the fresnel follows automatically because it's
// computed in the fragment shader from viewDir dot normal.
const atmosphereVert = `
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

// Two-tone atmosphere: inner glow is warm cyan (daylight scattering), outer halo shifts to
// deep violet-blue (the classic limb-darkening look in reference planet renders).
// The exponent controls how sharp the rim falloff is — 4.0 gives a soft, thick atmosphere;
// higher values (6-8) give a thin, crisp ring. 4.5 reads well at diorama scale.
const atmosphereFrag = `
  uniform vec3 uCameraPosition;

  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    vec3 viewDir = normalize(uCameraPosition - vWorldPos);
    // On BackSide the geometric normal points inward, so we flip it for the fresnel dot
    float rim = 1.0 - clamp(dot(viewDir, -vNormal), 0.0, 1.0);
    float fresnel = pow(rim, 4.5);

    // Inner atmosphere: soft cyan-white (Rayleigh-scatter colour of a clear-sky day)
    vec3 innerColor = vec3(0.35, 0.80, 1.0);
    // Outer rim: deeper blue-violet, the limb tint
    vec3 outerColor = vec3(0.10, 0.35, 0.90);
    vec3 color = mix(innerColor, outerColor, pow(rim, 1.8));

    // Opacity: 0 at the center (transparent window into the planet), peaks near the edge
    float alpha = fresnel * 0.72;

    gl_FragColor = vec4(color, alpha);
  }
`;

export function WorldAtmosphere({ radius = 16.2 }: { radius?: number }) {
  const uniforms = {
    uCameraPosition: { value: new THREE.Vector3() },
  };

  return (
    <mesh>
      <sphereGeometry args={[radius, 64, 48]} />
      <shaderMaterial
        vertexShader={atmosphereVert}
        fragmentShader={atmosphereFrag}
        uniforms={uniforms}
        side={THREE.BackSide}
        transparent
        depthWrite={false}
        onBeforeRender={(renderer, scene, camera) => {
          uniforms.uCameraPosition.value.copy(camera.position);
        }}
      />
    </mesh>
  );
}
