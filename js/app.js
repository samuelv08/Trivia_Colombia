/*
 * Trivia Colombia - Logica de la aplicacion
 *
 * Estructura:
 * 1. Preguntas y estado del juego
 * 2. Sonidos y utilidades de interfaz
 * 3. Persistencia y ranking
 * 4. Temporizador y flujo de preguntas
 * 5. Navegacion y eventos de pantalla
 */

(() => {
  'use strict';
  // ----- Selectores y banco de preguntas -----
  const $ = (sel, raiz = document) => raiz.querySelector(sel);
  const $$ = (sel, raiz = document) => Array.from(raiz.querySelectorAll(sel));

  // Cada pregunta tiene categoría, cuatro opciones, respuesta y explicación.
  const preguntas = [
    // Geografia
    {
      categoria: 'geografia',
      etiqueta: 'Geografía',
      icono: '🗺️',
      enunciado: '¿Cuál es la capital del departamento de Santander?',
      opciones: ['Cúcuta', 'San Gil', 'Bucaramanga', 'Barrancabermeja'],
      correcta: 'Bucaramanga',
      explicacion: 'Bucaramanga es la capital de Santander y se la conoce como la «Ciudad Bonita».'
    },
    {
      categoria: 'geografia',
      etiqueta: 'Geografía',
      icono: '🗺️',
      enunciado: '¿Cuál es la capital del departamento de Nariño?',
      opciones: ['Popayán', 'Pasto', 'Ipiales', 'Tumaco'],
      correcta: 'Pasto',
      explicacion: 'Pasto, también llamada San Juan de Pasto, es la capital de Nariño.'
    },
    {
      categoria: 'geografia',
      etiqueta: 'Geografía',
      icono: '🗺️',
      enunciado: '¿Qué río desemboca en el mar Caribe cerca de Barranquilla?',
      opciones: ['Río Cauca', 'Río Magdalena', 'Río Putumayo', 'Río Meta'],
      correcta: 'Río Magdalena',
      explicacion: 'El río Magdalena recorre gran parte del país y desemboca en el Caribe en Bocas de Ceniza, cerca de Barranquilla.'
    },
    {
      categoria: 'geografia',
      etiqueta: 'Geografía',
      icono: '🗺️',
      enunciado: '¿Cuál de estos países NO comparte frontera terrestre con Colombia?',
      opciones: ['Ecuador', 'Venezuela', 'Chile', 'Panamá'],
      correcta: 'Chile',
      explicacion: 'Colombia comparte fronteras terrestres con Panamá, Venezuela, Brasil, Perú y Ecuador.'
    },
    {
      categoria: 'geografia',
      etiqueta: 'Geografía',
      icono: '🗺️',
      enunciado: '¿En qué mar se encuentran las islas de San Andrés y Providencia?',
      opciones: ['Mar Caribe', 'Mar Mediterráneo', 'Mar de Cortés', 'Mar de Tasmania'],
      correcta: 'Mar Caribe',
      explicacion: 'El archipiélago de San Andrés, Providencia y Santa Catalina está en el mar Caribe.'
    },
    {
      categoria: 'geografia',
      etiqueta: 'Geografía',
      icono: '🗺️',
      enunciado: '¿Qué cordillera se levanta junto a la ciudad de Santa Marta?',
      opciones: ['Sierra Nevada de Santa Marta', 'Serranía del Baudó', 'Cordillera de la Costa', 'Sierra de la Macarena'],
      correcta: 'Sierra Nevada de Santa Marta',
      explicacion: 'La Sierra Nevada de Santa Marta es un macizo montañoso independiente junto a la costa Caribe.'
    },
    {
      categoria: 'geografia',
      etiqueta: 'Geografía',
      icono: '🗺️',
      enunciado: '¿Cuál es la capital del departamento del Meta?',
      opciones: ['Yopal', 'Villavicencio', 'Arauca', 'Florencia'],
      correcta: 'Villavicencio',
      explicacion: 'Villavicencio es la capital del Meta y una de las principales ciudades de los Llanos Orientales.'
    },
    {
      categoria: 'geografia',
      etiqueta: 'Geografía',
      icono: '🗺️',
      enunciado: '¿Cuál de estos departamentos tiene costa sobre el océano Pacífico?',
      opciones: ['Chocó', 'Huila', 'Meta', 'Boyacá'],
      correcta: 'Chocó',
      explicacion: 'El Chocó tiene costas tanto en el océano Pacífico como en el mar Caribe.'
    },
    {
      categoria: 'geografia',
      etiqueta: 'Geografía',
      icono: '🗺️',
      enunciado: '¿Cuál es la capital del departamento del Valle del Cauca?',
      opciones: ['Cali', 'Popayán', 'Pereira', 'Tuluá'],
      correcta: 'Cali',
      explicacion: 'Santiago de Cali es la capital del Valle del Cauca.'
    },
    {
      categoria: 'geografia',
      etiqueta: 'Geografía',
      icono: '🗺️',
      enunciado: '¿En qué departamento se encuentra el golfo de Urabá?',
      opciones: ['Antioquia', 'Cundinamarca', 'Tolima', 'Caldas'],
      correcta: 'Antioquia',
      explicacion: 'El golfo de Urabá está en el extremo noroccidental de Colombia, junto a la costa de Antioquia y el Chocó.'
    },

    // Historia
    {
      categoria: 'historia',
      etiqueta: 'Historia',
      icono: '🏛️',
      enunciado: '¿Qué acontecimiento se conmemora el 20 de julio en Colombia?',
      opciones: ['La Batalla de Boyacá', 'El Grito de Independencia', 'La Constitución de 1991', 'La separación de Panamá'],
      correcta: 'El Grito de Independencia',
      explicacion: 'El 20 de julio de 1810 ocurrió el movimiento conocido como el Grito de Independencia en Santafé.'
    },
    {
      categoria: 'historia',
      etiqueta: 'Historia',
      icono: '🏛️',
      enunciado: '¿En qué año tuvo lugar la Batalla de Boyacá?',
      opciones: ['1810', '1819', '1824', '1830'],
      correcta: '1819',
      explicacion: 'La Batalla de Boyacá se libró el 7 de agosto de 1819 y fue decisiva para la independencia.'
    },
    {
      categoria: 'historia',
      etiqueta: 'Historia',
      icono: '🏛️',
      enunciado: '¿Quién lideró la campaña libertadora que culminó en la Batalla de Boyacá?',
      opciones: ['Simón Bolívar', 'Francisco de Paula Santander', 'Antonio Nariño', 'José María Córdova'],
      correcta: 'Simón Bolívar',
      explicacion: 'Simón Bolívar lideró el ejército patriota en la campaña libertadora de Nueva Granada.'
    },
    {
      categoria: 'historia',
      etiqueta: 'Historia',
      icono: '🏛️',
      enunciado: '¿En qué año se promulgó la Constitución Política que rige actualmente a Colombia?',
      opciones: ['1886', '1957', '1991', '2001'],
      correcta: '1991',
      explicacion: 'La Constitución Política de Colombia fue promulgada el 4 de julio de 1991.'
    },
    {
      categoria: 'historia',
      etiqueta: 'Historia',
      icono: '🏛️',
      enunciado: '¿En qué año se separó Panamá de Colombia?',
      opciones: ['1821', '1886', '1903', '1914'],
      correcta: '1903',
      explicacion: 'Panamá declaró su separación de Colombia en noviembre de 1903.'
    },
    {
      categoria: 'historia',
      etiqueta: 'Historia',
      icono: '🏛️',
      enunciado: '¿Qué ciudad declaró su independencia de España en 1811, el 11 de noviembre?',
      opciones: ['Cartagena', 'Santa Marta', 'Cali', 'Tunja'],
      correcta: 'Cartagena',
      explicacion: 'Cartagena de Indias declaró su independencia absoluta el 11 de noviembre de 1811.'
    },
    {
      categoria: 'historia',
      etiqueta: 'Historia',
      icono: '🏛️',
      enunciado: '¿Quién fue Policarpa Salavarrieta, conocida como «La Pola»?',
      opciones: ['Una heroína de la Independencia', 'Una presidenta de la República', 'Una exploradora del Amazonas', 'Una escritora del siglo XX'],
      correcta: 'Una heroína de la Independencia',
      explicacion: 'Policarpa Salavarrieta apoyó la causa independentista y fue ejecutada en Santafé en 1817.'
    },
    {
      categoria: 'historia',
      etiqueta: 'Historia',
      icono: '🏛️',
      enunciado: '¿Qué país europeo gobernó el territorio colombiano durante la época colonial?',
      opciones: ['España', 'Portugal', 'Francia', 'Países Bajos'],
      correcta: 'España',
      explicacion: 'Durante la época colonial, el territorio hizo parte del Imperio español.'
    },
    {
      categoria: 'historia',
      etiqueta: 'Historia',
      icono: '🏛️',
      enunciado: '¿Cómo se llamó Bogotá durante gran parte del periodo colonial?',
      opciones: ['Santafé', 'Villa de Leyva', 'Nueva Córdoba', 'San Felipe'],
      correcta: 'Santafé',
      explicacion: 'La ciudad fue conocida como Santafé y fue capital del Nuevo Reino de Granada.'
    },
    {
      categoria: 'historia',
      etiqueta: 'Historia',
      icono: '🏛️',
      enunciado: '¿Cómo se llamó el país que se formó tras la disolución de la Gran Colombia?',
      opciones: ['República de la Nueva Granada', 'Confederación del Caribe', 'República del Ecuador', 'Virreinato del Perú'],
      correcta: 'República de la Nueva Granada',
      explicacion: 'Tras la disolución de la Gran Colombia, se estableció la República de la Nueva Granada.'
    },

    // Cultura y tradiciones
    {
      categoria: 'cultura',
      etiqueta: 'Cultura y Tradiciones',
      icono: '💃',
      enunciado: '¿En qué región colombiana se originó la cumbia?',
      opciones: ['Región Caribe', 'Región Amazónica', 'Región Orinoquía', 'Región Insular'],
      correcta: 'Región Caribe',
      explicacion: 'La cumbia se originó en la región Caribe colombiana, con aportes indígenas, africanos y europeos.'
    },
    {
      categoria: 'cultura',
      etiqueta: 'Cultura y Tradiciones',
      icono: '💃',
      enunciado: '¿En qué ciudad se celebra el Carnaval de Barranquilla?',
      opciones: ['Cartagena', 'Barranquilla', 'Santa Marta', 'Sincelejo'],
      correcta: 'Barranquilla',
      explicacion: 'El Carnaval de Barranquilla es una de las fiestas más representativas de Colombia y es Patrimonio Cultural Inmaterial de la Humanidad.'
    },
    {
      categoria: 'cultura',
      etiqueta: 'Cultura y Tradiciones',
      icono: '💃',
      enunciado: '¿Qué pueblo indígena es reconocido por elaborar el sombrero vueltiao?',
      opciones: ['Zenú', 'Wayuu', 'Nasa', 'Muisca'],
      correcta: 'Zenú',
      explicacion: 'El sombrero vueltiao es una artesanía tradicional del pueblo Zenú, tejida con caña flecha.'
    },
    {
      categoria: 'cultura',
      etiqueta: 'Cultura y Tradiciones',
      icono: '💃',
      enunciado: '¿Qué instrumento es característico del vallenato?',
      opciones: ['Acordeón', 'Bandoneón', 'Charango', 'Clarinete bajo'],
      correcta: 'Acordeón',
      explicacion: 'El acordeón es uno de los instrumentos centrales del vallenato, junto con la caja y la guacharaca.'
    },
    {
      categoria: 'cultura',
      etiqueta: 'Cultura y Tradiciones',
      icono: '💃',
      enunciado: '¿En qué ciudad se celebra cada año la Feria de las Flores?',
      opciones: ['Medellín', 'Manizales', 'Pereira', 'Armenia'],
      correcta: 'Medellín',
      explicacion: 'La Feria de las Flores es una celebración tradicional de Medellín, famosa por el desfile de silleteros.'
    },
    {
      categoria: 'cultura',
      etiqueta: 'Cultura y Tradiciones',
      icono: '💃',
      enunciado: '¿Qué celebración tradicional de Pasto incluye el desfile de carrozas del 6 de enero?',
      opciones: ['Carnaval de Negros y Blancos', 'Festival de la Leyenda Vallenata', 'Feria de Cali', 'Festival del Bambuco'],
      correcta: 'Carnaval de Negros y Blancos',
      explicacion: 'El Carnaval de Negros y Blancos se celebra en Pasto y culmina con su gran desfile de carrozas.'
    },
    {
      categoria: 'cultura',
      etiqueta: 'Cultura y Tradiciones',
      icono: '💃',
      enunciado: '¿En qué ciudad se realiza el Festival de la Leyenda Vallenata?',
      opciones: ['Valledupar', 'Montería', 'Riohacha', 'Sincelejo'],
      correcta: 'Valledupar',
      explicacion: 'El Festival de la Leyenda Vallenata se celebra en Valledupar, capital del Cesar.'
    },
    {
      categoria: 'cultura',
      etiqueta: 'Cultura y Tradiciones',
      icono: '💃',
      enunciado: '¿Qué ritmo y danza tradicional es protagonista del Festival del Bambuco en Neiva?',
      opciones: ['Bambuco', 'Joropo', 'Mapalé', 'Currulao'],
      correcta: 'Bambuco',
      explicacion: 'El Festival del Bambuco celebra esta expresión musical y dancística andina, especialmente ligada al Huila.'
    },
    {
      categoria: 'cultura',
      etiqueta: 'Cultura y Tradiciones',
      icono: '💃',
      enunciado: '¿Qué feria colombiana es famosa por sus desfiles de salsa en diciembre?',
      opciones: ['Feria de Cali', 'Feria de Manizales', 'Feria de las Flores', 'Feria de Bucaramanga'],
      correcta: 'Feria de Cali',
      explicacion: 'La Feria de Cali se celebra a finales de diciembre y es reconocida por sus eventos de salsa.'
    },
    {
      categoria: 'cultura',
      etiqueta: 'Cultura y Tradiciones',
      icono: '💃',
      enunciado: '¿En qué fecha se celebra tradicionalmente la Noche de las Velitas?',
      opciones: ['7 de diciembre', '20 de julio', '24 de junio', '31 de octubre'],
      correcta: '7 de diciembre',
      explicacion: 'La Noche de las Velitas se celebra el 7 de diciembre, víspera de la Inmaculada Concepción.'
    },

    // Deportes
    {
      categoria: 'deportes',
      etiqueta: 'Deportes',
      icono: '⚽',
      enunciado: '¿Cuál es el deporte nacional de Colombia?',
      opciones: ['Tejo', 'Fútbol', 'Ciclismo', 'Béisbol'],
      correcta: 'Tejo',
      explicacion: 'El tejo fue declarado deporte nacional de Colombia mediante la Ley 613 de 2000.'
    },
    {
      categoria: 'deportes',
      etiqueta: 'Deportes',
      icono: '⚽',
      enunciado: '¿En qué disciplina ganó Mariana Pajón sus medallas olímpicas?',
      opciones: ['BMX', 'Ciclismo de pista', 'Patinaje de velocidad', 'Atletismo'],
      correcta: 'BMX',
      explicacion: 'Mariana Pajón obtuvo medallas olímpicas en la modalidad de BMX racing.'
    },
    {
      categoria: 'deportes',
      etiqueta: 'Deportes',
      icono: '⚽',
      enunciado: '¿En qué año participó Colombia por primera vez en una Copa Mundial masculina de fútbol?',
      opciones: ['1958', '1962', '1970', '1990'],
      correcta: '1962',
      explicacion: 'La selección colombiana debutó en la Copa Mundial de la FIFA en Chile 1962.'
    },
    {
      categoria: 'deportes',
      etiqueta: 'Deportes',
      icono: '⚽',
      enunciado: '¿Qué colombiano ganó la Bota de Oro del Mundial de fútbol de 2014?',
      opciones: ['Radamel Falcao García', 'James Rodríguez', 'Juan Guillermo Cuadrado', 'Carlos Valderrama'],
      correcta: 'James Rodríguez',
      explicacion: 'James Rodríguez fue el máximo goleador del Mundial de Brasil 2014, con seis tantos.'
    },
    {
      categoria: 'deportes',
      etiqueta: 'Deportes',
      icono: '⚽',
      enunciado: '¿En qué prueba de atletismo destacó Caterine Ibargüen?',
      opciones: ['Salto triple', 'Salto con pértiga', 'Maratón', 'Lanzamiento de disco'],
      correcta: 'Salto triple',
      explicacion: 'Caterine Ibargüen fue campeona olímpica de salto triple en los Juegos de Río 2016.'
    },
    {
      categoria: 'deportes',
      etiqueta: 'Deportes',
      icono: '⚽',
      enunciado: '¿Quién fue el primer colombiano en ganar el Tour de Francia?',
      opciones: ['Egan Bernal', 'Nairo Quintana', 'Lucho Herrera', 'Rigoberto Urán'],
      correcta: 'Egan Bernal',
      explicacion: 'Egan Bernal ganó el Tour de Francia en 2019 y se convirtió en el primer colombiano en lograrlo.'
    },
    {
      categoria: 'deportes',
      etiqueta: 'Deportes',
      icono: '⚽',
      enunciado: '¿Qué ciclista colombiano ganó la Vuelta a España en 1987?',
      opciones: ['Lucho Herrera', 'Egan Bernal', 'Nairo Quintana', 'Fabio Parra'],
      correcta: 'Lucho Herrera',
      explicacion: 'Lucho Herrera ganó la Vuelta a España de 1987, convirtiéndose en el primer colombiano en conquistar una gran vuelta.'
    },
    {
      categoria: 'deportes',
      etiqueta: 'Deportes',
      icono: '⚽',
      enunciado: '¿Quién fue el primer colombiano en ganar una medalla olímpica?',
      opciones: ['Helmut Bellingrodt', 'Caterine Ibargüen', 'Mariana Pajón', 'Óscar Figueroa'],
      correcta: 'Helmut Bellingrodt',
      explicacion: 'El tirador Helmut Bellingrodt ganó plata en tiro al blanco en los Juegos Olímpicos de Múnich 1972.'
    },
    {
      categoria: 'deportes',
      etiqueta: 'Deportes',
      icono: '⚽',
      enunciado: '¿Cuál es el nombre de pila del boxeador conocido como «Kid Pambelé»?',
      opciones: ['Antonio Cervantes', 'Rodrigo Valdez', 'Miguel Lora', 'Óscar Rivas'],
      correcta: 'Antonio Cervantes',
      explicacion: 'Antonio Cervantes, «Kid Pambelé», fue campeón mundial de boxeo en la categoría wélter junior.'
    },
    {
      categoria: 'deportes',
      etiqueta: 'Deportes',
      icono: '⚽',
      enunciado: '¿A qué futbolista colombiano apodan «El Pibe»?',
      opciones: ['Carlos Valderrama', 'Freddy Rincón', 'Faustino Asprilla', 'Iván Córdoba'],
      correcta: 'Carlos Valderrama',
      explicacion: 'Carlos «El Pibe» Valderrama es uno de los futbolistas colombianos más reconocidos.'
    },

    // Ciencia y naturaleza
    {
      categoria: 'naturaleza',
      etiqueta: 'Ciencia y Naturaleza',
      icono: '🦜',
      enunciado: '¿Cuál es el ave nacional de Colombia?',
      opciones: ['Cóndor de los Andes', 'Guacamaya roja', 'Águila harpía', 'Tucán del Caribe'],
      correcta: 'Cóndor de los Andes',
      explicacion: 'El cóndor de los Andes es el ave nacional y aparece en el escudo de Colombia.'
    },
    {
      categoria: 'naturaleza',
      etiqueta: 'Ciencia y Naturaleza',
      icono: '🦜',
      enunciado: '¿Cuál es la flor nacional de Colombia?',
      opciones: ['Cattleya trianae', 'Girasol silvestre', 'Flor de mayo', 'Victoria amazónica'],
      correcta: 'Cattleya trianae',
      explicacion: 'La orquídea Cattleya trianae, conocida como flor de mayo, es la flor nacional de Colombia.'
    },
    {
      categoria: 'naturaleza',
      etiqueta: 'Ciencia y Naturaleza',
      icono: '🦜',
      enunciado: '¿En qué departamento se encuentra Caño Cristales?',
      opciones: ['Meta', 'Casanare', 'Guaviare', 'Vichada'],
      correcta: 'Meta',
      explicacion: 'Caño Cristales está en la Serranía de la Macarena, en el departamento del Meta.'
    },
    {
      categoria: 'naturaleza',
      etiqueta: 'Ciencia y Naturaleza',
      icono: '🦜',
      enunciado: '¿Cuál es el árbol nacional de Colombia?',
      opciones: ['Palma de cera del Quindío', 'Ceiba barrigona', 'Roble andino', 'Guayacán amarillo'],
      correcta: 'Palma de cera del Quindío',
      explicacion: 'La palma de cera del Quindío es el árbol nacional y puede crecer en los bosques andinos.'
    },
    {
      categoria: 'naturaleza',
      etiqueta: 'Ciencia y Naturaleza',
      icono: '🦜',
      enunciado: '¿En qué dos grandes cuencas habita el delfín rosado de río en Colombia?',
      opciones: ['Amazonas y Orinoco', 'Magdalena y Cauca', 'Sinú y Atrato', 'Patía y San Juan'],
      correcta: 'Amazonas y Orinoco',
      explicacion: 'El delfín rosado de río habita en las cuencas del Amazonas y del Orinoco.'
    },
    {
      categoria: 'naturaleza',
      etiqueta: 'Ciencia y Naturaleza',
      icono: '🦜',
      enunciado: '¿Qué ecosistema de alta montaña protege el Parque Nacional Natural Chingaza?',
      opciones: ['Páramo', 'Manglar', 'Sabana inundable', 'Desierto tropical'],
      correcta: 'Páramo',
      explicacion: 'Chingaza protege páramos y bosques altoandinos fundamentales para el abastecimiento de agua.'
    },
    {
      categoria: 'naturaleza',
      etiqueta: 'Ciencia y Naturaleza',
      icono: '🦜',
      enunciado: '¿En qué departamento se encuentra el desierto de la Tatacoa?',
      opciones: ['Huila', 'La Guajira', 'Cesar', 'Tolima'],
      correcta: 'Huila',
      explicacion: 'El desierto de la Tatacoa está en el departamento del Huila, cerca del municipio de Villavieja.'
    },
    {
      categoria: 'naturaleza',
      etiqueta: 'Ciencia y Naturaleza',
      icono: '🦜',
      enunciado: '¿En qué región colombiana se pueden observar ballenas jorobadas que llegan desde el Pacífico?',
      opciones: ['Costa Pacífica', 'Desierto de la Guajira', 'Llanos Orientales', 'Valle del Magdalena'],
      correcta: 'Costa Pacífica',
      explicacion: 'Las ballenas jorobadas migran a las aguas cálidas del Pacífico colombiano para reproducirse y tener sus crías.'
    },
    {
      categoria: 'naturaleza',
      etiqueta: 'Ciencia y Naturaleza',
      icono: '🦜',
      enunciado: '¿En qué océano está el Santuario de Fauna y Flora Malpelo?',
      opciones: ['Océano Pacífico', 'Océano Atlántico', 'Océano Índico', 'Océano Ártico'],
      correcta: 'Océano Pacífico',
      explicacion: 'Malpelo es una isla oceánica colombiana ubicada en el Pacífico y protegida como santuario natural.'
    },
    {
      categoria: 'naturaleza',
      etiqueta: 'Ciencia y Naturaleza',
      icono: '🦜',
      enunciado: '¿En qué ecosistema crecen los frailejones?',
      opciones: ['Páramo', 'Manglar', 'Bosque seco tropical', 'Arrecife coralino'],
      correcta: 'Páramo',
      explicacion: 'Los frailejones son plantas emblemáticas de los páramos andinos.'
    },
  ];

  // ----- Estado y constantes de la partida -----
  const opciones = $$('.opcion');
  const contenedorOpciones = $('#opciones');
  const btnCincuenta = $('#btn-cincuenta');
  const btnTiempo = $('#btn-tiempo');
  const bloqueRetro = $('#retro-contenido');
  const banner = $('#banner-retro');
  const temporizador = $('#temporizador');
  const TIEMPO_PREGUNTA = 20;
  const TOTAL_PREGUNTAS = 10;
  const CLAVE_PARTIDAS = 'trivia-colombia-partidas';
  const formatoPuntaje = new Intl.NumberFormat('es-CO');
  let respuestaCorrecta = 2;
  let preguntaActual = null;
  let preguntasDisponibles = [];
  let numeroPregunta = 1;
  let aciertos = 0;
  let respuestasFallidas = [];
  let segundosRestantes = TIEMPO_PREGUNTA;
  let limiteTemporizador = TIEMPO_PREGUNTA;
  let finTemporizador = 0;
  let intervaloTemporizador = null;
  let comodinTiempoUsado = false;
  let comodin5050Usado = false;
  let puntajePartida = 0;
  let rachaActual = 0;
  let mejorRacha = 0;
  let inicioPartida = 0;
  let resultadoGuardado = false;
  let avisoTimeout = null;
  let contextoAudio = null;

  // ----- Sonidos sintetizados con Web Audio -----
  function emitirTono(contexto, frecuencia, inicio, duracion, volumen = 0.08) {
    const oscilador = contexto.createOscillator();
    const ganancia = contexto.createGain();
    const tiempoInicio = contexto.currentTime + inicio;
    oscilador.type = 'sine';
    oscilador.frequency.setValueAtTime(frecuencia, tiempoInicio);
    ganancia.gain.setValueAtTime(0.0001, tiempoInicio);
    ganancia.gain.exponentialRampToValueAtTime(volumen, tiempoInicio + 0.015);
    ganancia.gain.exponentialRampToValueAtTime(0.0001, tiempoInicio + duracion);
    oscilador.connect(ganancia);
    ganancia.connect(contexto.destination);
    oscilador.start(tiempoInicio);
    oscilador.stop(tiempoInicio + duracion);
  }

  function reproducirPatron(contexto, tipo) {
    const patrones = {
      correcto: [[523, 0, 0.16], [659, 0.13, 0.22], [784, 0.29, 0.32]],
      incorrecto: [[330, 0, 0.2], [247, 0.19, 0.3]],
      tiempo: [[440, 0, 0.13], [349, 0.15, 0.13], [262, 0.3, 0.32]],
      comodin: [[659, 0, 0.12], [880, 0.1, 0.2]],
      activar: [[587, 0, 0.1], [784, 0.09, 0.18]],
      continuar: [[440, 0, 0.08]]
    };
    patrones[tipo].forEach(([frecuencia, inicio, duracion]) => {
      emitirTono(contexto, frecuencia, inicio, duracion, tipo === 'activar' ? 0.04 : 0.07);
    });
  }

  function reproducirSonido(tipo) {
    if ($('#btn-sonido').getAttribute('aria-pressed') !== 'true') return;
    const AudioContexto = window.AudioContext;
    if (!AudioContexto) {
      mostrarAviso('El navegador no admite la reproducción de sonidos.');
      return;
    }
    if (!contextoAudio) contextoAudio = new AudioContexto();
    if (contextoAudio.state === 'suspended') {
      contextoAudio.resume()
        .then(() => {
          if ($('#btn-sonido').getAttribute('aria-pressed') === 'true') reproducirPatron(contextoAudio, tipo);
        })
        .catch((error) => {
          console.error('No se pudo activar el audio de la trivia.', error);
          mostrarAviso('No se pudo activar el audio. Revisa los permisos de sonido del navegador.');
        });
      return;
    }
    reproducirPatron(contextoAudio, tipo);
  }

  // ----- Persistencia del ranking y estadísticas -----
  function mostrarAviso(mensaje) {
    const aviso = $('#aviso-global');
    aviso.textContent = mensaje;
    clearTimeout(avisoTimeout);
    avisoTimeout = setTimeout(() => { aviso.textContent = ''; }, 5000);
  }

  function leerPartidas() {
    let guardado;
    try {
      guardado = localStorage.getItem(CLAVE_PARTIDAS);
    } catch (error) {
      console.error('No se pudo leer el ranking guardado.', error);
      mostrarAviso('No se pudo leer el ranking guardado en este navegador.');
      return null;
    }
    if (guardado === null) return [];

    let partidas;
    try {
      partidas = JSON.parse(guardado);
    } catch (error) {
      console.error('El ranking guardado no contiene datos válidos.', error);
      mostrarAviso('El ranking guardado está dañado y no se pudo cargar.');
      return null;
    }
    if (!Array.isArray(partidas) || !partidas.every((partida) =>
      partida && typeof partida.id === 'string' &&
      typeof partida.nombre === 'string' &&
      Number.isFinite(partida.puntaje) &&
      typeof partida.categoria === 'string' &&
      typeof partida.dificultad === 'string' &&
      typeof partida.fecha === 'string' &&
      Number.isInteger(partida.aciertos) &&
      Number.isInteger(partida.total)
    )) {
      console.error('El ranking guardado tiene un formato inválido.');
      mostrarAviso('El ranking guardado tiene un formato inválido y no se pudo cargar.');
      return null;
    }
    return partidas;
  }

  function obtenerPuntajesOrdenados(partidas) {
    return [...partidas].sort((a, b) => b.puntaje - a.puntaje || b.fecha.localeCompare(a.fecha));
  }

  function actualizarRanking(idPartida = null) {
    const partidas = leerPartidas();
    if (partidas === null) return null;
    const ordenadas = obtenerPuntajesOrdenados(partidas);
    const top = ordenadas.slice(0, 10);
    const filas = $('#ranking-filas');
    filas.replaceChildren();
    top.forEach((partida, indice) => {
      const fila = document.createElement('tr');
      const posicion = document.createElement('td');
      posicion.className = 'tabla-ranking__pos';
      const medalla = document.createElement('span');
      medalla.setAttribute('aria-hidden', 'true');
      medalla.textContent = ['🥇', '🥈', '🥉'][indice] || '';
      const numero = document.createElement('span');
      numero.className = 'tabla-ranking__num';
      numero.textContent = indice + 1;
      posicion.append(medalla, ' ', numero);

      const nombre = document.createElement('td');
      nombre.className = 'tabla-ranking__nombre';
      nombre.textContent = partida.nombre;
      const puntaje = document.createElement('td');
      puntaje.className = 'tabla-ranking__puntaje';
      puntaje.textContent = formatoPuntaje.format(partida.puntaje);
      const categoria = document.createElement('td');
      categoria.className = 'tabla-ranking__cat';
      categoria.append(document.createTextNode(partida.categoria + ' '));
      const dificultad = document.createElement('span');
      dificultad.className = 'tabla-ranking__dif';
      dificultad.textContent = partida.dificultad;
      categoria.append(dificultad);
      const fecha = document.createElement('td');
      fecha.className = 'tabla-ranking__fecha';
      fecha.textContent = new Intl.DateTimeFormat('es-CO').format(new Date(partida.fecha));
      fila.append(posicion, nombre, puntaje, categoria, fecha);
      filas.append(fila);
    });

    $('#ranking-contenido').hidden = top.length === 0;
    $('#ranking-vacio').hidden = top.length > 0;
    $('#stat-partidas').textContent = partidas.length;
    const totalRespuestas = partidas.reduce((total, partida) => total + partida.total, 0);
    const totalAciertos = partidas.reduce((total, partida) => total + partida.aciertos, 0);
    $('#stat-aciertos').textContent = (totalRespuestas ? Math.round(totalAciertos / totalRespuestas * 100) : 0) + ' %';
    const mejorPartida = ordenadas[0];
    $('#stat-mejor').textContent = formatoPuntaje.format(mejorPartida ? mejorPartida.puntaje : 0);
    $('#stat-categoria').textContent = mejorPartida ? mejorPartida.categoria : '—';
    return idPartida ? top.findIndex((partida) => partida.id === idPartida) + 1 || null : null;
  }

  function guardarResultado() {
    if (resultadoGuardado) return null;
    const partidas = leerPartidas();
    if (partidas === null) return null;
    const categorias = {
      todas: 'Todas',
      geografia: 'Geografía',
      historia: 'Historia',
      cultura: 'Cultura y Tradiciones',
      deportes: 'Deportes',
      naturaleza: 'Ciencia y Naturaleza'
    };
    const dificultades = { facil: 'Fácil', medio: 'Medio', dificil: 'Difícil' };
    const partida = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      nombre: $('#config-nombre').textContent,
      puntaje: puntajePartida,
      categoria: categorias[$('input[name="categoria"]:checked').value],
      dificultad: dificultades[$('input[name="dificultad"]:checked').value],
      fecha: new Date().toISOString(),
      aciertos,
      total: TOTAL_PREGUNTAS
    };
    try {
      partidas.push(partida);
      localStorage.setItem(CLAVE_PARTIDAS, JSON.stringify(partidas));
    } catch (error) {
      console.error('No se pudo guardar el puntaje de la partida.', error);
      mostrarAviso('No se pudo guardar tu puntaje en el ranking.');
      return null;
    }
    resultadoGuardado = true;
    return actualizarRanking(partida.id);
  }

  // ----- Flujo de preguntas y temporizador -----
  function barajar(elementos) {
    const resultado = [...elementos];
    for (let i = resultado.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [resultado[i], resultado[j]] = [resultado[j], resultado[i]];
    }
    return resultado;
  }

  function reiniciarJuego() {
    detenerTemporizador();
    contenedorOpciones.classList.remove('opciones--respondida');
    opciones.forEach((o) => { o.className = 'opcion'; o.disabled = false; });
    btnCincuenta.disabled = false;
    btnTiempo.disabled = comodinTiempoUsado;
    bloqueRetro.hidden = true;
  }

  function actualizarProgreso() {
    $('#num-pregunta').textContent = numeroPregunta;
    $('#total-preguntas').textContent = TOTAL_PREGUNTAS;
    const barraProgreso = $('#barra-progreso');
    barraProgreso.setAttribute('aria-valuemax', TOTAL_PREGUNTAS);
    barraProgreso.setAttribute('aria-valuenow', numeroPregunta);
    barraProgreso.setAttribute('aria-valuetext', 'Pregunta ' + numeroPregunta + ' de ' + TOTAL_PREGUNTAS);
    $('.barra__relleno', barraProgreso).style.setProperty('--avance', (numeroPregunta / TOTAL_PREGUNTAS * 100) + '%');
    $('#btn-siguiente').textContent = numeroPregunta === TOTAL_PREGUNTAS ? 'Ver resultados' : 'Siguiente';
  }

  function detenerTemporizador() {
    if (intervaloTemporizador !== null) {
      clearInterval(intervaloTemporizador);
      intervaloTemporizador = null;
    }
  }

  function actualizarTemporizador() {
    segundosRestantes = Math.max(0, Math.ceil((finTemporizador - Date.now()) / 1000));
    $('#segundos').textContent = segundosRestantes;
    $('#barra-tiempo').style.setProperty('--avance', (segundosRestantes / limiteTemporizador * 100) + '%');
    temporizador.classList.toggle('temporizador--urgente', segundosRestantes <= 5 && segundosRestantes > 0);

    if ([10, 5, 0].includes(segundosRestantes)) {
      $('#anuncio-tiempo').textContent = segundosRestantes === 0
        ? 'Se acabó el tiempo'
        : 'Quedan ' + segundosRestantes + ' segundos';
    }
    if (segundosRestantes === 0) responder(null, true);
  }

  function iniciarTemporizador() {
    detenerTemporizador();
    segundosRestantes = TIEMPO_PREGUNTA;
    limiteTemporizador = TIEMPO_PREGUNTA;
    finTemporizador = Date.now() + segundosRestantes * 1000;
    $('#anuncio-tiempo').textContent = '';
    actualizarTemporizador();
    intervaloTemporizador = setInterval(actualizarTemporizador, 200);
  }

  function cargarPreguntaAleatoria() {
    const categoria = $('input[name="categoria"]:checked').value;
    const disponibles = preguntas.filter((pregunta) => categoria === 'todas' || pregunta.categoria === categoria);
    if (preguntasDisponibles.length === 0) {
      const restantes = disponibles.filter((pregunta) => pregunta !== preguntaActual);
      preguntasDisponibles = barajar(restantes.length ? restantes : disponibles);
    }

    preguntaActual = preguntasDisponibles.pop();
    const opcionesMezcladas = barajar(preguntaActual.opciones);
    respuestaCorrecta = opcionesMezcladas.indexOf(preguntaActual.correcta);
    $('#enunciado').textContent = preguntaActual.enunciado;
    $('#chip-categoria').innerHTML = '<span aria-hidden="true">' + preguntaActual.icono + '</span> ' + preguntaActual.etiqueta;
    $('#retro-explicacion').textContent = preguntaActual.explicacion;
    opciones.forEach((opcion, indice) => {
      $('.opcion__texto', opcion).textContent = opcionesMezcladas[indice];
    });
    actualizarProgreso();
    reiniciarJuego();
    iniciarTemporizador();
  }

  // ----- Respuestas, puntuación y resultados -----
  function responder(indice, tiempoAgotado = false) {
    if (bloqueRetro.hidden === false) return;
    detenerTemporizador();
    const acerto = !tiempoAgotado && indice === respuestaCorrecta;
    let puntosPregunta = 0;
    if (acerto) {
      aciertos += 1;
      rachaActual += 1;
      mejorRacha = Math.max(mejorRacha, rachaActual);
      const multiplicadores = { facil: 1, medio: 1.5, dificil: 2 };
      const puntosBase = 100 + Math.min(100, segundosRestantes * 5) + (rachaActual % 3 === 0 ? 50 : 0);
      puntosPregunta = Math.round(puntosBase * multiplicadores[$('input[name="dificultad"]:checked').value]);
      puntajePartida = Math.max(0, puntajePartida + puntosPregunta);
    } else {
      rachaActual = 0;
      respuestasFallidas.push({
        enunciado: preguntaActual.enunciado,
        respuesta: tiempoAgotado ? 'Sin respuesta' : $('.opcion__texto', opciones[indice]).textContent,
        correcta: preguntaActual.correcta,
        explicacion: preguntaActual.explicacion
      });
    }
    $('#puntaje-actual').textContent = formatoPuntaje.format(puntajePartida);
    contenedorOpciones.classList.add('opciones--respondida');
    opciones.forEach((o) => { o.disabled = true; });
    btnCincuenta.disabled = true;
    btnTiempo.disabled = true;
    opciones[respuestaCorrecta].classList.add('opcion--correcta');
    if (!acerto && !tiempoAgotado) opciones[indice].classList.add('opcion--incorrecta');

    banner.className = 'banner ' + (acerto ? 'banner--acierto' : tiempoAgotado ? 'banner--tiempo' : 'banner--error');
    $('#retro-icono').textContent = acerto ? '✓' : tiempoAgotado ? '⏱' : '✗';
    $('#retro-titulo').textContent = acerto
      ? '¡Correcto! +' + formatoPuntaje.format(puntosPregunta) + ' pts'
      : tiempoAgotado
        ? 'Se acabó el tiempo. La respuesta correcta era la opción ' + String.fromCharCode(65 + respuestaCorrecta)
        : 'Incorrecto. La respuesta correcta era la opción ' + String.fromCharCode(65 + respuestaCorrecta);
    $('#retro-detalle').textContent = acerto
      ? 'Puntaje acumulado: ' + formatoPuntaje.format(puntajePartida) + ' pts'
      : 'Esta pregunta suma 0 puntos y se reinicia tu racha';
    bloqueRetro.hidden = false;
    reproducirSonido(acerto ? 'correcto' : tiempoAgotado ? 'tiempo' : 'incorrecto');
    banner.focus();
  }

  function crearElementoRevision(respuesta) {
    const detalle = document.createElement('details');
    detalle.className = 'revision__item';

    const pregunta = document.createElement('summary');
    pregunta.textContent = respuesta.enunciado;

    const cuerpo = document.createElement('div');
    cuerpo.className = 'revision__cuerpo';

    const respuestaUsuario = document.createElement('p');
    respuestaUsuario.className = 'revision__linea revision__linea--mal';
    respuestaUsuario.textContent = '✗ Tu respuesta: ' + respuesta.respuesta;

    const respuestaCorrectaTexto = document.createElement('p');
    respuestaCorrectaTexto.className = 'revision__linea revision__linea--ok';
    respuestaCorrectaTexto.textContent = '✓ Respuesta correcta: ' + respuesta.correcta;

    const explicacion = document.createElement('p');
    explicacion.className = 'revision__explicacion';
    explicacion.textContent = respuesta.explicacion;

    cuerpo.append(respuestaUsuario, respuestaCorrectaTexto, explicacion);
    detalle.append(pregunta, cuerpo);
    return detalle;
  }

  function mostrarResultado() {
    $('#resultado-nombre').textContent = $('#config-nombre').textContent;
    $('#resultado-aciertos').textContent = aciertos + '/' + TOTAL_PREGUNTAS;
    $('#resultado-precision').textContent = Math.round(aciertos / TOTAL_PREGUNTAS * 100) + ' %';
    $('#resultado-puntaje').textContent = formatoPuntaje.format(puntajePartida);
    $('#resultado-racha').textContent = mejorRacha;

    const segundosPartida = Math.floor((Date.now() - inicioPartida) / 1000);
    const minutos = String(Math.floor(segundosPartida / 60)).padStart(2, '0');
    const segundos = String(segundosPartida % 60).padStart(2, '0');
    $('#resultado-tiempo').textContent = minutos + ':' + segundos;

    const listaRevision = $('#revision-lista');
    listaRevision.replaceChildren(...respuestasFallidas.map(crearElementoRevision));
    $('#revision-vacia').hidden = respuestasFallidas.length > 0;

    const puesto = guardarResultado();
    $('#resultado-ranking').textContent = puesto
      ? '🏆 Ocupaste el puesto #' + puesto + ' del ranking.'
      : 'Tu partida terminó. Revisa el ranking para ver los mejores puntajes.';
    mostrar('resultado');
  }

  // ----- Eventos de juego y comodines -----
  opciones.forEach((o, i) => o.addEventListener('click', () => responder(i)));
  $('#btn-siguiente').addEventListener('click', () => {
    if (bloqueRetro.hidden) return;
    reproducirSonido('continuar');
    if (numeroPregunta === TOTAL_PREGUNTAS) {
      mostrarResultado();
      return;
    }
    numeroPregunta += 1;
    cargarPreguntaAleatoria();
    $('#enunciado').scrollIntoView();
  });

  btnCincuenta.addEventListener('click', () => {
    if (comodin5050Usado || !bloqueRetro.hidden) return;
    // Elimina 2 opciones incorrectas al azar y deshabilita el comodín
    barajar(opciones.filter((_, i) => i !== respuestaCorrecta))
      .slice(0, 2)
      .forEach((o) => { o.classList.add('opcion--eliminada'); o.disabled = true; });
    comodin5050Usado = true;
    puntajePartida = Math.max(0, puntajePartida - 30);
    $('#puntaje-actual').textContent = formatoPuntaje.format(puntajePartida);
    btnCincuenta.disabled = true;
    reproducirSonido('comodin');
  });
  btnTiempo.addEventListener('click', () => {
    if (comodinTiempoUsado || segundosRestantes === 0 || !bloqueRetro.hidden) return;
    comodinTiempoUsado = true;
    puntajePartida = Math.max(0, puntajePartida - 30);
    $('#puntaje-actual').textContent = formatoPuntaje.format(puntajePartida);
    finTemporizador += 10 * 1000;
    limiteTemporizador += 10;
    btnTiempo.disabled = true;
    actualizarTemporizador();
    reproducirSonido('comodin');
  });

  // ----- Navegación y configuración del jugador -----
  function mostrar(nombre, enfocar = true) {
    const destino = $('#pantalla-' + nombre);
    if (!destino) return;
    $$('.pantalla').forEach((p) => { p.hidden = p !== destino; });
    if (nombre === 'juego') {
      preguntasDisponibles = [];
      preguntaActual = null;
      numeroPregunta = 1;
      aciertos = 0;
      respuestasFallidas = [];
      puntajePartida = 0;
      rachaActual = 0;
      mejorRacha = 0;
      comodin5050Usado = false;
      comodinTiempoUsado = false;
      resultadoGuardado = false;
      inicioPartida = Date.now();
      $('#puntaje-actual').textContent = '0';
      cargarPreguntaAleatoria();
    }
    if (nombre === 'ranking') actualizarRanking();
    if (enfocar) { $('h1', destino).focus(); window.scrollTo(0, 0); }
  }
  $$('[data-ir]').forEach((el) => el.addEventListener('click', () => mostrar(el.dataset.ir)));

  const campo = $('#campo-nombre');
  const error = $('#error-nombre');
  $('#form-nombre').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = campo.value.trim();
    if (!nombre) {
      campo.setAttribute('aria-invalid', 'true');
      error.textContent = 'Escribe tu nombre para empezar a jugar';
      campo.focus();
      return;
    }
    $('#config-nombre').textContent = nombre;
    mostrar('configuracion');
  });
  campo.addEventListener('input', () => { campo.removeAttribute('aria-invalid'); error.textContent = ''; });

  // ----- Preferencias de sonido y tema -----
  $('#btn-sonido').addEventListener('click', (e) => {
    const b = e.currentTarget;
    const activado = b.getAttribute('aria-pressed') !== 'true';
    b.setAttribute('aria-pressed', String(activado));
    b.setAttribute('aria-label', activado ? 'Desactivar sonido' : 'Activar sonido');
    b.title = activado ? 'Desactivar los sonidos del juego' : 'Activar los sonidos del juego';
    if (activado) reproducirSonido('activar');
  });
  $('#btn-tema').addEventListener('click', (e) => {
    const oscuro = document.documentElement.dataset.tema !== 'oscuro';
    document.documentElement.dataset.tema = oscuro ? 'oscuro' : 'claro';
    e.currentTarget.setAttribute('aria-pressed', String(oscuro));
  });

  // ----- Confirmación para borrar el historial -----
  const modal = $('#modal-borrar');
  $('#btn-borrar').addEventListener('click', () => { modal.returnValue = ''; modal.showModal(); });
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.close('cancelar'); });
  modal.addEventListener('close', () => {
    if (modal.returnValue !== 'confirmar') return;
    try {
      localStorage.removeItem(CLAVE_PARTIDAS);
    } catch (error) {
      console.error('No se pudo borrar el ranking guardado.', error);
      mostrarAviso('No se pudo borrar el ranking guardado.');
      return;
    }
    actualizarRanking();
    mostrarAviso('Ranking borrado');
  });

  // ----- Inicio -----
  actualizarRanking();
  mostrar(location.hash.replace('#pantalla-', '') || 'inicio', false);
})();
