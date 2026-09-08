/**
 * Calendar rendering & navigation
 */
const calendarState = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  selectedDay: null,
  selectedPlantId: null
};

function renderCalendar() {
  const grid = document.getElementById('calendarGrid');
  if (!grid) return;

  const { year, month, selectedPlantId } = calendarState;
  const monthData = getLunarMonth(year, month);
  const firstDay = new Date(year, month - 1, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month, 0).getDate();

  // Month label
  const monthNames = t('months');
  const label = document.getElementById('monthDisplay');
  if (label) label.textContent = `${monthNames[month - 1]} ${year}`;

  // Headers
  const dayNames = t('days');
  let html = dayNames.map(d => `<div class="day-header">${d}</div>`).join('');

  // Offset: Monday-first
  let startOffset = firstDay === 0 ? 6 : firstDay - 1;
  for (let i = 0; i < startOffset; i++) {
    html += `<div class="day-cell empty"></div>`;
  }

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() + 1 === month;
  const plant = selectedPlantId ? getPlantById(selectedPlantId) : null;

  for (let day = 1; day <= daysInMonth; day++) {
    const phase = monthData.find(d => d.day === day) || {};
    const phaseId = phase.phaseId || 'luna_nueva';
    const phaseClass = phase.phaseClass || 'new';

    let classes = ['day-cell'];
    if (isCurrentMonth && day === today.getDate()) classes.push('today');
    if (calendarState.selectedDay === day) classes.push('selected');

    // Recommended?
    let isRec = false;
    if (plant && plant.acciones) {
      const phaseNameMap = {
        luna_nueva: 'luna nueva',
        cuarto_creciente: 'cuarto creciente',
        luna_llena: 'luna llena',
        cuarto_menguante: 'cuarto menguante',
        luna_menguante: 'luna menguante'
      };
      const alt = phaseNameMap[phaseId] || '';
      for (const fases of Object.values(plant.acciones)) {
        if (fases.includes(phaseId) || fases.includes(alt)) {
          isRec = true;
          break;
        }
      }
    }
    if (isRec) classes.push('recommended');

    html += `
      <div class="${classes.join(' ')}"
           data-day="${day}"
           data-phase="${phaseId}"
           role="button"
           tabindex="0"
           aria-label="${day}">
        <span class="day-number">${day}</span>
        <span class="phase-mark ${phaseClass}"></span>
      </div>`;
  }

  grid.innerHTML = html;

  // Bind clicks
  grid.querySelectorAll('.day-cell:not(.empty)').forEach(cell => {
    cell.addEventListener('click', () => {
      const day = parseInt(cell.dataset.day, 10);
      const phaseId = cell.dataset.phase;
      selectDay(day, phaseId);
    });
    cell.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        cell.click();
      }
    });
  });
}

function selectDay(day, phaseId) {
  calendarState.selectedDay = day;
  renderCalendar();
  showDayDetail(day, phaseId);
}

function goToPreviousMonth() {
  calendarState.month--;
  if (calendarState.month < 1) {
    calendarState.month = 12;
    calendarState.year--;
  }
  calendarState.selectedDay = null;
  renderCalendar();
  showEmptyOrPlant();
  saveState();
}

function goToNextMonth() {
  calendarState.month++;
  if (calendarState.month > 12) {
    calendarState.month = 1;
    calendarState.year++;
  }
  calendarState.selectedDay = null;
  renderCalendar();
  showEmptyOrPlant();
  saveState();
}

function goToToday() {
  const now = new Date();
  calendarState.year = now.getFullYear();
  calendarState.month = now.getMonth() + 1;
  calendarState.selectedDay = null;
  renderCalendar();
  showEmptyOrPlant();
  saveState();
}

function showEmptyOrPlant() {
  if (calendarState.selectedPlantId) {
    showPlantSummary(calendarState.selectedPlantId);
  } else {
    showEmptyState();
  }
}

function showEmptyState() {
  const empty = document.getElementById('emptyState');
  const content = document.getElementById('detailContent');
  if (empty) empty.hidden = false;
  if (content) { content.hidden = true; content.innerHTML = ''; }
}

function getActionsForPhase(plant, phaseId) {
  if (!plant || !plant.acciones) return [];
  const phaseNameMap = {
    luna_nueva: 'luna nueva',
    cuarto_creciente: 'cuarto creciente',
    luna_llena: 'luna llena',
    cuarto_menguante: 'cuarto menguante',
    luna_menguante: 'luna menguante'
  };
  const alt = phaseNameMap[phaseId] || '';
  const actions = [];
  for (const [accion, fases] of Object.entries(plant.acciones)) {
    if (fases.includes(phaseId) || fases.includes(alt)) actions.push(accion);
  }
  return actions;
}

function showDayDetail(day, phaseId) {
  const empty = document.getElementById('emptyState');
  const content = document.getElementById('detailContent');
  if (!content) return;
  if (empty) empty.hidden = true;
  content.hidden = false;

  const plant = calendarState.selectedPlantId ? getPlantById(calendarState.selectedPlantId) : null;
  const phaseName = t('phaseNames.' + phaseId) || phaseId;
  const phaseDesc = getPhaseDescription(phaseId);
  const actions = plant ? getActionsForPhase(plant, phaseId) : [];
  const monthNames = t('months');
  const dateStr = `${day} ${monthNames[calendarState.month - 1]} ${calendarState.year}`;

  let actionsHtml = '';
  if (plant) {
    if (actions.length) {
      actionsHtml = `<div class="action-chips">${actions.map(a =>
        `<span class="chip">${getActionLabel(a)}</span>`
      ).join('')}</div>`;
    } else {
      actionsHtml = `<div class="action-chips"><span class="chip neutral">${t('noActions')}</span></div>`;
    }
  }

  let plantBlock = '';
  if (plant) {
    const tips = getPlantTips(plant).slice(0, 3);
    plantBlock = `
      <div class="detail-section">
        <h4>${getPlantName(plant)} — ${t('tips')}</h4>
        <ul>${tips.map(tip => `<li>${tip}</li>`).join('')}</ul>
      </div>
      <div class="care-grid">
        <div class="care-item"><span>${t('depth')}</span><strong>${plant.profundidadSiembra} ${t('cm')}</strong></div>
        <div class="care-item"><span>${t('spacing')}</span><strong>${plant.separacionPlantas} ${t('cm')}</strong></div>
        <div class="care-item"><span>${t('harvest')}</span><strong>~${plant.diasCosecha} ${t('daysToHarvest')}</strong></div>
        <div class="care-item"><span>${t('season')}</span><strong>${plant.temporada}</strong></div>
      </div>`;
  } else {
    const tasks = getPhaseTasks(phaseId);
    plantBlock = `
      <div class="detail-section">
        <h4>${t('goodFor')}</h4>
        <ul>${tasks.map(task => `<li>${task}</li>`).join('')}</ul>
      </div>`;
  }

  content.innerHTML = `
    <div class="detail-header">
      <div class="detail-phase-icon">
        <svg class="moon-svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="9" opacity="0.2"/>
          <path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z"/>
        </svg>
      </div>
      <div>
        <div class="detail-title">${phaseName}</div>
        <div class="detail-sub">${dateStr}${plant ? ' · ' + getPlantName(plant) : ''}</div>
      </div>
    </div>
    ${actionsHtml}
    <p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.55;margin-bottom:4px;">${phaseDesc}</p>
    ${plantBlock}
  `;
}

function showPlantSummary(plantId) {
  const plant = getPlantById(plantId);
  if (!plant) { showEmptyState(); return; }

  const empty = document.getElementById('emptyState');
  const content = document.getElementById('detailContent');
  if (empty) empty.hidden = true;
  if (!content) return;
  content.hidden = false;

  const tips = getPlantTips(plant);
  const actionKeys = Object.keys(plant.acciones || {});

  content.innerHTML = `
    <div class="detail-header">
      <div class="detail-phase-icon" style="font-size:1.4rem;">${plant.icono || '🌱'}</div>
      <div>
        <div class="detail-title">${getPlantName(plant)}</div>
        <div class="detail-sub">${plant.nombreCientifico || ''} · ${plant.tipo}</div>
      </div>
    </div>
    <p style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:12px;">${getPlantDesc(plant)}</p>
    <div class="action-chips">
      ${actionKeys.map(a => `<span class="chip">${getActionLabel(a)}</span>`).join('')}
    </div>
    <div class="care-grid">
      <div class="care-item"><span>${t('depth')}</span><strong>${plant.profundidadSiembra} ${t('cm')}</strong></div>
      <div class="care-item"><span>${t('spacing')}</span><strong>${plant.separacionPlantas} ${t('cm')}</strong></div>
      <div class="care-item"><span>${t('harvest')}</span><strong>~${plant.diasCosecha} ${t('daysToHarvest')}</strong></div>
      <div class="care-item"><span>${t('season')}</span><strong>${plant.temporada}</strong></div>
    </div>
    <div class="detail-section">
      <h4>${t('tips')}</h4>
      <ul>${tips.map(tip => `<li>${tip}</li>`).join('')}</ul>
    </div>
  `;
}

function updateSelectedPlantBar() {
  const bar = document.getElementById('selectedPlantBar');
  const plant = calendarState.selectedPlantId ? getPlantById(calendarState.selectedPlantId) : null;
  if (!bar) return;
  if (!plant) {
    bar.hidden = true;
    return;
  }
  bar.hidden = false;
  document.getElementById('selectedIcon').textContent = plant.icono || '🌱';
  document.getElementById('selectedName').textContent = getPlantName(plant);
  document.getElementById('selectedMeta').textContent = plant.nombreCientifico || plant.tipo || '';
}

function saveState() {
  try {
    localStorage.setItem('lunar-state', JSON.stringify({
      year: calendarState.year,
      month: calendarState.month,
      plantId: calendarState.selectedPlantId
    }));
  } catch (e) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem('lunar-state');
    if (!raw) return;
    const s = JSON.parse(raw);
    if (s.year && s.month) {
      calendarState.year = s.year;
      calendarState.month = s.month;
    }
    if (s.plantId && getPlantById(s.plantId)) {
      calendarState.selectedPlantId = s.plantId;
    }
  } catch (e) {}
}

function generatePrintableCalendar(year, month, plantId) {
  const monthNames = t('months');
  const dayNames = t('days');
  const plant = plantId ? getPlantById(plantId) : null;
  const monthData = getLunarMonth(year, month);
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  let startOffset = firstDay === 0 ? 6 : firstDay - 1;

  let cells = '';
  for (let i = 0; i < startOffset; i++) cells += '<td></td>';
  for (let d = 1; d <= daysInMonth; d++) {
    const ph = monthData.find(x => x.day === d);
    const name = ph ? (t('phaseNames.' + ph.phaseId) || '') : '';
    cells += `<td style="border:1px solid #ccc;padding:8px;height:70px;vertical-align:top;">
      <strong>${d}</strong><br><small>${name}</small></td>`;
    if ((startOffset + d) % 7 === 0) cells += '</tr><tr>';
  }

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${monthNames[month-1]} ${year}</title>
    <style>body{font-family:Georgia,serif;padding:24px;color:#222}table{width:100%;border-collapse:collapse}
    th{background:#f5f0e6;padding:8px}h1{font-size:1.5rem}</style></head><body>
    <h1>${monthNames[month-1]} ${year}${plant ? ' — ' + getPlantName(plant) : ''}</h1>
    <table><tr>${dayNames.map(d => '<th>'+d+'</th>').join('')}</tr><tr>${cells}</tr></table>
    <p style="margin-top:20px;font-size:12px;color:#666">${t('footerNote')}</p>
    </body></html>`;
}
