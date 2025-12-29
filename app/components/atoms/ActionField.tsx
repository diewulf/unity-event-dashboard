
"use client";


import { ActionType } from '@/lib/domain/action-type';
import { GAME_STATE } from '@/lib/domain/game-state.enum';

interface ActionFieldProps {
    label: string;
    value: string | number;
    onChange: (val: string) => void;
    actionType?: string; // Añadimos el tipo de acción para saber qué renderizar
}

export const ActionField = ({ label, value, onChange, actionType }: ActionFieldProps) => {

    // Si la acción es de cambio de estado y estamos editando el valor principal
    if (actionType === ActionType.CHANGE_GAME_STATE) {
        return (
            <div className="flex flex-col w-full">
                {label && <span className="text-[10px] text-slate-500 mb-1 uppercase">{label}</span>}
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-white/10 text-white text-xs p-2 rounded outline-none focus:border-blue-500 transition-colors"
                >
                    <option value="">Select State...</option>
                    {GAME_STATE.map((state) => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    // Input por defecto para los demás casos
    return (
        <div className="flex flex-col w-full">
            {label && <span className="text-[10px] text-slate-500 mb-1 uppercase">{label}</span>}
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/10 text-white text-xs p-2 rounded outline-none focus:border-blue-500 transition-colors"
            />
        </div>
    );
};