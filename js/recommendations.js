/**
 * ============================================================
 * 🌱 RECOMMENDATIONS.JS - Lógica de recomendaciones avanzadas
 * ============================================================
 */

function getRecommendedDaysForPlant(plantId, year, month) {
    const plant = getPlantById(plantId);
    if (!plant) return null;
    
    const monthData = getLunarMonth(year, month);
    const result = { siembra: [], trasplante: [], poda: [], cosecha: [], abono: [], riego_extra: [], control_plagas: [], todos: [] };
    
    for (const dayData of monthData) {
        const day = dayData.day;
        const phaseId = dayData.phaseId;
        const phaseNombre = dayData.phaseNombre.toLowerCase();
        const acciones = plant.acciones;
        const accionesDelDia = [];
        
        for (const [accion, fases] of Object.entries(acciones)) {
            if (fases.includes(phaseId) || fases.includes(phaseNombre)) {
                accionesDelDia.push(accion);
                if (result[accion]) result[accion].push(day);
            }
        }
        
        if (accionesDelDia.length > 0) {
            result.todos.push({ day: day, actions: accionesDelDia, phaseId: phaseId, phaseNombre: dayData.phaseNombre, phaseIcon: dayData.phaseIcono });
        }
    }
    return result;
}

function getBestDayForAction(plantId, action, year, month) {
    const recommendations = getRecommendedDaysForPlant(plantId, year, month);
    if (!recommendations) return null;
    const days = recommendations[action];
    if (!days || days.length === 0) return null;
    const monthData = getLunarMonth(year, month);
    for (const day of days) {
        const dayData = monthData.find(d => d.day === day);
        if (dayData && dayData.es_exacta) {
            return { day, phaseId: dayData.phaseId, phaseNombre: dayData.phaseNombre, isExact: true };
        }
    }
    const firstDay = days[0];
    const dayData = monthData.find(d => d.day === firstDay);
    return { day: firstDay, phaseId: dayData ? dayData.phaseId : null, phaseNombre: dayData ? dayData.phaseNombre : null, isExact: false };
}

function generatePersonalizedTip(plantId, year, month, day) {
    const plant = getPlantById(plantId);
    if (!plant) return null;
    const phase = getLunarPhase(year, month, day);
    const actions = getActionsForPhase(plantId, phase.id);
    if (actions.length === 0) {
        return { title: `⏳ Descanso para ${plant.nombre}`, message: `Hoy no hay tareas recomendadas para ${plant.nombre}.`, icon: '🌱', action: 'descanso' };
    }
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    const actionLabel = getActionLabel(randomAction);
    const actionTips = {
        siembra: [`Siembra ${plant.nombre} a ${plant.profundidadSiembra || 1} cm de profundidad`, `Mantén distancia de ${plant.separacionPlantas || 20} cm`, `Riega suavemente después de sembrar`],
        trasplante: [`Trasplanta ${plant.nombre} cuando tenga al menos 4 hojas verdaderas`, `Haz el trasplante al atardecer`, `Riega abundantemente después`],
        poda: [`Poda ${plant.nombre} para eliminar ramas secas`, `Aprovecha para dar forma`, `Aplica pasta cicatrizante`],
        cosecha: [`Cosecha ${plant.nombre} en su punto óptimo`, `Usa herramientas limpias y afiladas`, `Cosecha en horas frescas`],
        abono: [`Aplica abono orgánico a ${plant.nombre}`, `Abona después de regar`, `Usa abono rico en nutrientes`],
        riego_extra: [`Aumenta el riego de ${plant.nombre}`, `Riega en la base`, `El riego profundo estimula raíces`],
        control_plagas: [`Inspecciona ${plant.nombre} en busca de plagas`, `Usa remedios naturales`, `Elimina hojas afectadas`]
    };
    const tips = actionTips[randomAction] || [`Realiza ${actionLabel} para ${plant.nombre}`];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
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

function generateFullCalendar(plantId, year) {
    const plant = getPlantById(plantId);
    if (!plant) return null;
    const result = {};
    for (let month = 1; month <= 12; month++) {
        result[month] = getRecommendedDaysForPlant(plantId, year, month);
    }
    return result;
}

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
        let score = siembraDays.length * 3 + trasplanteDays.length * 2;
        const monthData = getLunarMonth(year, month);
        for (const day of siembraDays) {
            const dayData = monthData.find(d => d.day === day);
            if (dayData && dayData.es_exacta) score += 2;
        }
        if (score > maxScore) {
            maxScore = score;
            bestMonth = { month, score, siembraDays, trasplanteDays, totalDays: recommendations.todos.length };
        }
    }
    return bestMonth;
}

function generateAlerts(plantId, year, month, day, daysAhead = 7) {
    const plant = getPlantById(plantId);
    if (!plant) return [];
    const alerts = [];
    let currentMonth = month, currentYear = year, daysChecked = 0, currentDay = day;
    while (daysChecked < daysAhead) {
        const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
        if (currentDay > daysInMonth) { currentDay = 1; currentMonth++; if (currentMonth > 12) { currentMonth = 1; currentYear++; } continue; }
        const phase = getLunarPhase(currentYear, currentMonth, currentDay);
        const actions = getActionsForPhase(plantId, phase.id);
        if (actions.length > 0) {
            alerts.push({
                date: new Date(currentYear, currentMonth - 1, currentDay),
                day: currentDay, month: currentMonth, year: currentYear,
                actions, phase: phase.nombre, phaseIcon: phase.icono,
                daysFromNow: daysChecked, isToday: daysChecked === 0
            });
        }
        currentDay++; daysChecked++;
    }
    return alerts;
}

function generatePrintableCalendar(year, month, plantId) {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const monthName = monthNames[month - 1];
    const monthData = getLunarMonth(year, month);
    let plantName = '', plantRecommendations = null;
    if (plantId) {
        const plant = getPlantById(plantId);
        if (plant) { plantName = plant.nombre; plantRecommendations = getRecommendedDaysForPlant(plantId, year, month); }
    }
    let daysHTML = '';
    for (const dayData of monthData) {
        const day = dayData.day, phaseIcon = dayData.phaseIcono, phaseNombre = dayData.phaseNombre;
        let isRecommended = false, actionsHTML = '';
        if (plantRecommendations) {
            const dayRec = plantRecommendations.todos.find(d => d.day === day);
            if (dayRec) { isRecommended = true; actionsHTML = dayRec.actions.map(a => getActionLabel(a)).join(', '); }
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
        <html><head><title>Calendario Lunar - ${monthName} ${year}</title>
        <style>
            body { font-family: 'Inter', Arial, sans-serif; background: #0a0e17; color: #e8edf5; padding: 30px; }
            .header { text-align: center; padding-bottom: 20px; border-bottom: 2px solid #2a3a52; margin-bottom: 20px; }
            .header h1 { font-size: 28px; margin: 0; background: linear-gradient(135deg, #fbbf24, #60a5fa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .header p { color: #94a3b8; margin: 5px 0 0; }
            .subtitle { text-align: center; color: #94a3b8; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th { background: #1a2332; padding: 10px 12px; text-align: left; border: 1px solid #2a3a52; font-weight: 600; color: #e8edf5; }
            td { padding: 8px 12px; border: 1px solid #2a3a52; }
            .legend { margin-top: 20px; padding: 16px; background: #111927; border-radius: 8px; border: 1px solid #2a3a52; }
            .legend-item { display: inline-block; margin-right: 20px; font-size: 14px; color: #94a3b8; }
            .footer { text-align: center; color: #64748b; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #2a3a52; }
        </style>
        </head><body>
            <div class="header"><h1>🌙 Calendario Lunar de Siembra</h1><p>${monthName} ${year} ${plantName ? `• ${plantName}` : ''}</p></div>
            <div class="subtitle">${plantName ? `Recomendaciones específicas para ${plantName}` : 'Recomendaciones generales'}</div>
            <table><thead><tr><th>Día</th><th>Fase</th><th>Nombre</th><th>Recomendaciones</th></tr></thead>
            <tbody>${daysHTML}</tbody></table>
            <div class="legend">
                <strong style="color: #e8edf5;">Leyenda:</strong>
                <span class="legend-item">🌑 Luna Nueva</span>
                <span class="legend-item">🌒 Cuarto Creciente</span>
                <span class="legend-item">🌕 Luna Llena</span>
                <span class="legend-item">🌘 Cuarto Menguante</span>
                <span class="legend-item">🌙 Luna Menguante</span>
            </div>
            <div class="footer">Generado con 🌙 Calendario Lunar de Siembra • ${new Date().toLocaleDateString()}</div>
        </body></html>
    `;
}

console.log('🌱 Módulo de recomendaciones cargado correctamente');