import { Sequence, Action } from '@/types/events';
import { ActionBadge } from '../atoms/ActionBadge/ActionBadge';

interface props {
  onClick: () => void;
  onDelete: () => void; // Nueva prop para eliminar
  sequence: Sequence;
}

export const EventRow = ({ sequence, onClick, onDelete }: props) => {
  const getActionValue = (action: Action) => {
    if (action.value !== undefined) return action.value;
    if (action.message) return action.message;
    if (action.locationID) return action.locationID;
    if (action.entityTargetID) return action.entityTargetID;
    return null;
  };

  return (
    <div className="group flex items-center gap-4 p-3 hover:bg-white/5 border-b border-white/5 transition-colors cursor-default">
      {/* ID del Evento */}
      <span className="text-xs font-bold text-slate-500 w-48 truncate shrink-0">
        {sequence.eventID}
      </span>

      {/* Secuencia de Acciones */}
      <div className="flex items-center gap-x-6 overflow-x-auto no-scrollbar pb-2 flex-1 px-2">
        {sequence.actions.map((action, idx) => {
          const val = getActionValue(action);
          return (
            <div key={idx} className="flex flex-col items-center shrink-0 group/item relative">
              {/* Conector visual (opcional, para que parezca una cadena) */}
              {idx !== 0 && (
                <div className="absolute -left-4 top-3 w-3 h-px bg-white/10" />
              )}

              <ActionBadge action={action} />

              {val !== null && (
                <span className="text-[9px] font-mono text-slate-500 mt-1 whitespace-nowrap overflow-hidden text-ellipsis max-w-20">
                  {val}
                </span>
              )}

              {val == null && (
                <span className="text-[9px] mt-1">
                  -
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* CONTENEDOR DE BOTONES (A la derecha) */}
      <div className="ml-auto flex items-center gap-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onClick}
          className="text-[10px] font-bold text-blue-500 hover:text-blue-400 uppercase tracking-tighter"
        >
          Edit
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation(); // Evita que se disparen otros clicks
            onDelete();
          }}
          className="text-[10px] font-bold text-red-500/70 hover:text-red-500 uppercase tracking-tighter"
        >
          Delete This
        </button>
      </div>
    </div>
  );
};