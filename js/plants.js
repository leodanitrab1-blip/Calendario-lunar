/**
 * Plant database — expanded catalog with ES/EN
 */
const PLANTS_DB = [
  // FRUTOS
  {
    id: 'tomate', nombre: 'Tomate', nombreEn: 'Tomato', nombreCientifico: 'Solanum lycopersicum',
    tipo: 'fruto', familia: 'Solanáceas', icono: '🍅', temporada: 'primavera-verano',
    diasCosecha: 60, profundidadSiembra: 2, separacionPlantas: 50,
    descripcion: 'Fruto rojo muy popular en huertos. Necesita sol directo y riego regular.',
    descripcionEn: 'Popular red fruit for home gardens. Needs full sun and regular watering.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], trasplante: ['cuarto_creciente'], poda: ['luna_llena'], cosecha: ['luna_llena','cuarto_menguante'], abono: ['cuarto_creciente'], control_plagas: ['cuarto_menguante'] },
    consejos: ['Siembra a 2 cm en semillero', 'Trasplanta con 4-6 hojas verdaderas', 'Riega en la base, evita mojar hojas', 'Aporca el tallo para fortalecer raíces'],
    consejosEn: ['Sow 2 cm deep in seed trays', 'Transplant when 4-6 true leaves appear', 'Water at the base, avoid wetting leaves', 'Hill soil around stem to strengthen roots']
  },
  {
    id: 'chile_serrano', nombre: 'Chile Serrano', nombreEn: 'Serrano Pepper', nombreCientifico: 'Capsicum annuum',
    tipo: 'fruto', familia: 'Solanáceas', icono: '🌶️', temporada: 'primavera-verano',
    diasCosecha: 60, profundidadSiembra: 1.5, separacionPlantas: 30,
    descripcion: 'Chile mexicano picante y aromático, ideal para salsas.',
    descripcionEn: 'Spicy aromatic Mexican chili, perfect for salsas.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], trasplante: ['cuarto_creciente'], cosecha: ['luna_llena','cuarto_menguante'], abono: ['cuarto_creciente'] },
    consejos: ['Germina mejor en semillero cálido', 'Mucho sol y calor', 'Cosecha verdes o rojos según gusto'],
    consejosEn: ['Germinates best in warm seed trays', 'Needs full sun and heat', 'Harvest green or red as preferred']
  },
  {
    id: 'chile_jalapeno', nombre: 'Chile Jalapeño', nombreEn: 'Jalapeño', nombreCientifico: 'Capsicum annuum',
    tipo: 'fruto', familia: 'Solanáceas', icono: '🌶️', temporada: 'primavera-verano',
    diasCosecha: 60, profundidadSiembra: 1.5, separacionPlantas: 35,
    descripcion: 'Chile versátil de picor medio, originario de Veracruz.',
    descripcionEn: 'Versatile medium-heat chili from Veracruz.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], trasplante: ['cuarto_creciente'], cosecha: ['luna_llena','cuarto_menguante'], abono: ['cuarto_creciente'] },
    consejos: ['Semillero protegido del frío', 'Riego regular sin encharcar', 'Déjalos enrojecer para sabor más dulce'],
    consejosEn: ['Protect seedlings from cold', 'Regular watering without waterlogging', 'Let them redden for sweeter flavor']
  },
  {
    id: 'chile_habanero', nombre: 'Chile Habanero', nombreEn: 'Habanero', nombreCientifico: 'Capsicum chinense',
    tipo: 'fruto', familia: 'Solanáceas', icono: '🌶️', temporada: 'primavera-verano',
    diasCosecha: 75, profundidadSiembra: 1.5, separacionPlantas: 40,
    descripcion: 'Uno de los chiles más picantes, originario de Yucatán.',
    descripcionEn: 'One of the hottest chilies, from Yucatán.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], trasplante: ['cuarto_creciente'], cosecha: ['luna_llena','cuarto_menguante'], abono: ['cuarto_creciente'] },
    consejos: ['Germinación lenta (hasta 3 semanas)', 'Temperaturas cálidas constantes', 'Usa guantes al manipular'],
    consejosEn: ['Slow germination (up to 3 weeks)', 'Needs consistently warm temperatures', 'Wear gloves when handling']
  },
  {
    id: 'pimiento_morron', nombre: 'Pimiento Morrón', nombreEn: 'Bell Pepper', nombreCientifico: 'Capsicum annuum',
    tipo: 'fruto', familia: 'Solanáceas', icono: '🫑', temporada: 'primavera-verano',
    diasCosecha: 70, profundidadSiembra: 1.5, separacionPlantas: 40,
    descripcion: 'Pimiento dulce de gran tamaño, ideal para asar y rellenar.',
    descripcionEn: 'Sweet large pepper, ideal for roasting and stuffing.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], trasplante: ['cuarto_creciente'], cosecha: ['luna_llena','cuarto_menguante'], abono: ['cuarto_creciente'] },
    consejos: ['Necesita calor y sol pleno', 'Riego constante en floración', 'Cosecha cuando estén firmes y coloridos'],
    consejosEn: ['Needs heat and full sun', 'Steady water during flowering', 'Harvest when firm and colorful']
  },
  {
    id: 'berenjena', nombre: 'Berenjena', nombreEn: 'Eggplant', nombreCientifico: 'Solanum melongena',
    tipo: 'fruto', familia: 'Solanáceas', icono: '🍆', temporada: 'primavera-verano',
    diasCosecha: 75, profundidadSiembra: 1.5, separacionPlantas: 50,
    descripcion: 'Fruto morado de textura suave, muy productivo en climas cálidos.',
    descripcionEn: 'Purple fruit with soft flesh, productive in warm climates.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], trasplante: ['cuarto_creciente'], poda: ['luna_llena'], cosecha: ['luna_llena','cuarto_menguante'], abono: ['cuarto_creciente'] },
    consejos: ['Semillero temprano en interior', 'Tutorado para plantas pesadas', 'Cosecha antes de que las semillas endurezcan'],
    consejosEn: ['Start early indoors', 'Stake heavy plants', 'Harvest before seeds harden']
  },
  {
    id: 'pepino', nombre: 'Pepino', nombreEn: 'Cucumber', nombreCientifico: 'Cucumis sativus',
    tipo: 'fruto', familia: 'Cucurbitáceas', icono: '🥒', temporada: 'primavera-verano',
    diasCosecha: 50, profundidadSiembra: 2, separacionPlantas: 40,
    descripcion: 'Trepadora de frutos alargados. Riego abundante y sol.',
    descripcionEn: 'Climbing plant with elongated fruits. Needs ample water and sun.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], trasplante: ['cuarto_creciente'], cosecha: ['luna_llena','cuarto_menguante'], abono: ['cuarto_creciente'], riego_extra: ['cuarto_menguante'] },
    consejos: ['Usa tutores o enrejados', 'Riego profundo y frecuente', 'Cosecha jóvenes para mejor sabor'],
    consejosEn: ['Use stakes or trellises', 'Deep frequent watering', 'Harvest young for best flavor']
  },
  {
    id: 'calabacin', nombre: 'Calabacín', nombreEn: 'Zucchini', nombreCientifico: 'Cucurbita pepo',
    tipo: 'fruto', familia: 'Cucurbitáceas', icono: '🥬', temporada: 'primavera-verano',
    diasCosecha: 45, profundidadSiembra: 2.5, separacionPlantas: 80,
    descripcion: 'Productivo y de crecimiento rápido. Ideal para huertos principiantes.',
    descripcionEn: 'Highly productive and fast-growing. Great for beginners.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], trasplante: ['cuarto_creciente'], cosecha: ['luna_llena','cuarto_menguante'], abono: ['cuarto_creciente'] },
    consejos: ['Siembra directa cuando no haya heladas', 'Cosecha con frecuencia para estimular producción', 'Hojas grandes: necesita espacio'],
    consejosEn: ['Direct sow after frost risk', 'Harvest often to boost yield', 'Large leaves need space']
  },
  {
    id: 'sandia', nombre: 'Sandía', nombreEn: 'Watermelon', nombreCientifico: 'Citrullus lanatus',
    tipo: 'fruto', familia: 'Cucurbitáceas', icono: '🍉', temporada: 'primavera-verano',
    diasCosecha: 90, profundidadSiembra: 2, separacionPlantas: 120,
    descripcion: 'Fruta refrescante de verano. Requiere calor y espacio.',
    descripcionEn: 'Refreshing summer fruit. Needs heat and space.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], trasplante: ['cuarto_creciente'], cosecha: ['luna_llena'], abono: ['cuarto_creciente'], riego_extra: ['cuarto_menguante'] },
    consejos: ['Suelo rico y bien drenado', 'Riego constante hasta maduración', 'Reduce riego al final para concentrar azúcares'],
    consejosEn: ['Rich well-drained soil', 'Steady water until ripening', 'Reduce water at end to concentrate sugars']
  },
  {
    id: 'melon', nombre: 'Melón', nombreEn: 'Melon', nombreCientifico: 'Cucumis melo',
    tipo: 'fruto', familia: 'Cucurbitáceas', icono: '🍈', temporada: 'primavera-verano',
    diasCosecha: 85, profundidadSiembra: 2, separacionPlantas: 100,
    descripcion: 'Dulce y aromático. Prefiere climas cálidos y secos.',
    descripcionEn: 'Sweet and aromatic. Prefers warm, dry climates.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], trasplante: ['cuarto_creciente'], cosecha: ['luna_llena'], abono: ['cuarto_creciente'] },
    consejos: ['Semillero o siembra directa en montículos', 'Poco riego en maduración', 'Cosecha cuando se desprenda fácilmente'],
    consejosEn: ['Start in trays or direct sow on mounds', 'Less water at ripening', 'Harvest when it slips easily']
  },
  {
    id: 'fresa', nombre: 'Fresa', nombreEn: 'Strawberry', nombreCientifico: 'Fragaria × ananassa',
    tipo: 'fruto', familia: 'Rosáceas', icono: '🍓', temporada: 'primavera',
    diasCosecha: 90, profundidadSiembra: 1, separacionPlantas: 30,
    descripcion: 'Fruto rojo dulce. Ideal en macetas y huertos pequeños.',
    descripcionEn: 'Sweet red fruit. Ideal for pots and small gardens.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], trasplante: ['cuarto_creciente'], cosecha: ['luna_llena','cuarto_menguante'], abono: ['cuarto_creciente'], control_plagas: ['cuarto_menguante'] },
    consejos: ['Suelo ácido y bien drenado', 'Mulching para evitar putrefacción', 'Renueva plantas cada 2-3 años'],
    consejosEn: ['Acidic well-drained soil', 'Mulch to prevent rot', 'Renew plants every 2-3 years']
  },
  {
    id: 'aguacate', nombre: 'Aguacate', nombreEn: 'Avocado', nombreCientifico: 'Persea americana',
    tipo: 'fruto', familia: 'Lauráceas', icono: '🥑', temporada: 'todo el año',
    diasCosecha: 365, profundidadSiembra: 5, separacionPlantas: 600,
    descripcion: 'Árbol frutal de clima subtropical. Rico en grasas saludables.',
    descripcionEn: 'Subtropical fruit tree. Rich in healthy fats.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], trasplante: ['cuarto_creciente'], poda: ['luna_llena'], cosecha: ['luna_llena','cuarto_menguante'], abono: ['cuarto_creciente'] },
    consejos: ['Suelo profundo y drenante', 'Protege de heladas fuertes', 'Puede tardar 3-5 años en producir'],
    consejosEn: ['Deep well-draining soil', 'Protect from hard frost', 'May take 3-5 years to fruit']
  },
  // HOJAS
  {
    id: 'lechuga', nombre: 'Lechuga', nombreEn: 'Lettuce', nombreCientifico: 'Lactuca sativa',
    tipo: 'hoja', familia: 'Asteráceas', icono: '🥬', temporada: 'primavera-otoño',
    diasCosecha: 40, profundidadSiembra: 0.5, separacionPlantas: 25,
    descripcion: 'Hoja de crecimiento rápido. Prefiere climas frescos.',
    descripcionEn: 'Fast-growing leafy green. Prefers cool weather.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], trasplante: ['cuarto_creciente'], cosecha: ['luna_llena','cuarto_menguante'], abono: ['cuarto_creciente'] },
    consejos: ['Siembra sucesiva cada 2 semanas', 'Sombra parcial en verano', 'Cosecha hojas externas o planta entera'],
    consejosEn: ['Succession sow every 2 weeks', 'Partial shade in summer', 'Harvest outer leaves or whole plant']
  },
  {
    id: 'espinaca', nombre: 'Espinaca', nombreEn: 'Spinach', nombreCientifico: 'Spinacia oleracea',
    tipo: 'hoja', familia: 'Amarantáceas', icono: '🥬', temporada: 'otoño-primavera',
    diasCosecha: 35, profundidadSiembra: 1, separacionPlantas: 15,
    descripcion: 'Rica en hierro. Crece mejor en temperaturas frescas.',
    descripcionEn: 'Iron-rich green. Grows best in cool temperatures.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], cosecha: ['luna_llena','cuarto_menguante'], abono: ['cuarto_creciente'] },
    consejos: ['Siembra en otoño o finales de invierno', 'Suelo rico en nitrógeno', 'Cosecha antes de la floración'],
    consejosEn: ['Sow in fall or late winter', 'Nitrogen-rich soil', 'Harvest before flowering']
  },
  {
    id: 'acelga', nombre: 'Acelga', nombreEn: 'Swiss Chard', nombreCientifico: 'Beta vulgaris',
    tipo: 'hoja', familia: 'Amarantáceas', icono: '🥬', temporada: 'todo el año',
    diasCosecha: 50, profundidadSiembra: 1.5, separacionPlantas: 30,
    descripcion: 'Muy resistente y productiva. Hojas y pencas comestibles.',
    descripcionEn: 'Very hardy and productive. Leaves and stems are edible.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], trasplante: ['cuarto_creciente'], cosecha: ['luna_llena','cuarto_menguante'], abono: ['cuarto_creciente'] },
    consejos: ['Tolera calor y frío moderado', 'Cosecha hojas externas continuamente', 'Riego regular'],
    consejosEn: ['Tolerates moderate heat and cold', 'Continuously harvest outer leaves', 'Regular watering']
  },
  {
    id: 'rucula', nombre: 'Rúcula', nombreEn: 'Arugula', nombreCientifico: 'Eruca vesicaria',
    tipo: 'hoja', familia: 'Brasicáceas', icono: '🥗', temporada: 'primavera-otoño',
    diasCosecha: 30, profundidadSiembra: 0.5, separacionPlantas: 10,
    descripcion: 'Sabor picante característico. Crecimiento muy rápido.',
    descripcionEn: 'Distinctive peppery flavor. Very fast growing.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], cosecha: ['luna_llena','cuarto_menguante'] },
    consejos: ['Siembra densa y ralea después', 'Mejor en clima fresco', 'Cosecha hojas jóvenes'],
    consejosEn: ['Sow densely then thin', 'Best in cool weather', 'Harvest young leaves']
  },
  {
    id: 'col_rizada', nombre: 'Col Rizada (Kale)', nombreEn: 'Kale', nombreCientifico: 'Brassica oleracea',
    tipo: 'hoja', familia: 'Brasicáceas', icono: '🥬', temporada: 'otoño-invierno',
    diasCosecha: 55, profundidadSiembra: 1, separacionPlantas: 40,
    descripcion: 'Superfood resistente al frío. Sabor más dulce tras heladas.',
    descripcionEn: 'Cold-hardy superfood. Sweeter after frost.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], trasplante: ['cuarto_creciente'], cosecha: ['luna_llena','cuarto_menguante'], abono: ['cuarto_creciente'] },
    consejos: ['Tolera heladas ligeras', 'Cosecha hojas inferiores primero', 'Suelo fértil y húmedo'],
    consejosEn: ['Tolerates light frost', 'Harvest lower leaves first', 'Fertile moist soil']
  },
  // RAÍCES
  {
    id: 'zanahoria', nombre: 'Zanahoria', nombreEn: 'Carrot', nombreCientifico: 'Daucus carota',
    tipo: 'raiz', familia: 'Apiáceas', icono: '🥕', temporada: 'primavera-otoño',
    diasCosecha: 70, profundidadSiembra: 1, separacionPlantas: 5,
    descripcion: 'Raíz dulce y crujiente. Requiere suelo suelto y profundo.',
    descripcionEn: 'Sweet crunchy root. Needs loose deep soil.',
    acciones: { siembra: ['luna_nueva','cuarto_menguante','luna_menguante'], cosecha: ['luna_llena','cuarto_menguante'], abono: ['cuarto_menguante'] },
    consejos: ['Suelo sin piedras ni terrones', 'Ralea para dar espacio', 'Riego constante para evitar raíces bifurcadas'],
    consejosEn: ['Soil free of stones and clods', 'Thin for space', 'Steady water to avoid forked roots']
  },
  {
    id: 'cebolla', nombre: 'Cebolla', nombreEn: 'Onion', nombreCientifico: 'Allium cepa',
    tipo: 'raiz', familia: 'Amarilidáceas', icono: '🧅', temporada: 'otoño-primavera',
    diasCosecha: 100, profundidadSiembra: 1.5, separacionPlantas: 10,
    descripcion: 'Bulbo esencial en cocina. Se cultiva de semilla o bulbo.',
    descripcionEn: 'Essential kitchen bulb. Grown from seed or sets.',
    acciones: { siembra: ['luna_nueva','cuarto_menguante','luna_menguante'], trasplante: ['cuarto_menguante'], cosecha: ['luna_llena','cuarto_menguante'], abono: ['cuarto_menguante'] },
    consejos: ['Suelo suelto y soleado', 'Reduce riego al final', 'Cosecha cuando hojas se sequen'],
    consejosEn: ['Loose sunny soil', 'Reduce water at end', 'Harvest when tops dry down']
  },
  {
    id: 'ajo', nombre: 'Ajo', nombreEn: 'Garlic', nombreCientifico: 'Allium sativum',
    tipo: 'raiz', familia: 'Amarilidáceas', icono: '🧄', temporada: 'otoño',
    diasCosecha: 180, profundidadSiembra: 3, separacionPlantas: 12,
    descripcion: 'Se planta en otoño y se cosecha en verano. Muy resistente.',
    descripcionEn: 'Planted in fall, harvested in summer. Very hardy.',
    acciones: { siembra: ['luna_nueva','cuarto_menguante','luna_menguante'], cosecha: ['luna_llena','cuarto_menguante'] },
    consejos: ['Planta dientes individuales en otoño', 'Suelo bien drenado', 'Cosecha cuando hojas inferiores amarilleen'],
    consejosEn: ['Plant individual cloves in fall', 'Well-drained soil', 'Harvest when lower leaves yellow']
  },
  {
    id: 'remolacha', nombre: 'Remolacha', nombreEn: 'Beetroot', nombreCientifico: 'Beta vulgaris',
    tipo: 'raiz', familia: 'Amarantáceas', icono: '🟣', temporada: 'primavera-otoño',
    diasCosecha: 55, profundidadSiembra: 1.5, separacionPlantas: 10,
    descripcion: 'Raíz y hojas comestibles. Color intenso y dulzor terroso.',
    descripcionEn: 'Edible root and leaves. Deep color and earthy sweetness.',
    acciones: { siembra: ['luna_nueva','cuarto_menguante','luna_menguante'], cosecha: ['luna_llena','cuarto_menguante'], abono: ['cuarto_menguante'] },
    consejos: ['Siembra directa', 'No le gusta el trasplante', 'Cosecha cuando alcancen 5-8 cm'],
    consejosEn: ['Direct sow', 'Dislikes transplanting', 'Harvest at 5-8 cm size']
  },
  {
    id: 'rabano', nombre: 'Rábano', nombreEn: 'Radish', nombreCientifico: 'Raphanus sativus',
    tipo: 'raiz', familia: 'Brasicáceas', icono: '🌶️', temporada: 'primavera-otoño',
    diasCosecha: 25, profundidadSiembra: 1, separacionPlantas: 5,
    descripcion: 'El cultivo más rápido del huerto. Ideal para principiantes.',
    descripcionEn: 'The fastest garden crop. Ideal for beginners.',
    acciones: { siembra: ['luna_nueva','cuarto_menguante','luna_menguante'], cosecha: ['luna_llena','cuarto_menguante'] },
    consejos: ['Siembra sucesiva cada 10 días', 'Riego constante', 'Cosecha pronto para evitar leñosidad'],
    consejosEn: ['Succession sow every 10 days', 'Steady watering', 'Harvest promptly to avoid woodiness']
  },
  {
    id: 'patata', nombre: 'Patata', nombreEn: 'Potato', nombreCientifico: 'Solanum tuberosum',
    tipo: 'raiz', familia: 'Solanáceas', icono: '🥔', temporada: 'primavera',
    diasCosecha: 90, profundidadSiembra: 10, separacionPlantas: 35,
    descripcion: 'Tubérculo básico. Se planta a partir de tubérculos semilla.',
    descripcionEn: 'Staple tuber. Grown from seed potatoes.',
    acciones: { siembra: ['luna_nueva','cuarto_menguante','luna_menguante'], cosecha: ['luna_llena','cuarto_menguante'], abono: ['cuarto_menguante'] },
    consejos: ['Aporca cuando la planta crece', 'Evita sol en tubérculos (enverdecen)', 'Cosecha cuando el follaje se seque'],
    consejosEn: ['Hill as plants grow', 'Keep tubers covered from sun', 'Harvest when foliage dies back']
  },
  // LEGUMBRES
  {
    id: 'judia_verde', nombre: 'Judía Verde', nombreEn: 'Green Bean', nombreCientifico: 'Phaseolus vulgaris',
    tipo: 'fruto', familia: 'Fabáceas', icono: '🫛', temporada: 'primavera-verano',
    diasCosecha: 55, profundidadSiembra: 3, separacionPlantas: 15,
    descripcion: 'Fija nitrógeno en el suelo. Variedades enanas y de enrame.',
    descripcionEn: 'Fixes nitrogen in soil. Bush and pole varieties.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], cosecha: ['luna_llena','cuarto_menguante'], abono: ['cuarto_creciente'] },
    consejos: ['No necesita mucho nitrógeno', 'Tutores para variedades trepadoras', 'Cosecha vainas tiernas'],
    consejosEn: ['Does not need much nitrogen', 'Support climbing types', 'Harvest tender pods']
  },
  {
    id: 'guisante', nombre: 'Guisante', nombreEn: 'Pea', nombreCientifico: 'Pisum sativum',
    tipo: 'fruto', familia: 'Fabáceas', icono: '🫛', temporada: 'otoño-primavera',
    diasCosecha: 60, profundidadSiembra: 3, separacionPlantas: 8,
    descripcion: 'Cultivo de clima fresco. Fija nitrógeno y es muy nutritivo.',
    descripcionEn: 'Cool-season crop. Fixes nitrogen and is highly nutritious.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], cosecha: ['luna_llena','cuarto_menguante'] },
    consejos: ['Siembra en otoño o finales de invierno', 'Soportes ligeros', 'Cosecha frecuentemente'],
    consejosEn: ['Sow in fall or late winter', 'Light supports', 'Harvest frequently']
  },
  {
    id: 'lenteja', nombre: 'Lenteja', nombreEn: 'Lentil', nombreCientifico: 'Lens culinaris',
    tipo: 'fruto', familia: 'Fabáceas', icono: '🫘', temporada: 'otoño-primavera',
    diasCosecha: 100, profundidadSiembra: 2, separacionPlantas: 10,
    descripcion: 'Legumbre antigua, resistente a sequía moderada.',
    descripcionEn: 'Ancient pulse, tolerant of moderate drought.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], cosecha: ['luna_llena','cuarto_menguante'] },
    consejos: ['Suelo bien drenado', 'Poco riego una vez establecida', 'Cosecha cuando vainas se sequen'],
    consejosEn: ['Well-drained soil', 'Little water once established', 'Harvest when pods dry']
  },
  // HIERBAS
  {
    id: 'albahaca', nombre: 'Albahaca', nombreEn: 'Basil', nombreCientifico: 'Ocimum basilicum',
    tipo: 'hierba', familia: 'Lamiáceas', icono: '🌿', temporada: 'primavera-verano',
    diasCosecha: 40, profundidadSiembra: 0.5, separacionPlantas: 25,
    descripcion: 'Aromática esencial. Pinza flores para prolongar hojas.',
    descripcionEn: 'Essential aromatic. Pinch flowers to prolong leaf growth.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], trasplante: ['cuarto_creciente'], cosecha: ['luna_llena','cuarto_menguante'], poda: ['luna_llena'] },
    consejos: ['Mucho sol y calor', 'Pellizca puntas regularmente', 'No tolera el frío'],
    consejosEn: ['Full sun and warmth', 'Pinch tips regularly', 'Does not tolerate cold']
  },
  {
    id: 'perejil', nombre: 'Perejil', nombreEn: 'Parsley', nombreCientifico: 'Petroselinum crispum',
    tipo: 'hierba', familia: 'Apiáceas', icono: '🌿', temporada: 'todo el año',
    diasCosecha: 70, profundidadSiembra: 1, separacionPlantas: 15,
    descripcion: 'Bienal muy usada. Germinación lenta pero planta resistente.',
    descripcionEn: 'Widely used biennial. Slow to germinate but hardy.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], cosecha: ['luna_llena','cuarto_menguante'], abono: ['cuarto_creciente'] },
    consejos: ['Remoja semillas 24h antes', 'Sombra parcial en verano', 'Cosecha tallos externos'],
    consejosEn: ['Soak seeds 24h before sowing', 'Partial shade in summer', 'Harvest outer stems']
  },
  {
    id: 'cilantro', nombre: 'Cilantro', nombreEn: 'Cilantro / Coriander', nombreCientifico: 'Coriandrum sativum',
    tipo: 'hierba', familia: 'Apiáceas', icono: '🌿', temporada: 'primavera-otoño',
    diasCosecha: 40, profundidadSiembra: 1, separacionPlantas: 10,
    descripcion: 'Hojas frescas y semillas (coriandro). Florece rápido con calor.',
    descripcionEn: 'Fresh leaves and seeds (coriander). Bolts quickly in heat.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], cosecha: ['luna_llena','cuarto_menguante'] },
    consejos: ['Siembra sucesiva', 'Prefiere clima fresco', 'Usa hojas y semillas'],
    consejosEn: ['Succession sow', 'Prefers cool weather', 'Use both leaves and seeds']
  },
  {
    id: 'romero', nombre: 'Romero', nombreEn: 'Rosemary', nombreCientifico: 'Salvia rosmarinus',
    tipo: 'hierba', familia: 'Lamiáceas', icono: '🌿', temporada: 'todo el año',
    diasCosecha: 90, profundidadSiembra: 1, separacionPlantas: 50,
    descripcion: 'Arbusto perenne mediterráneo. Muy aromático y resistente.',
    descripcionEn: 'Mediterranean perennial shrub. Highly aromatic and tough.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], poda: ['luna_llena'], cosecha: ['luna_llena','cuarto_menguante'] },
    consejos: ['Suelo pobre y drenante', 'Poco riego una vez establecido', 'Poda ligera tras floración'],
    consejosEn: ['Poor well-draining soil', 'Little water once established', 'Light prune after flowering']
  },
  {
    id: 'menta', nombre: 'Menta', nombreEn: 'Mint', nombreCientifico: 'Mentha spicata',
    tipo: 'hierba', familia: 'Lamiáceas', icono: '🌿', temporada: 'primavera-verano',
    diasCosecha: 40, profundidadSiembra: 1, separacionPlantas: 30,
    descripcion: 'Invasiva: cultívala en maceta. Refrescante y versátil.',
    descripcionEn: 'Invasive: grow in pots. Refreshing and versatile.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], trasplante: ['cuarto_creciente'], poda: ['luna_llena'], cosecha: ['luna_llena','cuarto_menguante'] },
    consejos: ['Siempre en contenedor', 'Suelo húmedo y sombra parcial', 'Corta con frecuencia'],
    consejosEn: ['Always in containers', 'Moist soil and partial shade', 'Cut frequently']
  },
  {
    id: 'tomillo', nombre: 'Tomillo', nombreEn: 'Thyme', nombreCientifico: 'Thymus vulgaris',
    tipo: 'hierba', familia: 'Lamiáceas', icono: '🌿', temporada: 'todo el año',
    diasCosecha: 60, profundidadSiembra: 0.5, separacionPlantas: 20,
    descripcion: 'Hierba mediterránea compacta. Ideal para borduras y cocina.',
    descripcionEn: 'Compact Mediterranean herb. Ideal for borders and cooking.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], poda: ['luna_llena'], cosecha: ['luna_llena','cuarto_menguante'] },
    consejos: ['Sol pleno y suelo seco', 'Poda tras floración', 'No encharcar'],
    consejosEn: ['Full sun and dry soil', 'Prune after flowering', 'Never waterlog']
  },
  {
    id: 'oregano', nombre: 'Orégano', nombreEn: 'Oregano', nombreCientifico: 'Origanum vulgare',
    tipo: 'hierba', familia: 'Lamiáceas', icono: '🌿', temporada: 'primavera-verano',
    diasCosecha: 50, profundidadSiembra: 0.5, separacionPlantas: 25,
    descripcion: 'Aroma intenso, base de la cocina mediterránea.',
    descripcionEn: 'Intense aroma, staple of Mediterranean cooking.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], poda: ['luna_llena'], cosecha: ['luna_llena','cuarto_menguante'] },
    consejos: ['Sol y buen drenaje', 'El sabor se intensifica al secar', 'Divide matas cada 2-3 años'],
    consejosEn: ['Sun and good drainage', 'Flavor intensifies when dried', 'Divide clumps every 2-3 years']
  },
  {
    id: 'lavanda', nombre: 'Lavanda', nombreEn: 'Lavender', nombreCientifico: 'Lavandula angustifolia',
    tipo: 'hierba', familia: 'Lamiáceas', icono: '💜', temporada: 'primavera',
    diasCosecha: 90, profundidadSiembra: 0.5, separacionPlantas: 40,
    descripcion: 'Aromática ornamental. Atrae polinizadores y repele plagas.',
    descripcionEn: 'Ornamental aromatic. Attracts pollinators and repels pests.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], poda: ['luna_llena'], cosecha: ['luna_llena'] },
    consejos: ['Suelo alcalino y drenante', 'Poda después de floración', 'Poco riego'],
    consejosEn: ['Alkaline well-draining soil', 'Prune after flowering', 'Low water needs']
  },
  // FLORES
  {
    id: 'calendula', nombre: 'Caléndula', nombreEn: 'Calendula', nombreCientifico: 'Calendula officinalis',
    tipo: 'flor', familia: 'Asteráceas', icono: '🌼', temporada: 'primavera-otoño',
    diasCosecha: 50, profundidadSiembra: 1, separacionPlantas: 25,
    descripcion: 'Flor comestible y medicinal. Excelente compañera de cultivo.',
    descripcionEn: 'Edible and medicinal flower. Excellent companion plant.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], cosecha: ['luna_llena'], abono: ['cuarto_creciente'] },
    consejos: ['Siembra fácil y se auto-siembra', 'Atrae insectos beneficiosos', 'Pétalos comestibles'],
    consejosEn: ['Easy to sow and self-seeds', 'Attracts beneficial insects', 'Petals are edible']
  },
  {
    id: 'girasol', nombre: 'Girasol', nombreEn: 'Sunflower', nombreCientifico: 'Helianthus annuus',
    tipo: 'flor', familia: 'Asteráceas', icono: '🌻', temporada: 'primavera-verano',
    diasCosecha: 80, profundidadSiembra: 2, separacionPlantas: 40,
    descripcion: 'Majestuoso y útil: semillas comestibles y atrapa polinizadores.',
    descripcionEn: 'Majestic and useful: edible seeds and pollinator magnet.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], cosecha: ['luna_llena'] },
    consejos: ['Siembra directa tras heladas', 'Tutorado en variedades altas', 'Cosecha cabezas cuando se sequen'],
    consejosEn: ['Direct sow after frost', 'Stake tall varieties', 'Harvest heads when dry']
  },
  {
    id: 'capuchina', nombre: 'Capuchina', nombreEn: 'Nasturtium', nombreCientifico: 'Tropaeolum majus',
    tipo: 'flor', familia: 'Tropaeoláceas', icono: '🌺', temporada: 'primavera-verano',
    diasCosecha: 45, profundidadSiembra: 1.5, separacionPlantas: 25,
    descripcion: 'Flores y hojas comestibles. Planta trampa para pulgones.',
    descripcionEn: 'Edible flowers and leaves. Trap crop for aphids.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], cosecha: ['luna_llena'] },
    consejos: ['Suelo pobre (más flores)', 'Ideal en bordes del huerto', 'Todo es comestible'],
    consejosEn: ['Poor soil (more flowers)', 'Ideal at garden edges', 'Entire plant is edible']
  },
  {
    id: 'tagete', nombre: 'Tagete (Cempasúchil)', nombreEn: 'Marigold', nombreCientifico: 'Tagetes erecta',
    tipo: 'flor', familia: 'Asteráceas', icono: '🧡', temporada: 'primavera-verano',
    diasCosecha: 50, profundidadSiembra: 0.5, separacionPlantas: 20,
    descripcion: 'Protege el huerto de nematodos y plagas. Muy tradicional en México.',
    descripcionEn: 'Protects the garden from nematodes and pests. Traditional in Mexico.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], cosecha: ['luna_llena'] },
    consejos: ['Compañera ideal de tomates', 'Siembra entre hileras', 'Retira flores marchitas'],
    consejosEn: ['Ideal tomato companion', 'Sow between rows', 'Deadhead spent blooms']
  },
  {
    id: 'borago', nombre: 'Borraja', nombreEn: 'Borage', nombreCientifico: 'Borago officinalis',
    tipo: 'flor', familia: 'Boragináceas', icono: '🔵', temporada: 'primavera-verano',
    diasCosecha: 50, profundidadSiembra: 1.5, separacionPlantas: 30,
    descripcion: 'Flores azules comestibles. Atrae abejas y mejora el suelo.',
    descripcionEn: 'Edible blue flowers. Attracts bees and improves soil.',
    acciones: { siembra: ['luna_nueva','cuarto_creciente'], cosecha: ['luna_llena'] },
    consejos: ['Se auto-siembra fácilmente', 'Hojas jóvenes en ensaladas', 'Excelente para polinizadores'],
    consejosEn: ['Self-seeds readily', 'Young leaves in salads', 'Excellent for pollinators']
  }
];

function getAllPlants() {
  return PLANTS_DB.slice();
}

function getPlantById(id) {
  return PLANTS_DB.find(p => p.id === id) || null;
}

function searchPlants(query) {
  if (!query) return getAllPlants();
  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return PLANTS_DB.filter(p => {
    const name = (p.nombre + ' ' + (p.nombreEn || '') + ' ' + (p.nombreCientifico || '') + ' ' + (p.tipo || '')).toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return name.includes(q);
  });
}

function getPlantsByType(tipo) {
  if (!tipo || tipo === 'all') return getAllPlants();
  return PLANTS_DB.filter(p => p.tipo === tipo);
}

function getActionLabel(action) {
  return t('actions.' + action) || action;
}
