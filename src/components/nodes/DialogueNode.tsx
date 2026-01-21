import { Handle, Position, useReactFlow, NodeProps } from 'reactflow';
import { Plus, Trash2, MessageSquare, Settings2, GitBranch, AlertCircle, CheckCircle2 } from 'lucide-react';
import { DialogueData } from './lib/interfaces/DialogueData';

export const DialogueNode = ({ id, data }: NodeProps<DialogueData>) => {
    const { setNodes } = useReactFlow();

    const updateNodeData = (newData: Partial<DialogueData>) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === id) {
                    return { ...node, data: { ...node.data, ...newData } };
                }
                return node;
            })
        );
    };

    const addOption = () => {
        const newOptions = [
            ...(data.options || []),
            { text: "Nueva opción", nextId: "", require: "", setValue: "", setInitialID: "", failNextId: "" }
        ];
        updateNodeData({ options: newOptions });
    };

    const removeOption = (index: number) => {
        const newOptions = data.options.filter((_, i) => i !== index);
        updateNodeData({ options: newOptions });
    };

    const updateOption = (index: number, fields: any) => {
        const newOpts = [...data.options];
        newOpts[index] = { ...newOpts[index], ...fields };
        updateNodeData({ options: newOpts });
    };

    return (
        <div className="bg-[#1a1a1a] border-2 border-blue-600 rounded-xl p-4 min-w-[340px] shadow-2xl transition-all hover:shadow-blue-500/10">
            {/* Entrada del nodo */}
            <Handle
                type="target"
                position={Position.Left}
                className="w-3 h-3 bg-blue-500 border-2 border-[#1a1a1a] -left-1.5"
            />

            {/* Header */}
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-500/20 rounded-md">
                        <MessageSquare size={16} className="text-blue-400" />
                    </div>
                    <input
                        className="bg-transparent text-white font-bold text-sm focus:outline-none focus:text-blue-300 w-full"
                        value={data.id}
                        onChange={(e) => updateNodeData({ id: e.target.value })}
                        placeholder="ID_DEL_DIALOGO"
                    />
                </div>
                <button onClick={addOption} className="p-1.5 hover:bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30">
                    <Plus size={16} />
                </button>
            </div>

            {/* Texto NPC */}
            <div className="mb-4">
                <textarea

                    className="w-full h-32 bg-black/40 border border-white/10 rounded-lg p-2 text-lg text-slate-200 focus:outline-none focus:border-blue-500/50  resize-none"
                    rows={2}
                    value={data.text}
                    onChange={(e) => updateNodeData({ text: e.target.value })}
                    placeholder="Texto del Personaje..."
                />
            </div>

            {/* Opcionf */}
            <div className="space-y-4">
                {data.options?.map((opt, index) => (
                    <div key={index} className="bg-white/5 p-3 rounded-lg border border-white/5 group relative">

                        {/* Input de Texto de Opción */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                            <input
                                className="bg-transparent text-lg text-white font-medium flex-1 outline-none border-b border-white/10 focus:border-blue-500"
                                value={opt.text}
                                onChange={(e) => updateOption(index, { text: e.target.value })}
                                placeholder="Texto de la opción..."
                            />
                            <button onClick={() => removeOption(index)} className="text-slate-500 hover:text-red-500">
                                <Trash2 size={12} />
                            </button>
                        </div>

                        {/* Configuración Lógica (Require y SetInitialID) */}
                        <div className="grid grid-cols-1 gap-2 mb-3">
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-black/40 rounded border border-white/5">
                                <Settings2 size={10} className="text-slate-500" />
                                <input
                                    className="bg-transparent text-[9px] text-orange-300 outline-none w-full"
                                    value={opt.require || ""}
                                    onChange={(e) => updateOption(index, { require: e.target.value })}
                                    placeholder="require:val"
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-1 gap-2 mb-3">
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-purple-500/10 rounded border border-purple-500/20">
                                <GitBranch size={10} className="text-purple-400" />
                                <input
                                    className="bg-transparent text-[12px] text-purple-300 outline-none w-full"
                                    value={opt.setInitialID || ""}
                                    onChange={(e) => updateOption(index, { setInitialID: e.target.value })}
                                    placeholder="setInitialID"
                                />
                            </div>
                        </div>

                        {/* SALIDAS (Handles) */}
                        <div className="space-y-2">
                            {/* ÉXITO / SIGUIENTE */}
                            <div className="flex items-center justify-between bg-blue-500/10 p-1.5 rounded border border-blue-500/20 relative">
                                <div className="flex items-center gap-1.5 text-blue-400">
                                    <CheckCircle2 size={10} />
                                    <span className="text-[9px] font-bold uppercase tracking-tighter">Next ID:</span>
                                </div>
                                <span className="text-[10px] text-blue-200 font-mono pr-2">{opt.nextId || 'END'}</span>
                                <Handle
                                    type="source"
                                    position={Position.Right}
                                    id={`opt-${index}-success`}
                                    className="w-2 h-4 bg-blue-500 border-none -right-4 rounded-sm"
                                />
                            </div>

                            {/* FALLO (Solo se muestra si hay un require) */}
                            {opt.require && (
                                <div className="flex items-center justify-between bg-red-500/10 p-1.5 rounded border border-red-500/20 relative animate-in fade-in duration-300">
                                    <div className="flex items-center gap-1.5 text-red-400">
                                        <AlertCircle size={10} />
                                        <span className="text-[9px] font-bold uppercase tracking-tighter">Fail ID:</span>
                                    </div>
                                    <span className="text-[10px] text-red-200 font-mono pr-2">{opt.failNextId || 'none'}</span>
                                    <Handle
                                        type="source"
                                        position={Position.Right}
                                        id={`opt-${index}-fail`}
                                        className="w-2 h-4 bg-red-500 border-none -right-4 rounded-sm"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};