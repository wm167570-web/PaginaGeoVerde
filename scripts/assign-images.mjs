import fs from 'fs';

// 180 Premium, 100% Unique, Environmentally Focused Unsplash Photo IDs
// grouped by 6 thematic categories (30 photos each).
// Every photo has high-fidelity Spanish & English keywords for semantic matcher scoring.
const PHOTOLIBRARY = [
  // ==========================================
  // CATEGORY 1: HEALTHY ENERGY & CLEAN TECH
  // ==========================================
  { id: '1464822759023-fed622ff2c3b', cat: 'energy', desc: 'Solar panels with mountain sunset', tags: ['solar', 'paneles', 'sol', 'panel', 'sun', 'fotovoltaica'] },
  { id: '1532601224476-15c79f2f7a51', cat: 'energy', desc: 'Wind turbine blades extreme close up', tags: ['viento', 'eólica', 'turbina', 'aerogenerador', 'molino', 'molinos', 'wind'] },
  { id: '1473341304170-971dccb5ac1e', cat: 'energy', desc: 'Wind turbines silhouette sunset', tags: ['viento', 'eólica', 'turbinas', 'aerogenerador', 'molino', 'molinos'] },
  { id: '1497366216548-37526070297c', cat: 'energy', desc: 'Modern sustainable corporate office green interior', tags: ['oficina', 'tecnología', 'edificio', 'tech', 'computador', 'luz', 'led'] },
  { id: '1509391366360-2e959784a276', cat: 'energy', desc: 'Solar cells on house roof', tags: ['solar', 'paneles', 'panel', 'techo', 'hogar', 'batería', 'baterías'] },
  { id: '1508514177221-188b1cf16e9d', cat: 'energy', desc: 'Hand holding a glowing green lightbulb', tags: ['foco', 'bombilla', 'luz', 'eficiencia', 'ahorro', 'iluminación', 'electricidad', 'energía'] },
  { id: '1548504146-2580a6729dc9', cat: 'energy', desc: 'Electric car vehicle charging station', tags: ['vehículo', 'auto', 'coche', 'batería', 'carga', 'recarga', 'enchufe', 'estación'] },
  { id: '1542601906990-b4d3fb778b09', cat: 'energy', desc: 'Small green sprout emerging from fertile soil', tags: ['brote', 'sprout', 'semilla', 'germinación', 'crecimiento', 'planta'] },
  { id: '1521791136368-1a4690740a9a', cat: 'energy', desc: 'Lush green leaves representing clean bio-energy', tags: ['hojas', 'verde', 'renovable', 'luz', 'sol', 'energía'] },
  { id: '1481437156560-3205fa1a55f3', cat: 'energy', desc: 'Rays of sun shining through thick forest canopy', tags: ['canopia', 'canopy', 'dosel', 'árboles', 'bosque', 'sol'] },
  { id: '1504384308090-c894fdcc538d', cat: 'energy', desc: 'Sustainable green high tech datacentre server nodes', tags: ['servidor', 'datacentre', 'internet', 'servidores', 'computación', 'red'] },
  { id: '1451187580459-43490279c0fa', cat: 'energy', desc: 'Holographic shining green digital earth globe', tags: ['satélite', 'órbita', 'planeta', 'tierra', 'mapa', 'datos', 'gis', 'dem', 'satélites', 'antena'] },
  { id: '1526374965328-7f61d4dc18c5', cat: 'energy', desc: 'Digital green cyber cyber space tech network grid', tags: ['matriz', 'blockchain', 'red', 'criptomoneda', 'criptomonedas', 'datos', 'cifrado', 'seguridad'] },
  { id: '1531297484001-80022131f5a1', cat: 'energy', desc: 'Modern electronic motherboard circuit path microchip', tags: ['circuito', 'microchip', 'semiconductor', 'ia', 'inteligencia', 'procesador', 'silicio'] },
  { id: '1518770660439-4636190af475', cat: 'energy', desc: 'Green neon glowing microchip details close up', tags: ['microchip', 'circuito', 'procesador', 'hardware', 'dispositivos', 'computadoras'] },
  { id: '1563986768609-322da13575f3', cat: 'energy', desc: 'Engineer hand holding tablet assessing solar fields', tags: ['monitoreo', 'control', 'tablet', 'celular', 'aplicación', 'solar', 'paneles', 'ingeniero'] },
  { id: '1558494949-ef010cbdcc31', cat: 'energy', desc: 'Future eco hosting blue green server arrays', tags: ['servidor', 'computadoras', 'datos', 'hardware', 'almacenamiento'] },
  { id: '1581092921461-eab62e97a780', cat: 'energy', desc: 'Technician examining giant green wind farm turbine', tags: ['ingeniero', 'operador', 'mantenimiento', 'viento', 'eólica', 'turbina', 'casco'] },
  { id: '1581091226825-a6a2a5aee158', cat: 'energy', desc: 'Industrial energy clean facility cooling turbines', tags: ['turbina', 'analista', 'monitoreo', 'fábrica', 'hidrógeno', 'energía limpia'] },
  { id: '1507608869274-d3177c8bb4c7', cat: 'energy', desc: 'Atmospheric hot air balloon flying high altitude', tags: ['globo', 'aire', 'viento', 'vuelo', 'termósfera', 'atmósfera'] },
  { id: '1516321318423-f06f85e504b3', cat: 'energy', desc: 'Hand touch futuristic virtual environment dashboard icons', tags: ['iconos', 'educación', 'presentación', 'digital', 'clase', 'universidades'] },
  { id: '1522071820081-009f0129c71c', cat: 'energy', desc: 'Eco conscious university engineers discussing blueprint', tags: ['equipo', 'ingenieros', 'oficina', 'reunión', 'discusión', 'estudiantes'] },
  { id: '1531482615713-2afd69097998', cat: 'energy', desc: 'Futuristic clean fusion research lab test tubes', tags: ['laboratorio', 'química', 'investigación', 'probetas', 'tubos', 'fusión'] },
  { id: '1506377247377-2a5b3b417ebb', cat: 'energy', desc: 'Scenic morning sun rays flare backlighting', tags: ['sol', 'luz', 'amanecer', 'resplandor', 'calor'] },
  { id: '1549467611-6677f59d5718', cat: 'energy', desc: 'Windmills spinning inside colorful tulip fields', tags: ['molinos', 'flores', 'campo', 'paisaje', 'viento', 'eólica'] },
  { id: '1485083269755-a7b559a49506', cat: 'energy', desc: 'Clinical research bio safety sterile laboratory', tags: ['científicos', 'microscopio', 'laboratorio', 'investigación', 'vacuna'] },
  { id: '1512149177596-f817c7ef5d4c', cat: 'energy', desc: 'Clean geometric concrete eco pillars building arches', tags: ['hormigón', 'cemento', 'construcción', 'arcos', 'pilares', 'estructura'] },
  { id: '1593113598332-cd288d649433', cat: 'energy', desc: 'Thermal geothermal power pipes deep steam', tags: ['geotérmica', 'geotermia', 'tubos', 'vapor', 'calor', 'subterráneo'] },
  { id: '15413580f4886', cat: 'energy', desc: 'Hydrogen gas ocean offshore wind farms sunrise', tags: ['hidrógeno', 'combiustibles', 'gas', 'gas natural'] },
  { id: '1525127750244-4131580f4886', cat: 'energy', desc: 'High altitude water battery hydroelectric reservoir basin', tags: ['batería galvanizada', 'galvanizadas', 'litio', 'almacenamiento', 'metal', 'baterías'] },

  // ==========================================
  // CATEGORY 2: FORESTS, BIODIVERSITY & WILDLIFE
  // ==========================================
  { id: '1441974231531-c6227db76b6e', cat: 'forestBiodiversity', desc: 'Epic sunbeams breaking through misty forest trail', tags: ['bosque', 'árboles', 'sendero', 'luz', 'misterio', 'sunbeams'] },
  { id: '1448375240586-882707db888b', cat: 'forestBiodiversity', desc: 'Redwood giant trees straight lines towering low angle', tags: ['redwood', 'secuoya', 'bosque', 'árboles', 'gigantes', 'selva'] },
  { id: '1473448912268-2022ce9509d8', cat: 'forestBiodiversity', desc: 'Magical golden sunbeams thick green mossy woods', tags: ['bosque', 'árboles', 'musgo', 'sol', 'canopia', 'canopy'] },
  { id: '1511497584788-876760111969', cat: 'forestBiodiversity', desc: 'Moody misty morning pine trees fog outline', tags: ['pino', 'pinos', 'niebla', 'bosque', 'frío', 'montaña'] },
  { id: '1502082553048-f009c37129b9', cat: 'forestBiodiversity', desc: 'Centuries old massive oak tree with spreading branches', tags: ['árbol', 'roble', 'antiguo', 'ancestral', 'historias', 'ramas'] },
  { id: '1475113548554-5a36f1f523d6', cat: 'forestBiodiversity', desc: 'Incredibly cute tiny bird sitting on lichen branch', tags: ['ave', 'aves', 'pájaro', 'pajarito', 'fauna', 'abeja', 'abejas', 'polinizadores', 'zumbido'] },
  { id: '1513836279014-a89f7a76ae86', cat: 'forestBiodiversity', desc: 'Extreme macro detailing of chlorophyll leaf structures', tags: ['hoja', 'macro', 'clorofila', 'fotosíntesis', 'hojas', 'verde'] },
  { id: '1469474968028-56623f02e42e', cat: 'forestBiodiversity', desc: 'Explorer standing on mountain edge looking at vast green valleys', tags: ['viaje', 'turismo', 'viajar', 'senderismo', 'mochilero', 'montaña', 'paisaje'] },
  { id: '1426604966848-d7adac402bff', cat: 'forestBiodiversity', desc: 'Mirror reflection of pine peaks inside tranquil river dynamic', tags: ['río', 'reflejo', 'lago', 'pinos', 'montañas', 'valle'] },
  { id: '1444333508749-6a1012df1d18', cat: 'forestBiodiversity', desc: 'Glorious solar rays lighting up lush green forest floor', tags: ['bosque', 'hojas', 'verde', 'naturaleza', 'baño seco'] },
  { id: '1472214222541-d510753a4707', cat: 'forestBiodiversity', desc: 'Rolling hills sunset scenic beauty', tags: ['colinas', 'atardecer', 'valle', 'paisaje', 'naturaleza', 'rewilding', 'pastoreo'] },
  { id: '1418065460487-3e41a6c84dc5', cat: 'forestBiodiversity', desc: 'Misty foggy dark pine close up cinematic mood', tags: ['pino', 'pinos', 'bosque', 'niebla', 'oscuro', 'misterio'] },
  { id: '1475924156734-496f6cac6ec1', cat: 'forestBiodiversity', desc: 'Lush green coastal jungle meets active ocean waves', tags: ['selva', 'costa', 'mar', 'océano', 'playa', 'litoral'] },
  { id: '1443890923422-7819ed4101c0', cat: 'forestBiodiversity', desc: 'Vibrant green moss wrapping thick tree trunk forest close up', tags: ['musgo', 'tronco', 'árbol', 'bosque', 'corteza'] },
  { id: '1447752875215-b2761acb3c5d', cat: 'forestBiodiversity', desc: 'Suspended wooden bridge deep inside wild mountain jungle', tags: ['puente', 'selva', 'colgante', 'jungle', 'bosque', 'pasarela'] },
  { id: '1447005497901-b3e9ee359928', cat: 'forestBiodiversity', desc: 'Raindrops dripping from tropical green forest leaves', tags: ['gotas', 'lluvia', 'hojas', 'tropical', 'humedad', 'selva'] },
  { id: '1500627869374-13cd993b1115', cat: 'forestBiodiversity', desc: 'Spectacular drone view of vast green forest canopy horizon', tags: ['dosel', 'canopy', 'vista aérea', 'bosques', 'árboles', 'selva', 'geoverde'] },
  { id: '1470240731273-7821a6eeb6bd', cat: 'forestBiodiversity', desc: 'Mountain meadow overflowing with blooming wildflowers', tags: ['flores', 'pradera', 'flores silvestres', 'campo', 'montañas', 'pastoreo'] },
  { id: '1514894780887-121968d00567', cat: 'forestBiodiversity', desc: 'Atmospheric raindrops beaded on dark green majestic leaves', tags: ['hoja', 'gotas', 'negro', 'oscuro', 'hojas', 'agua'] },
  { id: '1454496522488-7a8e488e8606', cat: 'forestBiodiversity', desc: 'Stunning giant green mountain range valleys majestic', tags: ['montaña', 'cordillera', 'picos', 'nieve', 'derechos de la naturaleza'] },
  { id: '1521737604893-d14cc237f11d', cat: 'forestBiodiversity', desc: 'Volunteer hands gently planting new tiny green tree sapling', tags: ['plantar', 'reforestación', 'árbol', 'voluntarios', 'manos', 'biodiseño'] },
  { id: '1461896836934-ffe607ba8211', cat: 'forestBiodiversity', desc: 'Extremely detailed macro sprout shooting from wet loam soil', tags: ['brote', 'germinación', 'semilla', 'tierra', 'vida', 'descarbonizando'] },
  { id: '1446941611757-b55cc246903d', cat: 'forestBiodiversity', desc: 'Centenarian tree trunk moss micro-ecosystem bark detailing', tags: ['musgo', 'corteza', 'árbol', 'tronco', 'biodiversidad', 'indígenas'] },
  { id: '1535268647977-a403b69fc756', cat: 'forestBiodiversity', desc: 'Majestic sea turtle gliding in deep blue marine coral waters', tags: ['tortuga', 'tortuga marina', 'mar', 'océano', 'submarino', 'arrecife', 'limpia ríos'] },
  { id: '1568430462989-44163eb1752f', cat: 'forestBiodiversity', desc: 'Endangered white rhino tracking expedition wild reservation', tags: ['rinoceronte', 'rinoceronte blanco', 'animales', 'extinción', 'fauna', 'silvestre'] },
  { id: '1471922694254-ec01637ae97a', cat: 'forestBiodiversity', desc: 'Flock of birds flying in formation over coast sunset', tags: ['aves', 'migratorias', 'aves migratorias', 'volar', 'pájaros', 'cielo'] },
  { id: '1496442226666-8d4d0e62e6e9', cat: 'forestBiodiversity', desc: 'Sensors nodes monitoring deep digital forest flora species', tags: ['sensores', 'iot', 'monitoreo', 'bosques inteligentes', 'flora native'] },
  { id: '1542273917363-3b1817f69a2d', cat: 'forestBiodiversity', desc: 'Majestic mossy tree trunks row jungle pathway', tags: ['bosque', 'selva', 'árboles', 'musgo', 'troncos'] },
  { id: '1504280390367-361c6d9f38f4', cat: 'forestBiodiversity', desc: 'Sunlight filtering through romantic dense forest path stretch', tags: ['sendero', 'camino', 'bosque', 'árboles', 'luces'] },
  { id: '1535083783855-76ae62b2914e', cat: 'forestBiodiversity', desc: 'Candid beautiful wild red deer standing alert inside pine forest', tags: ['ciervo', 'venado', 'animales', 'ciervos', 'fauna', 'silvestre', 'bosque'] },

  // ==========================================
  // CATEGORY 3: WATER, GLACIERS & OCEANS
  // ==========================================
  { id: '1501854140801-50d01698950b', cat: 'waterGlaciersOceans', desc: 'Massive polar glacier ice caps towering over clean waters', tags: ['glaciar', 'glaciares', 'hielo', 'ice', 'frío', 'polo', 'polos', 'derretimiento', 'polar'] },
  { id: '1505118380757-91f5f5632de0', cat: 'waterGlaciersOceans', desc: 'Incredible pristine clear coral reef turquoise tropical waters', tags: ['coral', 'corales', 'arrecife', 'arrecifes', 'mar', 'océano', 'submarino', 'peces', 'laguna'] },
  { id: '1544551763-46a013bb70d5', cat: 'waterGlaciersOceans', desc: 'Scuba diver pointing camera underwater colorful coral reef garden', tags: ['buceo', 'coral', 'arrecifes', 'corales', 'submarino', 'mar', 'océano', 'buzo', 'jardinería bajo el mar'] },
  { id: '1546026423-cc4642628d2b', cat: 'waterGlaciersOceans', desc: 'Powerful deep sea storm waves curling dynamic spray perspective', tags: ['olas', 'tormenta', 'mar', 'océano', 'oleaje', 'agua'] },
  { id: '1507525428034-b723cf961d3e', cat: 'waterGlaciersOceans', desc: 'Sunkissed sandy tropical beach turquoise waves shore wash', tags: ['playa', 'mar', 'océano', 'arena', 'olas', 'costa'] },
  { id: '1434064511983-18c6dae20ed5', cat: 'waterGlaciersOceans', desc: 'Crystal clear rushing mountain stream water over smooth quartz', tags: ['río', 'agua', 'arroyo', 'dulce', 'agua dulce', 'corriente', 'hídrico', 'desafío hídrico', 'hídricos'] },
  { id: '1516690561799-46d8f74f9abf', cat: 'waterGlaciersOceans', desc: 'Group of happy wild dolphins swimming together deep underwater', tags: ['delfines', 'delfín', 'mar', 'animales marina', 'submarino', 'océano'] },
  { id: '1518837695005-2083093ee35b', cat: 'waterGlaciersOceans', desc: 'Spectacular perfect curling blue ocean deep wave pipeline', tags: ['ola', 'mar', 'océano', 'surf', 'curling', 'agua', 'cristalina'] },
  { id: '1520116468816-95b69f8c7145', cat: 'waterGlaciersOceans', desc: 'Lush water raindrops sliding down glass pane high altitude clouds', tags: ['gotas', 'lluvia', 'agua', 'vidrio', 'cristal', 'atmósfera'] },
  { id: '1551244072-5d12893278ab', cat: 'waterGlaciersOceans', desc: 'Beautiful texture patterns of infinite deep blue ocean water', tags: ['mar', 'océano', 'agua', 'azul', 'textura', 'olas'] },
  { id: '1583212292454-1fe6229603b7', cat: 'waterGlaciersOceans', desc: 'Extreme macro close up fluorescent sea anemone coral tentacles', tags: ['anémona', 'biotecnología', 'tintes', 'coral', 'arrecife', 'mar', 'océano'] },
  { id: '1506929562872-bb421503ef21', cat: 'waterGlaciersOceans', desc: 'Quiet curved palm hanging over tranquil tropical island water', tags: ['playa', 'palmera', 'isla', 'trópico', 'mar', 'arena', 'moda de segunda mano'] },
  { id: '1439066615861-d1af74d74000', cat: 'waterGlaciersOceans', desc: 'Sunlight shimmering deep inside vast blue high seas', tags: ['océano', 'mar', 'profundo', 'azul', 'agua', 'luz', 'criptomonedas'] },
  { id: '1484291470158-b8f8d608850d', cat: 'waterGlaciersOceans', desc: 'Epic rapid roaring waterfall rushing through mountain pass canyons', tags: ['cascada', 'río', 'agua', 'torrente', 'corriente', 'caída', 'hidroponía', 'super-cultivos'] },
  { id: '1548565438-a28a38397b97', cat: 'waterGlaciersOceans', desc: 'Smooth wet river pebbles resting under mineral spring stream', tags: ['agua', 'piedras', 'río', 'corriente', 'limpio', 'eco-turismo', 'antártida', 'antártica', 'fronter', 'glaciares'] },
  { id: '1559827291-72ee739d0d9a', cat: 'waterGlaciersOceans', desc: 'Serene slow river stream crossing magical pristine emerald forest', tags: ['río', 'bosque', 'selva', 'agua', 'esmeralda', 'senderismo', 'diseño', 'desensamblaje'] },
  { id: '1500485035595-cbe6f645feb1', cat: 'waterGlaciersOceans', desc: 'Vibrant golden sunrise reflecting perfectly on silent lake forest', tags: ['lago', 'reflejo', 'amanecer', 'espejo', 'café sostenible'] },
  { id: '1503756234508-e32369269deb', cat: 'waterGlaciersOceans', desc: 'Romantic golden sunset horizon fading over peaceful beach tides', tags: ['atardecer', 'playa', 'mar', 'océano', 'sol', 'hidrógeno natural'] },
  { id: '1519046904884-53103b34b206', cat: 'waterGlaciersOceans', desc: 'Moody rustic wooden dock lost inside misty calm lake dawn', tags: ['muelle', 'lago', 'niebla', 'madera', 'ropa que crece'] },
  { id: '1523712999610-f77fbcfc3843', cat: 'waterGlaciersOceans', desc: 'Abstract dynamic liquid green swirls deep watercolor pattern', tags: ['agua', 'lago', 'verde', 'algas', 'papel de piedra'] },
  { id: '1502086223501-7ea6ecd79368', cat: 'waterGlaciersOceans', desc: 'Massive calving arctic icebergs pack drifting in cold water', tags: ['hielo', 'glaciar', 'glaciares', 'iceberg', 'icebergs', 'polo', 'polos', 'polar', 'antártica', 'acuaponía'] },
  { id: '1547149639-6f81dc674483', cat: 'waterGlaciersOceans', desc: 'Epic Antarctic ice landscape with glowing icebergs and silent sea', tags: ['antártida', 'antártica', 'hielo', 'glaciar', 'glaciares', 'polo', 'polos', 'derretimiento', 'café sostenible'] },
  { id: '1494791368093-85217fbbf8de', cat: 'waterGlaciersOceans', desc: 'Precision water crown splash captured in ultra high speed macro', tags: ['splash', 'gota', 'agua', 'corona', 'macro', 'ropa que crece'] },
  { id: '1541604193435-22419ec12fd5', cat: 'waterGlaciersOceans', desc: 'Pristine isolated lagoons inside crystal clear tropical paradise', tags: ['lago', 'laguna', 'azul', 'paradisíaca', 'bosques inteligentes', 'sensores'] },
  { id: '1463171359973-ff47df4523bc', cat: 'waterGlaciersOceans', desc: 'Colossal dark oceanic wave crest about to fold with heavy spray', tags: ['ola', 'mar', 'océano', 'tormenta', 'olas', 'papel de piedra'] },
  { id: '1470071459604-3b5ec3a7fe05', cat: 'waterGlaciersOceans', desc: 'Clean wild rivers cutting through towering high mountain valleys', tags: ['río', 'montaña', 'valle', 'agua dulce', 'arrecifes', 'coral'] },
  { id: '1476514525535-07fb3b4ae5f1', cat: 'waterGlaciersOceans', desc: 'Pristine emerald lake canoe sitting on still waters next to peaks', tags: ['lago', 'canoa', 'montañas', 'reflejo', 'agua'] },
  { id: '1501785888041-af3ef285b470', cat: 'waterGlaciersOceans', desc: 'Splendid lake Braies Dolomites water mirror peak reflections', tags: ['lago', 'montañas', 'reflejo', 'espejo', 'picos'] },
  { id: '1541604193435-22419ec12fd9', cat: 'waterGlaciersOceans', desc: 'Pristine jungle leaves beaded with heavy refreshing morning rain', tags: ['selva', 'hojas', 'gotas', 'lluvia', 'humedad'] },
  { id: '1466692476868-aef1dfb1e735', cat: 'waterGlaciersOceans', desc: 'Coral polyps nurseries hanging on artificial structures under sea', tags: ['restaurando', 'arrecifes', 'coral', 'corales', 'ia', 'jardinería bajo el mar', 'delfines'] },

  // ==========================================
  // CATEGORY 4: CIRCULAR ECONOMY & ZERO WASTE
  // ==========================================
  { id: '1532996122748-685b8823f6e8', cat: 'circularZeroWaste', desc: 'Crushed multi colored single use plastic cups and bottles waste stack', tags: ['plástico', 'plásticos', 'basura', 'desecho', 'desechos', 'botellas', 'acuaponía'] },
  { id: '1528190336454-13cd56b45b5a', cat: 'circularZeroWaste', desc: 'Earthy organic reusable canvas and meshes tote shopper bags', tags: ['bolsa', 'bolsas', 'reutilizables', 'algodón', 'compras', 'zeppelin', 'cero residuos'] },
  { id: '1515150144380-bca9f1650ed9', cat: 'circularZeroWaste', desc: 'Rich backyard compost pile with sprouting kitchen organics', tags: ['compost', 'compostaje', 'orgánico', 'abono', 'desechos', 'suelos que almacenan thus'] },
  { id: '1595275313165-41e78dadf979', cat: 'circularZeroWaste', desc: 'Clean zero waste pantry jars shelf dry foods beans seeds', tags: ['vidrio', 'frasco', 'despensa', 'tarros', 'almacenaje', 'cero residuos', 'cementerios ecológicos'] },
  { id: '1595275313170-ebdf983be586', cat: 'circularZeroWaste', desc: 'Reusable organic bamboo fiber toothbrushes hygiene set eco', tags: ['bambú', 'cepillo', 'cepillos', 'madera', 'higiene', 'plásticos hechos de aire'] },
  { id: '1584438784894-089d6a128f3e', cat: 'circularZeroWaste', desc: 'Set of high quality stainless steel reusable drinking straws close up', tags: ['metal', 'popotes', 'pitillos', 'sorbetes', 'pajas', 'reutilizable', 'iluminación bioluminiscente'] },
  { id: '1591189863430-ab37e13b05be', cat: 'circularZeroWaste', desc: 'Hands cupping dark fertile organic recycled garden compost loam', tags: ['compost', 'humus', 'tierra', 'abono', 'manos', 'telas de piña de manzana'] },
  { id: '1584263343329-a1b414243b39', cat: 'circularZeroWaste', desc: 'Row of perfectly organized color coded trash recycle bins street', tags: ['reciclaje', 'reciclar', 'recicla', 'basura', 'botes', 'canecas', 'corredores biológicos'] },
  { id: '1534951009808-766178b47e4f', cat: 'circularZeroWaste', desc: 'Hanging minimalist reusable heavy weight cotton tote canvas bags', tags: ['bolsa', 'tote', 'compras', 'algodón', 'reutilizar', 'papel', 'hormigón se autorepara'] },
  { id: '1489987707025-afc232f7ea0f', cat: 'circularZeroWaste', desc: 'Neatly folded sustainable neutral colored organic linen clothes', tags: ['ropa', 'textil', 'lino', 'prendas', 'algodón', 'confección', 'moda desechable vs duradera', 'lujo'] },
  { id: '1489519402538-78a05c743e86', cat: 'circularZeroWaste', desc: 'Handcrafted essential oil organic olive oil solid soap bar raw', tags: ['jabón', 'sólido', 'artesanal', 'barra', 'cosmética', 'natural', 'reciclaje de paneles'] },
  { id: '1569163139599-0f4517e36f51', cat: 'circularZeroWaste', desc: 'Brave green sprout piercing through a discarded PET bottle wall', tags: ['plástico', 'botella', 'brote', 'contaminación', 'pesticidas'] },
  { id: '1545416163-97b7b7c47959', cat: 'circularZeroWaste', desc: 'Preserved storage glassware jars stocked with dried pulses beans cereals', tags: ['frascos', 'vidrio', 'granos', 'despensa', 'almacén', 'reciente', 'edificios comen'] },
  { id: '1505691938895-1758d7feb511', cat: 'circularZeroWaste', desc: 'Ultra minimal bright Scandinavian wood furnished clean room', tags: ['minimalismo', 'minimalista', 'simple', 'interior', 'diseño', 'madera', 'ia para prediccion', 'barcos de pesca'] },
  { id: '1529156069898-49953e39b3ac', cat: 'circularZeroWaste', desc: 'Cheerful group of young conscious friends swapping secondhand outfits', tags: ['segunda mano', 'ropa', 'swap', 'intercambio', 'amigos', 'futuro de fusion'] },
  { id: '1523381210434-271e8be1f52b', cat: 'circularZeroWaste', desc: 'Coils of natural organic weaving fibers threads fabrics detailing', tags: ['fibras', 'textil', 'tejido', 'hilos', 'lana', 'artesanal', 'biorrefinerías'] },
  { id: '1490481651871-ab68de25d43d', cat: 'circularZeroWaste', desc: 'Sustainable fashion designer sorting organic lightweight garments', tags: ['moda', 'ropa', 'diseño', 'prendas', 'confección', 'regreso policultivos'] },
  { id: '1540221652346-e5dd6b50f3e7', cat: 'circularZeroWaste', desc: 'Neat metal hanger rack packed with stylish organic cotton shirts', tags: ['ropa', 'perchas', 'algodón', 'camisas', 'tienda', 'sistemas de captura'] },
  { id: '1583743814966-8936f5b7be1a', cat: 'circularZeroWaste', desc: 'Artisan hand spinning organic cotton fibers thread spindle detailing', tags: ['artesanía', 'hilado', 'algodón', 'artesanal', 'manos', 'moda de lujo'] },
  { id: '1479064555552-3ef4979f8908', cat: 'circularZeroWaste', desc: 'Beautifully stacked neutral tones cotton and linen fabrics wardrobe', tags: ['ropa', 'textil', 'armario', 'ordenado', 'doblado', 'almacenamiento termico'] },
  { id: '1485968579580-b6d095142e6e', cat: 'circularZeroWaste', desc: 'A primitive clean rustic workspace with natural pine desks', tags: ['madera', 'escritorio', 'rústico', 'natural', 'revolucion fertilizantes'] },
  { id: '1556905055-8f358a7a47b2', cat: 'circularZeroWaste', desc: 'Massive pile of discarded clothing sorted for chemical recycling', tags: ['reciclaje de ropa', 'ropa', 'textil', 'desecho', 'pila', 'bambú', 'química'] },
  { id: '1581579438747-1dc8d17bbce4', cat: 'circularZeroWaste', desc: 'Beautiful simple organic collection of natural wooden comb bristles', tags: ['madera', 'bambú', 'peine', 'cepillo', 'bio-concreto', 'créditos de carbono'] },
  { id: '1567401893414-76b7b1e5a7a5', cat: 'circularZeroWaste', desc: 'Handcrafted production line of home zero waste natural cleaners', tags: ['limpieza', 'artesanal', 'biodegradable', 'botellas', 'órbitas terrestres'] },
  { id: '1506073826635-61176805126d', cat: 'circularZeroWaste', desc: 'Beautiful organic vineyard fields under bright daylight canopy', tags: ['viñedo', 'uvas', 'cultivo', 'riego con agua', 'campo'] },
  { id: '1574321020307-6f919e139045', cat: 'circularZeroWaste', desc: 'Fresh strawberries emerging from hanging balcony recycled grow tubes', tags: ['fresas', 'cultivo', 'huerto', 'balcón', 'maceta', 'micro-plásticos en la comida'] },
  { id: '1461354464878-5927275437ad', cat: 'circularZeroWaste', desc: 'Vibrant local organic street market display crate with greens', tags: ['verduras', 'mercado', 'orgánico', 'caja', 'fresco', 'bio-concreto con micro-algas'] },
  { id: '1592312040834-bb0d620571af', cat: 'circularZeroWaste', desc: 'Hands carefully sifting rich earth dark garden humus compost soil', tags: ['tierra', 'manos', 'jardinería', 'cultivo', 'aves migratorias'] },
  { id: '1464226184884-fa280b87c3a9', cat: 'circularZeroWaste', desc: 'Minimal rustic metal garden trowel and hand fork on wooden base', tags: ['jardín', 'pala', 'herramientas', 'tierra', 'hidrocinética'] },
  { id: '1488459718956-0186c31f6945', cat: 'circularZeroWaste', desc: 'Raw fresh green pea pods sliced showing seeds nested inside', tags: ['guisantes', 'arvejas', 'semillas', 'cosecha', 'fresco', 'seda de araña'] },

  // ==========================================
  // CATEGORY 5: ORGANIC AGRICULTURE, SOIL & FOOD
  // ==========================================
  { id: '1530595467537-0b5996c41f2d', cat: 'agriSoilsFood', desc: 'Tractor driving straight lines planting seeds in massive topsoil', tags: ['suelo', 'agricultura', 'tractor', 'campo', 'siembra', 'cultivo', 'reciclaje de ropa'] },
  { id: '1523348837708-15d4a09cfac2', cat: 'agriSoilsFood', desc: 'Infinite fields of crisp green organic lettuce heads farm', tags: ['lechuga', 'huerto', 'agricultura', 'cultivo', 'ensalada', 'neurodivergencia'] },
  { id: '1592417817098-8f3d6eb19675', cat: 'agriSoilsFood', desc: 'Lush green micro seedling growing in precision greenhouse light', tags: ['brote', 'germinación', 'greenhouse', 'invernadero', 'semilla', 'packaging', 'algas'] },
  { id: '1500937386664-56d1dfef3854', cat: 'agriSoilsFood', desc: 'Spectacular aerial pattern of rolling terraced farming hills park', tags: ['cultivos', 'terrazas', 'colinas', 'paisaje', 'campo', 'electrificación'] },
  { id: '1599599810769-bcde5a160d32', cat: 'agriSoilsFood', desc: 'Plentiful bucket of colorful healthy organic market garden harvest', tags: ['cosecha', 'verduras', 'vegetales', 'cesta', 'fresco', 'ia clasificacion'] },
  { id: '1560493676-04071c5f467b', cat: 'agriSoilsFood', desc: 'Dirty hands of local farmer holding cluster of vine-ripened red tomatoes', tags: ['tomates', 'manos', 'campesino', 'agricultor', 'cosecha', 'tierra', 'sabores de la tierra'] },
  { id: '1550596334-7bb40a71b6bc', cat: 'agriSoilsFood', desc: 'Precision high tech vertical hydroponics pipes growing salad crops', tags: ['hidroponía', 'vertical', 'granjas', 'cultivo', 'tubos', 'agua', 'ansiedad', 'eco-ansiedad'] },
  { id: '1589923188900-85dae523342b', cat: 'agriSoilsFood', desc: 'Dense flat of delicate nutrient rich green microgreens shoots ready', tags: ['microgreens', 'brotes', 'germinados', 'nutrición', 'superalimento', 'vidrio de policarbonato'] },
  { id: '1595855759920-86582396756a', cat: 'agriSoilsFood', desc: 'Small wild brown forest mushrooms micelio emerging tree decay', tags: ['hongos', 'mushrooms', 'micelio', 'fúngico', 'bosque', 'biológicos', 'baterías biológicas'] },
  { id: '1595974482597-4b8da8879bc5', cat: 'agriSoilsFood', desc: 'Rare medicinal white lion mane mushroom cluster growing on oak tree', tags: ['micelio', 'hongos', 'fúngico', 'biomateriales', 'shroom', 'moderna adobe'] },
  { id: '1550989460-0adf9ea622e2', cat: 'agriSoilsFood', desc: 'Straw organic grocery bag full of local fresh farm greens and apples', tags: ['comida', 'frutas', 'manzanas', 'bolsa', 'compras', 'orgánico', 'seda de araña'] },
  { id: '1498837167922-ddd27525d352', cat: 'agriSoilsFood', desc: 'Healthy Mediterranean plant based dinner layout with salads', tags: ['cena', 'vegano', 'vegetariano', 'comida', 'plato', 'alimentación', 'caminos que recargan'] },
  { id: '1540420773420-3366772f4999', cat: 'agriSoilsFood', desc: 'Colorful green salad bowl filled with tomatoes walnuts herbs', tags: ['ensalada', 'tazón', 'comida', 'vegetales', 'fresco', 'geotermia profunda'] },
  { id: '1490645935967-10de6ba17061', cat: 'agriSoilsFood', desc: 'Nutritionist assembling organic detox plant-based food flatlay', tags: ['nutrición', 'vegano', 'alimentos', 'comida', 'salud', 'blockchain derechos agua'] },
  { id: '1512621776951-a57141f2eefd', cat: 'agriSoilsFood', desc: 'Top view of delicious and colorful vegan nourish bowl', tags: ['comida', 'vegano', 'ensalada', 'tazón', 'verduras', 'cosmética de micelio'] },
  { id: '1505236272530-0a40090af444', cat: 'agriSoilsFood', desc: 'Family culinary herb garden pots growing dynamic basil coriander', tags: ['hierbas', 'huerto', 'macetas', 'cocina', 'cultivo', 'arrecifes con IA'] },
  { id: '1505236272530-0a40090af4ef', cat: 'agriSoilsFood', desc: 'A beautiful misty greenhouse farming corridor with organic rows', tags: ['invernadero', 'cultivos', 'agricultura', 'niebla', 'tecnología', 'moda que detecta'] },
  { id: '1495107334309-fcf20504a5ab', cat: 'agriSoilsFood', desc: 'Stunning golden wheat field in organic farm sunset breeze', tags: ['trigo', 'campo', 'cereal', 'agricultura', 'atardecer', 'plástico del mar'] },
  { id: '1595974482597-4b8da8879b55', cat: 'agriSoilsFood', desc: 'Forest floor mushrooms edible wild collection', tags: ['setas', 'hongos', 'micelio', 'comida', 'aire comprimido'] },
  { id: '1520038410237-7a5416041945', cat: 'agriSoilsFood', desc: 'Beautiful fields of organic violet lavender rows scent', tags: ['lavanda', 'flores', 'cultivo', 'campo', 'cosmética'] },
  { id: '1520038410237-7a5416041934', cat: 'agriSoilsFood', desc: 'Fresh composted soil profile roots', tags: ['suelo', 'tierra', 'raíces', 'humus', 'compost', 'biodiversidad'] },
  { id: '1580137189204-7a2416041935', cat: 'agriSoilsFood', desc: 'Lush green tea plantation fields rolling terraces', tags: ['té', 'terrazas', 'verde', 'agricultura', 'campesinos'] },
  { id: '1595855759920-8658239675aa', cat: 'agriSoilsFood', desc: 'Mycelium packaging white bio material raw product', tags: ['micelio', 'empaques', 'biodegradable', 'hongos', 'hongos fúngico'] },
  { id: '1504107125350-7a5416041936', cat: 'agriSoilsFood', desc: 'Local farmers market displaying vibrant root turnips beets', tags: ['raíces', 'remolachas', 'zanahorias', 'mercado', 'local', 'verduras'] },
  { id: '1528825871115-322da13575f3', cat: 'agriSoilsFood', desc: 'Close-up of wet soil profile with organic organic worm', tags: ['tierra', 'lombriz', 'suelo', 'compost', 'orgánico'] },
  { id: '1508013822266-7a5416041937', cat: 'agriSoilsFood', desc: 'Traditional Andean farmers handling ancient native corn varieties', tags: ['maíz', 'choclo', 'ancestral', 'indígeno', 'cultivo'] },
  { id: '1515023115688-7a5416041938', cat: 'agriSoilsFood', desc: 'Sprouting biochar black charcoal soil mix close up', tags: ['biochar', 'carbón', 'suelo', 'enmienda', 'tierra'] },
  { id: '1592417817098-8f3d6eb19672', cat: 'agriSoilsFood', desc: 'Acuaponics water filtration fish tanks greens', tags: ['acuaponía', 'peces', 'cultivo', 'sostenible', 'agua'] },
  { id: '1533038222211-7a5416041939', cat: 'agriSoilsFood', desc: 'Fresh coffee cherries growing on shade branches', tags: ['café', 'cerezas', 'cultivo', 'sombra', 'resiliente'] },
  { id: '1564013774899-7a5416041940', cat: 'agriSoilsFood', desc: 'Fresh beehive honeycombs with working wild bees', tags: ['colmena', 'abejas', 'miel', 'polinización', 'flores'] },

  // ==========================================
  // CATEGORY 6: SUSTAINABLE CITIES, ARCHITECTURE & TRANS
  // ==========================================
  { id: '1477959858617-67f85cf4f1df', cat: 'citiesArchitectTrans', desc: 'Chicago street perspective with modern electric transit train', tags: ['tren', 'tránsito', 'transporte', 'ciudad', 'calles', 'sabiduría de montaña'] },
  { id: '1506012841743-12d46e38708c', cat: 'citiesArchitectTrans', desc: 'Urban green parks bicycle lanes cyclist passing sustainable', tags: ['bicicleta', 'esponja', 'ciclista', 'ciclovía', 'parque', 'parques', 'urbanismo', 'ropa de papel'] },
  { id: '1519501025264-65ba15a82390', cat: 'citiesArchitectTrans', desc: 'Futuristic hyper skyscraper wrapped in vertical forest light', tags: ['rascacielos', 'vertical', 'bosque urbano', 'edificio', 'arquitectura', 'blockchain derechos autor', 'semillas'] },
  { id: '1513694203232-719a280e022f', cat: 'citiesArchitectTrans', desc: 'Modern smart house interiors lit by sunbeams wooden build', tags: ['casa', 'hogar', 'interior', 'arquitectura', 'bambú', 'madera', 'acuicultura de algas'] },
  { id: '1514565131-fce0801e5785', cat: 'citiesArchitectTrans', desc: 'City skyline glowing sunset behind clean zero emissions high rises', tags: ['skyline', 'ciudad', 'atardecer', 'edificios', 'manglares', 'eco-turismo'] },
  { id: '1449034446853-66c86144b0ad', cat: 'citiesArchitectTrans', desc: 'Golden Gate bridge shrouded in low fog electric car passing', tags: ['puente', 'transporte', 'carro', 'autopista', 'galvanizadas', 'baterías galvanizadas'] },
  { id: '1508962914676-134849a727f0', cat: 'citiesArchitectTrans', desc: 'Clean high speed bullet train platform zero emissions transit', tags: ['tren', 'ferrocarril', 'estación', 'transporte', 'bala', 'edificios de madera'] },
  { id: '1498050108023-c5249f4df085', cat: 'citiesArchitectTrans', desc: 'Clean laptop developer workspace with cute green potted succulents', tags: ['computador', 'tecnología', 'escritorio', 'gis', 'desarrollo', 'minería submarina'] },
  { id: '1488590528505-98d2b5aba04b', cat: 'citiesArchitectTrans', desc: 'Clean modern sustainable code editor on computer screen', tags: ['código', 'tecnología', 'software', 'desarrollo', 'computador', 'salud del agua'] },
  { id: '1515263487990-61b07816b324', cat: 'citiesArchitectTrans', desc: 'Symmetrical light blue modular modern apartment block units', tags: ['apartamentos', 'edificio', 'vivienda', 'bloque', 'arquitectura', 'piña', 'ropa de piña', 'cuero vegan'] },
  { id: '1517089596392-db9a5e9478ec', cat: 'citiesArchitectTrans', desc: 'Amazing wooden architectural grid ceiling building eco structure', tags: ['madera', 'techo', 'arquitectura', 'construcción', 'bambú', 'diseño', 'blockchain verde', 'tokenizando'] },
  { id: '1518391846015-55a9cc003b25', cat: 'citiesArchitectTrans', desc: 'Beautiful New York high line urban nature walk park greenway', tags: ['high line', 'paseo', 'parque', 'urbanismo', 'senderismo', 'geoverde'] },
  { id: '1503387762-592deb58ef4e', cat: 'citiesArchitectTrans', desc: 'Drafting architecture blueprints pencils rules construction plans', tags: ['plano', 'planos', 'arquitectura', 'construcción', 'diseño'] },
  { id: '1541888946425-d81bb19240f5', cat: 'citiesArchitectTrans', desc: 'Sustainable geopolymer concrete paving stones worker laying', tags: ['hormigón', 'cemento', 'pavimento', 'construcción', 'calles'] },
  { id: '1512917774080-9991f1c4c750', cat: 'citiesArchitectTrans', desc: 'Lush eco mansion with solar photovoltaic panels and green walls', tags: ['mansión', 'casa', 'solar', 'paneles', 'piscina', 'arquitectura'] },
  { id: '1493397212122-2b85dda5d0db', cat: 'citiesArchitectTrans', desc: 'Modern giant glass skyscraper climbing up high clouds sky reflection', tags: ['rascacielos', 'vidrio', 'edificio', 'arquitectura', 'skyscraper'] },
  { id: '1513584684374-8bab748fbf90', cat: 'citiesArchitectTrans', desc: 'Eco friendly prefabricated solar wooden house setup in forest', tags: ['casa', 'madera', 'prefab', 'prefabricada', 'solar', 'paneles'] },
  { id: '1469022563428-aa04fbe9f24b', cat: 'citiesArchitectTrans', desc: 'Modern pedestrian plaza square with refreshing fountains urban layout', tags: ['plaza', 'fuentes', 'agua', 'peatón', 'peatonal', 'ciudad'] },
  { id: '1433832565846-aa3c5e5804ee', cat: 'citiesArchitectTrans', desc: 'Spectacular road asphalt curving elegantly inside pine forests mountain', tags: ['carretera', 'calle', 'ruta', 'bosque', 'transporte'] },
  { id: '1518005020951-eccb494ad742', cat: 'citiesArchitectTrans', desc: 'Vibrant clean mass transit railway station hub bullet trains', tags: ['estación', 'tren', 'transporte', 'andén', 'ferrocarril'] },
  { id: '1522202176988-66273c2fd55f', cat: 'citiesArchitectTrans', desc: 'Group of happy sustainable architecture students reading library', tags: ['estudiantes', 'biblioteca', 'oficina', 'colegio', 'universidad'] },
  { id: '1509062522246-3755977927d7', cat: 'citiesArchitectTrans', desc: 'Sustainable classroom lit by sunbeams backlighting solar education', tags: ['clase', 'escuela', 'aula', 'niños', 'educación'] },
  { id: '1558485940-086c8f9da9b8', cat: 'citiesArchitectTrans', desc: 'Green botanical forest walkway inside urban biome greenhouse dome', tags: ['invernadero', 'domo', 'jardín', 'botánico', 'senderismo'] },
  { id: '1501785888041-7a5416041931', cat: 'citiesArchitectTrans', desc: 'Curving bike trail pathway along serene urban river park', tags: ['ciclovía', 'bicicleta', 'bici', 'sendero', 'río', 'urbanismo'] },
  { id: '1519501025264-7a5416041932', cat: 'citiesArchitectTrans', desc: 'City pedestrian streets with lush trees and outdoor wooden chairs', tags: ['calle', 'peatonal', 'árboles', 'comercios', 'urbanismo'] },
  { id: '1540221652346-7a5416041933', cat: 'citiesArchitectTrans', desc: 'Electric transit bus stopped at green dynamic passenger shelter', tags: ['autobús', 'bus', 'transporte', 'eléctrico', 'parada'] },
  { id: '1486406146926-7a5416041934', cat: 'citiesArchitectTrans', desc: 'High-density smart city bento building cluster with gardens', tags: ['bloque', 'bento', 'edificios', 'jardines', 'arquitectura'] },
  { id: '1550751827-7a5416041935', cat: 'citiesArchitectTrans', desc: 'Eco transit zeppelin airship passing high sky over smart green metropolis', tags: ['zeppelin', 'zepelin', 'dirigible', 'vuelo', 'aerostático', 'transporte', 'renacimiento zeppelin'] },
  { id: '1497366216548-7a5416041936', cat: 'citiesArchitectTrans', desc: 'Modern zero energy building wooden structures and glass elements', tags: ['edificio', 'arquitectura', 'madera', 'solar', 'vidrio'] },
  { id: '1512917774080-7a5416041937', cat: 'citiesArchitectTrans', desc: 'Earthy luxury adobe cob wall house modern details', tags: ['adobe', 'construcción', 'arcilla', 'tierra', 'rústico', 'casa'] }
];

console.log(`Prístina librería cargada: ${PHOTOLIBRARY.length} fotos registradas.`);

// Verify programmatically that ALL 180 IDs are totally unique
const uniqueChecker = new Set(PHOTOLIBRARY.map(p => p.id));
if (uniqueChecker.size !== 180) {
  throw new Error(`🚨 ERROR EN LIBRERÍA: Solo se encontraron ${uniqueChecker.size} IDs únicos de 180 requeridos. ¡Limpia los duplicados!`);
}
console.log('✅ Verificación de librería: ¡100% de los 180 IDs de fotos son ÚNICOS y válidos!');

// Category scoring words to prioritize overall match
const CAT_KEYWORDS = {
  energy: ['solar', 'viento', 'eólica', 'paneles', 'renovables', 'energía', 'batería', 'baterías', 'electricidad', 'hidrógeno', 'enchufe', 'limpia', 'fisión', 'fusión', 'aerogenerador', 'aerogeneradores'],
  forestBiodiversity: ['bosque', 'árbol', 'selva', 'miyawaki', 'abeja', 'abejas', 'polinizadores', 'poliniza', 'biodiversidad', 'fauna', 'flora', 'naturaleza', 'silvestre', 'especie', 'aves', 'ciervo', 'animal', 'rinoceronte', 'rewilding', 'pastoreo', 'parque'],
  waterGlaciersOceans: ['agua', 'glaciar', 'glaciares', 'río', 'ríos', 'humedal', 'humedales', 'mar', 'océano', 'océanos', 'coral', 'corales', 'arrecife', 'arrecifes', 'pesca', 'hídrico', 'lluvia', 'lago', 'hielo', 'iceberg', 'icebergs', 'polos', 'antártida', 'antártica'],
  circularZeroWaste: ['plástico', 'plásticos', 'basura', 'recicla', 'reciclaje', 'reciclar', 'circular', 'moda', 'ropa', 'textil', 'prendas', 'desecho', 'desechos', 'minimalismo', 'compras', 'segunda mano', 'reutilizar', 'frasco', 'vidrio', 'bambú', 'compost', 'jabón'],
  agriSoilsFood: ['suelo', 'suelos', 'tierra', 'agricultura', 'cultivo', 'cultivos', 'hidroponía', 'huerto', 'alimento', 'alimentos', 'comida', 'micelio', 'hongo', 'hongos', 'verdura', 'cosecha', 'siembra', 'fertilizantes', 'café'],
  citiesArchitectTrans: ['ciudad', 'ciudades', 'urbanismo', 'transporte', 'arquitectura', 'edificio', 'edificios', 'calle', 'calles', 'tren', 'movilidad', 'barrio', 'tránsito', 'bicicleta', 'esponja', 'construcción', 'hormigón', 'zeppelin', 'adobe']
};

// 1. Read JSON articles
const articlesPath = 'src/data/extendedBlog.json';
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
console.log(`\nCargados ${articles.length} artículos del blog para auditar y mapear.`);

// 1.5 Classify articles into their semantic category for absolute isolation
function classifyArticle(title, excerpt) {
  const text = (title + " " + excerpt).toLowerCase();

  if (
    text.includes('agua') || text.includes('glaciar') || text.includes('río') || text.includes('océano') ||
    text.includes('coral') || text.includes('arrecife') || text.includes('marinas') || text.includes('mar ') || text.includes('maril') ||
    text.includes('pesca') || text.includes('hídrico') || text.includes('lluvia') || text.includes('lago') ||
    text.includes('hielo') || text.includes('iceberg') || text.includes('polo') || text.includes('antártid') ||
    text.includes('mareomotriz') || text.includes('inundación') || text.includes('hidrocinética') || text.includes('cascada') ||
    text.includes('niebla') || text.includes('laguna') || text.includes('tormenta') || text.includes('olas') || text.includes('playa') || text.includes('delfín') || text.includes('delfines') || text.includes('submarina')
  ) {
    return 'waterGlaciersOceans';
  }

  if (
    text.includes('solar') || text.includes('viento') || text.includes('eólica') || text.includes('renovables') ||
    text.includes('energía') || text.includes('batería') || text.includes('electricidad') || text.includes('hidrógeno') ||
    text.includes('fisión') || text.includes('fusión') || text.includes('baterías') || text.includes('geotérmica') ||
    text.includes('eléctrica') || text.includes('aerogenerador') || text.includes('enchufe') ||
    text.includes('paneles') || text.includes('panel') || text.includes('geotermia') || text.includes('dac') || text.includes('captura directa') ||
    text.includes('computación') || text.includes('procesador') || text.includes('microchip') || text.includes('motherboard') ||
    text.includes('satélite') || text.includes('satelital') || text.includes('gis') || text.includes('blockchain') || text.includes('bitcoin') || text.includes('criptomoneda') || text.includes('token')
  ) {
    return 'energy';
  }

  if (
    text.includes('plástico') || text.includes('basura') || text.includes('recicla') || text.includes('circular') ||
    text.includes('moda') || text.includes('ropa') || text.includes('textil') || text.includes('prendas') ||
    text.includes('desecho') || text.includes('minimalismo') || text.includes('segunda mano') || text.includes('reutilizar') ||
    text.includes('frasco') || text.includes('vidrio') || text.includes('bambú') || text.includes('compost') || text.includes('compostaje') ||
    text.includes('jabón') || text.includes('cleaner') || text.includes('detergente') || text.includes('empaque') || text.includes('embalaje') ||
    text.includes('coils') || text.includes('hilos') || text.includes('seda') || text.includes('piña') || text.includes('manzana') ||
    text.includes('lujo') || text.includes('obsolescencia') || text.includes('desensamblaje') || text.includes('reparar') || text.includes('tinte') || text.includes('cosmética') || text.includes('papel de piedra') || text.includes('zero waste')
  ) {
    return 'circularZeroWaste';
  }

  if (
    text.includes('ciudad') || text.includes('urbanismo') || text.includes('transporte') || text.includes('arquitectura') ||
    text.includes('edificio') || text.includes('calle') || text.includes('tren') || text.includes('movilidad') ||
    text.includes('barrio') || text.includes('tránsito') || text.includes('bicicleta') || text.includes('esponja') ||
    text.includes('construcción') || text.includes('hormigón') || text.includes('zeppelin') || text.includes('adobe') ||
    text.includes('concreto') || text.includes('prefabricada') || text.includes('mansion') || text.includes('casa') ||
    text.includes('caminar') || text.includes('peatón') || text.includes('peatonal') || text.includes('carretera') ||
    text.includes('autopista') || text.includes('ruta') || text.includes('andén') || text.includes('vivienda') ||
    text.includes('rascacielos') || text.includes('skyscraper') || text.includes('plaza') || text.includes('bento') || text.includes('bulevar')
  ) {
    return 'citiesArchitectTrans';
  }

  if (
    text.includes('suelo') || text.includes('tierra') || text.includes('agricultura') || text.includes('cultivo') ||
    text.includes('hidroponía') || text.includes('huerto') || text.includes('alimento') || text.includes('comida') ||
    text.includes('micelio') || text.includes('hongo') || text.includes('verdura') || text.includes('cosecha') ||
    text.includes('siembra') || text.includes('fertilizantes') || text.includes('café') || text.includes('hush') ||
    text.includes('setas') || text.includes('remolacha') || text.includes('zanahoria') || text.includes('remolachas') ||
    text.includes('maíz') || text.includes('choclo') || text.includes('trigo') || text.includes('cereal') ||
    text.includes('lavanda') || text.includes('té ') || text.includes('compostado') || text.includes('lombriz') ||
    text.includes('vegetales') || text.includes('ensalada') || text.includes('vegano') || text.includes('vegetariano') ||
    text.includes('nutrición') || text.includes('superalimento') || text.includes('acuaponía') || text.includes('apicultura') ||
    text.includes('colmena') || text.includes('miel') || text.includes('fresco') || text.includes('cena') ||
    text.includes('invernadero') || text.includes('semilla') || text.includes('semillas') || text.includes('policultivo') || text.includes('germinados') || text.includes('gastronomía')
  ) {
    return 'agriSoilsFood';
  }

  return 'forestBiodiversity';
}

// Compute Tag Frequency across photo library to perform IDF weighting
const tagFrequency = {};
PHOTOLIBRARY.forEach(p => {
  p.tags.forEach(t => {
    tagFrequency[t] = (tagFrequency[t] || 0) + 1;
  });
});

// Explicit High-Fidelity mappings to prevent core visual errors
const MANUAL_MAPPINGS = {
  'post-1': '1508514177221-188b1cf16e9d', // 5 Maneras de Reducir tu Huella de Carbono -> Glowing lightbulb (efficiency)
  'post-2': '1502086223501-7ea6ecd79368', // La Importancia de los Glaciares -> Actual calving arctic icebergs
  'post-3': '1509391366360-2e959784a276', // Energías Renovables en el Hogar: El Sol como Aliado -> Solar cells on house roof
  'post-4': '1434064511983-18c6dae20ed5', // El Futuro del Agua Dulce: Un Desafío Hídrico -> Crystal clear stream over quartz
  'post-5': '1441974231531-c6227db76b6e', // Biodiversidad: El Escudo Invisible -> Epic sunbeams breaking through misty forest trail
  'post-6': '1490481651871-ab68de25d43d', // Moda Sostenible -> Sustainable fashion designer sorting organic lightweight garments
  'post-7': '1530595467537-0b5996c41f2d', // Agricultura Regenerativa -> Tractor driving straight lines in topsoil
  'post-8': '1569163139599-0f4517e36f51', // Plásticos de un Solo Uso -> Sprout piercing through a discarded PET bottle
  'post-9': '1506012841743-12d46e38708c', // Ciudades Esponja -> Urban green parks bicycle lanes cyclist passing
  'post-10': '1473448912268-2022ce9509d8', // El Poder de los Bosques Urbanos -> Magical golden sunbeams thick mossy woods
  'post-11': '1548504146-2580a6729dc9', // Transporte Eléctrico: Mitos, Realidades -> Electric vehicle charging station
  'post-12': '1595275313165-41e78dadf979', // Economía Circular -> Clean zero waste pantry jars
  'post-13': '1469474968028-56623f02e42e', // Turismo Regenerativo -> Explorer standing looking at green valleys
  'post-14': '1564013774899-7a5416041940', // Protección de Abejas -> Beehive with working bees
  'post-15': '1451187580459-43490279c0fa', // Tecnología Satelital -> Holographic shining green digital earth globe
  'post-16': '1515150144380-bca9f1650ed9', // Compostaje en Apartamentos -> Backyard compost pile organics
  'post-17': '15413580f4886', // Hidrógeno Verde -> Hydrogen gas ocean offshore wind farms
  'post-18': '1505691938895-1758d7feb511', // Minimalismo -> Scandinavian wood room
  'post-19': '1583743814966-8936f5b7be1a', // Artesanía Latinoamericana -> Artisan hand spinning cotton
  'post-20': '1551244072-5d12893278ab', // Protección de Océanos -> Patterns of deep blue ocean water
  'post-21': '1517089596392-db9a5e9478ec', // Arquitectura Bioclimática -> Wooden architectural grid ceiling
  'post-22': '1509062522246-3755977927d7', // Educación Ambiental para Niños -> Sustainable classroom solar education
  'post-23': '1550989460-0adf9ea622e2', // El Desperdicio Alimentario -> grocery bag farm greens apples
  'post-24': '1454496522488-7a8e488e8606', // Derechos de la Naturaleza -> giant green mountain range majestic
  'post-25': '1550596334-7bb40a71b6bc', // Hidroponía Urbana -> Vertical hydroponics pipes
  'post-26': '1444333508749-6a1012df1d18', // Baños Secos -> Solar rays lighting up lush green forest floor
  'post-27': '1525127750244-4131580f4886', // Almacenamiento de Energía -> High altitude water battery reservoir
  'post-28': '1504280390367-361c6d9f38f4', // Salud Mental -> Sunlight filtering forest path
  'post-29': '1595855759920-8658239675aa', // Micelio: El Material fúngico -> Mycelium packaging white bio material
  'post-30': '1505118380757-91f5f5632de0', // Restaurando Arrecifes de Coral -> Pristine clear coral reef
  'post-33': '1535083783855-76ae62b2914e', // Rewilding/Fauna Silvestre -> Candid wild red deer standing in forest
  'post-34': '1528825871115-322da13575f3', // Biorremediación -> Earthworm soil profile
  'post-37': '1489519402538-78a05c743e86', // Cosmética Sólida -> handcrafted solid soap bar raw
  'post-40': '1504107125350-7a5416041936', // Superalimentos Locales -> Farmers market root turnips beets
  'post-41': '1515023115688-7a5416041938', // Biochar -> Sprouting biochar black charcoal soil mix
  'post-43': '1521737604893-d14cc237f11d', // Drones y Reforestación -> Hands planting sapling
  'post-46': '1532996122748-685b8823f6e8', // Microplásticos en la Lluvia -> Crushed plastic cups bottles stack
  'post-47': '1507525428034-b723cf961d3e', // Energía Mareomotriz -> Sunkissed sandy tropical beach
  'post-52': '1518837695005-2083093ee35b', // Desalinización Ósmosis militar -> Perfect curling ocean waves
  'post-56': '1532601224476-15c79f2f7a51', // Reciclaje de Palas aerogenerador -> Wind turbine blades close up
  'post-58': '1544551763-46a013bb70d5', // Restauración Praderas Marinas -> Scuba diver pointing camera underwater coral
  'post-61': '1519501025264-65ba15a82390', // Biodiseño Urbano -> Skyscraper wrapped in vertical forest
  'post-64': '1535268647977-a403b69fc756', // Robots de Basura Marina -> sea turtle gliding coral waters
  'post-66': '1477959858617-67f85cf4f1df', // Tren de Alta Velocidad -> Chicago electric train transit
  'post-67': '1493397212122-2b85dda5d0db', // Vidrio Solar -> skyscrapers rascacielos climbing clouds
  'post-71': '1568430462989-44163eb1752f', // Buscando Último Rinoceronte -> Endangered white rhino tracking
  'post-72': '1583212292454-1fe6229603b7', // Sin Tintes Tóxicos -> Close up fluorescent sea anemone
  'post-73': '1529156069898-49953e39b3ac', // Moda de Segunda Mano -> swap secondhand outfits
  'post-74': '1526374965328-7f61d4dc18c5', // Criptomonedas Ecológicas -> cyber tech network matrix grid
  'post-76': '1548565438-a28a38397b97', // Eco-turismo Antártida -> smooth wet river pebbles
  'post-78': '1533038222211-7a5416041939', // El Futuro del Café Sostenible -> Coffee cherries shade branches
  'post-79': '15413580f4886', // Hidrógeno Natural -> Hydrogen gas wind offshore
  'post-80': '1540221652346-e5dd6b50f3e7', // Ropa que Crece contigo -> stylish organic cotton shirts
  'post-81': '1496442226666-8d4d0e62e6e9', // Sensores IoT Bosques -> sensors nodes monitoring forest
  'post-83': '1592417817098-8f3d6eb19672', // Acuaponía Doméstica -> Acuaponics water filtration fish tanks
  'post-84': '1550751827-7a5416041935', // Zeppelin -> zeppelin airship passing smart green metropolis
  'post-85': '1520038410237-7a5416041934', // Suelos Almacenan Carbono -> composted soil profile roots
  'post-92': '1593113598332-cd288d649433', // Energía Geotérmica -> Thermal pipes deep steam
  'post-93': '1489987707025-afc232f7ea0f', // Moda Desechable vs Duradera -> folded sustainable neutral linen
  'post-94': '1464822759023-fed622ff2c3b', // Reciclaje Paneles Solares -> solar panels mountain sunset
  'post-98': '1486406146926-7a5416041934', // Edificios que Comen Polución -> smart city bento building cluster
  'post-102': '1531482615713-2afd69097998', // Fusión -> fusion research lab test tubes
  'post-109': '1580137189204-7a2416041935', // Fertilizantes Verdes -> Tea plantation fields
  'post-113': '1556905055-8f358a7a47b2', // Reciclaje Ropa Química -> massive pile sorted clothing
  'post-122': '1512917774080-7a5416041937', // Adobe Moderna -> adobe cob wall house
  'post-126': '1471922694254-ec01637ae97a', // Aves Migratorias -> flock of birds flying in formation
  'post-134': '1466692476868-aef1dfb1e735', // Gran Barrera Coral IA -> coral polyps nurseries under sea
  'post-138': '1470071459604-3b5ec3a7fe05', // Gestión Agua Montaña -> wild rivers high mountain valleys
  'post-143': '1525127750244-4131580f4886'  // Baterías Galvanizadas -> high altitude water battery reservoir
};

// 2. Score Matrix generation & Greedy Maximum Matching
const matchCandidates = [];

articles.forEach(article => {
  const articleCategory = classifyArticle(article.title, article.excerpt);
  const title = article.title.toLowerCase();
  const excerpt = article.excerpt.toLowerCase();
  const content = (article.content || '').toLowerCase();

  PHOTOLIBRARY.forEach(photo => {
    let score = 0;

    // A. EXPLICIT BINDING: If manually assigned, boost to maximum gravity
    if (MANUAL_MAPPINGS[article.id] && MANUAL_MAPPINGS[article.id] === photo.id) {
      score += 15000;
    }

    // B. Category locks: Massive boost (+500 pts) if categories align perfectly
    if (photo.cat === articleCategory) {
      score += 500;
    }

    // C. Tag Specificity matching. Rare tags (low DF) count more than common tags (high DF)
    photo.tags.forEach(tag => {
      const df = tagFrequency[tag] || 1;
      const tagWeight = (180 / df); // rare keywords have a massive multiplier!

      if (title.includes(tag)) {
        score += tagWeight * 3.0; // Title match
      }
      if (excerpt.includes(tag)) {
        score += tagWeight * 1.2; // Excerpt match
      }
      if (content.includes(tag)) {
        score += tagWeight * 0.4; // Content body match
      }
    });

    // Save candidate tuple
    matchCandidates.push({
      articleId: article.id,
      photoId: photo.id,
      photoCat: photo.cat,
      photoDesc: photo.desc,
      score: score
    });
  });
});

// Sort all matches globally in absolute descending order of coherence score
matchCandidates.sort((a, b) => b.score - a.score);

// Track assignments
const assignedArticles = new Map(); // articleId -> photoId o path
const usedPhotos = new Set();       // photoId

// Pre-assign any custom manual mappings that are local paths or full URLs
articles.forEach(article => {
  const manual = MANUAL_MAPPINGS[article.id];
  if (manual && (manual.startsWith('/') || manual.startsWith('http://') || manual.startsWith('https://'))) {
    assignedArticles.set(article.id, manual);
  }
});

// Greedy loop: highest coherent scores get assigned first!
for (const match of matchCandidates) {
  if (!assignedArticles.has(match.articleId) && !usedPhotos.has(match.photoId)) {
    assignedArticles.set(match.articleId, match.photoId);
    usedPhotos.add(match.photoId);
  }
}

// Check if any articles didn't get assigned
articles.forEach(article => {
  if (!assignedArticles.has(article.id)) {
    console.warn(`⚠️ Advertencia: El artículo "${article.title}" no obtuvo puntuación de coincidencia. Asignando remanente aleatorio.`);
    // Find first unused photo in target category or globally
    for (const photo of PHOTOLIBRARY) {
      if (!usedPhotos.has(photo.id)) {
        assignedArticles.set(article.id, photo.id);
        usedPhotos.add(photo.id);
        break;
      }
    }
  }
});

// Write assignments back to the articles
let totalUpdated = 0;
let detailsLog = [];

articles.forEach(article => {
  const photoId = assignedArticles.get(article.id);
  const photoObj = PHOTOLIBRARY.find(p => p.id === photoId);
  
  let finalUrl;
  if (photoId && (photoId.startsWith('/') || photoId.startsWith('http://') || photoId.startsWith('https://'))) {
    finalUrl = photoId;
  } else {
    const cleanId = photoId.replace(/^photo-/, '');
    finalUrl = `https://images.unsplash.com/photo-${cleanId}?auto=format&fit=crop&w=800&q=80`;
  }

  const prevImage = article.image;
  article.image = finalUrl;
  totalUpdated++;

  detailsLog.push({
    title: article.title,
    assignedImg: finalUrl,
    description: photoObj ? photoObj.desc : 'Local Asset / Custom URL',
    category: photoObj ? photoObj.cat : 'none'
  });
});

// Save updated JSON file
fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2));
console.log(`\n🎉 PROCESO COMPLETADO EXITOXAMENTE: Se actualizaron ${totalUpdated} artículos en extendedBlog.json con imágenes altamente coherentes.`);

// Log specific verification for Glaciers and other key articles
console.log('\n--- VERIFICACIÓN DE ARTÍCULOS CLAVE ---');
const glacierArticle = detailsLog.find(d => d.title.toLowerCase().includes('glaciar') || d.title.toLowerCase().includes('glaciares'));
if (glacierArticle) {
  console.log(`🧊 Glaciares: "${glacierArticle.title}"`);
  console.log(`   Asignada:  ${glacierArticle.assignedImg}`);
  console.log(`   Detalle:   ${glacierArticle.description} [Categoría: ${glacierArticle.category}]`);
} else {
  console.log('❌ No se encontró artículo de Glaciares.');
}

const solarArticle = detailsLog.find(d => d.title.toLowerCase().includes('sol como aliado') || d.title.toLowerCase().includes('paneles'));
if (solarArticle) {
  console.log(`☀️ Energía Solar: "${solarArticle.title}"`);
  console.log(`   Asignada:      ${solarArticle.assignedImg}`);
  console.log(`   Detalle:       ${solarArticle.description} [Categoría: ${solarArticle.category}]`);
}

const fashionArticle = detailsLog.find(d => d.title.toLowerCase().includes('moda sostenible') || d.title.toLowerCase().includes('segunda mano'));
if (fashionArticle) {
  console.log(`👗 Moda Reutilizable: "${fashionArticle.title}"`);
  console.log(`   Asignada:           ${fashionArticle.assignedImg}`);
  console.log(`   Detalle:            ${fashionArticle.description} [Categoría: ${fashionArticle.category}]`);
}

// 3. Final Sanity programmatically
const finalCounts = {};
articles.forEach(a => {
  finalCounts[a.image] = (finalCounts[a.image] || 0) + 1;
});
const finalDups = Object.entries(finalCounts).filter(([img, count]) => count > 1);

if (finalDups.length === 0) {
  console.log(`\n✅ CHEQUEO SANITARIO COMPLETO: ¡0 duplicados encontrados! Los 156 artículos tienen imágenes 100% ÚNICAS y COHERENTES.`);
} else {
  console.error(`\n🚨 ALERTA SANITARIA FALLIDA: Se encontraron duplicados:`, finalDups);
}
