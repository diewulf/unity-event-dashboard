"use client";
import { ConditionNode } from '@/src/components/nodes/ConditionNode';
import { DialogueNode } from '@/src/components/nodes/DialogueNode';
import { nodeFactory } from '@/src/components/nodes/lib/nodeFactory';
import { ContextMenu } from '@/src/components/nodes/ui/ContextMenu';
import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
    Background,
    Controls,
    useNodesState,
    useEdgesState,
    addEdge,
    ReactFlowProvider,
    Connection,
    Edge
} from 'reactflow';
import 'reactflow/dist/style.css';



const nodeTypes = {
    conditionCheck: ConditionNode,
    dialogue: DialogueNode,
};

function DialogueFlow() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const [menu, setMenu] = React.useState<any>(null);


    const onNodeContextMenu = React.useCallback(
        (event: React.MouseEvent, node: any) => {
            event.preventDefault(); // Prevenir el menú por defecto de Windows/Mac

            setMenu({
                id: node.id,
                top: event.clientY,
                left: event.clientX,
            });
        },
        [setMenu]
    );

    const onPaneClick = React.useCallback(() => setMenu(null), [setMenu]);

    // Esta es la función clave que sincroniza los hilos con tus datos de C#
    const onConnect = useCallback((params: Connection) => {
        // 1. Añade el cable visual
        setEdges((eds) => addEdge(params, eds));

        // 2. Actualiza los datos del nodo
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === params.source) {
                    const data = { ...node.data };

                    // Identificamos el índice y el tipo de salida
                    // Formato esperado del handle ID: "opt-0-success" o "opt-0-fail"
                    const parts = params.sourceHandle?.split('-') || [];
                    const index = parseInt(parts[1]);
                    const type = parts[2]; // "success" o "fail"

                    if (node.type === 'dialogue' && data.options[index]) {
                        if (type === 'fail') {
                            data.options[index].failNextId = params.target;
                        } else {
                            data.options[index].nextId = params.target;
                        }
                    }

                    // Si es un nodo de condición lógica
                    if (node.type === 'conditionCheck' && data.conditions[index]) {
                        data.conditions[index].initialID = params.target;
                    }

                    return { ...node, data };
                }
                return node;
            })
        );
    }, [setNodes, setEdges]);

    const addNewNode = useCallback((type: 'conditionCheck' | 'dialogue') => {
        const id = `${type}_${Date.now()}`;
        const position = { x: Math.random() * 300 + 100, y: Math.random() * 300 + 100 };

        const newNode = type === 'conditionCheck'
            ? nodeFactory.createConditionNode(id, position)
            : nodeFactory.createDialogueNode(id, position);

        setNodes((nds) => nds.concat(newNode));
    }, [setNodes]);


    const handleMenuAction = (nodeId: string, action: string) => {
        if (action === 'delete') {
            setNodes((nds) => nds.filter((node) => node.id !== nodeId));
            setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
        }
        setMenu(null);
    };

    return (
        <div className="flex w-full h-[calc(100vh-60px)] bg-[#0f0f0f]">
            {/* TOOLBAR */}
            <aside className="w-72 border-r border-white/10 p-6 bg-[#050505] flex flex-col gap-4 z-50">
                <div className="mb-4">
                    <h2 className="text-white font-black text-lg tracking-tighter uppercase">Canvas Editor</h2>
                    <p className="text-slate-500 text-[10px] font-mono">Dialogue System v1.0</p>
                </div>

                <button
                    onClick={() => addNewNode('conditionCheck')}
                    className="group flex flex-col items-start p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl hover:bg-orange-500/10 hover:border-orange-500/50 transition-all"
                >
                    <span className="text-orange-500 font-bold text-xs">Add Logic Gate</span>
                    <span className="text-[9px] text-slate-500 mt-1 text-left italic">Filtra el flujo basado en variables de estado.</span>
                </button>

                <button
                    onClick={() => addNewNode('dialogue')}
                    className="group flex flex-col items-start p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl hover:bg-blue-500/10 hover:border-blue-500/50 transition-all"
                >
                    <span className="text-blue-500 font-bold text-xs">Add Dialogue Node</span>
                    <span className="text-[9px] text-slate-500 mt-1 text-left italic">Conversación estándar con opciones múltiples.</span>
                </button>

                <div className="mt-auto space-y-2">
                    <button
                        onClick={() => console.log("JSON Final:", nodes.map(n => n.data))}
                        className="w-full py-3 bg-white text-black rounded-lg text-xs font-black uppercase hover:bg-blue-400 transition-colors"
                    >
                        Export to Unity
                    </button>
                </div>
            </aside>

            {/* REACT FLOW CANVAS */}
            <div className="flex-1 relative">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onNodeContextMenu={onNodeContextMenu}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onPaneClick={onPaneClick}
                    nodeTypes={nodeTypes}
                    fitView
                >
                    <Background color="#222" gap={30} />
                    <Controls className="bg-slate-900 border-white/10 fill-white" />

                    {/* RENDERIZAR MENÚ SI EXISTE */}
                    {menu && (
                        <ContextMenu
                            onClick={onPaneClick}
                            onSelect={handleMenuAction}
                            {...menu}
                        />
                    )}
                </ReactFlow>
            </div>
        </div>
    );
}

export default function DialogueManagerPage() {
    return (
        <ReactFlowProvider>
            <DialogueFlow />
        </ReactFlowProvider>
    );
}