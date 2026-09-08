/**
 * ============================================================
 * 📅 CALENDAR.JS - Generador de calendario lunar
 * ============================================================
 * 
 * Este archivo contiene:
 * 1. Función para renderizar el calendario en el DOM
 * 2. Lógica para pintar días con fases lunares
 * 3. Resaltado de días recomendados según planta seleccionada
 * 4. Interacción con clics en días
 */

// ============================================================
// 1. ESTADO DEL CALENDARIO
// ============================================================

const calendarState = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1, // 1-12
    selectedDay: null,
    selectedPlantId: null,
    plantData: null // Se carga desde plants.js
};

// ============================================================
// 2. REFERENCIAS AL DOM
// ============================================================

const DOM = {
    calendarGrid: document.getElementById('calendarGrid'),
    monthDisplay: document.getElementById('monthDisplay'),
    prevMonthBtn: document.getElementById('prevMonth'),
    nextMonthBtn: document.getElementById('nextMonth'),
    plantSearch: document.getElementById('plantSearch'),
    clearSearch: document.getElementById('clearSearch'),
    recommendationsPanel: document.getElementById('recommendationsPanel'),
    emptyState: document.getElementById('emptyState'),
    recommendationContent: document.getElementById('recommendationContent'),
    plantSelectedDisplay: document.getElementById('plantSelectedDisplay'),
    resetBtn: document.getElementById('resetBtn'),
    pdfBtn: document.getElementById('pdfBtn'),
    shareBtn: document.getElementById('shareBtn'),
    themeToggle: document.getElementById('themeToggle'),
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toastMessage')
};

// ============================================================
// 3. FUNCIÓN PRINCIPAL - RENDERIZAR CALENDARIO
// ============================================================

/**
 * Renderiza el calendario completo para el mes/año actual
 */
function renderCalendar() {
    const { year, month, selectedPlantId } = calendarState;
    
    // Obtener datos lunares del mes
    const monthData = getLunarMonth(year, month);
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    
    // Actualizar display del mes
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    DOM.monthDisplay.innerHTML = `${monthNames[month - 1]} <span class="year">${year}</span>`;
    
    // Limpiar grid (mantener los encabezados de días)
    const grid = DOM.calendarGrid;
    // Eliminar solo las celdas de días (no los encabezados)
    while (grid.children.length > 7) {
        grid.removeChild(grid.lastChild);
    }
    
    // Añadir celdas vacías para los días antes del primer día del mes
    // Ajustar: lunes=0, domingo=6
    let startOffset = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;
    
    for (let i = 0; i < startOffset; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'day-cell empty';
        emptyCell.style.opacity = '0.2';
        emptyCell.style.pointerEvents = 'none';
        grid.appendChild(emptyCell);
    }
    
    // Obtener información de la planta seleccionada
    let plantActions = null;
    let plantData = null;
    if (selectedPlantId) {
        plantData = getPlantById(selectedPlantId);
        if (plantData) {
            plantActions = plantData.acciones;
        }
    }
    
    // Crear celdas para cada día del mes
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth() + 1;
    const todayYear = today.getFullYear();
    
    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement('div');
        cell.className = 'day-cell';
        cell.dataset.day = day;
        cell.dataset.month = month;
        cell.dataset.year = year;
        
        // Obtener fase lunar del día
        const phaseData = monthData.find(d => d.day === day);
        const phaseId = phaseData ? phaseData.phaseId : 'luna_nueva';
        const phaseIcon = phaseData ? phaseData.phaseIcono : '🌑';
        const phaseNombre = phaseData ? phaseData.phaseNombre : 'Luna Nueva';
        
        // Añadir clase de fase
        if (phaseId) {
            cell.classList.add(`phase-${phaseId.replace('_', '-')}`);
        }
        
        // Contenido de la celda
        cell.innerHTML = `
            <span class="day-number">${day}</span>
            <span class="phase-icon">${phaseIcon}</span>
            <span class="recommendation-badge"></span>
        `;
        
        // Resaltar día actual
        if (day === todayDate && month === todayMonth && year === todayYear) {
            cell.classList.add('today');
        }
        
        // Resaltar día seleccionado
        if (day === calendarState.selectedDay) {
            cell.classList.add('selected');
        }
        
        // Verificar si este día es recomendado para la planta seleccionada
        let isRecommended = false;
        let recommendationCount = 0;
        let recommendationActions = [];
        
        if (plantActions && phaseId) {
            // Verificar cada acción
            for (const [accion, fases] of Object.entries(plantActions)) {
                if (fases.includes(phaseId) || fases.includes(phaseNombre.toLowerCase())) {
                    isRecommended = true;
                    recommendationCount++;
                    recommendationActions.push(accion);
                }
            }
            
            // También verificar por nombre de fase (sin acentos)
            const phaseNameMap = {
                'luna_nueva': 'luna nueva',
                'cuarto_creciente': 'cuarto creciente',
                'luna_llena': 'luna llena',
                'cuarto_menguante': 'cuarto menguante',
                'luna_menguante': 'luna menguante'
            };
            const phaseName = phaseNameMap[phaseId] || '';
            
            if (phaseName) {
                for (const [accion, fases] of Object.entries(plantActions)) {
                    if (fases.includes(phaseName)) {
                        isRecommended = true;
                        if (!recommendationActions.includes(accion)) {
                            recommendationCount++;
                            recommendationActions.push(accion);
                        }
                    }
                }
            }
        }
        
        if (isRecommended) {
            cell.classList.add('recommended');
            if (recommendationCount > 1) {
                cell.classList.add('recommended-multiple');
            }
            // Actualizar badge
            const badge = cell.querySelector('.recommendation-badge');
            if (badge) {
                badge.textContent = recommendationCount;
                badge.style.display = 'flex';
            }
        }
        
        // Almacenar datos en dataset para recomendaciones
        cell.dataset.phaseId = phaseId;
        cell.dataset.phaseNombre = phaseNombre;
        cell.dataset.phaseIcon = phaseIcon;
        cell.dataset.recommended = isRecommended ? 'true' : 'false';
        cell.dataset.recommendationCount = recommendationCount;
        cell.dataset.recommendationActions = JSON.stringify(recommendationActions);
        
        // Evento click
        cell.addEventListener('click', () => handleDayClick(cell, day, phaseId, phaseNombre, phaseIcon));
        
        grid.appendChild(cell);
    }
    
    // Actualizar display de planta seleccionada
    updatePlantDisplay();
    
    // Si hay un día seleccionado y una planta, mostrar recomendaciones
    if (calendarState.selectedDay && selectedPlantId) {
        showRecommendationsForDay(calendarState.selectedDay);
    } else if (selectedPlantId) {
        // Si hay planta pero no día seleccionado, mostrar info general
        showPlantInfo(selectedPlantId);
    } else {
        showEmptyState();
    }
}

// ============================================================
// 4. MANEJAR CLIC EN UN DÍA
// ============================================================

/**
 * Maneja el clic en una celda del calendario
 */
function handleDayClick(cell, day, phaseId, phaseNombre, phaseIcon) {
    // Remover selección anterior
    document.querySelectorAll('.day-cell.selected').forEach(el => {
        el.classList.remove('selected');
    });
    
    // Marcar como seleccionado
    cell.classList.add('selected');
    calendarState.selectedDay = day;
    
    // Si hay planta seleccionada, mostrar recomendaciones
    if (calendarState.selectedPlantId) {
        showRecommendationsForDay(day);
    } else {
        // Si no hay planta, mostrar información de la fase lunar
        showPhaseInfo(day, phaseId, phaseNombre, phaseIcon);
    }
}

// ============================================================
// 5. MOSTRAR RECOMENDACIONES PARA UN DÍA
// ============================================================

/**
 * Muestra las recomendaciones para un día específico
 */
function showRecommendationsForDay(day) {
    const plantId = calendarState.selectedPlantId;
    if (!plantId) {
        showEmptyState();
        return;
    }
    
    const plant = getPlantById(plantId);
    if (!plant) {
        showEmptyState();
        return;
    }
    
    // Obtener fase del día seleccionado
    const { year, month } = calendarState;
    const phaseData = getLunarPhase(year, month, day);
    const phaseId = phaseData.id;
    const phaseNombre = phaseData.nombre;
    const phaseIcon = phaseData.icono;
    
    // Obtener acciones recomendadas para esta fase y planta
    const actions = getActionsForPhase(plantId, phaseId);
    
    // Si no hay acciones, mostrar mensaje
    if (actions.length === 0) {
        // Verificar por nombre de fase
        const phaseNameMap = {
            'luna_nueva': 'luna nueva',
            'cuarto_creciente': 'cuarto creciente',
            'luna_llena': 'luna llena',
            'cuarto_menguante': 'cuarto menguante',
            'luna_menguante': 'luna menguante'
        };
        const phaseName = phaseNameMap[phaseId] || '';
        let extraActions = [];
        if (phaseName) {
            for (const [accion, fases] of Object.entries(plant.acciones)) {
                if (fases.includes(phaseName)) {
                    extraActions.push(accion);
                }
            }
        }
        if (extraActions.length === 0) {
            showNoRecommendations(day, phaseNombre, phaseIcon, plant);
            return;
        }
        // Usar las acciones encontradas por nombre
        showRecommendationsWithActions(day, phaseNombre, phaseIcon, plant, extraActions);
        return;
    }
    
    // Mostrar recomendaciones con acciones
    showRecommendationsWithActions(day, phaseNombre, phaseIcon, plant, actions);
}

/**
 * Muestra recomendaciones con acciones específicas
 */
function showRecommendationsWithActions(day, phaseNombre, phaseIcon, plant, actions) {
    const { year, month } = calendarState;
    const dateObj = new Date(year, month - 1, day);
    const dateStr = dateObj.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });
    
    // Construir HTML
    let actionsHTML = actions.map(action => {
        const label = getActionLabel(action);
        const actionClass = getActionClass(action);
        return `<span class="action-tag ${actionClass}">${label}</span>`;
    }).join('');
    
    // Consejos específicos de la planta
    let tipsHTML = '';
    if (plant.consejos && plant.consejos.length > 0) {
        const randomTip = plant.consejos[Math.floor(Math.random() * plant.consejos.length)];
        tipsHTML = `
            <div class="tip">
                💡 <strong>Consejo:</strong> ${randomTip}
            </div>
        `;
    }
    
    // Información de la planta
    const plantInfo = `
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <span style="font-size: 24px;">${plant.icono || '🌱'}</span>
            <span style="font-weight: 600; font-size: 18px;">${plant.nombre}</span>
            ${plant.nombreCientifico ? `<span style="color: var(--text-muted); font-style: italic; font-size: 13px;">(${plant.nombreCientifico})</span>` : ''}
        </div>
    `;
    
    const contentHTML = `
        ${plantInfo}
        <div class="date-info">
            📅 ${dateStr}
        </div>
        <div class="phase-info">
            <span class="phase-icon">${phaseIcon}</span>
            <span>${phaseNombre}</span>
            <span style="font-size: 13px; color: var(--text-muted);">${getPhaseDescription(phaseId)}</span>
        </div>
        <div class="actions-list">
            ${actionsHTML}
        </div>
        ${tipsHTML}
        <div style="margin-top: 8px; font-size: 13px; color: var(--text-muted);">
            ${plant.descripcion || ''}
        </div>
    `;
    
    // Mostrar en el panel
    DOM.emptyState.style.display = 'none';
    DOM.recommendationContent.style.display = 'block';
    DOM.recommendationContent.innerHTML = contentHTML;
}

/**
 * Muestra mensaje cuando no hay recomendaciones para ese día
 */
function showNoRecommendations(day, phaseNombre, phaseIcon, plant) {
    const { year, month } = calendarState;
    const dateObj = new Date(year, month - 1, day);
    const dateStr = dateObj.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });
    
    const contentHTML = `
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <span style="font-size: 24px;">${plant.icono || '🌱'}</span>
            <span style="font-weight: 600; font-size: 18px;">${plant.nombre}</span>
        </div>
        <div class="date-info">
            📅 ${dateStr}
        </div>
        <div class="phase-info">
            <span class="phase-icon">${phaseIcon}</span>
            <span>${phaseNombre}</span>
        </div>
        <div style="padding: 12px 0; color: var(--text-secondary); font-size: 15px;">
            ⏳ No hay tareas recomendadas para ${plant.nombre} en esta fase lunar.
        </div>
        <div style="font-size: 13px; color: var(--text-muted);">
            ${plant.descripcion || ''}
        </div>
    `;
    
    DOM.emptyState.style.display = 'none';
    DOM.recommendationContent.style.display = 'block';
    DOM.recommendationContent.innerHTML = contentHTML;
}

// ============================================================
// 6. MOSTRAR INFORMACIÓN GENERAL DE PLANTA
// ============================================================

/**
 * Muestra información general de la planta seleccionada
 */
function showPlantInfo(plantId) {
    const plant = getPlantById(plantId);
    if (!plant) {
        showEmptyState();
        return;
    }
    
    const contentHTML = `
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <span style="font-size: 28px;">${plant.icono || '🌱'}</span>
            <span style="font-weight: 700; font-size: 20px;">${plant.nombre}</span>
            ${plant.nombreCientifico ? `<span style="color: var(--text-muted); font-style: italic; font-size: 14px;">(${plant.nombreCientifico})</span>` : ''}
        </div>
        <div style="color: var(--text-secondary); font-size: 15px; margin-bottom: 10px;">
            ${plant.descripcion || ''}
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; font-size: 14px;">
            ${plant.temporada ? `<span style="background: var(--bg-card); padding: 4px 12px; border-radius: 20px; border: 1px solid var(--border-light);">📅 ${plant.temporada}</span>` : ''}
            ${plant.diasCosecha ? `<span style="background: var(--bg-card); padding: 4px 12px; border-radius: 20px; border: 1px solid var(--border-light);">⏱️ ${plant.diasCosecha} días</span>` : ''}
            ${plant.profundidadSiembra ? `<span style="background: var(--bg-card); padding: 4px 12px; border-radius: 20px; border: 1px solid var(--border-light);">📏 ${plant.profundidadSiembra} cm</span>` : ''}
        </div>
        <div style="margin-top: 12px; font-size: 14px; color: var(--text-muted);">
            👆 Selecciona un día en el calendario para ver recomendaciones específicas
        </div>
    `;
    
    DOM.emptyState.style.display = 'none';
    DOM.recommendationContent.style.display = 'block';
    DOM.recommendationContent.innerHTML = contentHTML;
}

// ============================================================
// 7. MOSTRAR FASE LUNAR (sin planta seleccionada)
// ============================================================

/**
 * Muestra información de la fase lunar cuando no hay planta seleccionada
 */
function showPhaseInfo(day, phaseId, phaseNombre, phaseIcon) {
    const { year, month } = calendarState;
    const dateObj = new Date(year, month - 1, day);
    const dateStr = dateObj.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });
    
    const recommendations = getPhaseRecommendations(phaseId);
    const recHTML = recommendations.map(r => `<li style="margin-bottom: 4px;">• ${r}</li>`).join('');
    
    const contentHTML = `
        <div class="date-info">
            📅 ${dateStr}
        </div>
        <div class="phase-info" style="margin: 8px 0;">
            <span class="phase-icon" style="font-size: 40px;">${phaseIcon}</span>
            <span style="font-size: 22px; font-weight: 600;">${phaseNombre}</span>
        </div>
        <div style="color: var(--text-secondary); font-size: 15px; margin-bottom: 10px;">
            ${getPhaseDescription(phaseId)}
        </div>
        <div style="background: var(--bg-card); padding: 12px 16px; border-radius: var(--radius-sm); border-left: 3px solid ${getPhaseColor(phaseId)};">
            <strong style="color: var(--text-primary);">🌱 Recomendaciones generales:</strong>
            <ul style="margin-top: 6px; padding-left: 20px; color: var(--text-secondary); font-size: 14px; list-style: none;">
                ${recHTML}
            </ul>
        </div>
        <div style="margin-top: 10px; font-size: 13px; color: var(--text-muted);">
            🔍 Busca una planta para ver recomendaciones específicas
        </div>
    `;
    
    DOM.emptyState.style.display = 'none';
    DOM.recommendationContent.style.display = 'block';
    DOM.recommendationContent.innerHTML = contentHTML;
}

// ============================================================
// 8. MOSTRAR ESTADO VACÍO
// ============================================================

function showEmptyState() {
    DOM.emptyState.style.display = 'block';
    DOM.recommendationContent.style.display = 'none';
}

// ============================================================
// 9. ACTUALIZAR DISPLAY DE PLANTA SELECCIONADA
// ============================================================

function updatePlantDisplay() {
    const plantId = calendarState.selectedPlantId;
    if (plantId) {
        const plant = getPlantById(plantId);
        if (plant) {
            DOM.plantSelectedDisplay.innerHTML = `
                Planta: <strong style="color: var(--text-primary);">${plant.icono || '🌱'} ${plant.nombre}</strong>
            `;
            return;
        }
    }
    DOM.plantSelectedDisplay.innerHTML = `Planta: <strong style="color: var(--text-secondary);">Ninguna</strong>`;
}

// ============================================================
// 10. CAMBIAR MES
// ============================================================

function goToPreviousMonth() {
    calendarState.month--;
    if (calendarState.month < 1) {
        calendarState.month = 12;
        calendarState.year--;
    }
    calendarState.selectedDay = null;
    renderCalendar();
    showEmptyState();
}

function goToNextMonth() {
    calendarState.month++;
    if (calendarState.month > 12) {
        calendarState.month = 1;
        calendarState.year++;
    }
    calendarState.selectedDay = null;
    renderCalendar();
    showEmptyState();
}

function goToToday() {
    const today = new Date();
    calendarState.year = today.getFullYear();
    calendarState.month = today.getMonth() + 1;
    calendarState.selectedDay = null;
    renderCalendar();
    showEmptyState();
}

// ============================================================
// 11. CLASIFICACIÓN DE ACCIONES
// ============================================================

function getActionClass(action) {
    const classes = {
        siembra: 'sow',
        trasplante: 'transplant',
        poda: 'prune',
        cosecha: 'harvest',
        abono: 'fertilize',
        riego_extra: 'water',
        control_plagas: 'pest'
    };
    return classes[action] || '';
}

// ============================================================
// 12. EXPORTACIÓN (para módulos)
// ============================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calendarState,
        renderCalendar,
        handleDayClick,
        showRecommendationsForDay,
        showPlantInfo,
        showPhaseInfo,
        showEmptyState,
        goToPreviousMonth,
        goToNextMonth,
        goToToday,
        updatePlantDisplay,
        getActionClass
    };
}

console.log('📅 Módulo de calendario cargado correctamente');