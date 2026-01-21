export interface DialogueCondition {
    initialID: string; // El ID destino al que salta el evaluador
}

export interface DialogueOption {
    text: string;
    nextId: string;
    failNextId?: string;   // Para cuando el "require" falla (ej: no hay oro)
    require?: string;      // Formato "key:value"
    setValue?: string;
    setInitialID?: string; // Formato "dialogue_id:node_id"
}

export interface DialogueData {
    id: string;
    text: string;
    defaultID?: string;
    options: DialogueOption[];
    conditions: DialogueCondition[];
}