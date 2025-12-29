import { ActionType } from "./action-type";

// Definimos qué campos requiere cada acción
export const ACTION_CONFIG: Record<ActionType, string[]> = {
    ANIMATE_OBJECT: ['entityTargetID', 'message'],
    SHOW_DIALOG: ['message'],
    REMOVE_COLLISION: ['entityTargetID'],
    DESTROY_ENTITY: ['entityTargetID'],
    SLEEP: ['value'],
    CHANGE_SCENE: ['message'], // Usamos message para el nombre de la escena
    CHANGE_GAME_STATE: ['message'],
    SPAWN_OBJECT: ['entityTargetID', 'locationID'],
    SET_POSITION_PLAYER: ['locationID'],
    FADE_IN: [],
    FADE_OUT: [],
};