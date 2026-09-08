/**
 * ============================================================
 * 🌱 RECOMMENDATIONS.JS - Lógica de recomendaciones avanzadas
 * ============================================================
 * 
 * Este archivo contiene:
 * 1. Cálculo de días recomendados para cada planta
 * 2. Generación de consejos personalizados
 * 3. Calendario de siembra completo
 * 4. Alertas y recordatorios
 * 5. Exportación a PDF
 */

// ============================================================
// 1. OBTENER DÍAS RECOMENDADOS DEL MES PARA UNA PLANTA
// ============================================================

/**
 * Obtiene todos los días del mes que son recomendados para una planta
 * 
 * @param {string} plantId - ID de la planta
 * @param {number} year - Año
 * @param {number} month - Mes (1-12)
 * @returns {Object} Objeto con días recomendados por acción
 */
function getRecommendedDaysForPlant(plantId, year, month) {
    const plant = getPlantById(plantId);
    if (!plant) return null;
    
    const monthData = getLunarMonth(year, month);
    const result = {
        siembra: [],
        trasplante: [],
        poda: [],
        cosecha: [],
        abono: [],
        riego_extra: [],
        control_plagas: [],
        todos: []
    };
    
    // Mapeo de nombres de fase para comparación
    const phaseNameMap = {};
    for (const dayData of monthData) {
        phaseNameMap[dayData.day] = dayData.phaseId;
    }
    
    // Para cada día, verificar qué acciones coinciden
    for (const dayData of monthData) {
        const day = dayData.day;
        const phaseId = dayData.phaseId;
        const phaseNombre = dayData.phaseNombre.toLowerCase();
        
        const acciones = plant.acciones;
        const accionesDelDia = [];
        
        for (const [accion, fases] of Object.entries(acciones)) {
            // Verificar por phaseId y por nombre
            if (fases.includes(phaseId) || fases.includes(phaseNombre)) {
                accionesDelDia.push(accion);
                if (result[accion]) {
                    result[accion].push(day);
                }
            }
        }
        
        if (accionesDelDia.length > 0) {
            result.todos.push({
                day: day,
                actions: accionesDelDia,
                phaseId: phaseId,
                phaseNombre: dayData.phaseNombre,
                phaseIcon: dayData.phaseIcono
            });
        }
    }
    
    return result;
}

/**
 * Obtiene el mejor día del mes para una acción específica
 * 
 * @param {string} plantId - ID de la planta
 * @param {string} action - Acción (siembra, trasplante, etc.)
 * @param {number} year - Año
 * @param {number} month - Mes (1-12)
 * @returns {Object|null} Mejor día recomendado
 */
function getBestDayForAction(plantId, action, year, month) {
    const recommendations = getRecommendedDaysForPlant(plantId, year, month);
    if (!recommendations) return null;
    
    const days = recommendations[action];
    if (!days || days.length === 0) return null;
    
    // Buscar el día con mejor fase (priorizar fase exacta si existe)
    const monthData = getLunarMonth(year, month);
    for (const day of days) {
        const dayData = monthData.find(d => d.day === day);
        if (dayData && dayData.phase.es_exacta) {
            return { day, phaseId: dayData.phaseId, phaseNombre: dayData.phaseNombre, isExact: true };
        }
    }
    
    // Si no hay fase exacta, devolver el primero
    const firstDay = days[0];
    const dayData = monthData.find(d => d.day === firstDay);
    return { 
        day: firstDay, 
        phaseId: dayData ? dayData.phaseId : null,
        phaseNombre: dayData ? dayData.phaseNombre : null,
        isExact: false
    };
}

// ============================================================
// 2. CONSEJOS PERSONALIZADOS
// ============================================================

/**
 * Genera un consejo personalizado para una planta y día específico
 * 
 * @param {string} plantId - ID de la planta
 * @param {number} year - Año
 * @param {number} month - Mes (1-12)
 * @param {number} day - Día
 * @returns {Object} Consejo personalizado
 */
function generatePersonalizedTip(plantId, year, month, day) {
    const plant = getPlantById(plantId);
    if (!plant) return null;
    
    const phase = getLunarPhase(year, month, day);
    const actions = getActionsForPhase(plantId, phase.id);
    
    if (actions.length === 0) {
        return {
            title: `⏳ Descanso para ${plant.nombre}`,
            message: `Hoy no hay tareas recomendadas para ${plant.nombre}. Aprovecha para preparar la tierra o planificar.`,
            icon: '🌱',
            action: 'descanso'
        };
    }
    
    // Seleccionar una acción aleatoria de las recomendadas
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    const actionLabel = getActionLabel(randomAction);
    
    // Consejos específicos por acción
    const actionTips = {
        siembra: [
            `Siembra ${plant.nombre} a ${plant.profundidadSiembra || 1} cm de profundidad`,
            `Mantén la distancia de ${plant.separacionPlantas || 20} cm entre plantas`,
            `Riega suavemente después de sembrar`,
            `Asegúrate de que la tierra esté bien drenada`
        ],
        trasplante: [
            `Trasplanta ${plant.nombre} cuando tenga al menos 4 hojas verdaderas`,
            `Haz el trasplante al atardecer para reducir el estrés`,
            `Riega abundantemente después del trasplante`
        ],
        poda: [
            `Poda ${plant.nombre} para eliminar ramas secas o enfermas`,
            `Aprovecha para dar forma a la planta`,
            `Después de podar, aplica una pasta cicatrizante`
        ],
        cosecha: [
            `Cosecha ${plant.nombre} en su punto óptimo de maduración`,
            `Usa herramientas limpias y afiladas para cortar`,
            `Cosecha en las horas más frescas del día`
        ],
        abono: [
            `Aplica abono orgánico a ${plant.nombre}`,
            `Abona después de regar para mejor absorción`,
            `Usa abono rico en ${plant.tipo === 'fruto' ? 'potasio y fósforo' : 'nitrógeno'}`
        ],
        riego_extra: [
            `Aumenta el riego de ${plant.nombre} en esta fase`,
            `Riega en la base, evitando mojar las hojas`,
            `El riego profundo estimula raíces más fuertes`
        ],
        control_plagas: [
            `Inspecciona ${plant.nombre} en busca de plagas`,
            `Usa remedios naturales como jabón potásico`,
            `Elimina las hojas afectadas manualmente`
        ]
    };
    
    const tips = actionTips[randomAction] || [`Realiza ${actionLabel} para ${plant.nombre}`];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    
    // Obtener un consejo general de la planta
    let plantTip = '';
    if (plant.consejos && plant.consejos.length > 0) {
        plantTip = plant.consejos[Math.floor(Math.random() * plant.consejos.length)];
    }
    
    return {
        title: `${actionLabel} para ${plant.nombre}`,
        message: randomTip,
        icon: plant.icono || '🌱',
        action: randomAction,
        actionLabel: actionLabel,
        additionalTip: plantTip,
        phase: phase.nombre,
        phaseIcon: phase.icono,
        date: `${day}/${month}/${year}`
    };
}

// ============================================================
// 3. GENERAR CALENDARIO DE SIEMBRA COMPLETO
// ============================================================

/**
 * Genera un calendario de siembra completo para una planta
 * 
 * @param {string} plantId - ID de la planta
 * @param {number} year - Año
 * @returns {Object} Calendario completo con todos los meses
 */
function generateFullCalendar(plantId, year) {
    const plant = getPlantById(plantId);
    if (!plant) return null;
    
    const result = {};
    
    for (let month = 1; month <= 12; month++) {
        result[month] = getRecommendedDaysForPlant(plantId, year, month);
    }
    
    return result;
}

/**
 * Encuentra el mejor mes para sembrar una planta en un año
 * 
 * @param {string} plantId - ID de la planta
 * @param {number} year - Año
 * @returns {Object|null} Mejor mes con estadísticas
 */
function findBestMonthForPlant(plantId, year) {
    const plant = getPlantById(plantId);
    if (!plant) return null;
    
    let bestMonth = null;
    let maxScore = -1;
    
    for (let month = 1; month <= 12; month++) {
        const recommendations = getRecommendedDaysForPlant(plantId, year, month);
        if (!recommendations) continue;
        
        const siembraDays = recommendations.siembra || [];
        const trasplanteDays = recommendations.trasplante || [];
        
        // Puntaje: priorizar siembra y trasplante
        let score = siembraDays.length * 3 + trasplanteDays.length * 2;
        
        // Bonus por fase exacta
        const monthData = getLunarMonth(year, month);
        for (const day of siembraDays) {
            const dayData = monthData.find(d => d.day === day);
            if (dayData && dayData.phase.es_exacta) {
                score += 2;
            }
        }
        
        if (score > maxScore) {
            maxScore = score;
            bestMonth = {
                month: month,
                score: score,
                siembraDays: siembraDays,
                trasplanteDays: trasplanteDays,
                totalDays: recommendations.todos.length
            };
        }
    }
    
    return bestMonth;
}

// ============================================================
// 4. GENERAR ALERTAS Y RECORDATORIOS
// ============================================================

/**
 * Genera alertas para los próximos días recomendados
 * 
 * @param {string} plantId - ID de la planta
 * @param {number} year - Año
 * @param {number} month - Mes (1-12)
 * @param {number} day - Día actual
 * @param {number} daysAhead - Días a mirar hacia adelante
 * @returns {Array} Alertas para los próximos días
 */
function generateAlerts(plantId, year, month, day, daysAhead = 7) {
    const plant = getPlantById(plantId);
    if (!plant) return [];
    
    const alerts = [];
    let currentMonth = month;
    let currentYear = year;
    let daysChecked = 0;
    let currentDay = day;
    
    while (daysChecked < daysAhead) {
        const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
        
        if (currentDay > daysInMonth) {
            currentDay = 1;
            currentMonth++;
            if (currentMonth > 12) {
                currentMonth = 1;
                currentYear++;
            }
            continue;
        }
        
        const phase = getLunarPhase(currentYear, currentMonth, currentDay);
        const actions = getActionsForPhase(plantId, phase.id);
        
        if (actions.length > 0) {
            const dateObj = new Date(currentYear, currentMonth - 1, currentDay);
            alerts.push({
                date: dateObj,
                day: currentDay,
                month: currentMonth,
                year: currentYear,
                actions: actions,
                phase: phase.nombre,
                phaseIcon: phase.icono,
                daysFromNow: daysChecked,
                isToday: daysChecked === 0
            });
        }
        
        currentDay++;
        daysChecked++;
    }
    
    return alerts;
}

// ============================================================
// 5. GENERAR PDF (IMPRESIÓN)
// ============================================================

/**
 * Genera el contenido HTML para imprimir/PDF del mes actual
 * 
 * @param {number} year - Año
 * @param {number} month - Mes (1-12)
 * @param {string} plantId - ID de la planta (opcional)
 * @returns {string} HTML listo para imprimir
 */
function generatePrintableCalendar(year, month, plantId) {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const monthName = monthNames[month - 1];
    const monthData = getLunarMonth(year, month);
    
    let plantName = '';
    let plantRecommendations = null;
    if (plantId) {
        const plant = getPlantById(plantId);
        if (plant) {
            plantName = plant.nombre;
            plantRecommendations = getRecommendedDaysForPlant(plantId, year, month);
        }
    }
    
    // Generar tabla de días
    let daysHTML = '';
    for (const dayData of monthData) {
        const day = dayData.day;
        const phaseIcon = dayData.phaseIcono;
        const phaseNombre = dayData.phaseNombre;
        
        let isRecommended = false;
        let actionsHTML = '';
        if (plantRecommendations) {
            const dayRec = plantRecommendations.todos.find(d => d.day === day);
            if (dayRec) {
                isRecommended = true;
                actionsHTML = dayRec.actions.map(a => getActionLabel(a)).join(', ');
            }
        }
        
        daysHTML += `
            <tr>
                <td style="padding: 8px 12px; border: 1px solid #2a3a52; text-align: center;">${day}</td>
                <td style="padding: 8px 12px; border: 1px solid #2a3a52; text-align: center;">${phaseIcon}</td>
                <td style="padding: 8px 12px; border: 1px solid #2a3a52;">${phaseNombre}</td>
                <td style="padding: 8px 12px; border: 1px solid #2a3a52; ${isRecommended ? 'background: rgba(52, 211, 153, 0.1);' : ''}">
                    ${isRecommended ? `✅ ${actionsHTML}` : '—'}
                </td>
            </tr>
        `;
    }
    
    return `
        <html>
        <head>
            <title>Calendario Lunar - ${monthName} ${year}</title>
            <style>
                body {
                    font-family: 'Inter', Arial, sans-serif;
                    background: #0a0e17;
                    color: #e8edf5;
                    padding: 30px;
                }
                .header {
                    text-align: center;
                    padding-bottom: 20px;
                    border-bottom: 2px solid #2a3a52;
                    margin-bottom: 20px;
                }
                .header h1 {
                    font-size: 28px;
                    margin: 0;
                    background: linear-gradient(135deg, #fbbf24, #60a5fa);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .header p {
                    color: #94a3b8;
                    margin: 5px 0 0;
                }
                .subtitle {
                    text-align: center;
                    color: #94a3b8;
                    margin-bottom: 20px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th {
                    background: #1a2332;
                    padding: 10px 12px;
                    text-align: left;
                    border: 1px solid #2a3a52;
                    font-weight: 600;
                    color: #e8edf5;
                }
                td {
                    padding: 8px 12px;
                    border: 1px solid #2a3a52;
                }
                .legend {
                    margin-top: 20px;
                    padding: 16px;
                    background: #111927;
                    border-radius: 8px;
                    border: 1px solid #2a3a52;
                }
                .legend-item {
                    display: inline-block;
                    margin-right: 20px;
                    font-size: 14px;
                    color: #94a3b8;
                }
                .footer {
                    text-align: center;
                    color: #64748b;
                    font-size: 12px;
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 1px solid #2a3a52;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🌙 Calendario Lunar de Siembra</h1>
                <p>${monthName} ${year} ${plantName ? `• ${plantName}` : ''}</p>
            </div>
            <div class="subtitle">
                ${plantName ? `Recomendaciones específicas para ${plantName}` : 'Recomendaciones generales'}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Día</th>
                        <th>Fase</th>
                        <th>Nombre</th>
                        <th>Recomendaciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${daysHTML}
                </tbody>
            </table>
            <div class="legend">
                <strong style="color: #e8edf5;">Leyenda de fases:</strong>
                <span class="legend-item">🌑 Luna Nueva</span>
                <span class="legend-item">🌒 Cuarto Creciente</span>
                <span class="legend-item">🌕 Luna Llena</span>
                <span class="legend-item">🌘 Cuarto Menguante</span>
                <span class="legend-item">🌙 Luna Menguante</span>
            </div>
            <div class="footer">
                Generado con 🌙 Calendario Lunar de Siembra • ${new Date().toLocaleDateString()}
            </div>
        </body>
        </html>
    `;
}

// ============================================================
// 6. EXPORTACIÓN
// ============================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getRecommendedDaysForPlant,
        getBestDayForAction,
        generatePersonalizedTip,
        generateFullCalendar,
        findBestMonthForPlant,
        generateAlerts,
        generatePrintableCalendar
    };
}

console.log('🌱 Módulo de recomendaciones cargado correctamente');