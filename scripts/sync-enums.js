const fs = require('fs');
const path = require('path');

const configs = [
    {
        csPath: 'C:/Users/zero_/test obj/Assets/Script/Runtime/System/Interaction/ActionType.enum.cs',
        tsPath: path.join(__dirname, '../lib/domain/action-type.ts'),
        enumName: 'ActionType'
    },
    {
        csPath: 'C:/Users/zero_/test obj/Assets/Script/Runtime/Core/StateManager/GameState.enum.cs',
        tsPath: path.join(__dirname, '../lib/domain/game-state.enum.ts'),
        enumName: 'GameState'
    }
];

const toScreamingSnakeCase = (str) => {
    return str
        .replace(/([a-z])([A-Z])/g, '$1_$2') // Inserta _ entre minúscula y mayúscula
        .toUpperCase();
};

function syncEnum({ csPath, tsPath, enumName }) {
    try {
        console.log(`\n🔍 Procesando: ${enumName}...`);

        if (!fs.existsSync(csPath)) {
            console.error(`  ❌ Error: No existe el archivo en ${csPath}`);
            return;
        }

        let content = fs.readFileSync(csPath, 'utf-8');

        // Limpiar comentarios
        content = content.replace(/\/\/.*$/gm, '');
        content = content.replace(/\/\*[\s\S]*?\*\//g, '');

        const regex = new RegExp(`enum\\s+${enumName}\\s*{([\\s\\S]*?)}`);
        const enumMatch = content.match(regex);

        if (!enumMatch) {
            console.error(`  ❌ Error: No se encontró "enum ${enumName}"`);
            return;
        }

        const enumValues = enumMatch[1]
            .split(',')
            .map(v => v.trim())
            .map(v => v.split('=')[0].trim())
            .filter(v => v.length > 0 && !v.startsWith('['));

        // REFACTORIZACIÓN DEL NOMBRE DE LA CONSTANTE
        const constantName = toScreamingSnakeCase(enumName);

        const tsContent = `// ARCHIVO GENERADO AUTOMÁTICAMENTE - NO EDITAR MANUALMENTE
// Fuente: ${path.basename(csPath)}

export enum ${enumName} {
${enumValues.map(v => `    ${v} = "${v}"`).join(',\n')}
}

export const ${constantName} = Object.values(${enumName}) as ${enumName}[];
`;

        const dir = path.dirname(tsPath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        fs.writeFileSync(tsPath, tsContent);
        console.log(`  ✅ Sincronizado: ${enumName} -> const ${constantName}`);

    } catch (error) {
        console.error(`  ❌ Error: ${error.message}`);
    }
}

configs.forEach(syncEnum);