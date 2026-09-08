/**
 * i18n — Spanish / English
 */
const TRANSLATIONS = {
  es: {
    appTitle: 'Calendario Lunar',
    appSubtitle: 'Siembra con los ritmos de la luna',
    share: 'Compartir',
    today: 'Hoy',
    phaseNew: 'Nueva',
    phaseCrescent: 'Creciente',
    phaseFull: 'Llena',
    phaseWaning: 'Menguante',
    recommended: 'Recomendado',
    downloadPdf: 'Descargar PDF',
    searchPlant: 'Buscar planta',
    searchPlaceholder: 'Tomate, albahaca, zanahoria...',
    clear: 'Quitar',
    emptyHint: 'Selecciona una planta y un día del calendario para ver recomendaciones de siembra y cuidados.',
    catalogTitle: 'Catálogo de plantas',
    filterAll: 'Todas',
    filterFruit: 'Frutos',
    filterLeaf: 'Hojas',
    filterRoot: 'Raíces',
    filterHerb: 'Hierbas',
    filterFlower: 'Flores',
    tipsTitle: 'Guía lunar de cultivo',
    footerNote: 'Los datos son orientativos. Adapta siempre las labores a tu clima y suelo local.',
    days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    actions: {
      siembra: 'Siembra',
      trasplante: 'Trasplante',
      poda: 'Poda',
      cosecha: 'Cosecha',
      abono: 'Abono',
      riego_extra: 'Riego extra',
      control_plagas: 'Control de plagas'
    },
    phaseNames: {
      luna_nueva: 'Luna Nueva',
      cuarto_creciente: 'Cuarto Creciente',
      luna_llena: 'Luna Llena',
      cuarto_menguante: 'Cuarto Menguante',
      luna_menguante: 'Luna Menguante'
    },
    noActions: 'Hoy no hay labores prioritarias para esta planta. Es un buen día de observación.',
    plantInfo: 'Información de la planta',
    care: 'Cuidados',
    tips: 'Consejos',
    depth: 'Profundidad',
    spacing: 'Separación',
    harvest: 'Cosecha',
    season: 'Temporada',
    daysToHarvest: 'días',
    cm: 'cm',
    selected: 'seleccionada',
    shared: 'Enlace copiado',
    themeDark: 'Modo oscuro',
    themeLight: 'Modo claro',
    noResults: 'No se encontraron plantas',
    forPlant: 'para',
    onDay: 'el',
    goodFor: 'Ideal para',
    restDay: 'Día de descanso'
  },
  en: {
    appTitle: 'Lunar Calendar',
    appSubtitle: 'Sow with the rhythms of the moon',
    share: 'Share',
    today: 'Today',
    phaseNew: 'New',
    phaseCrescent: 'Waxing',
    phaseFull: 'Full',
    phaseWaning: 'Waning',
    recommended: 'Recommended',
    downloadPdf: 'Download PDF',
    searchPlant: 'Search plant',
    searchPlaceholder: 'Tomato, basil, carrot...',
    clear: 'Clear',
    emptyHint: 'Select a plant and a calendar day to see sowing recommendations and care tips.',
    catalogTitle: 'Plant catalog',
    filterAll: 'All',
    filterFruit: 'Fruit',
    filterLeaf: 'Leaf',
    filterRoot: 'Root',
    filterHerb: 'Herbs',
    filterFlower: 'Flowers',
    tipsTitle: 'Lunar growing guide',
    footerNote: 'Data is indicative. Always adapt tasks to your local climate and soil.',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    actions: {
      siembra: 'Sowing',
      trasplante: 'Transplant',
      poda: 'Pruning',
      cosecha: 'Harvest',
      abono: 'Fertilize',
      riego_extra: 'Extra water',
      control_plagas: 'Pest control'
    },
    phaseNames: {
      luna_nueva: 'New Moon',
      cuarto_creciente: 'Waxing Crescent',
      luna_llena: 'Full Moon',
      cuarto_menguante: 'Waning Crescent',
      luna_menguante: 'Waning Moon'
    },
    noActions: 'No priority tasks for this plant today. A good day for observation.',
    plantInfo: 'Plant information',
    care: 'Care',
    tips: 'Tips',
    depth: 'Depth',
    spacing: 'Spacing',
    harvest: 'Harvest',
    season: 'Season',
    daysToHarvest: 'days',
    cm: 'cm',
    selected: 'selected',
    shared: 'Link copied',
    themeDark: 'Dark mode',
    themeLight: 'Light mode',
    noResults: 'No plants found',
    forPlant: 'for',
    onDay: 'on',
    goodFor: 'Good for',
    restDay: 'Rest day'
  }
};

let currentLang = 'es';

function t(key) {
  const parts = key.split('.');
  let obj = TRANSLATIONS[currentLang];
  for (const p of parts) {
    if (obj == null) return key;
    obj = obj[p];
  }
  return obj != null ? obj : key;
}

function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (val) el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const val = t(key);
    if (val) el.placeholder = val;
  });
  const label = document.getElementById('langLabel');
  if (label) label.textContent = lang === 'es' ? 'EN' : 'ES';
  try { localStorage.setItem('lunar-lang', lang); } catch (e) {}
  if (typeof onLanguageChange === 'function') onLanguageChange();
}

function initI18n() {
  let saved = 'es';
  try { saved = localStorage.getItem('lunar-lang') || 'es'; } catch (e) {}
  setLanguage(saved);
}

function getPlantName(plant) {
  if (!plant) return '';
  return currentLang === 'en' && plant.nombreEn ? plant.nombreEn : plant.nombre;
}

function getPlantDesc(plant) {
  if (!plant) return '';
  return currentLang === 'en' && plant.descripcionEn ? plant.descripcionEn : plant.descripcion;
}

function getPlantTips(plant) {
  if (!plant) return [];
  return currentLang === 'en' && plant.consejosEn ? plant.consejosEn : (plant.consejos || []);
}
