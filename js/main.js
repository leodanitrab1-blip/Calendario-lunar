/**
 * ============================================================
 * 🚀 MAIN.JS - Controlador Principal
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌙 Iniciando Calendario Lunar de Siembra...');
    
    if (typeof getLunarMonth === 'undefined') { console.error('❌ Error: lunar.js no cargado'); return; }
    if (typeof getAllPlants === 'undefined') { console.error('❌ Error: plants.js no cargado'); return; }
    if (typeof renderCalendar === 'undefined') { console.error('❌ Error: calendar.js no cargado'); return; }
    
    const today = new Date();
    calendarState.year = today.getFullYear();
    calendarState.month = today.getMonth() + 1;
    calendarState.selectedDay = null;
    calendarState.selectedPlantId = null;
    
    loadPreferences();
    renderCalendar();
    setupEventListeners();
    setupAutocomplete();
    loadTheme();
    
    setTimeout(() => showToast('🌙 Calendario Lunar de Siembra cargado', '🌱'), 500);
    console.log('✅ Aplicación iniciada correctamente');
});

function setupEventListeners() {
    document.getElementById('prevMonth').addEventListener('click', function(e) {
        e.preventDefault(); goToPreviousMonth();
    });
    document.getElementById('nextMonth').addEventListener('click', function(e) {
        e.preventDefault(); goToNextMonth();
    });
    document.getElementById('resetBtn').addEventListener('click', function() {
        goToToday(); showToast('📅 Volviendo al mes actual', '🌙');
    });
    document.getElementById('resetAllLink').addEventListener('click', function(e) {
        e.preventDefault();
        goToToday();
        document.getElementById('plantSearch').value = '';
        document.getElementById('clearSearch').classList.remove('visible');
        calendarState.selectedPlantId = null;
        calendarState.selectedDay = null;
        renderCalendar();
        showEmptyState();
        showToast('🔄 Todo reiniciado', '🌙');
    });
    
    document.getElementById('plantSearch').addEventListener('input', function() {
        const query = this.value.trim();
        if (query.length > 0) {
            document.getElementById('clearSearch').classList.add('visible');
        } else {
            document.getElementById('clearSearch').classList.remove('visible');
        }
        handleSearchInput(query);
    });
    
    document.getElementById('plantSearch').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query.length > 0) {
                const results = searchPlants(query);
                if (results.length > 0) {
                    selectPlant(results[0].id);
                    this.value = results[0].nombre;
                    document.getElementById('clearSearch').classList.add('visible');
                    closeAutocomplete();
                }
            }
        }
    });
    
    document.getElementById('clearSearch').addEventListener('click', function() {
        document.getElementById('plantSearch').value = '';
        this.classList.remove('visible');
        closeAutocomplete();
        calendarState.selectedPlantId = null;
        calendarState.selectedDay = null;
        renderCalendar();
        showEmptyState();
        showToast('🧹 Búsqueda limpiada', '✨');
    });
    
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('shareBtn').addEventListener('click', sharePage);
    document.getElementById('pdfBtn').addEventListener('click', exportPDF);
    document.getElementById('feedbackLink').addEventListener('click', function(e) {
        e.preventDefault();
        showToast('📧 Envía tus sugerencias a: calendario@lunar.com', '💡');
    });
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.plant-search')) closeAutocomplete();
    });
}

let autocompleteContainer = null;

function setupAutocomplete() {
    autocompleteContainer = document.createElement('div');
    autocompleteContainer.className = 'autocomplete-list';
    const searchWrapper = document.getElementById('plantSearch').parentElement;
    searchWrapper.style.position = 'relative';
    searchWrapper.appendChild(autocompleteContainer);
}

function handleSearchInput(query) {
    if (!query || query.length < 1) { closeAutocomplete(); return; }
    const results = searchPlants(query);
    if (results.length === 0) {
        autocompleteContainer.innerHTML = `<div style="padding: 10px 16px; color: var(--text-muted); text-align: center;">No se encontraron plantas</div>`;
        autocompleteContainer.style.display = 'block';
        return;
    }
    const limited = results.slice(0, 10);
    let html = '';
    limited.forEach(plant => {
        html += `
            <div class="autocomplete-item" data-id="${plant.id}">
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
                document.getElementById('plantSearch').value = plant.nombre;
                document.getElementById('clearSearch').classList.add('visible');
            }
            closeAutocomplete();
        });
        item.addEventListener('mouseenter', function() { this.style.background = 'var(--bg-card-hover)'; });
        item.addEventListener('mouseleave', function() { this.style.background = 'transparent'; });
    });
}

function closeAutocomplete() {
    if (autocompleteContainer) autocompleteContainer.style.display = 'none';
}

function selectPlant(plantId) {
    const plant = getPlantById(plantId);
    if (!plant) { showToast('❌ Planta no encontrada', '⚠️'); return; }
    calendarState.selectedPlantId = plantId;
    calendarState.selectedDay = null;
    updatePlantDisplay();
    renderCalendar();
    showPlantInfo(plantId);
    showToast(`✅ ${plant.icono || '🌱'} ${plant.nombre} seleccionada`, '🌿');
    savePreferences();
}

function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    document.getElementById('themeToggle').textContent = newTheme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('lunar-theme', newTheme);
    showToast(`🌓 Cambiando a modo ${newTheme === 'dark' ? 'oscuro' : 'claro'}`, '🎨');
}

function loadTheme() {
    const saved = localStorage.getItem('lunar-theme');
    if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
        document.getElementById('themeToggle').textContent = saved === 'dark' ? '☀️' : '🌙';
    }
}

function sharePage() {
    const url = window.location.href;
    const text = '🌙 Calendario Lunar de Siembra - Descubre los mejores días para sembrar según las fases de la luna. ¡Gratis!';
    if (navigator.share) {
        navigator.share({ title: '🌙 Calendario Lunar de Siembra', text: text, url: url }).catch(() => {});
    } else {
        navigator.clipboard.writeText(`${text}\n${url}`).then(() => {
            showToast('📋 Enlace copiado al portapapeles', '✅');
        }).catch(() => {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        });
    }
}

function exportPDF() {
    const { year, month, selectedPlantId } = calendarState;
    const htmlContent = generatePrintableCalendar(year, month, selectedPlantId);
    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) { showToast('❌ Permite ventanas emergentes para exportar PDF', '⚠️'); return; }
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.onload = function() { printWindow.print(); };
    showToast('📄 Preparando PDF...', '🖨️');
}

let toastTimeout = null;

function showToast(message, icon = '✨') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.querySelector('.toast-icon').textContent = icon || '✨';
    toast.classList.add('visible');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('visible'), 3000);
}

function savePreferences() {
    try {
        localStorage.setItem('lunar-preferences', JSON.stringify({
            theme: document.documentElement.getAttribute('data-theme') || 'dark',
            lastPlant: calendarState.selectedPlantId,
            lastYear: calendarState.year,
            lastMonth: calendarState.month
        }));
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
                    document.getElementById('plantSearch').value = plant.nombre;
                    document.getElementById('clearSearch').classList.add('visible');
                }
            }
        }
    } catch (e) {}
}

console.log('🚀 Controlador principal cargado correctamente');