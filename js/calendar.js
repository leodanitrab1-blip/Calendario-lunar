/**
 * Calendar rendering & navigation — clearer UX + full plant recommendations
 */
const calendarState = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  selectedDay: null,
  selectedPlantId: null
};

const PHASE_SYMBOLS = {
  luna_nueva: '●',
  cuarto_creciente: '☽',
  luna_llena: '○',
  cuarto_menguante: '☾',
  luna_menguante: '☾'
};

function renderCalendar() {
  const grid = document.getElementById('calendarGrid');
  if (!grid) return;

  const { year, month, selectedPlantId } = calendarState;
  const monthData = getLunarMonth(year, month);
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  const monthNames = t('months');
  const label = document.getElementById('monthDisplay');
  if (label) label.textContent = `${monthNames[month - 1]} ${year}`;

  const dayNames = t('days');
  let html = dayNames.map(d => `<div class="day-header">${d}</div>`).join('');

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
    const phaseName = t('phaseNames.' + phaseId) || phaseId;

    let classes = ['day-cell'];
    if (isCurrentMonth && day === today.getDate()) classes.push('today');
    if (calendarState.selectedDay === day) classes.push('selected');

    const dayActions = plant ? getActionsForPhase(plant, phaseId) : [];
    if (dayActions.length) classes.push('recommended');

    const symbol = PHASE_SYMBOLS[phaseId] || '·';
    const actionHint = dayActions.length
      ? dayActions.map(a => getActionLabel(a)).join(', ')
      : '';

    html += `
      <div class="${classes.join(' ')}"
           data-day="${day}"
           data-phase="${phaseId}"
           role="button"
           tabindex="0"
           title="${day} — ${phaseName}${actionHint ? ' · ' + actionHint : ''}"
           aria-label="${day}, ${phaseName}">
        <span class="day-number">${day}</span>
        <span class="phase-symbol phase-${phaseClass}" aria-hidden="true">${symbol}</span>
        ${dayActions.length ? `<span class="rec-count">${dayActions.length}</span>` : ''}
      </div>`;
  }

  grid.innerHTML = html;

  grid.querySelectorAll('.day-cell:not(.empty)').forEach(cell => {
    cell.addEventListener('click', () => {
      selectDay(parseInt(cell.dataset.day, 10), cell.dataset.phase);
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
  if (content) {
    content.hidden = true;
    content.innerHTML = '';
  }
}

function getActionsForPhase(plant, phaseId) {
  if (!plant || !plant.acciones) return [];
  const actions = [];
  for (const [accion, fases] of Object.entries(plant.acciones)) {
    if (Array.isArray(fases) && fases.includes(phaseId)) {
      actions.push(accion);
    }
  }
  return actions;
}

/** Best days this month for a plant, grouped by action */
function getMonthRecommendations(plantId, year, month) {
  const plant = getPlantById(plantId);
  if (!plant) return null;
  const monthData = getLunarMonth(year, month);
  const byAction = {};
  for (const dayData of monthData) {
    const acts = getActionsForPhase(plant, dayData.phaseId);
    for (const a of acts) {
      if (!byAction[a]) byAction[a] = [];
      byAction[a].push({
        day: dayData.day,
        phaseId: dayData.phaseId,
        phaseName: t('phaseNames.' + dayData.phaseId)
      });
    }
  }
  return byAction;
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
      actionsHtml = `
        <div class="rec-banner good">
          <strong>${t('goodFor')}</strong>
          <div class="action-chips">${actions.map(a =>
            `<span class="chip">${getActionLabel(a)}</span>`
          ).join('')}</div>
        </div>`;
    } else {
      actionsHtml = `
        <div class="rec-banner neutral">
          <strong>${t('restDay')}</strong>
          <p>${t('noActions')}</p>
        </div>`;
    }
  }

  let plantBlock = '';
  if (plant) {
    const tips = getPlantTips(plant).slice(0, 4);
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
      </div>
      <p class="hint-select-plant">${t('emptyHint')}</p>`;
  }

  content.innerHTML = `
    <div class="detail-header">
      <div class="detail-phase-icon phase-bg-${(phaseId || '').replace(/_/g, '-')}">
        <span class="big-phase-symbol">${PHASE_SYMBOLS[phaseId] || '●'}</span>
      </div>
      <div>
        <div class="detail-title">${phaseName}</div>
        <div class="detail-sub">${dateStr}${plant ? ' · ' + getPlantName(plant) : ''}</div>
      </div>
    </div>
    ${actionsHtml}
    <p class="phase-desc">${phaseDesc}</p>
    ${plantBlock}
  `;
}

function showPlantSummary(plantId) {
  const plant = getPlantById(plantId);
  if (!plant) {
    showEmptyState();
    return;
  }

  const empty = document.getElementById('emptyState');
  const content = document.getElementById('detailContent');
  if (empty) empty.hidden = true;
  if (!content) return;
  content.hidden = false;

  const tips = getPlantTips(plant);
  const monthRecs = getMonthRecommendations(plantId, calendarState.year, calendarState.month) || {};
  const actionKeys = Object.keys(plant.acciones || {});
  const monthNames = t('months');
  const monthLabel = monthNames[calendarState.month - 1];

  // Phase → actions mapping for this plant
  const phaseMap = {};
  for (const [accion, fases] of Object.entries(plant.acciones || {})) {
    for (const f of fases) {
      if (!phaseMap[f]) phaseMap[f] = [];
      phaseMap[f].push(accion);
    }
  }

  const phaseOrder = ['luna_nueva', 'cuarto_creciente', 'luna_llena', 'cuarto_menguante', 'luna_menguante'];
  const phaseRows = phaseOrder
    .filter(pid => phaseMap[pid])
    .map(pid => {
      const labels = phaseMap[pid].map(a => getActionLabel(a)).join(', ');
      return `<div class="phase-row">
        <span class="phase-row-sym phase-${PHASES[pid] ? PHASES[pid].iconClass : 'new'}">${PHASE_SYMBOLS[pid] || '·'}</span>
        <span class="phase-row-name">${t('phaseNames.' + pid)}</span>
        <span class="phase-row-acts">${labels}</span>
      </div>`;
    })
    .join('');

  // Best days this month
  let daysBlock = '';
  const hasDays = Object.keys(monthRecs).length > 0;
  if (hasDays) {
    const rows = Object.entries(monthRecs).map(([accion, days]) => {
      const dayList = days.map(d => d.day).join(', ');
      return `<div class="month-rec-row">
        <span class="chip">${getActionLabel(accion)}</span>
        <span class="month-rec-days">${dayList}</span>
      </div>`;
    }).join('');
    daysBlock = `
      <div class="detail-section">
        <h4>${t('bestDays')} — ${monthLabel}</h4>
        <div class="month-recs">${rows}</div>
        <p class="hint-click-day">${t('clickDayHint')}</p>
      </div>`;
  }

  content.innerHTML = `
    <div class="detail-header">
      <div class="detail-phase-icon plant-icon">${plant.icono || '🌱'}</div>
      <div>
        <div class="detail-title">${getPlantName(plant)}</div>
        <div class="detail-sub">${plant.nombreCientifico || ''} · ${plant.tipo}</div>
      </div>
    </div>
    <p class="phase-desc">${getPlantDesc(plant)}</p>

    <div class="care-grid">
      <div class="care-item"><span>${t('depth')}</span><strong>${plant.profundidadSiembra} ${t('cm')}</strong></div>
      <div class="care-item"><span>${t('spacing')}</span><strong>${plant.separacionPlantas} ${t('cm')}</strong></div>
      <div class="care-item"><span>${t('harvest')}</span><strong>~${plant.diasCosecha} ${t('daysToHarvest')}</strong></div>
      <div class="care-item"><span>${t('season')}</span><strong>${plant.temporada}</strong></div>
    </div>

    <div class="detail-section">
      <h4>${t('lunarActions')}</h4>
      <div class="phase-map">${phaseRows}</div>
    </div>

    ${daysBlock}

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
    const acts = plant && ph ? getActionsForPhase(plant, ph.phaseId) : [];
    const actStr = acts.length ? '<br><small style="color:#2d7a56">' + acts.map(a => getActionLabel(a)).join(', ') + '</small>' : '';
    cells += `<td style="border:1px solid #ccc;padding:8px;height:72px;vertical-align:top;font-size:13px;">
      <strong>${d}</strong><br><small>${name}</small>${actStr}</td>`;
    if ((startOffset + d) % 7 === 0) cells += '</tr><tr>';
  }

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${monthNames[month - 1]} ${year}</title>
    <style>body{font-family:Georgia,serif;padding:24px;color:#222}table{width:100%;border-collapse:collapse}
    th{background:#f5f0e6;padding:8px}h1{font-size:1.5rem}</style></head><body>
    <h1>${monthNames[month - 1]} ${year}${plant ? ' — ' + getPlantName(plant) : ''}</h1>
    <table><tr>${dayNames.map(d => '<th>' + d + '</th>').join('')}</tr><tr>${cells}</tr></table>
    <p style="margin-top:20px;font-size:12px;color:#666">${t('footerNote')}</p>
    </body></html>`;
}
