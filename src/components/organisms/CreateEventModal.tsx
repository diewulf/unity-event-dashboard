"use client";
import { useState } from 'react';
import { ACTION_CONFIG } from '@/lib/domain/action-schema';
import { ActionField } from '../atoms/ActionField';
import { ActionSortableList } from './ActionSortableList';
import { Action } from '@/types/events';
import { ActionBadge } from '../atoms/ActionBadge/ActionBadge';
import { ACTION_TYPE, ActionType } from '@/lib/domain/action-type';

export const CreateEventModal = ({ isOpen, onClose, onConfirm }: any) => {
    const [eventID, setEventID] = useState('');
    const [actions, setActions] = useState<Action[]>([]);

    if (!isOpen) return null;

    const addAction = (type: ActionType) => {
        const configFields = ACTION_CONFIG[type] || [];
        const newAction: any = { type };

        // Inicializamos los campos según el schema
        configFields.forEach(field => {
            newAction[field] = field === 'value' ? 0 : "";
        });

        setActions([...actions, newAction]);
    };

    const removeAction = (index: number) => {
        setActions(actions.filter((_, i) => i !== index));
    };

    const handleUpdateAction = (idx: number, field: string, val: any) => {
        const newActions = [...actions];
        // Si el campo es 'value' intentamos convertir a número, si no, mantenemos string
        const processedVal = field === 'value' && !isNaN(parseFloat(val)) ? parseFloat(val) : val;
        newActions[idx] = { ...newActions[idx], [field]: processedVal };
        setActions(newActions);
    };

    const handleSave = () => {
        // VALIDACIÓN: Ahora sí verificamos el eventID que el usuario escribió
        if (!eventID.trim() || actions.length === 0) {
            return alert("Falta el ID del evento o no has añadido ninguna acción.");
        }

        onConfirm({ eventID, actions });
        setEventID('');
        setActions([]);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex justify-center items-start overflow-y-auto pt-6 pb-20">
            <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-5xl rounded-xl shadow-2xl flex flex-col mx-4">

                {/* Header */}
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5 rounded-t-xl">
                    <h2 className="text-blue-400 font-bold tracking-widest text-xs uppercase">Sequence Builder</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors text-sm">✕ CLOSE</button>
                </div>

                <div className="p-6 space-y-6">

                    {/* SECCIÓN 1: ID del Evento - CORREGIDO */}
                    <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                        <label className="text-[10px] uppercase text-blue-400 font-bold mb-2 block">Event Configuration</label>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-slate-500 uppercase">Sequence ID (Unity Name)</span>
                            <input
                                type="text"
                                value={eventID}
                                onChange={(e) => setEventID(e.target.value)}
                                placeholder="Ej: CH1_Start_Conversation"
                                className="w-full bg-[#1a1a1a] border border-white/10 text-white text-xs p-2.5 rounded outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                    </div>

                    {/* SECCIÓN 2: Selector de Acciones */}
                    <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                        <label className="text-[10px] uppercase text-blue-400 font-bold mb-3 block">Available Actions</label>
                        <div className="flex flex-wrap gap-2">
                            {ACTION_TYPE.map(type => (
                                <ActionBadge
                                    key={type}
                                    onClick={() => addAction(type as ActionType)}
                                    action={{ type }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* SECCIÓN 3: Lista de Acciones */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex justify-between items-end">
                            <h3 className="text-[10px] uppercase text-slate-500 font-bold">
                                Action Queue ({actions.length})
                            </h3>
                            {actions.length > 0 && (
                                <button onClick={() => setActions([])} className="text-[9px] text-red-500 hover:underline uppercase">
                                    Clear All
                                </button>
                            )}
                        </div>

                        <div className="bg-[#050505] rounded-lg border border-white/5 min-h-[300px] max-h-[500px] overflow-y-auto custom-scrollbar">
                            {actions.length === 0 ? (
                                <div className="h-[300px] flex flex-col items-center justify-center text-slate-700 space-y-2">
                                    <span className="text-4xl opacity-20">📥</span>
                                    <p className="italic text-sm opacity-50">Click an action above to start building the sequence</p>
                                </div>
                            ) : (
                                <ActionSortableList
                                    actions={actions}
                                    onReorder={setActions}
                                    onUpdateAction={handleUpdateAction}
                                    onDeleteAction={removeAction}
                                />
                            )}
                        </div>

                        <button
                            onClick={handleSave}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg transition-all shadow-lg active:scale-[0.99] uppercase tracking-widest text-xs"
                        >
                            Register New Sequence
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};