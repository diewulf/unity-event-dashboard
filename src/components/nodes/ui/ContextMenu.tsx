import React from 'react';
import { Trash2, Copy, X } from 'lucide-react';

export const ContextMenu = ({ id, top, left, onClick, onSelect }: any) => {
    return (
        <div
            style={{ top, left }}
            className="fixed z-[1000] bg-[#1a1a1a] border border-white/10 shadow-2xl rounded-lg overflow-hidden min-w-[150px]"
        >
            <div className="px-3 py-2 border-b border-white/5 bg-black/20 text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                Node: {id.split('_')[0]}
            </div>
            <button
                onClick={() => onSelect(id, 'delete')}
                className="w-full flex items-center gap-3 px-4 py-3 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
            >
                <Trash2 size={14} />
                Eliminar Nodo
            </button>
            <button
                onClick={onClick}
                className="w-full flex items-center gap-3 px-4 py-2 text-xs text-slate-400 hover:bg-white/5 transition-colors border-t border-white/5"
            >
                <X size={14} />
                Cerrar
            </button>
        </div>
    );
};