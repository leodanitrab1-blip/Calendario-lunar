/**
 * ============================================================
 * 🌱 PLANTS.JS - Base de datos de plantas
 * ============================================================
 */

const PLANTS_DB = [
    // ===== FRUTOS =====
    {
        id: 'tomate',
        nombre: 'Tomate',
        nombreCientifico: 'Solanum lycopersicum',
        tipo: 'fruto',
        familia: 'solanáceas',
        descripcion: 'Planta de fruto rojo muy popular en huertos urbanos. Necesita mucho sol y riego regular.',
        icono: '🍅',
        temporada: 'primavera-verano',
        diasCosecha: 60,
        profundidadSiembra: 2,
        separacionPlantas: 50,
        acciones: {
            siembra: ['luna nueva', 'cuarto creciente'],
            trasplante: ['cuarto creciente'],
            poda: ['luna llena'],
            cosecha: ['luna llena', 'cuarto menguante'],
            abono: ['cuarto creciente'],
            riego_extra: ['cuarto menguante'],
            control_plagas: ['cuarto menguante']
        },
        consejos: [
            'Siembra a 2 cm de profundidad en semillero',
            'Trasplanta cuando tenga 4-6 hojas verdaderas',
            'Riega abundantemente en floración y fructificación',
            'Aporca la tierra alrededor del tallo para fortalecer la planta'
        ]
    },
    {
        id: 'chile_serrano',
        nombre: 'Chile Serrano',
        nombreCientifico: 'Capsicum annuum',
        tipo: 'chile',
        familia: 'solanáceas',
        descripcion: 'Chile mexicano de tamaño pequeño a mediano, picante y muy aromático. Ideal para salsas y guisos.',
        icono: '🌶️',
        temporada: 'primavera-verano',
        diasCosecha: 60,
        profundidadSiembra: 1.5,
        separacionPlantas: 30,
        acciones: {
            siembra: ['luna nueva', 'cuarto creciente'],
            trasplante: ['cuarto creciente'],
            cosecha: ['luna llena', 'cuarto menguante'],
            abono: ['cuarto creciente'],
            riego_extra: ['cuarto menguante']
        },
        consejos: [
            'Germina mejor en semillero protegido del frío',
            'Necesita mucho sol y calor',
            'Cosecha cuando estén verdes o rojos según tu preferencia',
            'Usa guantes al manipular chiles picantes'
        ]
    },
    {
        id: 'chile_habanero',
        nombre: 'Chile Habanero',
        nombreCientifico: 'Capsicum chinense',
        tipo: 'chile',
        familia: 'solanáceas',
        descripcion: 'Uno de los chiles más picantes del mundo. Originario de la península de Yucatán.',
        icono: '🌶️',
        temporada: 'primavera-verano',
        diasCosecha: 75,
        profundidadSiembra: 1.5,
        separacionPlantas: 40,
        acciones: {
            siembra: ['luna nueva', 'cuarto creciente'],
            trasplante: ['cuarto creciente'],
            cosecha: ['luna llena', 'cuarto menguante'],
            abono: ['cuarto creciente'],
            riego_extra: ['cuarto menguante']
        },
        consejos: [
            'Germina lentamente, puede tardar hasta 3 semanas',
            'Necesita mucho sol y temperaturas cálidas',
            'Cosecha cuando estén naranjas o rojos (maduros)',
            'Maneja con guantes y no te toques los ojos'
        ]
    },
    {
        id: 'chile_jalapeno',
        nombre: 'Chile Jalapeño',
        nombreCientifico: 'Capsicum annuum',
        tipo: 'chile',
        familia: 'solanáceas',
        descripcion: 'Chile mexicano de tamaño mediano, picante y muy versátil. Originario de Veracruz.',
        icono: '🌶️',
        temporada: 'primavera-verano',
        diasCosecha: 60,
        profundidadSiembra: 1.5,
        separacionPlantas: 35,
        acciones: {
            siembra: ['luna nueva', 'cuarto creciente'],
            trasplante: ['cuarto creciente'],
            cosecha: ['luna llena', 'cuarto menguante'],
            abono: ['cuarto creciente'],
            riego_extra: ['cuarto menguante']
        },
        consejos: [
            'Germina en semillero protegido del frío',
            'Requiere mucho sol y riego regular',
            'Cosecha cuando estén verdes y firmes',
            'Para un sabor más dulce, déjalos madurar a rojo'
        ]
    },
    {
        id: 'chile_poblano',
        nombre: 'Chile Poblano',
        nombreCientifico: 'Capsicum annuum',
        tipo: 'chile',
        familia: 'solanáceas',
        descripcion: 'Chile mexicano de gran tamaño, de sabor suave y ligeramente picante. Originario de Puebla.',
        icono: '🫑',
        temporada: 'primavera-verano',
        diasCosecha: 70,
        profundidadSiembra: 1.5,
        separacionPlantas: 45,
        acciones: {
            siembra: ['luna nueva', 'cuarto creciente'],
            trasplante: ['cuarto creciente'],
            cosecha: ['luna llena', 'cuarto menguante'],
            abono: ['cuarto creciente'],
            riego_extra: ['cuarto menguante']
        },
        consejos: [
            'Siembra en semillero protegido del frío',
            'Necesita mucho sol y espacio para crecer',
            'Cosecha cuando estén verdes y grandes',
            'Se pueden asar y pelar para conservar'
        ]
    },
    {
        id: 'aguacate',
        nombre: 'Aguacate',
        nombreCientifico: 'Persea americana',
        tipo: 'frutal',
        familia: 'lauraceae',
        descripcion: 'Árbol frutal originario de México y Centroamérica. Produce el aguacate, un fruto rico en grasas saludables.',
        icono: '🥑',
        temporada: 'todo el año',
        diasCosecha: 365,
        profundidadSiembra: 5,
        separacionPlantas: 600,
        acciones: {
            siembra: ['luna nueva', 'cuarto creciente'],
            trasplante: ['cuarto creciente'],
            poda: ['luna llena'],
            cosecha: ['luna llena', 'cuarto menguante'],
            abono: ['cuarto creciente'],
            riego_extra: ['cuarto menguante'],
            control_plagas: ['cuarto menguante']
        },
        consejos: [
            'Siembra la semilla con el extremo puntiagudo hacia arriba',
            'El aguacate necesita suelo bien drenado y profundo',
            'Los árboles pueden tardar 3-5 años en producir frutos',
            'La variedad Hass es la más popular y resistente',
            'No soporta heladas fuertes, protégelo en invierno'
        ],
        variedades: ['Hass', 'Fuerte', 'Bacon', 'Criollo mexicano']
    },
    {
        id: 'pepino',
        nombre: 'Pepino',
        nombreCientifico: 'Cucumis sativus',
        tipo: 'fruto',
        familia: 'cucurbitáceas',
        descripcion: 'Planta trepadora que produce frutos alargados. Necesita mucho sol y riego abundante.',
        icono: '🥒',
        temporada: 'primavera-verano',
        diasCosecha: 50,
        profundidadSiembra: 2,
        separacionPlantas: 40,
        acciones: {
            siembra: ['luna nueva', 'cuarto creciente'],
            trasplante: ['cuarto creciente'],
            cosecha: ['luna llena', 'cuarto menguante'],
            abono: ['cuarto creciente'],
            riego_extra: ['cuarto menguante']
        },
        consejos: [
            'Siembra en semillero o directamente en el suelo',
            'Requiere tutores para trepar',
            'Cosecha antes de que se pongan amarillos'
        ]
    },
    {
        id: 'pimiento_morron',
        nombre: 'Pimiento Morrón',
        nombreCientifico: 'Capsicum annuum',
        tipo: 'fruto',
        familia: 'solanáceas',
        descripcion: 'Pimiento de gran tamaño, dulce y de colores vivos. Ideal para asar o rellenar.',
        icono: '🫑',
        temporada: 'primavera-verano',
        diasCosecha: 65,
        profundidadSiembra: 1.5,
        separacionPlantas: 45,
        acciones: {
            siembra: ['luna nueva', 'cuarto creciente'],
            trasplante: ['cuarto creciente'],
            cosecha: ['luna llena', 'cuarto menguante'],
            abono: ['cuarto creciente']
        },
        consejos: [
            'Germina mejor en semillero protegido',
            'No soporta heladas, protégelo del frío',
            'Cosecha cuando cambien de color'
        ]
    },
    {
        id: 'berenjena',
        nombre: 'Berenjena',
        nombreCientifico: 'Solanum melongena',
        tipo: 'fruto',
        familia: 'solanáceas',
        descripcion: 'Planta de fruto morado oscuro. Necesita mucho sol y temperaturas cálidas.',
        icono: '🍆',
        temporada: 'primavera-verano',
        diasCosecha: 60,
        profundidadSiembra: 1.5,
        separacionPlantas: 50,
        acciones: {
            siembra: ['luna nueva', 'cuarto creciente'],
            trasplante: ['cuarto creciente'],
            cosecha: ['luna llena', 'cuarto menguante'],
            abono: ['cuarto creciente']
        },
        consejos: [
            'Siembra en semillero protegido del frío',
            'Trasplanta cuando tenga 5-6 hojas',
            'Cosecha antes de que se ponga amarga'
        ]
    },
    
    // ===== VERDURAS DE HOJA =====
    {
        id: 'lechuga',
        nombre: 'Lechuga',
        nombreCientifico: 'Lactuca sativa',
        tipo: 'hoja',
        familia: 'asteráceas',
        descripcion: 'Verdura de hoja verde muy fácil de cultivar. Crecimiento rápido y cosecha continua.',
        icono: '🥬',
        temporada: 'primavera-otoño',
        diasCosecha: 30,
        profundidadSiembra: 0.5,
        separacionPlantas: 20,
        acciones: {
            siembra: ['luna nueva', 'cuarto creciente'],
            trasplante: ['cuarto creciente'],
            cosecha: ['cuarto menguante', 'luna llena'],
            abono: ['cuarto creciente']
        },
        consejos: [
            'Siembra en semillero y trasplanta a los 15 días',
            'Riega frecuentemente para evitar que se espigue',
            'Cosecha las hojas exteriores para alargar la producción'
        ]
    },
    {
        id: 'espinaca',
        nombre: 'Espinaca',
        nombreCientifico: 'Spinacia oleracea',
        tipo: 'hoja',
        familia: 'quenopodiáceas',
        descripcion: 'Verdura de hoja verde rica en hierro. Crece rápido y prefiere climas frescos.',
        icono: '🌱',
        temporada: 'otoño-primavera',
        diasCosecha: 35,
        profundidadSiembra: 1,
        separacionPlantas: 15,
        acciones: {
            siembra: ['luna nueva', 'cuarto creciente'],
            cosecha: ['cuarto menguante', 'luna llena'],
            abono: ['cuarto creciente']
        },
        consejos: [
            'Siembra directamente en el suelo',
            'Cosecha las hojas exteriores para alargar la producción',
            'Prefiere suelos ricos en nitrógeno'
        ]
    },
    {
        id: 'acelga',
        nombre: 'Acelga',
        nombreCientifico: 'Beta vulgaris',
        tipo: 'hoja',
        familia: 'quenopodiáceas',
        descripcion: 'Verdura de hoja grande y tallos blancos o de colores. Muy resistente y productiva.',
        icono: '🌿',
        temporada: 'primavera-otoño',
        diasCosecha: 50,
        profundidadSiembra: 1.5,
        separacionPlantas: 25,
        acciones: {
            siembra: ['luna nueva', 'cuarto creciente'],
            cosecha: ['cuarto menguante', 'luna llena'],
            abono: ['cuarto creciente']
        },
        consejos: [
            'Siembra directamente en el suelo',
            'Cosecha las hojas exteriores para alargar la producción',
            'Resiste bien el calor y el frío'
        ]
    },
    
    // ===== RAÍCES Y BULBOS =====
    {
        id: 'zanahoria',
        nombre: 'Zanahoria',
        nombreCientifico: 'Daucus carota',
        tipo: 'raiz',
        familia: 'apiáceas',
        descripcion: 'Raíz comestible de color naranja, rica en vitamina A. Crece mejor en suelos sueltos y profundos.',
        icono: '🥕',
        temporada: 'primavera-verano',
        diasCosecha: 70,
        profundidadSiembra: 1,
        separacionPlantas: 5,
        acciones: {
            siembra: ['cuarto menguante'],
            trasplante: ['cuarto menguante'],
            cosecha: ['luna nueva'],
            abono: ['cuarto creciente']
        },
        consejos: [
            'Siembra directamente en el suelo, no trasplantes',
            'Mantén la tierra húmeda para evitar que se partan',
            'Aclara las plántulas para que crezcan grandes'
        ]
    },
    {
        id: 'cebolla',
        nombre: 'Cebolla',
        nombreCientifico: 'Allium cepa',
        tipo: 'bulbo',
        familia: 'aliáceas',
        descripcion: 'Bulbo comestible muy usado en cocina. Crece mejor en suelos sueltos y soleados.',
        icono: '🧅',
        temporada: 'otoño-primavera',
        diasCosecha: 90,
        profundidadSiembra: 2,
        separacionPlantas: 15,
        acciones: {
            siembra: ['cuarto menguante', 'luna nueva'],
            cosecha: ['cuarto menguante', 'luna nueva'],
            abono: ['cuarto creciente']
        },
        consejos: [
            'Siembra en semillero o directamente en el suelo',
            'Deja espacio entre plantas para que los bulbos engorden',
            'Cosecha cuando las hojas se caen y se secan'
        ]
    },
    {
        id: 'ajo',
        nombre: 'Ajo',
        nombreCientifico: 'Allium sativum',
        tipo: 'bulbo',
        familia: 'aliáceas',
        descripcion: 'Bulbo aromático muy usado en cocina. Fácil de cultivar y con pocas plagas.',
        icono: '🧄',
        temporada: 'otoño-invierno',
        diasCosecha: 120,
        profundidadSiembra: 4,
        separacionPlantas: 10,
        acciones: {
            siembra: ['cuarto menguante', 'luna nueva'],
            cosecha: ['cuarto menguante', 'luna nueva'],
            abono: ['cuarto creciente']
        },
        consejos: [
            'Planta los dientes directamente en el suelo',
            'Necesita frío para formar el bulbo',
            'Cosecha cuando las hojas se pongan amarillas'
        ]
    },
    
    // ===== LEGUMBRES =====
    {
        id: 'judia_verde',
        nombre: 'Judía Verde',
        nombreCientifico: 'Phaseolus vulgaris',
        tipo: 'legumbre',
        familia: 'fabáceas',
        descripcion: 'Planta trepadora o arbustiva que produce vainas comestibles. Fácil de cultivar y muy productiva.',
        icono: '🌿',
        temporada: 'primavera-verano',
        diasCosecha: 45,
        profundidadSiembra: 3,
        separacionPlantas: 30,
        acciones: {
            siembra: ['luna nueva', 'cuarto creciente'],
            cosecha: ['cuarto menguante', 'luna llena'],
            abono: ['cuarto creciente']
        },
        consejos: [
            'Siembra directamente en el suelo',
            'Proporciona tutores si es variedad trepadora',
            'Cosecha cuando las vainas estén tiernas'
        ]
    },
    {
        id: 'guisante',
        nombre: 'Guisante',
        nombreCientifico: 'Pisum sativum',
        tipo: 'legumbre',
        familia: 'fabáceas',
        descripcion: 'Planta trepadora que produce vainas con guisantes. Prefiere climas frescos.',
        icono: '🫛',
        temporada: 'otoño-primavera',
        diasCosecha: 50,
        profundidadSiembra: 3,
        separacionPlantas: 20,
        acciones: {
            siembra: ['luna nueva', 'cuarto creciente'],
            cosecha: ['cuarto menguante'],
            abono: ['cuarto creciente']
        },
        consejos: [
            'Siembra en otoño para cosecha primaveral',
            'Necesita tutores para trepar',
            'Cosecha antes de que se vuelvan duros'
        ]
    },
    
    // ===== AROMÁTICAS =====
    {
        id: 'albahaca',
        nombre: 'Albahaca',
        nombreCientifico: 'Ocimum basilicum',
        tipo: 'aromatica',
        familia: 'lamiáceas',
        descripcion: 'Planta aromática muy usada en cocina mediterránea. Necesita mucho sol y calor.',
        icono: '🌿',
        temporada: 'primavera-verano',
        diasCosecha: 30,
        profundidadSiembra: 0.5,
        separacionPlantas: 20,
        acciones: {
            siembra: ['luna nueva', 'cuarto creciente'],
            trasplante: ['cuarto creciente'],
            cosecha: ['cuarto menguante', 'luna llena'],
            abono: ['cuarto creciente'],
            poda: ['luna llena']
        },
        consejos: [
            'Siembra en semillero y trasplanta cuando tenga calor',
            'No soporta el frío, protégela',
            'Cosecha las hojas superiores para que la planta se ramifique'
        ]
    },
    {
        id: 'perejil',
        nombre: 'Perejil',
        nombreCientifico: 'Petroselinum crispum',
        tipo: 'aromatica',
        familia: 'apiáceas',
        descripcion: 'Planta aromática de hoja rizada o lisa. Germina lento pero es muy resistente.',
        icono: '🌿',
        temporada: 'primavera-otoño',
        diasCosecha: 70,
        profundidadSiembra: 0.5,
        separacionPlantas: 15,
        acciones: {
            siembra: ['luna nueva', 'cuarto creciente'],
            cosecha: ['cuarto menguante'],
            abono: ['cuarto creciente']
        },
        consejos: [
            'Remoja las semillas 24h antes de sembrar',
            'Germina lentamente, ten paciencia',
            'Cosecha las hojas exteriores'
        ]
    },
    {
        id: 'romero',
        nombre: 'Romero',
        nombreCientifico: 'Salvia rosmarinus',
        tipo: 'aromatica',
        familia: 'lamiáceas',
        descripcion: 'Planta aromática leñosa muy resistente a la sequía. Perenne y muy usada en cocina.',
        icono: '🌿',
        temporada: 'todo el año',
        diasCosecha: 0,
        profundidadSiembra: 0.5,
        separacionPlantas: 50,
        acciones: {
            siembra: ['luna nueva', 'cuarto creciente'],
            trasplante: ['cuarto creciente'],
            poda: ['luna llena'],
            cosecha: ['cuarto menguante', 'luna llena'],
            abono: ['cuarto creciente']
        },
        consejos: [
            'Planta en suelo bien drenado',
            'No necesita mucho riego',
            'Cosecha las puntas antes de la floración'
        ]
    },
    {
        id: 'menta',
        nombre: 'Menta',
        nombreCientifico: 'Mentha spicata',
        tipo: 'aromatica',
        familia: 'lamiáceas',
        descripcion: 'Planta aromática invasora de hojas verdes y aroma fresco. Crece muy rápido.',
        icono: '🌿',
        temporada: 'primavera-otoño',
        diasCosecha: 20,
        profundidadSiembra: 0.5,
        separacionPlantas: 30,
        acciones: {
            siembra: ['luna nueva', 'cuarto creciente'],
            trasplante: ['cuarto creciente'],
            cosecha: ['cuarto menguante', 'luna llena'],
            poda: ['luna llena'],
            abono: ['cuarto creciente']
        },
        consejos: [
            'Planta en maceta para controlar su expansión',
            'Cosecha las puntas para fomentar el crecimiento',
            'Riega frecuentemente en verano'
        ]
    },
    
    // ===== FLORES =====
    {
        id: 'girasol',
        nombre: 'Girasol',
        nombreCientifico: 'Helianthus annuus',
        tipo: 'flor',
        familia: 'asteráceas',
        descripcion: 'Planta de flor amarilla que sigue al sol. Muy ornamental y fácil de cultivar.',
        icono: '🌻',
        temporada: 'primavera-verano',
        diasCosecha: 60,
        profundidadSiembra: 3,
        separacionPlantas: 50,
        acciones: {
            siembra: ['luna nueva', 'cuarto creciente'],
            trasplante: ['cuarto creciente'],
            cosecha: ['cuarto menguante', 'luna llena'],
            abono: ['cuarto creciente']
        },
        consejos: [
            'Siembra directamente en el suelo',
            'Necesita mucho sol y espacio',
            'Cosecha las semillas cuando los pétalos se caigan'
        ]
    },
    {
        id: 'calendula',
        nombre: 'Caléndula',
        nombreCientifico: 'Calendula officinalis',
        tipo: 'flor',
        familia: 'asteráceas',
        descripcion: 'Planta de flor anaranjada con propiedades medicinales. Atrae insectos benéficos.',
        icono: '🌸',
        temporada: 'primavera-otoño',
        diasCosecha: 40,
        profundidadSiembra: 1,
        separacionPlantas: 25,
        acciones: {
            siembra: ['luna nueva', 'cuarto creciente'],
            trasplante: ['cuarto creciente'],
            cosecha: ['cuarto menguante', 'luna llena'],
            abono: ['cuarto creciente']
        },
        consejos: [
            'Siembra directamente en el suelo',
            'Cosecha las flores para uso medicinal',
            'Resiste bien el frío'
        ]
    }
];

// ============================================================
// FUNCIONES DE ACCESO
// ============================================================

function getAllPlants() { return PLANTS_DB; }

function getPlantById(id) {
    return PLANTS_DB.find(p => p.id === id) || null;
}

function searchPlants(query) {
    if (!query || query.trim() === '') return PLANTS_DB;
    const q = query.toLowerCase().trim();
    return PLANTS_DB.filter(p => 
        p.nombre.toLowerCase().includes(q) ||
        p.nombreCientifico.toLowerCase().includes(q) ||
        p.tipo.includes(q) ||
        p.familia.includes(q)
    );
}

function getPlantNames() {
    return PLANTS_DB.map(p => ({ id: p.id, nombre: p.nombre, icono: p.icono || '🌱' }));
}

function getActionsForPhase(plantId, phase) {
    const plant = getPlantById(plantId);
    if (!plant) return [];
    const acciones = [];
    for (const [accion, fases] of Object.entries(plant.acciones)) {
        if (fases.includes(phase)) acciones.push(accion);
    }
    return acciones;
}

function getActionLabel(action) {
    const labels = {
        siembra: '🌱 Siembra',
        trasplante: '🌿 Trasplante',
        poda: '✂️ Poda',
        cosecha: '🧺 Cosecha',
        abono: '💪 Abono',
        riego_extra: '💧 Riego extra',
        control_plagas: '🐛 Control de plagas'
    };
    return labels[action] || action;
}

function getPlantTypes() {
    const types = new Set(PLANTS_DB.map(p => p.tipo));
    return Array.from(types);
}

function getPlantsByType(type) {
    return PLANTS_DB.filter(p => p.tipo === type);
}

function getRandomPlant() {
    return PLANTS_DB[Math.floor(Math.random() * PLANTS_DB.length)];
}

console.log(`🌱 Base de datos de plantas cargada: ${PLANTS_DB.length} plantas`);
```

---

📄 js/lunar.js - COMPLETO

```javascript
/**
 * ============================================================
 * 🌙 LUNAR.JS - Cálculo de fases lunares
 * ============================================================
 */

const PHASES = {
    LUNA_NUEVA: { id: 'luna_nueva', nombre: 'Luna Nueva', icono: '🌑', color: '#1a1a2e' },
    CUARTO_CRECIENTE: { id: 'cuarto_creciente', nombre: 'Cuarto Creciente', icono: '🌒', color: '#3b82f6' },
    LUNA_LLENA: { id: 'luna_llena', nombre: 'Luna Llena', icono: '🌕', color: '#fbbf24' },
    CUARTO_MENGUANTE: { id: 'cuarto_menguante', nombre: 'Cuarto Menguante', icono: '🌘', color: '#94a3b8' },
    LUNA_MENGUANTE: { id: 'luna_menguante', nombre: 'Luna Menguante', icono: '🌙', color: '#64748b' }
};

function calculateLunarAge(year, month, day) {
    let y = year, m = month;
    if (m <= 2) { y = year - 1; m = month + 12; }
    const a = Math.floor(y / 100);
    const b = 2 - a + Math.floor(a / 4);
    const julianDay = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;
    const daysSince2000 = julianDay - 2451550.1;
    const lunations = daysSince2000 / 29.53058867;
    let lunarAge = (lunations - Math.floor(lunations)) * 29.53058867;
    if (lunarAge < 0) lunarAge += 29.53058867;
    return lunarAge;
}

function getPhaseByAge(lunarAge) {
    if (lunarAge < 1.5) return { ...PHASES.LUNA_NUEVA, edad: lunarAge };
    else if (lunarAge < 14.5) return { ...PHASES.CUARTO_CRECIENTE, edad: lunarAge };
    else if (lunarAge < 15.5) return { ...PHASES.LUNA_LLENA, edad: lunarAge };
    else if (lunarAge < 22.5) return { ...PHASES.CUARTO_MENGUANTE, edad: lunarAge };
    else return { ...PHASES.LUNA_MENGUANTE, edad: lunarAge };
}

function getLunarPhase(year, month, day) {
    const lunarAge = calculateLunarAge(year, month, day);
    return getPhaseByAge(lunarAge);
}

function getLunarMonth(year, month) {
    const daysInMonth = new Date(year, month, 0).getDate();
    const monthData = [];
    for (let day = 1; day <= daysInMonth; day++) {
        const phase = getLunarPhase(year, month, day);
        monthData.push({
            day: day,
            date: new Date(year, month - 1, day),
            phaseId: phase.id,
            phaseNombre: phase.nombre,
            phaseIcono: phase.icono,
            phaseColor: phase.color,
            lunarAge: phase.edad,
            es_exacta: phase.es_exacta || false
        });
    }
    return monthData;
}

function getPhaseIcon(phaseId) {
    const icons = {
        'luna_nueva': '🌑',
        'cuarto_creciente': '🌒',
        'luna_llena': '🌕',
        'cuarto_menguante': '🌘',
        'luna_menguante': '🌙'
    };
    return icons[phaseId] || '🌑';
}

function getPhaseColor(phaseId) {
    const colors = {
        'luna_nueva': '#1a1a2e',
        'cuarto_creciente': '#3b82f6',
        'luna_llena': '#fbbf24',
        'cuarto_menguante': '#94a3b8',
        'luna_menguante': '#64748b'
    };
    return colors[phaseId] || '#1a1a2e';
}

function getPhaseDescription(phaseId) {
    const descriptions = {
        'luna_nueva': 'Momento de descanso para la tierra. Ideal para preparar la tierra y planificar la siembra.',
        'cuarto_creciente': 'La savia sube. Buen momento para siembras de hojas y frutos, y trasplantes.',
        'luna_llena': 'Máxima energía. Ideal para cosechar, podar y realizar injertos.',
        'cuarto_menguante': 'La savia baja. Buen momento para raíces, bulbos y control de plagas.',
        'luna_menguante': 'Momento de introspección. Ideal para abonar y preparar la tierra.'
    };
    return descriptions[phaseId] || 'Fase lunar desconocida.';
}

function getPhaseRecommendations(phaseId) {
    const recommendations = {
        'luna_nueva': ['Planifica la siembra', 'Prepara la tierra', 'Ideal para legumbres y tubérculos', 'Controla malas hierbas'],
        'cuarto_creciente': ['Siembra plantas de hojas', 'Siembra plantas de fruto', 'Realiza trasplantes', 'Abona para potenciar el crecimiento'],
        'luna_llena': ['Cosecha frutas y verduras', 'Realiza podas', 'Ideal para injertos', 'Controla plagas'],
        'cuarto_menguante': ['Siembra plantas de raíz', 'Ideal para abonar', 'Trasplanta bulbos', 'Controla plagas'],
        'luna_menguante': ['Prepara la tierra', 'Aplica abono orgánico', 'Labores de mantenimiento', 'Descansa y observa']
    };
    return recommendations[phaseId] || ['No hay recomendaciones disponibles.'];
}

console.log('🌙 Módulo lunar cargado correctamente');