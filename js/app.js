/**
 * App controller
 */
document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  loadTheme();
  loadState();
  renderCalendar();
  updateSelectedPlantBar();
  if (calendarState.selectedPlantId) {
    showPlantSummary(calendarState.selectedPlantId);
    const plant = getPlantById(calendarState.selectedPlantId);
    if (plant) {
      const input = document.getElementById('plantSearch');
      if (input) input.value = getPlantName(plant);
    }
  } else {
    showEmptyState();
  }
  renderPlantGrid('all');
  renderTips();
  bindEvents();
  document.getElementById('yearNow').textContent = new Date().getFullYear();
});

function onLanguageChange() {
  renderCalendar();
  renderPlantGrid(currentFilter);
  renderTips();
  updateSelectedPlantBar();
  if (calendarState.selectedDay) {
    const phaseId = getLunarPhase(calendarState.year, calendarState.month, calendarState.selectedDay).id;
    showDayDetail(calendarState.selectedDay, phaseId);
  } else if (calendarState.selectedPlantId) {
    showPlantSummary(calendarState.selectedPlantId);
  }
  const plant = calendarState.selectedPlantId ? getPlantById(calendarState.selectedPlantId) : null;
  const input = document.getElementById('plantSearch');
  if (input && plant) input.value = getPlantName(plant);
}

let currentFilter = 'all';
let toastTimer = null;

function bindEvents() {
  document.getElementById('prevMonth').addEventListener('click', goToPreviousMonth);
  document.getElementById('nextMonth').addEventListener('click', goToNextMonth);
  document.getElementById('todayBtn').addEventListener('click', () => {
    goToToday();
    showToast(t('today'));
  });

  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  document.getElementById('langToggle').addEventListener('click', () => {
    setLanguage(currentLang === 'es' ? 'en' : 'es');
  });

  document.getElementById('shareBtn').addEventListener('click', sharePage);
  document.getElementById('pdfBtn').addEventListener('click', exportPDF);

  const search = document.getElementById('plantSearch');
  const clearBtn = document.getElementById('clearSearch');
  let searchDebounce = null;
  search.addEventListener('input', () => {
    const q = search.value.trim();
    clearBtn.hidden = q.length === 0;
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => renderAutocomplete(q), 120);
  });
  search.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const results = searchPlants(search.value.trim());
      if (results.length) selectPlant(results[0].id);
    }
    if (e.key === 'Escape') closeAutocomplete();
  });
  clearBtn.addEventListener('click', () => {
    search.value = '';
    clearBtn.hidden = true;
    closeAutocomplete();
  });

  document.getElementById('clearPlant').addEventListener('click', () => {
    calendarState.selectedPlantId = null;
    calendarState.selectedDay = null;
    search.value = '';
    clearBtn.hidden = true;
    updateSelectedPlantBar();
    renderCalendar();
    showEmptyState();
    saveState();
    document.querySelectorAll('.plant-card.active').forEach(c => c.classList.remove('active'));
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-panel')) closeAutocomplete();
  });

  document.getElementById('filterTabs').addEventListener('click', (e) => {
    const tab = e.target.closest('.tab');
    if (!tab) return;
    document.querySelectorAll('#filterTabs .tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentFilter = tab.dataset.filter;
    renderPlantGrid(currentFilter);
  });
}

function selectPlant(id) {
  const plant = getPlantById(id);
  if (!plant) return;
  calendarState.selectedPlantId = id;
  calendarState.selectedDay = null;
  updateSelectedPlantBar();
  renderCalendar();
  showPlantSummary(id);
  saveState();
  closeAutocomplete();
  const input = document.getElementById('plantSearch');
  if (input) {
    input.value = getPlantName(plant);
    document.getElementById('clearSearch').hidden = false;
  }
  document.querySelectorAll('.plant-card').forEach(c => {
    c.classList.toggle('active', c.dataset.id === id);
  });
  showToast(`${plant.icono || ''} ${getPlantName(plant)} · ${t('selected')}`);
}

function renderAutocomplete(query) {
  const box = document.getElementById('autocomplete');
  if (!query) { box.hidden = true; return; }
  const results = searchPlants(query).slice(0, 8);
  if (!results.length) {
    box.innerHTML = `<div class="ac-item" style="justify-content:center;color:var(--text-muted)">${t('noResults')}</div>`;
    box.hidden = false;
    return;
  }
  box.innerHTML = results.map(p => `
    <div class="ac-item" data-id="${p.id}">
      <div class="ac-icon">${p.icono || '🌱'}</div>
      <div>
        <div class="ac-name">${getPlantName(p)}</div>
        <div class="ac-meta">${p.nombreCientifico || ''} · ${p.tipo}</div>
      </div>
    </div>
  `).join('');
  box.hidden = false;
  box.querySelectorAll('.ac-item').forEach(item => {
    item.addEventListener('click', () => selectPlant(item.dataset.id));
  });
}

function closeAutocomplete() {
  const box = document.getElementById('autocomplete');
  if (box) box.hidden = true;
}

function renderPlantGrid(filter) {
  const grid = document.getElementById('plantGrid');
  if (!grid) return;
  const plants = getPlantsByType(filter);
  grid.innerHTML = plants.map(p => `
    <article class="plant-card${calendarState.selectedPlantId === p.id ? ' active' : ''}" data-id="${p.id}">
      <div class="plant-card-top">
        <div class="plant-card-icon">${p.icono || '🌱'}</div>
        <div>
          <div class="plant-card-name">${getPlantName(p)}</div>
          <div class="plant-card-sci">${p.nombreCientifico || ''}</div>
        </div>
      </div>
      <div class="plant-card-type">${p.tipo} · ${p.familia || ''}</div>
      <p class="plant-card-desc">${getPlantDesc(p)}</p>
    </article>
  `).join('');
  grid.querySelectorAll('.plant-card').forEach(card => {
    card.addEventListener('click', () => selectPlant(card.dataset.id));
  });
}

function renderTips() {
  const grid = document.getElementById('tipsGrid');
  if (!grid) return;
  const phases = ['luna_nueva', 'cuarto_creciente', 'luna_llena', 'cuarto_menguante', 'luna_menguante'];
  grid.innerHTML = phases.map(id => {
    const name = t('phaseNames.' + id);
    const desc = getPhaseDescription(id);
    const tasks = getPhaseTasks(id);
    return `
      <article class="tip-card">
        <div class="tip-phase">
          <span class="phase-dot ${id.includes('nueva') ? 'phase-new' : id.includes('creciente') ? 'phase-crescent' : id.includes('llena') ? 'phase-full' : 'phase-waning'}"></span>
          ${name}
        </div>
        <h3>${name}</h3>
        <p>${desc}</p>
        <ul class="tip-list">${tasks.map(task => `<li>${task}</li>`).join('')}</ul>
      </article>
    `;
  }).join('');
}

function toggleTheme() {
  const html = document.documentElement;
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  try { localStorage.setItem('lunar-theme', next); } catch (e) {}
  showToast(next === 'dark' ? t('themeDark') : t('themeLight'));
}

function loadTheme() {
  try {
    const saved = localStorage.getItem('lunar-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
  } catch (e) {}
}

function sharePage() {
  const url = window.location.href;
  const text = currentLang === 'es'
    ? 'Calendario Lunar de Siembra — cultiva con los ritmos de la luna'
    : 'Lunar Sowing Calendar — grow with the rhythms of the moon';
  if (navigator.share) {
    navigator.share({ title: t('appTitle'), text, url }).catch(() => {});
  } else {
    navigator.clipboard.writeText(`${text}\n${url}`).then(() => {
      showToast(t('shared'));
    }).catch(() => {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    });
  }
}

function exportPDF() {
  const { year, month, selectedPlantId } = calendarState;
  const html = generatePrintableCalendar(year, month, selectedPlantId);
  const w = window.open('', '_blank', 'width=900,height=700');
  if (!w) {
    showToast('Popup blocked');
    return;
  }
  w.document.write(html);
  w.document.close();
  w.onload = () => w.print();
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const msg = document.getElementById('toastMessage');
  if (!toast || !msg) return;
  msg.textContent = message;
  toast.querySelector('.toast-icon').textContent = '';
  toast.classList.add('visible');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2800);
}
