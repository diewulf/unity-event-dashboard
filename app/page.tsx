import { getEvents } from '@/lib/events';
import { EventList } from '@/app/components/organisms/EventList';
import { EventData } from '@/types/events';

export default async function HomePage() {
  // Obtenemos todo el objeto { "sequences": [...] }
  const data: EventData = getEvents();

  return (
    <main className="min-h-screen bg-emerald-100  p-8">
      <header className="mb-8">

        <h1 className="text-3xl font-bold">
          <span className="  p-1 text-emerald-800  rounded-lg">
            Unity Event Manager
          </span>
        </h1>
        <p className="text-slate-800  font-mono mt-1 font- text-sm">
          Headless CMS for Game Logic - Data-Driven Event Pipeline
        </p>

        <p className="text-slate-500 text-xs font-mono mt-1">
          Source: Assets/LevelData/Events.json
        </p>
      </header>

      {/* Cambiamos sequences={data.sequences} por initialData={data} */}
      <EventList initialData={data} />
    </main>
  );
}