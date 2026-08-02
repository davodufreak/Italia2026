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
  cities: [
    { id: "zurich",       name: "Zúrich",       country: "Suiza",  emoji: "🏔️", color: "var(--zurich)",       nights: 2, dates: "18–19 sep" },
    { id: "milan",        name: "Milán",         country: "Italia", emoji: "🏛️", color: "var(--milan)",        nights: 1, dates: "20 sep"    },
    { id: "venecia",      name: "Venecia",       country: "Italia", emoji: "🚤", color: "var(--venecia)",      nights: 2, dates: "21–22 sep" },
    { id: "florencia",    name: "Florencia",     country: "Italia", emoji: "🎨", color: "var(--florencia)",    nights: 2, dates: "23–24 sep" },
    { id: "cinque_terre", name: "Cinque Terre",  country: "Italia", emoji: "🌊", color: "var(--cinque_terre)", nights: 2, dates: "25–26 sep" },
    { id: "roma",         name: "Roma",          country: "Italia", emoji: "🏟️", color: "var(--roma)",         nights: 4, dates: "27–30 sep" },
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
        { time: "Tarde",    icon: "🗿", text: "Piazza della Signoria y la Loggia dei Lanzi." },
        { time: "Tarde",    icon: "🌉", text: "Ponte Vecchio al atardecer." },
        { time: "Noche",    icon: "🥩", text: "Cena en el Oltrarno — bistecca alla fiorentina." },
      ]
    },
    {
      date: "2026-09-24", weekday: "Jue", city: "florencia",
      label: "Museos y colinas",
      activities: [
        { time: "Mañana",   icon: "🖼️", text: "Galería Uffizi — Botticelli, Leonardo, Miguel Ángel." },
        { time: "Mediodía", icon: "⛪", text: "Duomo + Baptisterio + Cúpula de Brunelleschi." },
        { time: "Tarde",    icon: "🌿", text: "Jardines de Boboli." },
        { time: "Tarde",    icon: "🌅", text: "Piazzale Michelangelo." },
        { time: "Noche",    icon: "🍷", text: "Enoteca en el Oltrarno — Chianti Classico." },
      ]
    },
    {
      date: "2026-09-25", weekday: "Vie", city: "cinque_terre",
      label: "Llegada a los cinco pueblos",
      activities: [
        { time: "Mañana",   icon: "🚄", text: "Tren a La Spezia → regional hasta Vernazza." },
        { time: "Mediodía", icon: "🏘️", text: "Check-in en Vernazza." },
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
        { time: "Noche",    icon: "🌙", text: "Última noche costera." },
      ]
    },
    {
      date: "2026-09-27", weekday: "Dom", city: "roma",
      label: "Llegada a la Ciudad Eterna",
      activities: [
        { time: "Mañana",   icon: "🚄", text: "Tren La Spezia → Roma Termini. Llegada al mediodía." },
        { time: "Tarde",    icon: "🌿", text: "Paseo de orientación por Trastevere." },
        { time: "Tarde",    icon: "🏛️", text: "Castel Sant'Angelo desde fuera al atardecer." },
        { time: "Noche",    icon: "🍝", text: "Cena en Trastevere — cacio e pepe o carbonara." },
      ]
    },
    {
      date: "2026-09-28", weekday: "Lun", city: "roma",
      label: "El Vaticano",
      activities: [
        { time: "8:00 AM",  icon: "⚠️", text: "Museos Vaticanos — llega a las 8am (reserva previa obligatoria)." },
        { time: "Mañana",   icon: "🎨", text: "Capilla Sixtina — Miguel Ángel en el techo." },
        { time: "Mediodía", icon: "⛪", text: "Basílica de San Pedro — sube a la cúpula." },
        { time: "Tarde",    icon: "🔭", text: "Vista a Castel Sant'Angelo desde el Puente de los Ángeles." },
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
      notes: "Check-in 1:30 PM – 11:30 PM · Checkout 5:00 AM – 11:00 AM · Avisar hora de llegada al anfitrión por el chat de Booking.",
      status: "confirmed"
    },
    {
      city: "florencia",
      name: null,
      address: null,
      checkin: "2026-09-23",
      checkout: "2026-09-25",
      nights: 2,
      confirmation: null,
      phone: null,
      notes: null,
      status: "pending"
    },
    {
      city: "cinque_terre",
      name: null,
      address: null,
      checkin: "2026-09-25",
      checkout: "2026-09-27",
      nights: 2,
      confirmation: null,
      phone: null,
      notes: "Vernazza o Monterosso son las mejores bases.",
      status: "pending"
    },
    {
      city: "roma",
      name: null,
      address: null,
      checkin: "2026-09-27",
      checkout: "2026-10-01",
      nights: 4,
      confirmation: null,
      phone: null,
      notes: null,
      status: "pending"
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
      departure: null,
      arrival: null,
      operator: "Frecciarossa / Italo",
      train_number: null,
      car: null,
      seat: null,
      class: null,
      confirmation: null,
      status: "pending"
    },
    {
      type: "train",
      from: "Florencia",
      from_station: "Firenze S.M.N.",
      to: "La Spezia / Cinque Terre",
      to_station: "La Spezia Centrale",
      date: "2026-09-25",
      departure: null,
      arrival: null,
      operator: "Trenitalia Regional",
      train_number: null,
      car: null,
      seat: null,
      class: null,
      confirmation: null,
      status: "pending"
    },
    {
      type: "train",
      from: "La Spezia / Cinque Terre",
      from_station: "La Spezia Centrale",
      to: "Roma",
      to_station: "Roma Termini",
      date: "2026-09-27",
      departure: null,
      arrival: null,
      operator: "Frecciarossa",
      train_number: null,
      car: null,
      seat: null,
      class: null,
      confirmation: null,
      status: "pending"
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
      name: "Galería Uffizi",
      date: "2026-09-24",
      time: null,
      confirmation: null,
      price: null,
      status: "pending",
      priority: "urgent",
      booking_deadline: "Reservar YA",
      booking_url: "https://tickets.uffizi.it",
      notes: "Entradas nominativas. Reserva obligatoria con semanas de anticipación."
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
      notes: "Incluye Cúpula + Bautisterio + Museo + Cripta. Nominativo."
    },
    // VENECIA
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
      name: "Museos Vaticanos + Capilla Sixtina",
      date: "2026-09-28",
      time: "8:00 AM",
      confirmation: null,
      price: "€25",
      status: "unavailable",
      priority: "urgent",
      booking_deadline: "Disponible ~29 jul",
      booking_url: "https://www.museivaticani.va",
      notes: "Abre reservas 60 días antes (≈29 jul). Ponle alarma al teléfono."
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
