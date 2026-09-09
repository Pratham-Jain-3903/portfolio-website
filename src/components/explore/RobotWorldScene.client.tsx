'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

const heroScene = 'https://prod.spline.design/RYL-GG3FKx6g5eEK/scene.splinecode';

export type WorldStation = {
  id: string;
  label: string;
  position: [number, number, number];
  color: string;
};

type RobotWorldSceneProps = {
  stations: WorldStation[];
  activeStation: string | null;
  robotPosition: { x: number; z: number; heading: number };
  onSelectStation: (stationId: string) => void;
};

export default function RobotWorldScene({ stations, activeStation, robotPosition, onSelectStation }: RobotWorldSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const robotPositionRef = useRef(robotPosition);
  robotPositionRef.current = robotPosition;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#101819');
    scene.fog = new THREE.Fog('#101819', 15, 32);

    const camera = new THREE.PerspectiveCamera(72, 1, 0.1, 100);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    scene.add(new THREE.HemisphereLight('#d8fff0', '#0b1210', 1.5));
    const keyLight = new THREE.DirectionalLight('#ffffff', 2.2);
    keyLight.position.set(7, 12, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);
    const accent = new THREE.PointLight('#58f2b3', 35, 13);
    accent.position.set(-7, 5, -4);
    scene.add(accent);

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(42, 42), new THREE.MeshStandardMaterial({ color: '#172823', roughness: 1 }));
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const pathMaterial = new THREE.MeshStandardMaterial({ color: '#334a41', roughness: 0.75, metalness: 0.12 });
    const path = new THREE.Mesh(new THREE.PlaneGeometry(8, 23), pathMaterial);
    path.rotation.x = -Math.PI / 2;
    path.position.set(0, 0.015, 0);
    path.receiveShadow = true;
    scene.add(path);

    const pathEdgeMaterial = new THREE.MeshStandardMaterial({ color: '#50e3a4', emissive: '#50e3a4', emissiveIntensity: 0.8 });
    [-4.1, 4.1].forEach((x) => {
      const edge = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 23), pathEdgeMaterial);
      edge.position.set(x, 0.08, 0);
      scene.add(edge);
    });

    const rockGeometry = new THREE.DodecahedronGeometry(0.45, 0);
    const rockMaterial = new THREE.MeshStandardMaterial({ color: '#33413c', roughness: 1, flatShading: true });
    for (let index = 0; index < 32; index += 1) {
      const side = index % 2 === 0 ? -1 : 1;
      const rock = new THREE.Mesh(rockGeometry, rockMaterial);
      rock.position.set(side * (5 + (index % 5) * 1.3), 0.25, -9 + ((index * 7) % 19));
      rock.scale.setScalar(0.55 + (index % 4) * 0.18);
      rock.rotation.set(index, index * 0.4, index * 0.2);
      rock.castShadow = true;
      scene.add(rock);
    }

    const trunkMaterial = new THREE.MeshStandardMaterial({ color: '#67513c', roughness: 0.95 });
    const foliageMaterial = new THREE.MeshStandardMaterial({ color: '#2f7b58', roughness: 0.85, flatShading: true });
    for (let index = 0; index < 20; index += 1) {
      const side = index % 2 === 0 ? -1 : 1;
      const x = side * (5.5 + (index % 3) * 1.8);
      const z = -8 + ((index * 11) % 18);
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.22, 1.4, 6), trunkMaterial);
      trunk.position.set(x, 0.7, z);
      trunk.castShadow = true;
      const canopy = new THREE.Mesh(new THREE.ConeGeometry(0.85 + (index % 3) * 0.14, 2.3, 7), foliageMaterial);
      canopy.position.set(x, 2.2, z);
      canopy.castShadow = true;
      scene.add(trunk, canopy);
    }

    const towerGeometry = new THREE.CylinderGeometry(0.25, 0.6, 5, 8);
    const towerMaterial = new THREE.MeshStandardMaterial({ color: '#263530', roughness: 0.55, metalness: 0.4 });
    [-8.5, 8.5].forEach((x) => {
      for (let z = -7; z <= 7; z += 4) {
        const tower = new THREE.Mesh(towerGeometry, towerMaterial);
        tower.position.set(x, 2.5, z);
        tower.castShadow = true;
        scene.add(tower);
        const cap = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 16), pathEdgeMaterial);
        cap.position.set(x, 5.1, z);
        scene.add(cap);
      }
    });

    const selectable: THREE.Mesh[] = [];
    const stationGeometry = new THREE.CylinderGeometry(1.35, 1.7, 0.8, 6);
    stations.forEach((station) => {
      const material = new THREE.MeshStandardMaterial({ color: station.color, emissive: station.id === activeStation ? station.color : '#000000', emissiveIntensity: station.id === activeStation ? 0.35 : 0, roughness: 0.4, metalness: 0.2 });
      const stationBlock = new THREE.Mesh(stationGeometry, material);
      stationBlock.name = station.id;
      stationBlock.position.set(station.position[0], 0.4, station.position[2]);
      stationBlock.scale.y = station.id === activeStation ? 1.25 : 1;
      stationBlock.castShadow = true;
      stationBlock.receiveShadow = true;
      selectable.push(stationBlock);
      scene.add(stationBlock);

      const arch = new THREE.Mesh(new THREE.TorusGeometry(1.65, 0.1, 12, 32, Math.PI), new THREE.MeshStandardMaterial({ color: station.color, emissive: station.color, emissiveIntensity: 0.4 }));
      arch.rotation.y = Math.PI;
      arch.position.set(station.position[0], 1.75, station.position[2]);
      scene.add(arch);

      const labelCanvas = document.createElement('canvas');
      labelCanvas.width = 512;
      labelCanvas.height = 128;
      const labelContext = labelCanvas.getContext('2d');
      if (labelContext) {
        labelContext.fillStyle = '#101415';
        labelContext.fillRect(0, 0, labelCanvas.width, labelCanvas.height);
        labelContext.strokeStyle = station.color;
        labelContext.lineWidth = 8;
        labelContext.strokeRect(4, 4, labelCanvas.width - 8, labelCanvas.height - 8);
        labelContext.fillStyle = '#ffffff';
        labelContext.font = 'bold 34px sans-serif';
        labelContext.textAlign = 'center';
        labelContext.textBaseline = 'middle';
        labelContext.fillText(station.label, labelCanvas.width / 2, labelCanvas.height / 2);
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(labelCanvas), depthTest: false }));
        sprite.position.set(station.position[0], 3.3, station.position[2]);
        sprite.scale.set(4.5, 1.1, 1);
        scene.add(sprite);
      }
    });

    const beacon = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.12, 32), new THREE.MeshStandardMaterial({ color: '#d8fff0', emissive: '#46e5a5', emissiveIntensity: 0.6 }));
    beacon.position.set(0, 0.12, 8);
    scene.add(beacon);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const onPointerUp = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1, -((event.clientY - bounds.top) / bounds.height) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(selectable)[0];
      if (hit) onSelectStation(hit.object.name);
    };
    canvas.addEventListener('pointerup', onPointerUp);

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const robot = robotPositionRef.current;
      const heading = (robot.heading * Math.PI) / 180;
      const lookX = Math.sin(heading);
      const lookZ = -Math.cos(heading);
      camera.position.set(robot.x, 2.15, robot.z);
      camera.lookAt(robot.x + lookX * 10, 2.15, robot.z + lookZ * 10);
      beacon.rotation.y += 0.012;
      beacon.position.y = 0.18 + Math.sin(performance.now() / 700) * 0.08;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener('pointerup', onPointerUp);
      rockGeometry.dispose();
      towerGeometry.dispose();
      stationGeometry.dispose();
      renderer.dispose();
    };
  }, [activeStation, onSelectStation, stations]);

  return (
    <div className="absolute inset-0">
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full touch-none" aria-label="Interactive Three.js block world" />
      <div data-robot-spline className="pointer-events-none absolute bottom-0 right-2 h-48 w-48 overflow-hidden opacity-100 sm:h-64 sm:w-64" aria-hidden="true">
        <Spline
          scene={heroScene}
          className="h-full w-full"
          onLoad={(app) => {
            try {
              const anyApp = app as unknown as { _onFrame?: unknown };
              if (!anyApp || typeof anyApp._onFrame !== 'function') return;
            } catch {
              // decorative HUD — never break robot world
            }
          }}
        />
      </div>
    </div>
  );
}
