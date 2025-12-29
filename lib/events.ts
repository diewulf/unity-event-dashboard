import fs from 'fs';
import path from 'path';

// Tu ruta de Unity
const UNITY_JSON_PATH = 'C:/Users/zero_/test obj/Assets/LevelData/Events.json';

export function getEvents() {
    const fileContents = fs.readFileSync(UNITY_JSON_PATH, 'utf8');
    return JSON.parse(fileContents);
}

export function saveEvents(data: any) {
    fs.writeFileSync(UNITY_JSON_PATH, JSON.stringify(data, null, 2), 'utf8');
}