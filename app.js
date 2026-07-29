// ═══════════════════════════════════════════════════════════
// TRAVEL GUIDE · App Logic
// ═══════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── Helpers ───────────────────────────────────────────────

  function cityById(id) {
    return DATA.cities.find(c => c.id === id) || {};
  }

  function cityColor(id) {
    const c = cityById(id);
    return c.color || 'var(--text-dim)';
  }

  function cityColorHex(id) {
    const map = {
      zurich:       '#e8334a',
      milan:        '#4a9bd4',
      venecia:      '#9b72cf',
      florencia:    '#e07b54',
      cinque_terre: '#48c78e',
      roma:         '#ddb84a',
    };
    return map[id] || '#888';
  }

  function formatDate(isoStr) {
    if (!isoStr) return '—';
    const d = new Date(isoStr + 'T12:00:00');
    return d.toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' });
  }

  function daysUntil(isoStr) {
    const now = new Date();
    const target = new Date(isoStr + 'T12:00:00');
    const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    return diff;
  }

  function badge(status, customLabel) {
    const configs = {
      confirmed:   { cls: 'badge-ok',      label: '✓ Confirmado' },
      pending:     { cls: 'badge-pending',  label: '◌ Pendiente'  },
      unavailable: { cls: 'badge-warn',     label: '⏳ No disponible aún' },
    };
    const c = configs[status] || configs.pending;
    return `<span class="badge ${c.cls}">${customLabel || c.label}</span>`;
  }

  function priorityBadge(p) {
    if (p === 'urgent') return '<span class="badge badge-urgent">⚡ Urgente</span>';
    if (p === 'low')    return '<span class="badge" style="background:rgba(100,100,120,0.2);color:var(--text-dim)">Flexible</span>';
    return '';
  }

  function emptyState(label) {
    return `<span style="color:var(--text-dim);font-style:italic;font-size:13px;">${label}</span>`;
  }

  function mono(text) {
    if (!text) return emptyState('—');
    return `<span class="hotel-confirmation">${text}</span>`;
  }

  // ── City Strip ────────────────────────────────────────────
  function renderCityStrip() {
    const el = document.getElementById('cityStrip');
    if (!el) return;
    el.innerHTML = DATA.cities.map(c =>
      `<div class="city-dot" style="background:${cityColorHex(c.id)}" title="${c.name} · ${c.dates}"></div>`
    ).join('');
  }

  // ── Countdown ─────────────────────────────────────────────
  function renderCountdown() {
    const el = document.getElementById('countdownWidget');
    if (!el) return;
    const days = daysUntil(DATA.meta.departure);
    if (days <= 0) {
      el.innerHTML = `<span class="countdown-label">¡Buen viaje!</span>`;
    } else {
      el.innerHTML = `
        <span class="countdown-number">${days}</span>
        <span class="countdown-label">días para el vuelo</span>`;
    }
  }

  // ══════════════════════════════════════════════════════════
  // SECTION: RESUMEN
  // ══════════════════════════════════════════════════════════

  function renderResumen() {
    const totalNights = DATA.cities.reduce((s, c) => s + c.nights, 0);
    const confHotels  = DATA.accommodations.filter(a => a.status === 'confirmed').length;
    const confTrans   = DATA.transports.filter(t => t.status === 'confirmed').length;
    const confTickets = DATA.tickets.filter(t => t.status === 'confirmed').length;

    // Route strip cities
    const routeItems = [
      { name: 'CDMX', dates: '18 sep', dot: '#666' },
      ...DATA.cities.map(c => ({ name: c.name, dates: c.dates, dot: cityColorHex(c.id) })),
      { name: 'CDMX', dates: '1 oct', dot: '#666' },
    ];

    const routeHTML = routeItems.map((r, i) => `
      <div class="route-city">
        <div class="route-city-dot" style="background:${r.dot}"></div>
        <div class="route-city-name">${r.name}</div>
        <div class="route-city-dates">${r.dates}</div>
      </div>
      ${i < routeItems.length - 1 ? '<div class="route-connector"></div>' : ''}
    `).join('');

    document.getElementById('section-resumen').innerHTML = `
      <div class="section-header">
        <div class="eyebrow">Septiembre – Octubre 2026</div>
      </div>

      <div class="hero-route mb-32">
        <h1 class="hero-headline">Zúrich<br><em>→ Roma</em></h1>
        <p class="hero-dates">18 sep – 1 oct · 13 noches · 6 ciudades · 2 países</p>
      </div>

      <div class="stats-bar mb-32">
        <div class="stat-item">
          <span class="stat-number">${totalNights}</span>
          <span class="stat-label">Noches</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">${DATA.cities.length}</span>
          <span class="stat-label">Ciudades</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">${DATA.transports.filter(t=>t.type==='train').length}</span>
          <span class="stat-label">Trenes</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">${DATA.tickets.length}</span>
          <span class="stat-label">Entradas</span>
        </div>
      </div>

      <div class="route-strip mb-32">
        <div class="route-strip-label">Ruta del viaje</div>
        <div class="route-cities">${routeHTML}</div>
      </div>

      <div class="eyebrow mb-16">Estado de reservas</div>
      <div class="status-grid">
        ${statusCard('Hospedajes',   confHotels,  DATA.accommodations.length, '#5cb87a')}
        ${statusCard('Traslados',    confTrans,   DATA.transports.length,     '#4a9bd4')}
        ${statusCard('Entradas',     confTickets, DATA.tickets.length,        '#c4965a')}
      </div>
    `;
  }

  function statusCard(title, done, total, color) {
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    return `
      <div class="status-card">
        <div class="status-card-title">${title}</div>
        <div class="status-progress">
          <span class="status-count" style="color:${color}">${done}</span>
          <span class="status-total"> / ${total}</span>
        </div>
        <div class="status-bar-track">
          <div class="status-bar-fill" style="width:${pct}%;background:${color}"></div>
        </div>
      </div>`;
  }

  // ══════════════════════════════════════════════════════════
  // SECTION: ITINERARIO
  // ══════════════════════════════════════════════════════════

  function renderItinerario() {
    // Group days by city
    const groups = [];
    let currentCity = null;
    DATA.days.forEach(day => {
      if (day.city !== currentCity) {
        currentCity = day.city;
        groups.push({ city: day.city, days: [] });
      }
      groups[groups.length - 1].days.push(day);
    });

    const groupsHTML = groups.map(g => {
      const city = cityById(g.city);
      const hex  = cityColorHex(g.city);
      const firstDate = g.days[0].date;
      const lastDate  = g.days[g.days.length - 1].date;
      const datesLabel = g.days.length > 1
        ? `${formatDate(firstDate)} – ${formatDate(lastDate)}`
        : formatDate(firstDate);

      const daysHTML = g.days.map((day, i) => `
        <div class="day-card" id="day-${day.date}">
          <div class="day-card-header" onclick="toggleDay(this)">
            <div class="day-date-block">
              <span class="day-weekday">${day.weekday}</span>
              <span class="day-date">${new Date(day.date + 'T12:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'long' })}</span>
            </div>
            <span class="day-label">${day.label}</span>
            <span class="day-chevron">▾</span>
          </div>
          <div class="day-activities">
            ${day.activities.map(a => `
              <div class="activity">
                <div class="activity-icon">${a.icon}</div>
                <div class="activity-content">
                  <span class="activity-time">${a.time}</span>
                  <p class="activity-text">${a.text}</p>
                </div>
              </div>`).join('')}
          </div>
        </div>
      `).join('');

      return `
        <div class="city-group">
          <div class="city-group-header">
            <div class="city-group-dot" style="background:${hex}"></div>
            <span class="city-group-name">${city.emoji || ''} ${city.name}</span>
            <span class="city-group-dates">${datesLabel}</span>
          </div>
          ${daysHTML}
        </div>`;
    }).join('');

    document.getElementById('section-itinerario').innerHTML = `
      <div class="section-header">
        <div class="eyebrow">Día a día</div>
        <h2 class="section-title">Itinerario</h2>
        <p class="section-sub">Haz clic en cada día para ver las actividades</p>
      </div>
      ${groupsHTML}
    `;
  }

  window.toggleDay = function(header) {
    const card = header.closest('.day-card');
    card.classList.toggle('open');
  };

  // ══════════════════════════════════════════════════════════
  // SECTION: HOSPEDAJES
  // ══════════════════════════════════════════════════════════

  function renderHospedajes() {
    const cardsHTML = DATA.accommodations.map(h => {
      const city   = cityById(h.city);
      const hex    = cityColorHex(h.city);
      const nights = h.nights;
      const isConf = h.status === 'confirmed';

      const checkinFmt  = formatDate(h.checkin);
      const checkoutFmt = formatDate(h.checkout);

      return `
        <div class="hotel-card">
          <div class="hotel-card-accent" style="background:${hex}"></div>
          <div class="hotel-card-body">
            <div class="hotel-city-name" style="color:${hex}">${city.emoji || ''} ${city.name}</div>
            <div class="hotel-name ${isConf ? '' : 'pending-text'}">
              ${isConf ? h.name : 'Por confirmar'}
            </div>
            <div class="hotel-dates">${checkinFmt} → ${checkoutFmt} · ${nights} ${nights === 1 ? 'noche' : 'noches'}</div>

            ${isConf ? `
              ${h.address ? `<div class="hotel-detail"><span class="hotel-detail-label">Dirección</span><span>${h.address}</span></div>` : ''}
              ${h.phone   ? `<div class="hotel-detail"><span class="hotel-detail-label">Teléfono</span><span>${h.phone}</span></div>` : ''}
              ${h.confirmation ? `<div class="hotel-detail"><span class="hotel-detail-label">Confirmación</span>${mono(h.confirmation)}</div>` : ''}
            ` : ''}

            ${h.notes ? `<div class="hotel-detail" style="margin-top:10px;"><span style="font-size:12px;color:var(--text-dim)">📝 ${h.notes}</span></div>` : ''}

            <div style="margin-top:12px;">${badge(h.status)}</div>
          </div>
          <div class="hotel-ghost">${city.name || ''}</div>
        </div>`;
    }).join('');

    document.getElementById('section-hospedajes').innerHTML = `
      <div class="section-header">
        <div class="eyebrow">Dónde dormir</div>
        <h2 class="section-title">Hospedajes</h2>
        <p class="section-sub">${DATA.accommodations.filter(a=>a.status==='confirmed').length} de ${DATA.accommodations.length} confirmados</p>
      </div>
      <div class="hotel-grid">${cardsHTML}</div>
    `;
  }

  // ══════════════════════════════════════════════════════════
  // SECTION: TRASLADOS
  // ══════════════════════════════════════════════════════════

  function renderTraslados() {
    const flights = DATA.transports.filter(t => t.type === 'flight');
    const trains  = DATA.transports.filter(t => t.type === 'train');

    function transportCard(t) {
      const isConf   = t.status === 'confirmed';
      const isFlight = t.type === 'flight';
      const icon     = isFlight ? '✈️' : '🚄';
      const fromCity = isFlight ? `${t.from} (${t.from_code})` : `${t.from}`;
      const toCity   = isFlight ? `${t.to} (${t.to_code})`   : `${t.to}`;

      const metas = [];
      if (t.departure || t.arrival) {
        if (t.departure) metas.push(`<span class="transport-meta-item"><strong>Salida</strong> ${t.departure}</span>`);
        if (t.arrival)   metas.push(`<span class="transport-meta-item"><strong>Llegada</strong> ${t.arrival}</span>`);
      }
      if (isFlight) {
        if (t.airline)       metas.push(`<span class="transport-meta-item"><strong>Aerolínea</strong> ${t.airline}</span>`);
        if (t.flight_number) metas.push(`<span class="transport-meta-item"><strong>Vuelo</strong> ${t.flight_number}</span>`);
        if (t.terminal)      metas.push(`<span class="transport-meta-item"><strong>Terminal</strong> ${t.terminal}</span>`);
        if (t.seat)          metas.push(`<span class="transport-meta-item"><strong>Asiento</strong> ${t.seat}</span>`);
        if (t.baggage)       metas.push(`<span class="transport-meta-item"><strong>Equipaje</strong> ${t.baggage}</span>`);
      } else {
        if (t.operator)     metas.push(`<span class="transport-meta-item"><strong>Operador</strong> ${t.operator}</span>`);
        if (t.from_station) metas.push(`<span class="transport-meta-item"><strong>Estación salida</strong> ${t.from_station}</span>`);
        if (t.to_station)   metas.push(`<span class="transport-meta-item"><strong>Estación llegada</strong> ${t.to_station}</span>`);
        if (t.train_number) metas.push(`<span class="transport-meta-item"><strong>Tren</strong> ${t.train_number}</span>`);
        if (t.car)          metas.push(`<span class="transport-meta-item"><strong>Vagón</strong> ${t.car}</span>`);
        if (t.seat)         metas.push(`<span class="transport-meta-item"><strong>Asiento</strong> ${t.seat}</span>`);
        if (t.class)        metas.push(`<span class="transport-meta-item"><strong>Clase</strong> ${t.class}</span>`);
      }

      return `
        <div class="transport-card">
          <div>
            <div class="transport-date">${formatDate(t.date)}</div>
            <div class="transport-route">
              <span class="transport-city">${fromCity}</span>
              <span class="transport-arrow">→</span>
              <span class="transport-city">${toCity}</span>
            </div>
            <div class="transport-meta">${metas.length ? metas.join('') : emptyState('Detalles pendientes de confirmar')}</div>
            ${isConf && t.confirmation ? `<div style="margin-top:10px;">${mono(t.confirmation)}</div>` : ''}
          </div>
          <div class="transport-badge-wrap">
            <span class="transport-type-icon">${icon}</span>
            ${badge(t.status)}
          </div>
        </div>`;
    }

    document.getElementById('section-traslados').innerHTML = `
      <div class="section-header">
        <div class="eyebrow">Cómo llegar</div>
        <h2 class="section-title">Traslados</h2>
        <p class="section-sub">${DATA.transports.filter(t=>t.status==='confirmed').length} de ${DATA.transports.length} confirmados</p>
      </div>

      <div class="transport-group">
        <div class="transport-group-title">✈️ Vuelos</div>
        ${flights.map(transportCard).join('')}
      </div>

      <div class="transport-group">
        <div class="transport-group-title">🚄 Trenes</div>
        ${trains.map(transportCard).join('')}
      </div>
    `;
  }

  // ══════════════════════════════════════════════════════════
  // SECTION: ENTRADAS
  // ══════════════════════════════════════════════════════════

  function renderEntradas() {
    // Group by city
    const cityOrder = DATA.cities.map(c => c.id);
    const byCity = {};
    DATA.tickets.forEach(t => {
      if (!byCity[t.city]) byCity[t.city] = [];
      byCity[t.city].push(t);
    });

    const groupsHTML = cityOrder
      .filter(id => byCity[id])
      .map(id => {
        const city   = cityById(id);
        const hex    = cityColorHex(id);
        const tickets = byCity[id];

        const ticketsHTML = tickets.map(t => {
          const metaItems = [];
          if (t.date) metaItems.push(`<span class="ticket-meta-item"><strong>Fecha</strong> ${formatDate(t.date)}</span>`);
          if (t.time) metaItems.push(`<span class="ticket-meta-item"><strong>Hora</strong> ${t.time}</span>`);
          if (t.price) metaItems.push(`<span class="ticket-meta-item"><strong>Precio</strong> ${t.price}</span>`);
          if (t.booking_deadline) metaItems.push(`<span class="ticket-meta-item"><strong>Reservar</strong> ${t.booking_deadline}</span>`);

          return `
            <div class="ticket-card" style="border-left-color:${hex}">
              <div class="ticket-info">
                <div class="ticket-name">${t.name}</div>
                <div class="ticket-meta">${metaItems.join('')}</div>
                ${t.notes ? `<div style="font-size:11px;color:var(--text-dim);margin-top:6px;">📝 ${t.notes}</div>` : ''}
                ${t.confirmation ? `<div>${mono(t.confirmation)}</div>` : ''}
              </div>
              <div class="ticket-actions">
                ${badge(t.status)}
                ${priorityBadge(t.priority)}
                ${t.booking_url ? `<a href="${t.booking_url}" target="_blank" rel="noopener" class="ticket-url">Reservar →</a>` : ''}
              </div>
            </div>`;
        }).join('');

        return `
          <div class="tickets-city-group">
            <div class="tickets-city-header">
              <div class="tickets-city-dot" style="background:${hex}"></div>
              <span class="tickets-city-name">${city.emoji || ''} ${city.name}</span>
            </div>
            ${ticketsHTML}
          </div>`;
      }).join('');

    document.getElementById('section-entradas').innerHTML = `
      <div class="section-header">
        <div class="eyebrow">Qué visitar</div>
        <h2 class="section-title">Entradas y Tickets</h2>
        <p class="section-sub">${DATA.tickets.filter(t=>t.status==='confirmed').length} de ${DATA.tickets.length} reservados</p>
      </div>
      ${groupsHTML}
    `;
  }

  // ══════════════════════════════════════════════════════════
  // ROUTER
  // ══════════════════════════════════════════════════════════

  function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.bnav-btn').forEach(b => b.classList.remove('active'));

    const section = document.getElementById('section-' + id);
    if (section) section.classList.add('active');

    document.querySelectorAll(`[data-section="${id}"]`).forEach(b => b.classList.add('active'));

    // Scroll main to top on section change
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update URL hash
    history.replaceState(null, '', '#' + id);
  }

  function initRouter() {
    document.querySelectorAll('[data-section]').forEach(btn => {
      btn.addEventListener('click', () => showSection(btn.dataset.section));
    });

    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById('section-' + hash)) {
      showSection(hash);
    } else {
      showSection('resumen');
    }
  }

  // ══════════════════════════════════════════════════════════
  // INIT
  // ══════════════════════════════════════════════════════════

  function init() {
    renderCityStrip();
    renderCountdown();
    renderResumen();
    renderItinerario();
    renderHospedajes();
    renderTraslados();
    renderEntradas();
    initRouter();
  }

  document.addEventListener('DOMContentLoaded', init);

})();
