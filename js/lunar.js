/**
 * ============================================================
 * 🌙 LUNAR.JS - Cálculo de fases lunares
 * ============================================================
 * 
 * Este archivo contiene:
 * 1. Algoritmo para calcular la edad lunar de un día específico
 * 2. Función para obtener la fase lunar de un día
 * 3. Función para generar un mes completo con sus fases
 * 4. Constantes y utilidades
 * 
 * Basado en el algoritmo de Jean Meeus (Astronomical Algorithms)
 */

// ============================================================
// 1. CONSTANTES
// ============================================================

const PHASES = {
    LUNA_NUEVA: {
        id: 'luna_nueva',
        nombre: 'Luna Nueva',
        icono: '🌑',
        emoji: '🌑',
        color: '#1a1a2e',
        descripcion: 'La luna no es visible. Momento de descanso para la tierra.'
    },
    CUARTO_CRECIENTE: {
        id: 'cuarto_creciente',
        nombre: 'Cuarto Creciente',
        icono: '🌒',
        emoji: '🌒',
        color: '#3b82f6',
        descripcion: 'La luna crece. Buen momento para siembras y trasplantes.'
    },
    LUNA_LLENA: {
        id: 'luna_llena',
        nombre: 'Luna Llena',
        icono: '🌕',
        emoji: '🌕',
        color: '#fbbf24',
        descripcion: 'La luna está completamente iluminada. Momento de cosecha y poda.'
    },
    CUARTO_MENGUANTE: {
        id: 'cuarto_menguante',
        nombre: 'Cuarto Menguante',
        icono: '🌘',
        emoji: '🌘',
        color: '#94a3b8',
        descripcion: 'La luna decrece. Buen momento para raíces y control de plagas.'
    },
    LUNA_MENGUANTE: {
        id: 'luna_menguante',
        nombre: 'Luna Menguante',
        icono: '🌙',
        emoji: '🌙',
        color: '#64748b',
        descripcion: 'La luna está en su fase menguante. Buen momento para abonar y preparar la tierra.'
    }
};

// Nombres de fases para búsqueda y comparación
const PHASE_NAMES = {
    'luna_nueva': 'luna nueva',
    'cuarto_creciente': 'cuarto creciente',
    'luna_llena': 'luna llena',
    'cuarto_menguante': 'cuarto menguante',
    'luna_menguante': 'luna menguante'
};

// Para búsqueda flexible (sin acentos, etc.)
const PHASE_ALIAS = {
    'luna nueva': 'luna_nueva',
    'luna llena': 'luna_llena',
    'creciente': 'cuarto_creciente',
    'menguante': 'cuarto_menguante',
    'cuarto creciente': 'cuarto_creciente',
    'cuarto menguante': 'cuarto_menguante'
};

// ============================================================
// 2. CÁLCULO DE EDAD LUNAR (FÓRMULA DE CONWAY)
// ============================================================

/**
 * Calcula la edad lunar para un día específico
 * Basado en el algoritmo de Conway
 * 
 * @param {number} year - Año (ej: 2026)
 * @param {number} month - Mes (1-12)
 * @param {number} day - Día (1-31)
 * @returns {number} Edad lunar en días (0-29.53)
 */
function calculateLunarAge(year, month, day) {
    // Si es enero o febrero, ajustamos para el algoritmo
    let y = year;
    let m = month;
    if (m <= 2) {
        y = year - 1;
        m = month + 12;
    }
    
    // Calcular el día juliano
    const a = Math.floor(y / 100);
    const b = 2 - a + Math.floor(a / 4);
    const julianDay = Math.floor(365.25 * (y + 4716)) + 
                      Math.floor(30.6001 * (m + 1)) + 
                      day + b - 1524.5;
    
    // Calcular el número de lunaciones desde el 1 de enero de 2000
    const daysSince2000 = julianDay - 2451550.1;
    const lunations = daysSince2000 / 29.53058867;
    
    // Obtener la edad lunar (parte fraccionaria de las lunaciones)
    let lunarAge = (lunations - Math.floor(lunations)) * 29.53058867;
    
    // Asegurar que esté en el rango 0-29.53
    if (lunarAge < 0) lunarAge += 29.53058867;
    
    return lunarAge;
}

// ============================================================
// 3. OBTENER FASE LUNAR POR EDAD
// ============================================================

/**
 * Obtiene la fase lunar a partir de la edad lunar
 * 
 * @param {number} lunarAge - Edad lunar en días (0-29.53)
 * @returns {Object} Objeto con la fase y sus propiedades
 */
function getPhaseByAge(lunarAge) {
    // Mapear la edad lunar a una fase
    if (lunarAge < 1.5) {
        return { ...PHASES.LUNA_NUEVA, edad: lunarAge };
    } else if (lunarAge < 7.5) {
        return { ...PHASES.CUARTO_CRECIENTE, edad: lunarAge };
    } else if (lunarAge < 8.5) {
        // Cuarto creciente exacto
        return { ...PHASES.CUARTO_CRECIENTE, edad: lunarAge, es_exacta: true };
    } else if (lunarAge < 14.5) {
        return { ...PHASES.CUARTO_CRECIENTE, edad: lunarAge };
    } else if (lunarAge < 15.5) {
        // Luna llena exacta
        return { ...PHASES.LUNA_LLENA, edad: lunarAge, es_exacta: true };
    } else if (lunarAge < 22.5) {
        return { ...PHASES.CUARTO_MENGUANTE, edad: lunarAge };
    } else if (lunarAge < 23.5) {
        // Cuarto menguante exacto
        return { ...PHASES.CUARTO_MENGUANTE, edad: lunarAge, es_exacta: true };
    } else if (lunarAge <= 29.53) {
        return { ...PHASES.LUNA_MENGUANTE, edad: lunarAge };
    }
    
    // Fallback
    return { ...PHASES.LUNA_NUEVA, edad: lunarAge };
}

/**
 * Obtiene la fase lunar para una fecha específica
 * 
 * @param {number} year - Año (ej: 2026)
 * @param {number} month - Mes (1-12)
 * @param {number} day - Día (1-31)
 * @returns {Object} Objeto con la fase lunar
 */
function getLunarPhase(year, month, day) {
    const lunarAge = calculateLunarAge(year, month, day);
    return getPhaseByAge(lunarAge);
}

// ============================================================
// 4. GENERAR CALENDARIO LUNAR COMPLETO POR MES
// ============================================================

/**
 * Genera un array con las fases lunares para todos los días de un mes
 * 
 * @param {number} year - Año (ej: 2026)
 * @param {number} month - Mes (1-12)
 * @returns {Array} Array de objetos con día y fase lunar
 */
function getLunarMonth(year, month) {
    // Número de días del mes
    const daysInMonth = new Date(year, month, 0).getDate();
    
    const monthData = [];
    for (let day = 1; day <= daysInMonth; day++) {
        const phase = getLunarPhase(year, month, day);
        monthData.push({
            day: day,
            date: new Date(year, month - 1, day),
            phase: phase,
            // Para facilitar el uso
            phaseId: phase.id,
            phaseNombre: phase.nombre,
            phaseIcono: phase.icono,
            phaseColor: phase.color,
            lunarAge: phase.edad
        });
    }
    
    return monthData;
}

/**
 * Obtiene el nombre de la fase lunar en formato corto
 * 
 * @param {string} phaseId - ID de la fase
 * @returns {string} Nombre corto
 */
function getShortPhaseName(phaseId) {
    const names = {
        'luna_nueva': 'Luna Nueva',
        'cuarto_creciente': 'Creciente',
        'luna_llena': 'Luna Llena',
        'cuarto_menguante': 'Menguante',
        'luna_menguante': 'Menguante'
    };
    return names[phaseId] || phaseId;
}

/**
 * Obtiene el icono de una fase lunar
 * 
 * @param {string} phaseId - ID de la fase
 * @returns {string} Emoji/icono
 */
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

/**
 * Obtiene el color de una fase lunar
 * 
 * @param {string} phaseId - ID de la fase
 * @returns {string} Color en hex
 */
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

// ============================================================
// 5. FUNCIONES DE UTILIDAD
// ============================================================

/**
 * Verifica si una fecha específica está en una fase lunar determinada
 * 
 * @param {number} year - Año
 * @param {number} month - Mes (1-12)
 * @param {number} day - Día
 * @param {string} phaseId - ID de la fase a verificar
 * @returns {boolean} True si la fecha está en esa fase
 */
function isPhase(year, month, day, phaseId) {
    const phase = getLunarPhase(year, month, day);
    return phase.id === phaseId;
}

/**
 * Encuentra las fechas de un mes que coinciden con una fase lunar específica
 * 
 * @param {number} year - Año
 * @param {number} month - Mes (1-12)
 * @param {string} phaseId - ID de la fase a buscar
 * @returns {Array} Array de días que coinciden
 */
function findDaysWithPhase(year, month, phaseId) {
    const monthData = getLunarMonth(year, month);
    return monthData
        .filter(d => d.phaseId === phaseId)
        .map(d => d.day);
}

/**
 * Obtiene la próxima fecha de una fase lunar específica
 * 
 * @param {string} phaseId - ID de la fase a buscar
 * @param {number} startYear - Año de inicio
 * @param {number} startMonth - Mes de inicio (1-12)
 * @param {number} startDay - Día de inicio
 * @returns {Object|null} Objeto con fecha y fase
 */
function findNextPhase(phaseId, startYear, startMonth, startDay) {
    const maxMonths = 12; // Buscar máximo 12 meses
    let year = startYear;
    let month = startMonth;
    
    for (let i = 0; i < maxMonths; i++) {
        const monthData = getLunarMonth(year, month);
        const found = monthData.find(d => d.phaseId === phaseId);
        if (found) {
            return {
                year: year,
                month: month,
                day: found.day,
                phase: found.phase
            };
        }
        // Pasar al siguiente mes
        month++;
        if (month > 12) {
            month = 1;
            year++;
        }
    }
    
    return null;
}

// ============================================================
// 6. INFORMACIÓN DE FASES PARA INTERFAZ
// ============================================================

/**
 * Obtiene la descripción de una fase lunar
 * 
 * @param {string} phaseId - ID de la fase
 * @returns {string} Descripción
 */
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

/**
 * Obtiene recomendaciones generales para una fase lunar
 * 
 * @param {string} phaseId - ID de la fase
 * @returns {Array} Array de recomendaciones
 */
function getPhaseRecommendations(phaseId) {
    const recommendations = {
        'luna_nueva': [
            'Planifica la siembra de las próximas semanas',
            'Prepara la tierra: remueve, abona y riega',
            'Ideal para plantar legumbres y tubérculos',
            'Controla malas hierbas'
        ],
        'cuarto_creciente': [
            'Siembra plantas de hojas (lechugas, espinacas)',
            'Siembra plantas de fruto (tomates, pimientos)',
            'Realiza trasplantes con éxito',
            'Abona para potenciar el crecimiento'
        ],
        'luna_llena': [
            'Cosecha frutas y verduras para mayor conservación',
            'Realiza podas de formación',
            'Ideal para injertos',
            'Controla plagas (las plantas están más sensibles)'
        ],
        'cuarto_menguante': [
            'Siembra plantas de raíz (zanahorias, cebollas)',
            'Ideal para abonar y fertilizar',
            'Trasplanta plantas de bulbo',
            'Controla plagas y enfermedades'
        ],
        'luna_menguante': [
            'Prepara la tierra para la próxima siembra',
            'Aplica abono orgánico',
            'Realiza labores de mantenimiento',
            'Descansa y observa tu huerto'
        ]
    };
    return recommendations[phaseId] || ['No hay recomendaciones disponibles.'];
}

// ============================================================
// 7. EXPORTACIÓN
// ============================================================

// Si se usa con módulos ES6
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PHASES,
        PHASE_NAMES,
        PHASE_ALIAS,
        calculateLunarAge,
        getPhaseByAge,
        getLunarPhase,
        getLunarMonth,
        getShortPhaseName,
        getPhaseIcon,
        getPhaseColor,
        isPhase,
        findDaysWithPhase,
        findNextPhase,
        getPhaseDescription,
        getPhaseRecommendations
    };
}

// Si se usa en navegador con script tag, las funciones quedan globales
console.log('🌙 Módulo lunar cargado correctamente');