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