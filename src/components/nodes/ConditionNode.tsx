import { Handle, Position, useReactFlow, NodeProps } from 'reactflow';
import { GitBranch, Home, Plus, Trash2 } from 'lucide-react';
import { DialogueData } from './lib/interfaces/DialogueData';


export const ConditionNode = ({ id, data }: NodeProps<DialogueData>) => {
    const { setNodes } = useReactFlow();

    const updateNodeData = (newData: Partial<DialogueData>) => {
        setNodes((nds) =>
            nds.map((node) => (node.id === id ? { ...node, data: { ...node.data, ...newData } } : node))
        );
    };

    const addCondition = () => {
        const newConditions = [...(data.conditions || []), { initialID: "" }];
        updateNodeData({ conditions: newConditions });
    };

    const removeCondition = (index: number) => {
        const newConditions = data.conditions.filter((_, i) => i !== index);
        updateNodeData({ conditions: newConditions });
    };

    return (
        <div className="bg-[#1a1a1a] border-2 border-orange-500 rounded-xl p-4 min-w-[280px] shadow-2xl">
            <Handle type="target" position={Position.Left} className="w-3 h-3 bg-orange-500 border-2 border-[#1a1a1a]" />

            {/* Header e ID del Nodo */}
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                    <GitBranch size={16} className="text-orange-500" />
                    <input
                        className="bg-transparent text-white font-bold text-sm outline-none w-full"
                        value={data.id}
                        onChange={(e) => updateNodeData({ id: e.target.value })}
                        placeholder="Check ID (ej: bridge_guard_check)"
                    />
                </div>
                <button onClick={addCondition} className="text-orange-500 hover:bg-orange-500/10 p-1 rounded">
                    <Plus size={16} />
                </button>
            </div>

            {/* --- CAMPO DEFAULT ID --- */}
            <div className="mb-4 p-2 bg-orange-500/10 rounded-lg border border-orange-500/30 relative">
                <div className="flex items-center gap-2 mb-1">
                    <Home size={12} className="text-orange-400" />
                    <span className="text-[9px] text-orange-400 font-black uppercase">Default Initial ID</span>
                </div>
                <input
                    className="w-full bg-black/40 text-[11px] text-white p-1.5 rounded border border-white/5 outline-none focus:border-orange-500"
                    value={data.defaultID || ""}
                    onChange={(e) => updateNodeData({ defaultID: e.target.value })}
                    placeholder="ID de inicio por defecto..."
                />
                {/* Handle específico para conectar el Default ID visualmente */}
                <Handle
                    type="source"
                    position={Position.Right}
                    id="default-id-output"
                    style={{ top: '70%', background: '#f97316' }}
                    className="w-2 h-4 rounded-sm border-none -right-4"
                />
            </div>

            {/* Lista de Conditions (initialIDs adicionales) */}
            <div className="space-y-2">
                <p className="text-[8px] text-slate-500 uppercase font-bold px-1">Other Possible States</p>
                {data.conditions?.map((cond, index) => (
                    <div key={index} className="relative flex items-center justify-between bg-white/5 p-2 rounded border border-white/5 group">
                        <div className="flex flex-col">
                            <span className="text-[8px] text-slate-500 uppercase">Target ID</span>
                            <span className="text-[10px] text-white font-mono">{cond.initialID || 'empty'}</span>
                        </div>
                        <Handle
                            type="source"
                            position={Position.Right}
                            id={`cond-${index}`}
                            className="w-2 h-4 rounded-sm bg-orange-400 border-none -right-4"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};