"use client";

import { useEffect, useRef } from "react";

export default function InteriorScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let cleanup = () => {};

    async function bootScene() {
      const THREE = await import("three");
      const canvas = canvasRef.current;
      if (!canvas) return;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.shadowMap.enabled = true;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color("#151412");
      scene.fog = new THREE.Fog("#151412", 7, 16);

      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(5.2, 3.4, 6.8);
      camera.lookAt(0, 0.8, 0);

      const room = new THREE.Group();
      scene.add(room);

      const matte = (color, roughness = 0.65, metalness = 0.02) =>
        new THREE.MeshStandardMaterial({ color, roughness, metalness });

      const wood = matte("#8b5b39", 0.5);
      const brass = matte("#b18854", 0.35, 0.25);
      const ivory = matte("#e8dfd1", 0.75);
      const charcoal = matte("#252823", 0.62);
      const olive = matte("#536052", 0.7);
      const clay = matte("#9b6750", 0.62);

      function box(name, size, position, material, cast = true) {
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
        mesh.name = name;
        mesh.position.set(...position);
        mesh.castShadow = cast;
        mesh.receiveShadow = true;
        room.add(mesh);
        return mesh;
      }

      box("floor", [7.2, 0.08, 5.6], [0, -0.04, 0], matte("#d7cabb", 0.78), false);
      box("back-wall", [7.2, 3.2, 0.08], [0, 1.56, -2.8], matte("#efe8dc", 0.85), false);
      box("side-wall", [0.08, 3.2, 5.6], [-3.6, 1.56, 0], matte("#ded4c6", 0.85), false);
      box("feature-panel", [2.2, 2.8, 0.08], [1.25, 1.48, -2.72], wood, false);
      box("rug", [2.9, 0.04, 1.75], [-0.5, 0.02, 0.75], matte("#b8aa95", 0.92), false);
      box("sofa-base", [2.6, 0.42, 0.82], [-0.9, 0.42, -0.75], olive);
      box("sofa-back", [2.68, 0.9, 0.24], [-0.9, 0.86, -1.1], olive);
      box("left-arm", [0.18, 0.68, 0.86], [-2.33, 0.63, -0.75], olive);
      box("right-arm", [0.18, 0.68, 0.86], [0.53, 0.63, -0.75], olive);
      box("coffee-table", [1.15, 0.16, 0.72], [-0.75, 0.32, 0.55], wood);
      box("table-base", [0.28, 0.42, 0.26], [-0.75, 0.16, 0.55], charcoal);
      box("console", [1.5, 0.18, 0.36], [1.25, 0.84, -2.58], brass);
      box("cabinet", [0.95, 1.32, 0.48], [2.38, 0.66, -1.35], ivory);
      box("art-frame", [0.78, 1.18, 0.06], [-2.35, 1.65, -2.68], charcoal);
      box("art-inner", [0.58, 0.92, 0.07], [-2.35, 1.65, -2.63], clay);
      box("shelf-one", [1.25, 0.08, 0.22], [1.25, 2.0, -2.58], brass);
      box("shelf-two", [1.0, 0.08, 0.22], [1.25, 1.55, -2.58], brass);

      const pendantGroup = new THREE.Group();
      room.add(pendantGroup);
      [-0.1, 0.62, 1.34].forEach((x, index) => {
        const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 1.1, 12), charcoal);
        cord.position.set(x, 2.55, -0.05);
        const shade = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.22, 24), brass);
        shade.position.set(x, 1.95, -0.05);
        shade.rotation.x = Math.PI;
        const glow = new THREE.PointLight("#ffcf8a", 0.65 + index * 0.1, 2.4);
        glow.position.set(x, 1.8, -0.05);
        pendantGroup.add(cord, shade, glow);
      });

      const plant = new THREE.Group();
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 0.36, 24), clay);
      pot.position.set(2.55, 0.22, 0.95);
      plant.add(pot);
      for (let i = 0; i < 12; i += 1) {
        const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 8), matte("#667a52", 0.75));
        const angle = (i / 12) * Math.PI * 2;
        leaf.scale.set(0.55, 0.18, 1.05);
        leaf.position.set(2.55 + Math.cos(angle) * 0.28, 0.58 + (i % 4) * 0.1, 0.95 + Math.sin(angle) * 0.28);
        leaf.rotation.set(0.4, angle, 0.2);
        plant.add(leaf);
      }
      room.add(plant);

      const ambient = new THREE.HemisphereLight("#fff5e8", "#2a302c", 1.6);
      scene.add(ambient);
      const key = new THREE.DirectionalLight("#fff0d6", 2.4);
      key.position.set(3.5, 5.2, 4.2);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      scene.add(key);
      const warmWall = new THREE.PointLight("#d99c55", 2.2, 4);
      warmWall.position.set(1.25, 2.2, -2.1);
      scene.add(warmWall);

      const resize = () => {
        const parent = canvas.parentElement;
        const width = parent?.clientWidth || 900;
        const height = parent?.clientHeight || 620;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      let frame = 0;
      let animationFrame;
      const animate = () => {
        frame += 0.01;
        room.rotation.y = Math.sin(frame * 0.55) * 0.12 - 0.28;
        room.position.y = Math.sin(frame * 0.8) * 0.035;
        pendantGroup.children.forEach((child, index) => {
          if (child.isPointLight) child.intensity = 0.65 + Math.sin(frame * 2 + index) * 0.08;
        });
        camera.position.x = 5.2 + Math.sin(frame * 0.45) * 0.35;
        camera.lookAt(0, 0.75, -0.35);
        renderer.render(scene, camera);
        animationFrame = window.requestAnimationFrame(animate);
      };

      resize();
      window.addEventListener("resize", resize);
      animate();

      cleanup = () => {
        window.cancelAnimationFrame(animationFrame);
        window.removeEventListener("resize", resize);
        scene.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) object.material.dispose();
        });
        renderer.dispose();
      };
    }

    bootScene();
    return () => cleanup();
  }, []);

  return <canvas ref={canvasRef} className="interior-canvas" aria-label="Animated 3D interior concept" />;
}
