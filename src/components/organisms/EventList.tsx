"use client";
import { useState } from 'react';
import { Sequence, EventData } from '@/types/events';
import { EventRow } from '../molecules/EventRow';
import { EditEventPanel } from './EditEventPanel';
import { CreateEventModal } from './CreateEventModal';
import { ConfirmModal } from './ConfirmModal';

export const EventList = ({ initialData }: { initialData: EventData }) => {
  const [data, setData] = useState<EventData>(initialData);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);

  const handleAddNewEvent = async (newSequence: Sequence) => {
    const newData = { ...data, sequences: [newSequence, ...data.sequences] };
    setData(newData);
    // Aquí llamas a tu API de POST que ya creamos antes
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    });
  };

  const handleSave = async (updatedSequence: Sequence) => {
    // 1. Actualizar estado local para UI instantánea
    const newSequences = data.sequences.map(s =>
      s.eventID === updatedSequence.eventID ? updatedSequence : s
    );
    const newData = { ...data, sequences: newSequences };
    setData(newData);

    // 2. Enviar al backend para modificar el archivo físico
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });
      if (res.ok) alert("✅ Guardado en Assets/LevelData/Events.json");
    } catch (err) {
      alert("❌ Error al guardar");
    }
  };

  const handleDelete = async () => {
    if (!idToDelete) return;

    const newSequences = data.sequences.filter(s => s.eventID !== idToDelete);
    const newData = { ...data, sequences: newSequences };

    // Actualización optimista
    setData(newData);

    // Sincronizar con Backend
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    });

    setIdToDelete(null);
  };

  const selectedSequence = data.sequences.find(s => s.eventID === selectedId) || null;

  return (
    <>

      <ConfirmModal
        isOpen={!!idToDelete}
        title="Borrar Sequencias"
        description={`Seguro que queri borrar "${idToDelete}"? esto cambiará el yeison.`}
        confirmText="DELETE SEQUENCE"
        onConfirm={handleDelete}
        onCancel={() => setIdToDelete(null)}
        type="danger"
      />

      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 bg-emerald-400 hover:bg-emerald-300 cursor-pointer text-white text-[11px] font-bold px-4 py-2 rounded"
      >
        + NEW SEQUENCE
      </button>

      <CreateEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleAddNewEvent}
      />
      <div className="bg-[#effffe] rounded-lg border-3 border-[#ffcfe9] overflow-hidden">
        {data.sequences.map((seq) => (
          <div key={seq.eventID} >
            <EventRow sequence={seq} onClick={() => setSelectedId(seq.eventID)} onDelete={() => setIdToDelete(seq.eventID)} />
          </div>
        ))}
      </div>

      <EditEventPanel
        sequence={selectedSequence}
        onClose={() => setSelectedId(null)}
        onSave={handleSave}
      />
    </>
  );
};