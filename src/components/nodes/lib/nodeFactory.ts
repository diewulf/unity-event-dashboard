import { Node } from 'reactflow';
import { DialogueCondition, DialogueOption } from './interfaces/DialogueData';


// Valores por defecto para mantener consistencia con C#
const createDefaultCondition = (): DialogueCondition => ({
    initialID: "initialID"
});

const createDefaultOption = (): DialogueOption => ({
    text: "Nueva opción...",
    nextId: "",
    failNextId: "",
    require: "",
    setValue: ""
});

export const nodeFactory = {
    createConditionNode: (id: string, position: { x: number, y: number }): Node => ({
        id,
        type: 'conditionCheck',
        position,
        data: {
            id: `cond_${id.split('_')[1]}`, // ID amigable
            text: "Evaluando condiciones...",
            conditions: [createDefaultCondition()],
            options: [] // DialogueData requiere la lista aunque esté vacía
        }
    }),

    createDialogueNode: (id: string, position: { x: number, y: number }): Node => ({
        id,
        type: 'dialogue',
        position,
        data: {
            id: `diag_${id.split('_')[1]}`,
            text: "Escribe aquí el texto del diálogo...",
            conditions: [],
            options: [createDefaultOption()]
        }
    })
};