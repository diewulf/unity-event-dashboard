"use client";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Action } from '@/types/events';
import { ActionField } from '../atoms/ActionField';
import { ACTION_CONFIG } from '@/lib/domain/action-schema';
import { ActionType } from '@/lib/domain/action-type';

interface ItemProps {
    action: Action;
    idx: number;
    onUpdate: (idx: number, field: string, val: any) => void;
    onDeleteAction: (idx: number) => void;
}

export const SortableActionItem = ({ action, idx, onUpdate, onDeleteAction }: ItemProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: idx });


    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 1,
        opacity: isDragging ? 0.6 : 1,
    };

    // Obtenemos qué campos deben mostrarse según el tipo definido en tu C#
    // Si el tipo no existe en el config, mostramos todos los campos por defecto
    const fieldsToShow = ACTION_CONFIG[action.type as ActionType] || Object.keys(action).filter(k => k !== 'type');

    return (
        <div
            ref={setNodeRef}
            style={style}
            // Cambiamos flex-col por items-center y gap-4 para la fila única
            className={`
                p-2 mb-1 bg-[#0d0d0d] border border-white/5 
                rounded-md group flex items-center gap-4 w-full
                ${isDragging ? 'border-blue-500 shadow-lg bg-[#151515]' : 'hover:bg-[#111]'}
                transition-all duration-200
            `}
        >
            {/* 1. GRUPO IZQUIERDO: Drag e Índice */}
            <div className="flex items-center gap-2 shrink-0">
                <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-slate-600 hover:text-blue-500 p-1">
                    ⠿
                </div>
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 text-[10px] font-bold text-blue-400 font-mono">
                    {idx}
                </span>
            </div>

            {/* 2. TIPO DE ACCIÓN: Con ancho fijo para que los inputs se alineen */}
            <div className="w-32 shrink-0">
                <span className="text-[11px] font-mono font-bold text-slate-300 uppercase truncate">
                    {action.type}
                </span>
            </div>

            {/* 3. CAMPOS DINÁMICOS: Envoltorio flex para que se expandan */}
            <div className="flex-1 flex items-center gap-3 overflow-hidden">
                {fieldsToShow.map((field) => (
                    <div key={field} className="flex items-center gap-2 flex-1 min-w-0">
                        {/* Label pequeño al lado del input */}
                        <span className="text-[9px]  text-slate-500 font-bold shrink-0">
                            {field}:
                        </span>
                        <ActionField
                            label="" // Dejamos el label vacío para usar el nuestro compacto
                            value={action[field as keyof Action] ?? ""}
                            onChange={(val) => onUpdate(idx, field, val)}
                            actionType={action.type}
                        />
                    </div>
                ))}
            </div>

            {/* 4. ACCIONES: Borrar */}
            <button
                onClick={() => onDeleteAction(idx)}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-600 hover:text-red-500 transition-all shrink-0"
            >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    );
};