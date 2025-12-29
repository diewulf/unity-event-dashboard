"use client";
import { useState, useEffect } from 'react';
import { Sequence, Action } from '@/types/events';
import { ActionSortableList } from './ActionSortableList';

interface Props {
  sequence: Sequence | null;
  onClose: () => void;
  onSave: (updated: Sequence) => void;
}

export const EditEventPanel = ({ sequence, onClose, onSave }: Props) => {
  const [localSeq, setLocalSeq] = useState<Sequence | null>(null);

  useEffect(() => { setLocalSeq(sequence); }, [sequence]);

  if (!localSeq) return null;

  const handleUpdateAction = (idx: number, field: string, val: any) => {
    const newActions = [...localSeq.actions];
    const processedVal = field === 'value' ? parseFloat(val) || val : val;
    newActions[idx] = { ...newActions[idx], [field]: processedVal };
    setLocalSeq({ ...localSeq, actions: newActions });
  };

  const handleDeleteAction = (idx: number) => {
    if (!localSeq) return;
    const newActions = localSeq.actions.filter((_, i) => i !== idx);
    setLocalSeq({ ...localSeq, actions: newActions });
  };

  return (
    /* 1. CAMBIO DE ANCHO: He cambiado w-80 por w-[400px] (o w-96 para 384px) */
    <aside className="fixed inset-y-0 right-0 w-250 bg-[#0d0d0d] border-l border-white/10 shadow-2xl z-50 flex flex-col">

      {/* HEADER */}
      <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
        {/* 2. CAMBIO DE TEXTO: He subido de text-[10px] a text-xs (12px) */}
        <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest">
          Event: {localSeq.eventID}
        </h2>
        <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors p-1">
          ✕
        </button>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-black/20">
        <ActionSortableList
          actions={localSeq.actions}
          onReorder={(newActions) => setLocalSeq({ ...localSeq, actions: newActions })}
          onUpdateAction={handleUpdateAction}
          onDeleteAction={handleDeleteAction}
        />
      </div>

      {/* FOOTER */}
      <div className="p-5 bg-white/5 border-t border-white/10">
        <button
          onClick={() => onSave(localSeq)}
          /* 3. BOTÓN MÁS GRANDE: py-2.5 a py-3 y text-xs */
          className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-3 rounded shadow-lg transition-all active:scale-[0.98] uppercase tracking-wider"
        >
          Apply Changes
        </button>
      </div>
    </aside>
  );
};