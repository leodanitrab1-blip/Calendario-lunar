/**
 * ============================================================
 * 📅 CALENDAR.JS - Generador de calendario lunar (CORREGIDO)
 * ============================================================
 */

// ============================================================
// 1. ESTADO DEL CALENDARIO
// ============================================================

// El estado ahora se inicializa con el mes actual REAL
const calendarState = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1, // 1-12 (mes actual)
    selectedDay: null,
    selectedPlantId: null
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
    while (grid.children.length > 7) {
        grid.removeChild(grid.lastChild);
    }
    
    // Añadir celdas vacías para los días antes del primer día del mes
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
            // Mapeo de nombres de fase
            const phaseNameMap = {
                'luna_nueva': 'luna nueva',
                'cuarto_creciente': 'cuarto creciente',
                'luna_llena': 'luna llena',
                'cuarto_menguante': 'cuarto menguante',
                'luna_menguante': 'luna menguante'
            };
            const phaseName = phaseNameMap[phaseId] || '';
            
            for (const [accion, fases] of Object.entries(plantActions)) {
                if (fases.includes(phaseId) || fases.includes(phaseName)) {
                    isRecommended = true;
                    recommendationCount++;
                    recommendationActions.push(accion);
                }
            }
        }
        
        if (isRecommended) {
            cell.classList.add('recommended');
            if (recommendationCount > 1) {
                cell.classList.add('recommended-multiple');
            }
            const badge = cell.querySelector('.recommendation-badge');
            if (badge) {
                badge.textContent = recommendationCount;
                badge.style.display = 'flex';
            }
        }
        
        // Almacenar datos en dataset
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
        showPlantInfo(selectedPlantId);
    } else {
        showEmptyState();
    }
    
    // Guardar preferencias
    savePreferences();
}

// ============================================================
// 4. FUNCIONES DE NAVEGACIÓN (CORREGIDAS)
// ============================================================

function goToPreviousMonth() {
    console.log(`⬅️ Mes anterior: ${calendarState.month}/${calendarState.year} →`);
    calendarState.month--;
    if (calendarState.month < 1) {
        calendarState.month = 12;
        calendarState.year--;
    }
    calendarState.selectedDay = null;
    console.log(`   → ${calendarState.month}/${calendarState.year}`);
    renderCalendar();
    showEmptyState();
}

function goToNextMonth() {
    console.log(`➡️ Mes siguiente: ${calendarState.month}/${calendarState.year} →`);
    calendarState.month++;
    if (calendarState.month > 12) {
        calendarState.month = 1;
        calendarState.year++;
    }
    calendarState.selectedDay = null;
    console.log(`   → ${calendarState.month}/${calendarState.year}`);
    renderCalendar();
    showEmptyState();
}

function goToToday() {
    const today = new Date();
    calendarState.year = today.getFullYear();
    calendarState.month = today.getMonth() + 1;
    calendarState.selectedDay = null;
    console.log(`📅 Volviendo a hoy: ${calendarState.month}/${calendarState.year}`);
    renderCalendar();
    showEmptyState();
}

// ============================================================
// 5. RESTO DE FUNCIONES (handleDayClick, showRecommendationsForDay, etc.)
// ============================================================

// ... (todas las funciones anteriores se mantienen igual)
// showRecommendationsForDay, showPlantInfo, showPhaseInfo, showEmptyState, updatePlantDisplay, getActionClass

// ============================================================
// 6. GUARDAR PREFERENCIAS
// ============================================================

function savePreferences() {
    try {
        const prefs = {
            lastYear: calendarState.year,
            lastMonth: calendarState.month,
            lastPlant: calendarState.selectedPlantId
        };
        localStorage.setItem('lunar-preferences', JSON.stringify(prefs));
    } catch (e) {}
}

function loadPreferences() {
    try {
        const saved = localStorage.getItem('lunar-preferences');
        if (saved) {
            const prefs = JSON.parse(saved);
            if (prefs.lastYear && prefs.lastMonth) {
                calendarState.year = prefs.lastYear;
                calendarState.month = prefs.lastMonth;
            }
            if (prefs.lastPlant) {
                const plant = getPlantById(prefs.lastPlant);
                if (plant) {
                    calendarState.selectedPlantId = prefs.lastPlant;
                    DOM.plantSearch.value = plant.nombre;
                }
            }
        }
    } catch (e) {}
}

// ============================================================
// 7. EXPORTACIÓN
// ============================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calendarState,
        renderCalendar,
        goToPreviousMonth,
        goToNextMonth,
        goToToday,
        handleDayClick,
        showRecommendationsForDay,
        showPlantInfo,
        showEmptyState,
        updatePlantDisplay,
        getActionClass,
        savePreferences,
        loadPreferences
    };
}

console.log('📅 Módulo de calendario cargado correctamente');
console.log(`📅 Mes actual: ${calendarState.month}/${calendarState.year}`);