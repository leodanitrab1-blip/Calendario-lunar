/**
 * ============================================================
 * 🚀 MAIN.JS - Controlador Principal (CORREGIDO)
 * ============================================================
 * 
 * Este archivo contiene:
 * 1. Inicialización de la aplicación
 * 2. Manejo de eventos (clics, teclado, etc.)
 * 3. Buscador de plantas con autocompletado
 * 4. Tema claro/oscuro
 * 5. Exportar PDF
 * 6. Compartir
 * 7. Toast notifications
 * 8. NAVEGACIÓN DE MESES (corregido)
 */

// ============================================================
// 1. DOM REFERENCIAS
// ============================================================

const DOM_MAIN = {
    plantSearch: document.getElementById('plantSearch'),
    clearSearch: document.getElementById('clearSearch'),
    themeToggle: document.getElementById('themeToggle'),
    shareBtn: document.getElementById('shareBtn'),
    pdfBtn: document.getElementById('pdfBtn'),
    resetBtn: document.getElementById('resetBtn'),
    resetAllLink: document.getElementById('resetAllLink'),
    feedbackLink: document.getElementById('feedbackLink'),
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toastMessage'),
    recommendationContent: document.getElementById('recommendationContent'),
    emptyState: document.getElementById('emptyState'),
    plantSelectedDisplay: document.getElementById('plantSelectedDisplay'),
    // Navegación
    prevMonthBtn: document.getElementById('prevMonth'),
    nextMonthBtn: document.getElementById('nextMonth'),
    monthDisplay: document.getElementById('monthDisplay')
};

// ============================================================
// 2. INICIALIZACIÓN
// ============================================================

/**
 * Inicializa la aplicación cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌙 Iniciando Calendario Lunar de Siembra...');
    
    // Verificar que todos los módulos estén cargados
    if (typeof getLunarMonth === 'undefined') {
        console.error('❌ Error: lunar.js no cargado');
        return;
    }
    if (typeof getAllPlants === 'undefined') {
        console.error('❌ Error: plants.js no cargado');
        return;
    }
    if (typeof renderCalendar === 'undefined') {
        console.error('❌ Error: calendar.js no cargado');
        return;
    }
    
    // Configurar el estado inicial
    const today = new Date();
    calendarState.year = today.getFullYear();
    calendarState.month = today.getMonth() + 1;
    calendarState.selectedDay = null;
    calendarState.selectedPlantId = null;
    
    // Cargar preferencias guardadas
    loadPreferences();
    
    // Renderizar calendario
    renderCalendar();
    
    // Configurar event listeners
    setupEventListeners();
    
    // Configurar autocompletado del buscador
    setupAutocomplete();
    
    console.log('✅ Aplicación iniciada correctamente');
    console.log(`📅 Mostrando: ${calendarState.month}/${calendarState.year}`);
});

// ============================================================
// 3. EVENT LISTENERS
// ============================================================

function setupEventListeners() {
    // ============================================================
    // NAVEGACIÓN DE MESES - CORREGIDO
    // ============================================================
    
    // Botón mes anterior
    if (DOM_MAIN.prevMonthBtn) {
        DOM_MAIN.prevMonthBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('⬅️ Mes anterior');
            goToPreviousMonth();
        });
    }
    
    // Botón mes siguiente
    if (DOM_MAIN.nextMonthBtn) {
        DOM_MAIN.nextMonthBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('➡️ Mes siguiente');
            goToNextMonth();
        });
    }
    
    // ============================================================
    // RESET / HOY
    // ============================================================
    
    if (DOM_MAIN.resetBtn) {
        DOM_MAIN.resetBtn.addEventListener('click', function() {
            goToToday();
            showToast('📅 Volviendo al mes actual', '🌙');
        });
    }
    
    if (DOM_MAIN.resetAllLink) {
        DOM_MAIN.resetAllLink.addEventListener('click', function(e) {
            e.preventDefault();
            goToToday();
            // Limpiar búsqueda
            if (DOM_MAIN.plantSearch) {
                DOM_MAIN.plantSearch.value = '';
                DOM_MAIN.clearSearch.classList.remove('visible');
            }
            calendarState.selectedPlantId = null;
            calendarState.selectedDay = null;
            renderCalendar();
            showEmptyState();
            showToast('🔄 Todo reiniciado', '🌙');
        });
    }
    
    // ============================================================
    // BUSCADOR DE PLANTAS
    // ============================================================
    
    if (DOM_MAIN.plantSearch) {
        DOM_MAIN.plantSearch.addEventListener('input', function() {
            const query = this.value.trim();
            if (query.length > 0) {
                DOM_MAIN.clearSearch.classList.add('visible');
            } else {
                DOM_MAIN.clearSearch.classList.remove('visible');
            }
            handleSearchInput(query);
        });
        
        DOM_MAIN.plantSearch.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query.length > 0) {
                    const results = searchPlants(query);
                    if (results.length > 0) {
                        selectPlant(results[0].id);
                        this.value = results[0].nombre;
                        DOM_MAIN.clearSearch.classList.add('visible');
                        closeAutocomplete();
                    }
                }
            }
        });
        
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.plant-search')) {
                closeAutocomplete();
            }
        });
    }
    
    // Botón limpiar búsqueda
    if (DOM_MAIN.clearSearch) {
        DOM_MAIN.clearSearch.addEventListener('click', function() {
            DOM_MAIN.plantSearch.value = '';
            this.classList.remove('visible');
            closeAutocomplete();
            calendarState.selectedPlantId = null;
            calendarState.selectedDay = null;
            renderCalendar();
            showEmptyState();
            showToast('🧹 Búsqueda limpiada', '✨');
        });
    }
    
    // ============================================================
    // TEMA CLARO/OSCURO
    // ============================================================
    
    if (DOM_MAIN.themeToggle) {
        DOM_MAIN.themeToggle.addEventListener('click', toggleTheme);
        // Cargar tema guardado
        loadTheme();
    }
    
    // ============================================================
    // COMPARTIR
    // ============================================================
    
    if (DOM_MAIN.shareBtn) {
        DOM_MAIN.shareBtn.addEventListener('click', sharePage);
    }
    
    // ============================================================
    // PDF
    // ============================================================
    
    if (DOM_MAIN.pdfBtn) {
        DOM_MAIN.pdfBtn.addEventListener('click', exportPDF);
    }
    
    // ============================================================
    // FEEDBACK
    // ============================================================
    
    if (DOM_MAIN.feedbackLink) {
        DOM_MAIN.feedbackLink.addEventListener('click', function(e) {
            e.preventDefault();
            showToast('📧 Envía tus sugerencias a: calendario@lunar.com', '💡');
        });
    }
    
    console.log('🔗 Event listeners configurados');
});

// ============================================================
// 4. FUNCIONES DE NAVEGACIÓN (asegurar que funcionan)
// ============================================================

/**
 * Ir al mes anterior - SOBRESCRIBE la función de calendar.js
 */
function goToPreviousMonth() {
    console.log(`⬅️ Cambiando de ${calendarState.month}/${calendarState.year} a...`);
    
    calendarState.month--;
    if (calendarState.month < 1) {
        calendarState.month = 12;
        calendarState.year--;
    }
    calendarState.selectedDay = null;
    
    console.log(`   ➡️ ${calendarState.month}/${calendarState.year}`);
    
    renderCalendar();
    showEmptyState();
    savePreferences();
}

/**
 * Ir al mes siguiente - SOBRESCRIBE la función de calendar.js
 */
function goToNextMonth() {
    console.log(`➡️ Cambiando de ${calendarState.month}/${calendarState.year} a...`);
    
    calendarState.month++;
    if (calendarState.month > 12) {
        calendarState.month = 1;
        calendarState.year++;
    }
    calendarState.selectedDay = null;
    
    console.log(`   ➡️ ${calendarState.month}/${calendarState.year}`);
    
    renderCalendar();
    showEmptyState();
    savePreferences();
}

/**
 * Ir al mes actual - SOBRESCRIBE la función de calendar.js
 */
function goToToday() {
    const today = new Date();
    calendarState.year = today.getFullYear();
    calendarState.month = today.getMonth() + 1;
    calendarState.selectedDay = null;
    
    console.log(`📅 Volviendo a hoy: ${calendarState.month}/${calendarState.year}`);
    
    renderCalendar();
    showEmptyState();
    savePreferences();
}

// ============================================================
// 5. BUSCADOR CON AUTOCOMPLETADO
// ============================================================

let autocompleteContainer = null;

function setupAutocomplete() {
    // Crear contenedor para autocompletado
    autocompleteContainer = document.createElement('div');
    autocompleteContainer.className = 'autocomplete-list';
    autocompleteContainer.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-sm);
        max-height: 200px;
        overflow-y: auto;
        z-index: 100;
        display: none;
        margin-top: 4px;
        box-shadow: var(--shadow-card);
    `;
    
    const searchWrapper = DOM_MAIN.plantSearch.parentElement;
    searchWrapper.style.position = 'relative';
    searchWrapper.appendChild(autocompleteContainer);
}

function handleSearchInput(query) {
    if (!query || query.length < 1) {
        closeAutocomplete();
        return;
    }
    
    const results = searchPlants(query);
    
    if (results.length === 0) {
        autocompleteContainer.innerHTML = `
            <div style="padding: 10px 16px; color: var(--text-muted); text-align: center; font-size: 14px;">
                No se encontraron plantas
            </div>
        `;
        autocompleteContainer.style.display = 'block';
        return;
    }
    
    const limited = results.slice(0, 10);
    
    let html = '';
    limited.forEach(plant => {
        html += `
            <div class="autocomplete-item" data-id="${plant.id}" style="
                padding: 10px 16px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 10px;
                transition: background 0.2s;
                border-bottom: 1px solid var(--border-light);
                font-size: 14px;
            ">
                <span style="font-size: 20px;">${plant.icono || '🌱'}</span>
                <div>
                    <div style="font-weight: 500; color: var(--text-primary);">${plant.nombre}</div>
                    <div style="font-size: 12px; color: var(--text-muted);">${plant.tipo || ''} ${plant.familia ? '• ' + plant.familia : ''}</div>
                </div>
            </div>
        `;
    });
    
    autocompleteContainer.innerHTML = html;
    autocompleteContainer.style.display = 'block';
    
    autocompleteContainer.querySelectorAll('.autocomplete-item').forEach(item => {
        item.addEventListener('click', function() {
            const plantId = this.dataset.id;
            selectPlant(plantId);
            const plant = getPlantById(plantId);
            if (plant) {
                DOM_MAIN.plantSearch.value = plant.nombre;
                DOM_MAIN.clearSearch.classList.add('visible');
            }
            closeAutocomplete();
        });
        
        item.addEventListener('mouseenter', function() {
            this.style.background = 'var(--bg-card-hover)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
        });
    });
}

function closeAutocomplete() {
    if (autocompleteContainer) {
        autocompleteContainer.style.display = 'none';
    }
}

// ============================================================
// 6. SELECCIONAR PLANTA
// ============================================================

function selectPlant(plantId) {
    const plant = getPlantById(plantId);
    if (!plant) {
        showToast('❌ Planta no encontrada', '⚠️');
        return;
    }
    
    calendarState.selectedPlantId = plantId;
    calendarState.selectedDay = null;
    
    updatePlantDisplay();
    renderCalendar();
    showPlantInfo(plantId);
    
    showToast(`✅ ${plant.icono || '🌱'} ${plant.nombre} seleccionada`, '🌿');
    savePreferences();
}

// ============================================================
// 7. TEMA CLARO/OSCURO
// ============================================================

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    DOM_MAIN.themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    
    localStorage.setItem('lunar-theme', newTheme);
    showToast(`🌓 Cambiando a modo ${newTheme === 'dark' ? 'oscuro' : 'claro'}`, '🎨');
}

function loadTheme() {
    const savedTheme = localStorage.getItem('lunar-theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        DOM_MAIN.themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }
}

// ============================================================
// 8. COMPARTIR
// ============================================================

function sharePage() {
    const url = window.location.href;
    const title = '🌙 Calendario Lunar de Siembra';
    const text = 'Descubre los mejores días para sembrar, trasplantar y cosechar según las fases de la luna. ¡Gratis y sin registro!';
    
    if (navigator.share) {
        navigator.share({
            title: title,
            text: text,
            url: url
        }).catch(() => {});
    } else {
        const shareText = `${title}\n${text}\n${url}`;
        navigator.clipboard.writeText(shareText).then(() => {
            showToast('📋 Enlace copiado al portapapeles', '✅');
        }).catch(() => {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        });
    }
}

// ============================================================
// 9. EXPORTAR PDF
// ============================================================

function exportPDF() {
    const { year, month, selectedPlantId } = calendarState;
    
    const htmlContent = generatePrintableCalendar(year, month, selectedPlantId);
    
    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) {
        showToast('❌ Permite ventanas emergentes para exportar PDF', '⚠️');
        return;
    }
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    printWindow.onload = function() {
        printWindow.print();
    };
    
    showToast('📄 Preparando PDF...', '🖨️');
}

// ============================================================
// 10. TOAST NOTIFICATIONS
// ============================================================

let toastTimeout = null;

function showToast(message, icon = '✨') {
    if (!DOM_MAIN.toast || !DOM_MAIN.toastMessage) return;
    
    DOM_MAIN.toastMessage.textContent = message;
    DOM_MAIN.toast.querySelector('.toast-icon').textContent = icon || '✨';
    
    DOM_MAIN.toast.classList.add('visible');
    
    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }
    
    toastTimeout = setTimeout(() => {
        DOM_MAIN.toast.classList.remove('visible');
    }, 3000);
}

// ============================================================
// 11. PREFERENCIAS (localStorage)
// ============================================================

function savePreferences() {
    try {
        const prefs = {
            theme: document.documentElement.getAttribute('data-theme') || 'dark',
            lastPlant: calendarState.selectedPlantId,
            lastYear: calendarState.year,
            lastMonth: calendarState.month
        };
        localStorage.setItem('lunar-preferences', JSON.stringify(prefs));
    } catch (e) {}
}

function loadPreferences() {
    try {
        const saved = localStorage.getItem('lunar-preferences');
        if (saved) {
            const prefs = JSON.parse(saved);
            
            if (prefs.theme) {
                document.documentElement.setAttribute('data-theme', prefs.theme);
                DOM_MAIN.themeToggle.textContent = prefs.theme === 'dark' ? '☀️' : '🌙';
            }
            
            if (prefs.lastPlant) {
                const plant = getPlantById(prefs.lastPlant);
                if (plant) {
                    calendarState.selectedPlantId = prefs.lastPlant;
                    DOM_MAIN.plantSearch.value = plant.nombre;
                    DOM_MAIN.clearSearch.classList.add('visible');
                }
            }
            
            if (prefs.lastYear && prefs.lastMonth) {
                calendarState.year = prefs.lastYear;
                calendarState.month = prefs.lastMonth;
            }
        }
    } catch (e) {}
}

// ============================================================
// 12. SOBRESCRIBIR FUNCIONES DE CALENDAR
// ============================================================

// Asegurar que renderCalendar guarde preferencias
const originalRenderCalendar = renderCalendar;
renderCalendar = function() {
    originalRenderCalendar();
    savePreferences();
};

// Asegurar que showPlantInfo muestre correctamente
const originalShowPlantInfo = showPlantInfo;
showPlantInfo = function(plantId) {
    originalShowPlantInfo(plantId);
    if (DOM_MAIN.emptyState) {
        DOM_MAIN.emptyState.style.display = 'none';
    }
    if (DOM_MAIN.recommendationContent) {
        DOM_MAIN.recommendationContent.style.display = 'block';
    }
};

// ============================================================
// 13. EXPORTACIÓN
// ============================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        selectPlant,
        toggleTheme,
        sharePage,
        exportPDF,
        showToast,
        savePreferences,
        loadPreferences,
        handleSearchInput,
        closeAutocomplete,
        goToPreviousMonth,
        goToNextMonth,
        goToToday
    };
}

console.log('🚀 Controlador principal cargado correctamente');
console.log('📅 Navegación de meses: ✅ Activada');