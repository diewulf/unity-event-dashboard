import { getEvents } from '@/lib/events';
import { EventList } from '@/src/components/organisms/EventList';
import { EventData } from '@/types/events';

export default async function HomePage() {
  // Obtenemos todo el objeto { "sequences": [...] }
  const data: EventData = getEvents();

  return (
    <main className="min-h-screen p-8 max-w-400 mx-auto">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <h1 className="text-2xl font-bold tracking-tight text-black">
              Unity Event Manager
            </h1>
          </div>
          <p className="text-slate-400 font-mono text-xs">
            Headless CMS for Game Logic <span className="text-slate-700">|</span> Data-Driven Event Pipeline
          </p>
        </div>

        <div className="text-right">
          <p className="text-slate-600 text-[10px] font-mono uppercase tracking-widest">
            Active Source
          </p>
          <p className="text-blue-500/80 text-xs font-mono">
            Assets/LevelData/Events.json
          </p>
        </div>
      </header>

      {/* Grid Background visual (opcional) */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] -z-10 opacity-20" />

      <EventList initialData={data} />
    </main>
  );
}