# 🎮 Headless CMS for Game Logic
## Data-Driven Event Pipeline

Este proyecto es una herramienta de edición visual construida con **Next.js** y **Tailwind CSS**. Su objetivo es gestionar secuencias de eventos para un motor de juego en Unity, permitiendo la sincronización bidireccional entre los tipos de datos de C# y la interfaz web.

---

## 🚀 Sistema de Sincronización Automática

Para evitar discrepancias entre el código de Unity y el Dashboard, utilizamos un script de Node.js que genera tipos de TypeScript automáticamente a partir de archivos `.cs`.

### Script: `sync-enums.js`
Este script realiza las siguientes tareas:
1. Lee archivos `.enum.cs` en el proyecto de Unity.
2. Limpia comentarios (`//` o `/* */`) y atributos de C# (`[Serializable]`).
3. Convierte nombres de **PascalCase** (C#) a **SCREAMING_SNAKE_CASE** (TS) para las constantes.
4. Exporta un `enum` y un `array` de strings para poblar selects en la UI.

**Rutas configuradas:**
* `ActionType.enum.cs` -> `lib/domain/action-type.ts`
* `GameState.enum.cs` -> `lib/domain/game-state.ts`

**Comando de ejecución:**
Añadido al ciclo de vida de desarrollo en `package.json`:
```json
"scripts": {
  "sync:enums": "node scripts/sync-enums.js",
  "dev": "npm run sync:enums && next dev",
  "build": "npm run sync:enums && next build"
}
```

## 🏗️ Arquitectura de Componentes

La interfaz está diseñada de forma modular siguiendo principios de **Atomic Design**, asegurando que cada pieza sea reutilizable y fácil de mantener.

### 1. ActionField (Átomo Inteligente)
Es el componente fundamental de entrada de datos. Su lógica interna permite:
* **Detección de Contexto**: Identifica si el `actionType` es `CHANGE_GAME_STATE`. En ese caso, conmuta automáticamente de un `input` de texto a un elemento `select`.
* **Sincronización de Enums**: Utiliza la constante `GAME_STATE` (generada desde Unity) para poblar las opciones del dropdown, garantizando que el usuario solo elija estados válidos.
* **Tipado Dinámico**: Maneja la conversión de datos (strings a floats para campos como `value` o `duration`) antes de actualizar el estado global.

### 2. SortableActionItem (Molécula de Inspección)
Representa una fila individual dentro de una secuencia. Está optimizado para la edición rápida:
* **Layout Horizontal**: Organiza la información en una sola línea (`flex-row`) con un ancho de ~550px, permitiendo ver el ID, el tipo de acción y sus parámetros simultáneamente.
* **Interactividad**: Implementa `listeners` de `@dnd-kit` para permitir el reordenamiento por arrastre (drag-and-drop).
* **Visibilidad Condicional**: Muestra los botones de borrado y edición solo cuando el usuario pasa el cursor sobre la fila (`group-hover`).

### 3. CreateEventModal (Organismo Constructor)
Es la interfaz principal para generar nuevas secuencias desde cero:
* **Sequence Queue**: Permite apilar múltiples acciones antes de enviarlas al backend.
* **Validación de Integridad**: Bloquea el registro mediante alertas si el `eventID` está vacío o si no se han añadido pasos a la secuencia.
* **Instanciación por Schema**: Al añadir una acción, consulta `ACTION_CONFIG` para crear un objeto con todos los campos necesarios inicializados (ej: `message: ""`, `value: 0`).

### 4. ConfirmModal (Seguridad)
Un componente de utilidad desacoplado del dominio de eventos:
* **Agnóstico**: Recibe `title`, `description` y `onConfirm` como props, lo que permite usarlo para borrar secuencias, limpiar colas de trabajo o resetear configuraciones.
* **UX**: Utiliza un portal con `backdrop-blur` para enfocar la atención del usuario y evitar clics accidentales fuera del área de decisión.

### 5. EventRow (Visualizador de Lista)
Controla la representación de las secuencias en el feed principal:
* **Lógica de Colapso**: Si una secuencia excede los 8 items, trunca la visualización y añade un contador `+X`, evitando que la tabla se deforme.
* **Alineación Robusta**: Utiliza `ml-auto` y `shrink-0` para asegurar que los controles de edición siempre estén en el extremo derecho, sin importar la longitud de la secuencia visual.


