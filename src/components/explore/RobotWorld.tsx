'use client';

import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, RotateCcw, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { contactDetails, objectiveStatement } from '@/data/profile';
import { featuredProjects, getProjectById } from '@/data/projects';
import { serializePortfolioQuery } from '@/lib/explore/modes';
import type { WorldStation } from './RobotWorldScene.client';

const RobotWorldScene = dynamic(() => import('./RobotWorldScene.client'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#101819]" aria-hidden="true" />,
});

type StationId = 'mercury' | 'pydorky' | 'streaming' | 'solarwise' | 'experience' | 'about' | 'contact';

type Position = { x: number; z: number; heading: number };

const initialPosition: Position = { x: 0, z: 8, heading: 0 };

const stations: ({ id: StationId; projectId?: string } & WorldStation)[] = [
  { id: 'mercury', label: 'Project Mercury', position: [-6, 0, 3], color: '#3b82f6', projectId: 'project-mercury' },
  { id: 'pydorky', label: 'Pydorky', position: [-2.5, 0, 4], color: '#f97316', projectId: 'pydorky' },
  { id: 'streaming', label: 'Financial Streaming', position: [2.5, 0, 4], color: '#a855f7', projectId: 'financial-streaming-dashboard' },
  { id: 'solarwise', label: 'SolarWise', position: [6, 0, 3], color: '#eab308', projectId: 'solarwise' },
  { id: 'experience', label: 'Experience', position: [5.5, 0, -3], color: '#14b8a6' },
  { id: 'about', label: 'About', position: [0, 0, -4.5], color: '#ec4899' },
  { id: 'contact', label: 'Contact', position: [-5.5, 0, -3], color: '#22c55e' },
];

const clamp = (value: number) => Math.min(9, Math.max(-9, value));

const keyboardControls: Record<string, 'up' | 'down' | 'left' | 'right'> = {
  KeyW: 'up', ArrowUp: 'up', KeyS: 'down', ArrowDown: 'down', KeyA: 'left', ArrowLeft: 'left', KeyD: 'right', ArrowRight: 'right',
};

const classicAnchors: Record<StationId, string> = {
  mercury: 'selected-work',
  pydorky: 'selected-work',
  streaming: 'selected-work',
  solarwise: 'selected-work',
  experience: 'experience',
  about: 'classic-intro',
  contact: 'contact-info',
};

export default function RobotWorld() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [position, setPosition] = useState(initialPosition);
  const [activeStation, setActiveStation] = useState<StationId | null>(null);
  const [lastMove, setLastMove] = useState('Ready');

  const nearbyStation = stations.find((station) => Math.hypot(position.x - station.position[0], position.z - station.position[2]) < 2.7);

  const move = (direction: 'up' | 'down' | 'left' | 'right') => {
    setLastMove(`Moved ${direction}`);
    setPosition((current) => {
      const distance = 1.15;
      const forwardX = Math.sin((current.heading * Math.PI) / 180);
      const forwardZ = -Math.cos((current.heading * Math.PI) / 180);
      const next = {
        up: { ...current, x: clamp(current.x + forwardX * distance), z: clamp(current.z + forwardZ * distance) },
        down: { ...current, x: clamp(current.x - forwardX * distance), z: clamp(current.z - forwardZ * distance) },
        left: { ...current, x: clamp(current.x - forwardZ * distance), z: clamp(current.z + forwardX * distance) },
        right: { ...current, x: clamp(current.x + forwardZ * distance), z: clamp(current.z - forwardX * distance) },
      }[direction];
      return next;
    });
  };

  const chooseClassic = () => {
    const query = serializePortfolioQuery({ mode: 'classic', station: null }, searchParams.toString());
    router.push(`${pathname}?${query}`, { scroll: false });
  };

  const visitStation = (station: (typeof stations)[number]) => {
    const anchor = station.projectId ? `project-${station.projectId}` : classicAnchors[station.id];
    const query = serializePortfolioQuery({ mode: 'classic', station: station.id }, searchParams.toString());
    router.push(`${pathname}?${query}#${anchor}`);
  };

  const interactWithNearbyStation = () => {
    if (!nearbyStation) return false;
    setLastMove(`Opening ${nearbyStation.label}`);
    visitStation(nearbyStation);
    return true;
  };

  useEffect(() => {
    router.prefetch(`${pathname}?mode=classic`);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        chooseClassic();
        return;
      }

      const control = keyboardControls[event.code] ?? keyboardControls[event.key];
      if (control) {
        event.preventDefault();
        move(control);
      }
      if (event.code === 'KeyE' || event.key === 'Enter') {
        event.preventDefault();
        if (interactWithNearbyStation()) return;
      }
      if (event.key.toLowerCase() === 'r') {
        setPosition(initialPosition);
        setLastMove('Reset');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [nearbyStation, searchParams]);

  const active = stations.find((station) => station.id === activeStation);
  const project = active?.projectId ? getProjectById(active.projectId) : undefined;

  return (
    <section className="bg-[#171a1b] pt-24 text-white" aria-labelledby="robot-world-heading">
      <div className="w-full pb-8 pt-12">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-start justify-between gap-5 pb-6">
            <div>
              <p className="doto-font text-sm font-semibold uppercase text-primary">Robot explore world</p>
              <h2 id="robot-world-heading" className="mt-2 text-3xl font-semibold sm:text-4xl">Walk the portfolio map.</h2>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => { setPosition(initialPosition); setLastMove('Reset'); }} className="inline-flex min-h-11 items-center gap-2 border border-white/25 px-3 text-sm hover:bg-white/10"><RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset</button>
              <button type="button" onClick={chooseClassic} className="inline-flex min-h-11 items-center gap-2 bg-primary px-3 text-sm font-semibold text-primary-foreground"><X className="h-4 w-4" aria-hidden="true" /> Classic</button>
            </div>
          </div>

          <div className="mb-5 flex flex-wrap gap-2" aria-label="Explore stations">
            {stations.map((station) => (
              <button key={station.id} type="button" onClick={() => setActiveStation(station.id)} aria-pressed={activeStation === station.id} className={`min-h-10 border px-3 text-sm transition-colors ${activeStation === station.id ? 'border-primary bg-primary text-primary-foreground' : 'border-white/25 text-white hover:bg-white/10'}`}>
                {station.label}
              </button>
            ))}
          </div>
        </div>

        <div data-world-canvas tabIndex={0} onKeyDown={(event) => { if (event.code === 'KeyE' || event.key === 'Enter') { event.preventDefault(); event.stopPropagation(); interactWithNearbyStation(); } }} className="relative w-full min-h-[calc(100svh-15rem)] min-w-0 overflow-hidden border border-white/20 bg-[#202526] outline-none focus:ring-4 focus:ring-primary sm:min-h-[calc(100svh-13rem)]" aria-label="Robot explore world. Use W A S D or arrow keys to move. Select a station to inspect it.">
          <RobotWorldScene stations={stations} activeStation={activeStation} robotPosition={position} onSelectStation={(stationId) => setActiveStation(stationId as StationId)} />
          <div className="pointer-events-none absolute left-4 top-4 z-10 max-w-[34ch] text-sm leading-6 text-white/80">
            <p>First-person robot view. W/S move, A/D strafe.</p>
            <p className="mt-1 text-primary" aria-live="polite">{lastMove}</p>
          </div>

          {nearbyStation && !activeStation && (
            <button type="button" onClick={interactWithNearbyStation} className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 border border-primary bg-[#101415]/95 px-4 py-3 text-sm font-semibold text-white shadow-2xl hover:bg-primary hover:text-primary-foreground" aria-label={`Open ${nearbyStation.label} in Classic`}>
              <span className="mr-2 border border-current px-1.5 py-0.5 text-xs">E</span> View {nearbyStation.label}
            </button>
          )}

          <div className="absolute bottom-4 left-4 z-10 grid grid-cols-3 gap-1" aria-label="WASD robot controls">
            <span /><button type="button" onClick={() => move('up')} className="grid h-11 w-11 place-items-center border border-white/30 bg-[#101415]/90 text-sm font-bold text-white hover:border-primary hover:text-primary" aria-label="Move up with W"><span>W</span><ChevronUp className="h-3 w-3" aria-hidden="true" /></button><span />
            <button type="button" onClick={() => move('left')} className="grid h-11 w-11 place-items-center border border-white/30 bg-[#101415]/90 text-sm font-bold text-white hover:border-primary hover:text-primary" aria-label="Move left with A"><span>A</span><ChevronLeft className="h-3 w-3" aria-hidden="true" /></button><button type="button" onClick={() => move('down')} className="grid h-11 w-11 place-items-center border border-white/30 bg-[#101415]/90 text-sm font-bold text-white hover:border-primary hover:text-primary" aria-label="Move down with S"><span>S</span><ChevronDown className="h-3 w-3" aria-hidden="true" /></button><button type="button" onClick={() => move('right')} className="grid h-11 w-11 place-items-center border border-white/30 bg-[#101415]/90 text-sm font-bold text-white hover:border-primary hover:text-primary" aria-label="Move right with D"><span>D</span><ChevronRight className="h-3 w-3" aria-hidden="true" /></button>
          </div>

          {active && (
            <aside className="absolute bottom-4 right-4 z-30 w-[min(26rem,calc(100%-2rem))] border border-white/20 bg-[#101415]/95 p-5 shadow-2xl" aria-live="polite">
              <button type="button" onClick={() => setActiveStation(null)} className="absolute right-3 top-3 grid h-9 w-9 place-items-center hover:bg-white/10" aria-label="Close station"><X className="h-4 w-4" /></button>
              <p className="doto-font text-xs uppercase text-primary">Station</p>
              <h3 className="mt-2 pr-8 text-xl font-semibold">{active.label}</h3>
              {project ? <><p className="mt-3 text-sm leading-6 text-white/70">{project.problem || project.outcome}</p><p className="mt-4 text-sm text-primary">{project.metrics.join(' · ')}</p></> : active.id === 'about' ? <p className="mt-3 whitespace-pre-line text-sm leading-6 text-white/70">{objectiveStatement}</p> : active.id === 'contact' ? <ul className="mt-3 space-y-2 text-sm text-white/70">{contactDetails.map((detail) => <li key={detail.label}>{detail.label}: {detail.value}</li>)}</ul> : <p className="mt-3 text-sm leading-6 text-white/70">Experience station links the same employment, independent work, and leadership history shown in Classic mode.</p>}
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}