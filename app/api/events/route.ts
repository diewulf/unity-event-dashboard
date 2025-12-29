import { NextResponse } from 'next/server';
import { getEvents, saveEvents } from '@/lib/events';

// Leer el JSON
export async function GET() {
    try {
        const data = getEvents();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Error al leer el archivo' }, { status: 500 });
    }
}

// Guardar el JSON
export async function POST(request: Request) {
    try {
        const newData = await request.json();
        saveEvents(newData); // Usa la función fs.writeFileSync que definimos en lib/events
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Error al escribir el archivo' }, { status: 500 });
    }
}