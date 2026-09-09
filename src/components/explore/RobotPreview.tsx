import { Bot, CornerDownLeft, MapPinned } from 'lucide-react';

export default function RobotPreview() {
  return (
    <section className="border-b border-border bg-foreground text-background" aria-labelledby="robot-preview-heading">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-20">
        <div>
          <p className="doto-font text-sm font-semibold uppercase text-primary">Robot preview</p>
          <h2 id="robot-preview-heading" className="mt-4 max-w-[14ch] text-4xl font-semibold leading-tight sm:text-5xl">Interactive world is the next stop.</h2>
          <p className="mt-5 max-w-[58ch] leading-7 text-background/70">The Classic hero robot remains live above. This mode URL is ready now; the next build adds keyboard movement, station proximity, and project interaction on the dedicated world canvas.</p>
        </div>
        <div className="grid content-start gap-4 border border-background/20 p-6">
          <div className="flex items-center gap-3"><Bot className="h-6 w-6 text-primary" aria-hidden="true" /><span className="font-semibold">Robot identity retained</span></div>
          <div className="flex items-center gap-3 text-background/70"><MapPinned className="h-5 w-5" aria-hidden="true" /><span>Stations will reuse this portfolio&apos;s project and experience data.</span></div>
          <div className="flex items-center gap-3 text-background/70"><CornerDownLeft className="h-5 w-5" aria-hidden="true" /><span>Use Classic any time for the complete recruiter view.</span></div>
        </div>
      </div>
    </section>
  );
}