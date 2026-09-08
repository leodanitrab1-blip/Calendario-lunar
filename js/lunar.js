/**
 * Lunar phase calculations
 */
const PHASES = {
  luna_nueva: { id: 'luna_nueva', iconClass: 'new' },
  cuarto_creciente: { id: 'cuarto_creciente', iconClass: 'crescent' },
  luna_llena: { id: 'luna_llena', iconClass: 'full' },
  cuarto_menguante: { id: 'cuarto_menguante', iconClass: 'waning' },
  luna_menguante: { id: 'luna_menguante', iconClass: 'waning' }
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
  // Approximate synodic month segments
  if (lunarAge < 1.5) return { ...PHASES.luna_nueva, edad: lunarAge };
  if (lunarAge < 13.5) return { ...PHASES.cuarto_creciente, edad: lunarAge };
  if (lunarAge < 16.5) return { ...PHASES.luna_llena, edad: lunarAge };
  if (lunarAge < 24.0) return { ...PHASES.cuarto_menguante, edad: lunarAge };
  return { ...PHASES.luna_menguante, edad: lunarAge };
}

function getLunarPhase(year, month, day) {
  return getPhaseByAge(calculateLunarAge(year, month, day));
}

function getLunarMonth(year, month) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const data = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const phase = getLunarPhase(year, month, day);
    data.push({
      day,
      phaseId: phase.id,
      phaseClass: phase.iconClass,
      lunarAge: phase.edad
    });
  }
  return data;
}

function getPhaseDescription(phaseId) {
  const descs = {
    es: {
      luna_nueva: 'Momento de descanso y preparación. Ideal para planificar, preparar la tierra y sembrar legumbres o tubérculos.',
      cuarto_creciente: 'La savia asciende. Excelente para sembrar hojas y frutos, trasplantar y abonar para potenciar el crecimiento.',
      luna_llena: 'Máxima energía vital. Ideal para cosechar, podar, injertar y recolectar semillas o hierbas aromáticas.',
      cuarto_menguante: 'La savia desciende hacia las raíces. Perfecto para sembrar raíces y bulbos, abonar y controlar plagas.',
      luna_menguante: 'Fase de introspección. Buen momento para labores de mantenimiento, abonado orgánico y descanso del suelo.'
    },
    en: {
      luna_nueva: 'A time of rest and preparation. Ideal for planning, preparing soil, and sowing legumes or tubers.',
      cuarto_creciente: 'Sap rises. Excellent for sowing leafy and fruiting plants, transplanting, and fertilizing for growth.',
      luna_llena: 'Peak vital energy. Ideal for harvesting, pruning, grafting, and collecting seeds or herbs.',
      cuarto_menguante: 'Sap descends to the roots. Perfect for sowing root crops and bulbs, fertilizing, and pest control.',
      luna_menguante: 'A reflective phase. Good for maintenance, organic fertilizing, and letting the soil rest.'
    }
  };
  return (descs[currentLang] || descs.es)[phaseId] || '';
}

function getPhaseTasks(phaseId) {
  const tasks = {
    es: {
      luna_nueva: ['Preparar la tierra', 'Planificar siembras', 'Sembrar legumbres y tubérculos', 'Controlar malas hierbas'],
      cuarto_creciente: ['Sembrar hojas y frutos', 'Trasplantar', 'Abonar de crecimiento', 'Iniciar esquejes'],
      luna_llena: ['Cosechar frutos y hojas', 'Podar', 'Recolectar semillas', 'Realizar injertos'],
      cuarto_menguante: ['Sembrar raíces y bulbos', 'Abonar', 'Controlar plagas', 'Dividir matas'],
      luna_menguante: ['Mantenimiento general', 'Abono orgánico', 'Limpiar el huerto', 'Observar y planificar']
    },
    en: {
      luna_nueva: ['Prepare the soil', 'Plan sowings', 'Sow legumes and tubers', 'Weed control'],
      cuarto_creciente: ['Sow leafy and fruiting plants', 'Transplant', 'Growth fertilizing', 'Start cuttings'],
      luna_llena: ['Harvest fruit and leaves', 'Prune', 'Collect seeds', 'Graft'],
      cuarto_menguante: ['Sow roots and bulbs', 'Fertilize', 'Pest control', 'Divide clumps'],
      luna_menguante: ['General maintenance', 'Organic fertilizing', 'Garden cleanup', 'Observe and plan']
    }
  };
  return (tasks[currentLang] || tasks.es)[phaseId] || [];
}
