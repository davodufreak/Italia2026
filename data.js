// ═══════════════════════════════════════════════════════════
// ✏️  DATOS DEL VIAJE — Edita este archivo cuando confirmes
//     reservas, hospedajes, traslados o entradas.
//
//     Campos con valor null = pendiente de confirmar.
//     status: "confirmed" | "pending" | "unavailable"
// ═══════════════════════════════════════════════════════════

const DATA = {

  // ── Meta ──────────────────────────────────────────────────
  meta: {
    traveler:  "David",
    departure: "2026-09-18",
    return:    "2026-10-01",
  },

  // ── Ciudades ──────────────────────────────────────────────
  // photo:   URL opcional de una foto editorial del destino (se usa en el
  //          hero de "Próxima parada" del Resumen). Si es null, se muestra
  //          un fondo de cristal degradado con el emoji de la ciudad.
  // climate: nota de referencia sobre el clima habitual en esas fechas
  //          (no es un pronóstico en vivo).
  cities: [
    { id: "zurich",       name: "Zúrich",       country: "Suiza",  emoji: "🏔️", color: "var(--zurich)",       nights: 2, dates: "18–19 sep", photo: "img/zurich.jpg", climate: "12–20°C · otoño fresco, lleva capas" },
    { id: "milan",        name: "Milán",         country: "Italia", emoji: "🏛️", color: "var(--milan)",        nights: 1, dates: "20 sep",    photo: "img/milan.jpg", climate: "15–24°C · templado, posible lluvia breve" },
    { id: "venecia",      name: "Venecia",       country: "Italia", emoji: "🚤", color: "var(--venecia)",      nights: 2, dates: "21–22 sep", photo: "img/venecia.jpg", climate: "16–24°C · húmedo, buen calzado para adoquines" },
    { id: "florencia",    name: "Florencia",     country: "Italia", emoji: "🎨", color: "var(--florencia)",    nights: 2, dates: "23–24 sep", photo: "img/florencia.jpg", climate: "16–26°C · soleado, tardes cálidas" },
    { id: "cinque_terre", name: "Cinque Terre",  country: "Italia", emoji: "🌊", color: "var(--cinque_terre)", nights: 2, dates: "25–26 sep", photo: "img/cinque_terre.jpg", climate: "18–25°C · mar templado (~23°C), ideal para caminar" },
    { id: "roma",         name: "Roma",          country: "Italia", emoji: "🏟️", color: "var(--roma)",         nights: 4, dates: "27–30 sep", photo: "img/roma.jpg", climate: "17–27°C · soleado, protector solar recomendado" },
  ],

  // ── Itinerario día a día ───────────────────────────────────
  days: [
    {
      date: "2026-09-18", weekday: "Vie", city: "zurich",
      label: "Llegada + Lindt",
      activities: [
        { time: "10:05",    icon: "✈️", text: "Aterrizaje en Zúrich (ZRH). Migración y equipaje ~1h." },
        { time: "11:15",    icon: "🚆", text: "Tren ZRH → Zürich HB (13 min, sale cada 10 min). Deja maletas en el Airbnb o en consigna de HB." },
        { time: "12:30",    icon: "🥨", text: "Almuerzo rápido cerca de la estación." },
        { time: "13:30",    icon: "🍫", text: "Lindt Home of Chocolate (Kilchberg) — fuente de chocolate de 9 m, museo y degustación. Tren S8/S24 hasta Kilchberg (~15 min). Reserva franja horaria online." },
        { time: "15:30",    icon: "🏠", text: "Check-in en Brauerstrasse 42 (a partir de las 3:00 PM). Descanso." },
        { time: "17:30",    icon: "🚶", text: "Paseo por el Altstadt y Lindenhof al atardecer." },
        { time: "Noche",    icon: "🍷", text: "Cena en el barrio de Niederdorf." },
      ]
    },
    {
      date: "2026-09-19", weekday: "Sáb", city: "zurich",
      label: "Día completo",
      activities: [
        { time: "Mañana",   icon: "⛪", text: "Grossmünster y Fraumünster — vitrales de Marc Chagall." },
        { time: "Mediodía", icon: "🏛️", text: "Bahnhofstrasse hasta el lago. Almuerzo en Markthalle." },
        { time: "Tarde",    icon: "⛵", text: "Crucero corto por el lago (~1 hora)." },
        { time: "Noche",    icon: "🌆", text: "Fondue o raclette en el casco histórico." },
      ]
    },
    {
      date: "2026-09-20", weekday: "Dom", city: "milan",
      label: "Milán + La Última Cena",
      activities: [
        { time: "08:33",    icon: "🚄", text: "Tren Zürich HB → Milano Centrale (BYYSAN). Checkout del Airbnb a las 10:00 AM… salir antes." },
        { time: "11:50",    icon: "🛬", text: "Llegada a Milano Centrale." },
        { time: "12:15",    icon: "🏠", text: "Metro M1 a Palestro/San Babila → Corso Venezia 6. Dejar maletas (check-in formal 2:00 PM)." },
        { time: "13:00",    icon: "🍝", text: "Almuerzo ligero cerca de Corso Venezia. NO te demores." },
        { time: "14:15",    icon: "🎟️", text: "TOUR CIVITATIS (A39925693) — punto de encuentro: Galleria Vittorio Emanuele II, 11/12. Llega 15 min antes." },
        { time: "14:15–17:15", icon: "🖼️", text: "Visita guiada por Milán + La Última Cena de Leonardo (Santa Maria delle Grazie). Incluye Duomo y Galleria por fuera." },
        { time: "17:30",    icon: "⛪", text: "Opcional: subir a la azotea del Duomo (última entrada ~18:10) si el tour no la incluyó." },
        { time: "19:30",    icon: "🍸", text: "Aperitivo milanés en los Navigli." },
      ]
    },
    {
      date: "2026-09-21", weekday: "Lun", city: "venecia",
      label: "Llegada a la Serenísima",
      activities: [
        { time: "Mañana",   icon: "🚄", text: "Tren desde Milán hasta Venezia Santa Lucia." },
        { time: "Mediodía", icon: "⛵", text: "Vaporetto (línea 1) por el Gran Canal hasta San Marcos." },
        { time: "Tarde",    icon: "🏛️", text: "Piazza San Marco — Basílica y exterior del Palazzo Ducale." },
        { time: "Tarde",    icon: "🌊", text: "Paseo por el Rialto." },
        { time: "Noche",    icon: "🌙", text: "Cena en Dorsoduro o Cannaregio." },
      ]
    },
    {
      date: "2026-09-22", weekday: "Mar", city: "venecia",
      label: "Islas y palacios",
      activities: [
        { time: "Mañana",   icon: "🏺", text: "Vaporetto a Murano — fábricas de vidrio soplado." },
        { time: "Mediodía", icon: "🌈", text: "Burano — casas de colores. Almuerzo de mariscos." },
        { time: "Tarde",    icon: "⚔️", text: "Palazzo Ducale (reserva online)." },
        { time: "Noche",    icon: "🥂", text: "Último Spritz en un bacaro veneziano." },
      ]
    },
    {
      date: "2026-09-23", weekday: "Mié", city: "florencia",
      label: "Llegada al Renacimiento",
      activities: [
        { time: "Mañana",   icon: "🚄", text: "Tren desde Venecia a Santa Maria Novella." },
        { time: "Mediodía", icon: "🏛️", text: "Mercado Central de San Lorenzo (2° piso)." },
        { time: "Tarde",    icon: "🌿", text: "Jardines de Boboli." },
        { time: "Tarde",    icon: "🌉", text: "Ponte Vecchio al atardecer." },
        { time: "Tarde",    icon: "🌅", text: "Piazzale Michelangelo." },
        { time: "Noche",    icon: "🥩", text: "Cena en el Oltrarno — bistecca alla fiorentina." },
      ]
    },
    {
      date: "2026-09-24", weekday: "Jue", city: "florencia",
      label: "Tour guiado: Uffizi + Academia",
      activities: [
        { time: "09:45",       icon: "🎟️", text: "TOUR CIVITATIS (A40777180) — punto de encuentro: Via degli Avelli, 20 (frente a Santa Maria Novella). Llega 15 min antes." },
        { time: "09:45–16:45", icon: "🖼️", text: "Visita guiada por el centro histórico (Piazza della Signoria, Duomo) + Galería Uffizi + Galería de la Academia (David de Miguel Ángel). Guía en español · 7 horas · 2 adultos, David Hurtado." },
        { time: "Noche",       icon: "🍷", text: "Enoteca en el Oltrarno — Chianti Classico." },
      ]
    },
    {
      date: "2026-09-25", weekday: "Vie", city: "cinque_terre",
      label: "Llegada a los cinco pueblos",
      activities: [
        { time: "07:53",    icon: "🚄", text: "Regionale 18357: Firenze S.M.N. → Pisa Centrale (llega 09:04)." },
        { time: "09:24",    icon: "🚆", text: "InterCity Notte 89512: Pisa Centrale → La Spezia Centrale (llega 10:37)." },
        { time: "Mediodía", icon: "🏘️", text: "Regional La Spezia → Vernazza y check-in." },
        { time: "Tarde",    icon: "🌊", text: "Primer baño en el mar (~23°C en septiembre)." },
        { time: "Tarde",    icon: "🚂", text: "Tren a Manarola al atardecer." },
        { time: "Noche",    icon: "🐟", text: "Cena: anchoas locales, trofie al pesto, Sciacchetrà." },
      ]
    },
    {
      date: "2026-09-26", weekday: "Sáb", city: "cinque_terre",
      label: "Senderismo y aldeas",
      activities: [
        { time: "Mañana",   icon: "🥾", text: "Sentiero Azzurro: tramo Monterosso–Vernazza (~2h)." },
        { time: "Mediodía", icon: "🍋", text: "Corniglia — granita de limón obligatoria." },
        { time: "Tarde",    icon: "🚢", text: "Barca entre pueblos para ver los acantilados." },
        { time: "Tarde",    icon: "🌅", text: "Riomaggiore al atardecer." },
        { time: "Noche",    icon: "🌙", text: "Última noche costera — cena temprana." },
        { time: "Antes de dormir", icon: "🧳", text: "Maleta lista y despertador temprano — mañana toca madrugar para llegar a Roma a tiempo para la misa dominical en el Vaticano." },
      ]
    },
    {
      date: "2026-09-27", weekday: "Dom", city: "roma",
      label: "Domingo en el Vaticano — Misa",
      activities: [
        { time: "05:45",    icon: "⏰", text: "Salida de Vernazza — primer regional a La Spezia Centrale." },
        { time: "06:51",    icon: "🚄", text: "Frecciargento La Spezia Centrale → Roma Termini, llega 10:05 (o Frecciabianca 06:18→10:03). Tramo aún pendiente de reservar — confirma el horario exacto al comprar." },
        { time: "10:15",    icon: "🧳", text: "Deja el equipaje en consigna de Termini o directo al hospedaje si el check-in lo permite — viaja ligero." },
        { time: "10:20",    icon: "🚇", text: "Metro Línea A, Termini → Ottaviano-San Pietro (~20 min), hacia la Plaza de San Pedro." },
        { time: "10:45",    icon: "⛪", text: "Plaza de San Pedro — fila de seguridad para la Basílica. Hombros y rodillas cubiertos (llevar chal/pashmina)." },
        { time: "12:00",    icon: "👋", text: "Si el Papa está en Roma, el Ángelus dominical se asoma a la ventana a esta hora — mismo lugar que la fila." },
        { time: "12:30 PM", icon: "🙏", text: "Misa dominical en la Basílica de San Pedro (Altar de la Cátedra). Confirma el horario exacto cerca de la fecha en basilicasanpietro.va — también hay misas a las 9:00 y 10:30 AM si el tren llega antes." },
        { time: "Tarde",    icon: "🍝", text: "Almuerzo cerca del Vaticano — Borgo Pio o Prati." },
        { time: "Tarde",    icon: "🏛️", text: "Castel Sant'Angelo por dentro — cruza el Puente de los Ángeles, está a 10 min a pie." },
        { time: "Tarde",    icon: "🏠", text: "Check-in en el hospedaje." },
        { time: "Noche",    icon: "🍝", text: "Cena en Trastevere — cacio e pepe o carbonara." },
      ]
    },
    {
      date: "2026-09-28", weekday: "Lun", city: "roma",
      label: "El Vaticano — Museos",
      activities: [
        { time: "08:15",    icon: "🎟️", text: "TOUR CIVITATIS (A41377056) — punto de encuentro: Viale Giulio Cesare. Llega 15 min antes." },
        { time: "08:30",    icon: "🎨", text: "Visita guiada por los Museos Vaticanos y la Capilla Sixtina. Guía en español · 2h30m–3h · 2 adultos, David Hurtado." },
        { time: "13:00",    icon: "⛪", text: "Basílica de San Pedro + Cúpula (Fast-Track, código GYG32LYZLLRK) — sin las filas del domingo. Subida a la cúpula solo por ascensor · 1.5h · 2 adultos." },
        { time: "Tarde",    icon: "🛍️", text: "Tarde libre en Prati — Via Cola di Rienzo (tiendas) o descanso." },
        { time: "Noche",    icon: "🍕", text: "Pizza en el barrio Prati." },
      ]
    },
    {
      date: "2026-09-29", weekday: "Mar", city: "roma",
      label: "Roma clásica",
      activities: [
        { time: "Mañana",   icon: "🏟️", text: "Coliseo al abrir (reserva obligatoria en colosseo.it)." },
        { time: "Mañana",   icon: "🏛️", text: "Foro Romano y Palatino — misma entrada." },
        { time: "Mediodía", icon: "🌿", text: "Almuerzo en Testaccio." },
        { time: "Tarde",    icon: "⛲", text: "Fontana di Trevi (~3-4 PM, mejor luz lateral)." },
        { time: "Tarde",    icon: "🏛️", text: "Panteón — la cúpula con el óculo." },
        { time: "Noche",    icon: "🎭", text: "Piazza Navona — fuente de los Cuatro Ríos de Bernini." },
      ]
    },
    {
      date: "2026-09-30", weekday: "Mié", city: "roma",
      label: "Último día en Roma",
      activities: [
        { time: "Mañana",   icon: "🌿", text: "Galería Borghese (reserva obligatoria — grupos de 2h)." },
        { time: "Mediodía", icon: "🛍️", text: "Campo de' Fiori — mercado matutino." },
        { time: "Tarde",    icon: "🍦", text: "Última passeggiata — gelato y espresso." },
        { time: "Noche",    icon: "🥂", text: "Cena de despedida en Testaccio o Pigneto. No te desveles: el vuelo sale temprano." },
        { time: "Antes de dormir", icon: "🧳", text: "Maleta lista y check-in online de Air Canada (CVQ8TR)." },
      ]
    },
    {
      date: "2026-10-01", weekday: "Jue", city: "roma",
      label: "Regreso a casa",
      activities: [
        { time: "07:00",    icon: "⏰", text: "Despertar y checkout del hospedaje." },
        { time: "07:45",    icon: "🚆", text: "Leonardo Express desde Roma Termini → Fiumicino (32 min, sale cada 15 min)." },
        { time: "08:30",    icon: "🛄", text: "Llegada a FCO. Documentación y control de seguridad (~3h de margen)." },
        { time: "11:30",    icon: "✈️", text: "AC 893 Roma FCO → Montréal YUL. Llega 14:30." },
        { time: "20:25",    icon: "✈️", text: "AC 995 Montréal YUL → Ciudad de México. Llega 23:55. Escala de 5h 55m." },
      ]
    },
  ],

  // ── Hospedajes ────────────────────────────────────────────
  // status: "confirmed" | "pending"
  // photo:  URL opcional de una foto del hospedaje (hero de "Próxima
  //         parada"). Si es null, se muestra una superficie de cristal
  //         con el ícono de la ciudad.
  accommodations: [
    {
      city: "zurich",
      name: "Room in Zürich (Airbnb) — habitación céntrica con balcón",
      address: "Brauerstrasse 42, Zúrich",
      checkin: "2026-09-18",
      checkout: "2026-09-20",
      nights: 2,
      confirmation: null,
      phone: null,
      photo: null,
      notes: "Anfitrión: David · Check-in 3:00 PM · Checkout 10:00 AM.",
      status: "confirmed"
    },
    {
      city: "milan",
      name: "Home in Milan — Loft in Fashion District (Airbnb)",
      address: "Corso Venezia 6, Milán",
      checkin: "2026-09-20",
      checkout: "2026-09-21",
      nights: 1,
      confirmation: null,
      phone: null,
      photo: null,
      notes: "Anfitrión: Sergio Borroni · Check-in 2:00 PM · Checkout 11:00 AM.",
      status: "confirmed"
    },
    {
      city: "venecia",
      name: "Casa del Pozzo (Booking.com)",
      address: "Cannaregio 4151, Ruga do Pozzi, Cannaregio, 30121 Venecia",
      checkin: "2026-09-21",
      checkout: "2026-09-23",
      nights: 2,
      confirmation: null,
      phone: null,
      photo: null,
      notes: "Check-in 1:30 PM – 11:30 PM · Checkout 5:00 AM – 11:00 AM · Avisar hora de llegada al anfitrión por el chat de Booking.",
      status: "confirmed"
    },
    {
      city: "florencia",
      name: "Camera doppia a Firenze centro (Airbnb)",
      address: "Via Nazionale, 20, 50123, Florence, Tuscany, Italy",
      checkin: "2026-09-23",
      checkout: "2026-09-25",
      nights: 2,
      confirmation: "HMYFFBSY2P",
      phone: "+39 328 748 4459",
      photo: null,
      notes: "Check-in 2:00 PM · Checkout 10:00 AM.",
      status: "confirmed"
    },
    {
      city: "cinque_terre",
      name: "Monolocale alle 5 Terre (Airbnb)",
      address: "Via San Giovanni Battista, 8, 19018 Vernazza SP, Italy",
      checkin: "2026-09-25",
      checkout: "2026-09-27",
      nights: 2,
      confirmation: "HMQ4QWZQWW",
      phone: "+39 338 254 3469",
      photo: null,
      notes: "Check-in 2:00 PM · Checkout 10:00 AM.",
      status: "confirmed"
    },
    {
      city: "roma",
      name: "Home in Rome (Airbnb)",
      address: "Via Nicola Ricciotti, 11, Rome, Lazio 00195, Italy",
      checkin: "2026-09-27",
      checkout: "2026-10-01",
      nights: 4,
      confirmation: "HMTPB9XRRH",
      phone: null,
      photo: null,
      notes: "Anfitrión: Luigi · Check-in 2:00 PM · Checkout 12:00 PM.",
      status: "confirmed"
    },
  ],

  // ── Traslados ─────────────────────────────────────────────
  // tipo: "flight" | "train"
  // status: "confirmed" | "pending"
  transports: [
    {
      type: "flight",
      from: "Ciudad de México",
      from_code: "MEX",
      to: "Zúrich",
      to_code: "ZRH",
      date: "2026-09-17",
      departure: "11:55",
      arrival: "10:05 (+1 día, 18 sep)",
      airline: "Air Canada",
      flight_number: "AC 1886 (MEX→YYZ) + AC 880 (YYZ→ZRH)",
      terminal: null,
      seat: null,
      baggage: null,
      confirmation: "CVQ8TR",
      status: "confirmed",
      notes: "Escala en Toronto YYZ (1h 25m). Sale 17 sep 11:55, llega Zúrich 18 sep 10:05 (día siguiente)."
    },
    {
      type: "train",
      from: "Zúrich",
      from_station: "Zürich HB",
      to: "Milán",
      to_station: "Milano Centrale",
      date: "2026-09-20",
      departure: "08:33",
      arrival: "11:50",
      operator: "Trainline",
      train_number: null,
      car: null,
      seat: null,
      class: null,
      confirmation: "BYYSAN",
      status: "confirmed"
    },
    {
      type: "train",
      from: "Milán",
      from_station: "Milano Centrale",
      to: "Venecia",
      to_station: "Venezia Santa Lucia",
      date: "2026-09-21",
      departure: "09:45",
      arrival: "12:12",
      operator: "Trenitalia",
      train_number: "9717",
      car: null,
      seat: null,
      class: null,
      confirmation: "2910718212",
      status: "confirmed"
    },
    {
      type: "train",
      from: "Venecia",
      from_station: "Venezia Santa Lucia",
      to: "Florencia",
      to_station: "Firenze S.M.N.",
      date: "2026-09-23",
      departure: "09:26",
      arrival: "11:39",
      operator: "Trenitalia",
      train_number: "Frecciarossa 9411",
      car: "8",
      seat: "3D, 4D",
      class: "Base/Standard",
      confirmation: "EQA655",
      status: "confirmed",
      notes: "2 pasajeros: José David Hurtado Santiago (8/3D, CP 751804) y Luis Angel Martinez Rodriguez (8/4D, CP 751803). Eur 57.00 c/u."
    },
    {
      type: "train",
      from: "Florencia",
      from_station: "Firenze S.M.N.",
      to: "Pisa",
      to_station: "Pisa Centrale",
      date: "2026-09-25",
      departure: "07:53",
      arrival: "09:04",
      operator: "Trenitalia Regionale",
      train_number: "18357",
      car: null,
      seat: null,
      class: "Ordinaria/2ª classe",
      confirmation: null,
      status: "confirmed",
      notes: "2 pasajeros: José David Hurtado Santiago (código de entrada 2937576492) y Luis Angel Martinez Rodriguez (código de entrada 2937576491). Billete digital regional nominativo, Eur 9.80 c/u."
    },
    {
      type: "train",
      from: "Pisa",
      from_station: "Pisa Centrale",
      to: "La Spezia / Cinque Terre",
      to_station: "La Spezia Centrale",
      date: "2026-09-25",
      departure: "09:24",
      arrival: "10:37",
      operator: "Trenitalia (InterCity Notte)",
      train_number: "89512",
      car: "2",
      seat: "7D, 8C",
      class: "ME&YOU · 2ª classe EASY",
      confirmation: "SQN9C5",
      status: "confirmed",
      notes: "2 pasajeros: José David Hurtado Santiago y Luis Angel Martinez Rodriguez. Eur 17.60 c/u. Código de cambio de reserva (CP): 785901."
    },
    {
      type: "train",
      from: "La Spezia / Cinque Terre",
      from_station: "La Spezia Centrale",
      to: "Roma",
      to_station: "Roma Termini",
      date: "2026-09-27",
      departure: "06:51",
      arrival: "10:05",
      operator: "Frecciargento",
      train_number: null,
      car: null,
      seat: null,
      class: null,
      confirmation: null,
      status: "pending",
      notes: "Objetivo: el primer tren posible para llegar a tiempo a la misa dominical del Vaticano (12:30 PM). Sale de Vernazza ~05:45 en el regional a La Spezia Centrale. Alternativa: Frecciabianca 06:18→10:03. Reservar y confirmar horario exacto."
    },
    {
      type: "flight",
      from: "Roma",
      from_code: "FCO",
      to: "Ciudad de México",
      to_code: "MEX",
      date: "2026-10-01",
      departure: "11:30",
      arrival: "23:55",
      airline: "Air Canada",
      flight_number: "AC 893 (FCO→YUL) + AC 995 (YUL→MEX)",
      terminal: null,
      seat: null,
      baggage: null,
      confirmation: "CVQ8TR",
      status: "confirmed",
      notes: "Escala en Montréal YUL (5h 55m). Mismo día, sale Roma 11:30, llega CDMX 23:55."
    },
  ],

  // ── Entradas y Tickets ────────────────────────────────────
  // status: "confirmed" | "pending" | "unavailable"
  // priority: "urgent" | "normal" | "low"
  tickets: [
    // ZÚRICH
    {
      city: "zurich",
      name: "Lindt Home of Chocolate",
      date: "2026-09-18",
      time: "13:30",
      confirmation: null,
      price: "~CHF 15",
      status: "pending",
      priority: "low",
      booking_deadline: "Flexible",
      booking_url: "https://www.lindt-home-of-chocolate.com",
      notes: "Entrada por franja horaria. En Kilchberg — tren S8/S24 desde Zürich HB (~15 min). Incluye degustación."
    },
    // MILÁN
    {
      city: "milan",
      name: "Visita guiada por Milán + La Última Cena",
      date: "2026-09-20",
      time: "14:15",
      confirmation: "A39925693",
      price: null,
      status: "confirmed",
      priority: "normal",
      booking_deadline: null,
      booking_url: null,
      notes: "2 viajeros · 3 horas · Punto de encuentro: Galleria Vittorio Emanuele II, 11/12 · Presentar reserva en el móvil."
    },
    // FLORENCIA
    {
      city: "florencia",
      name: "Florencia + Uffizi + Academia (tour guiado)",
      date: "2026-09-24",
      time: "09:45",
      confirmation: "A40777180",
      price: "5,636.03 MXN (2 adultos)",
      status: "confirmed",
      priority: "normal",
      booking_deadline: null,
      booking_url: null,
      notes: "2 adultos · 7 horas · Guía en español · Punto de encuentro: Via degli Avelli, 20 (Civitatis) · Incluye entradas a Uffizi y Academia."
    },
    {
      city: "florencia",
      name: "Cúpula de Brunelleschi (Brunelleschi Pass)",
      date: "2026-09-24",
      time: null,
      confirmation: null,
      price: "~€30",
      status: "pending",
      priority: "urgent",
      booking_deadline: "Reservar YA",
      booking_url: "https://duomo.firenze.it",
      notes: "Incluye Cúpula + Bautisterio + Museo + Cripta. Nominativo. Pendiente de reubicar en el itinerario: el jueves 24 ahora está ocupado por el tour de 9:45 a 16:45."
    },
    // VENECIA
    {
      city: "venecia",
      name: "Excursión a Murano y Burano + Visita a un taller de vidrio",
      date: "2026-09-22",
      time: "10:30",
      confirmation: "A40569872",
      price: null,
      status: "confirmed",
      priority: "normal",
      booking_deadline: null,
      booking_url: null,
      notes: "2 viajeros · 4h 30m · Punto de encuentro frente al Palazzo Cornoldi (Riva degli Schiavoni, 4136, 30122 Venezia VE), 10 min antes: https://maps.app.goo.gl/CRNp3QtVF7J3vUqt9. Llevar zapatos cómodos."
    },
    {
      city: "venecia",
      name: "Palazzo Ducale (Museos Piazza San Marco)",
      date: "2026-09-22",
      time: null,
      confirmation: null,
      price: "€25",
      status: "pending",
      priority: "normal",
      booking_deadline: "Antes del 28 ago",
      booking_url: "https://www.visitmuve.it",
      notes: "€5 más barato si se compra con +30 días de antelación."
    },
    // VATICANO
    {
      city: "roma",
      name: "Misa dominical — Basílica de San Pedro",
      date: "2026-09-27",
      time: "12:30 PM",
      confirmation: null,
      price: "Gratis",
      status: "pending",
      priority: "urgent",
      booking_deadline: "No requiere reserva",
      booking_url: "https://www.basilicasanpietro.va/es/horarios",
      notes: "Entrada libre, sin boleto. Llegar a la Plaza de San Pedro ~10:45 AM para hacer fila de seguridad con tiempo. Hombros y rodillas cubiertos. Confirmar horario exacto cerca de la fecha (también hay misas a las 9:00 y 10:30 AM)."
    },
    {
      city: "roma",
      name: "Visita guiada por los Museos Vaticanos y la Capilla Sixtina",
      date: "2026-09-28",
      time: "08:30",
      confirmation: "A41377056",
      price: "4,936.45 MXN (2 adultos)",
      status: "confirmed",
      priority: "normal",
      booking_deadline: null,
      booking_url: null,
      notes: "2 adultos · 2h30m–3h · Guía en español · Punto de encuentro: Viale Giulio Cesare (Civitatis) · Proveedor: Tourismotion Tours +39 0692926678."
    },
    {
      city: "roma",
      name: "Vaticano: Basílica de San Pedro + Cúpula (Fast-Track)",
      date: "2026-09-28",
      time: "13:00",
      confirmation: "GYG32LYZLLRK",
      price: null,
      status: "confirmed",
      priority: "normal",
      booking_deadline: null,
      booking_url: null,
      notes: "2 adultos · 1.5 horas · Guía en español · Subida a la cúpula solo por ascensor (lift only) · GetYourGuide."
    },
    // ROMA
    {
      city: "roma",
      name: "Coliseo + Foro Romano + Palatino",
      date: "2026-09-29",
      time: null,
      confirmation: null,
      price: "€20",
      status: "unavailable",
      priority: "urgent",
      booking_deadline: "Disponible ~30 ago",
      booking_url: "https://ticketing.colosseo.it",
      notes: "Abre reservas 30 días antes (≈30 ago)."
    },
    {
      city: "roma",
      name: "Galería Borghese",
      date: "2026-09-30",
      time: "9:00 AM",
      confirmation: null,
      price: "€18",
      status: "unavailable",
      priority: "normal",
      booking_deadline: "Disponible el 20 sep",
      booking_url: "https://galleriaborghese.beniculturali.it",
      notes: "Abre reservas 10 días antes (20 sep). Aforo: 180 personas por sesión de 2h."
    },
    {
      city: "roma",
      name: "Panteón (franja horaria)",
      date: "2026-09-29",
      time: null,
      confirmation: null,
      price: "€7",
      status: "pending",
      priority: "low",
      booking_deadline: "Flexible",
      booking_url: "https://www.panteonnazionale.it",
      notes: "Reserva recomendada pero hay disponibilidad con varios días de antelación."
    },
  ],

}; // fin DATA
