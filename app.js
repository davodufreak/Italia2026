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
      zurich:       '#F2998C',
      milan:        '#8FC7F2',
      venecia:      '#B7A9F0',
      florencia:    '#E8A87C',
      cinque_terre: '#9FD8B0',
      roma:         '#E8C468',
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
    if (p === 'low')    return '<span class="badge" style="background:rgba(143,149,165,0.14);color:var(--text-dim)">Flexible</span>';
    return '';
  }

  function emptyState(label) {
    return `<span style="color:var(--text-dim);font-style:italic;font-size:13px;">${label}</span>`;
  }

  function mono(text) {
    if (!text) return emptyState('—');
    return `<span class="hotel-confirmation">${text}</span>`;
  }

  function stripAccents(s) {
    return (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function matchesCity(text, city) {
    if (!text) return false;
    return stripAccents(text).toLowerCase().includes(stripAccents(city.name).toLowerCase());
  }

  // Deduce el traslado de llegada / salida de una ciudad a partir del
  // listado de transportes, sin necesidad de asociarlos manualmente.
  function arrivalFor(city) {
    return DATA.transports.find(t => matchesCity(t.to, city));
  }

  function departureFor(city) {
    return DATA.transports.find(t => matchesCity(t.from, city));
  }

  function accommodationForCity(cityId) {
    return DATA.accommodations.find(a => a.city === cityId);
  }

  function transportTypeIcon(type) {
    if (type === 'flight') return '✈️';
    if (type === 'train')  return '🚄';
    if (type === 'ferry')  return '⛴️';
    return '📍';
  }

  function countryFlag(country) {
    const map = { 'Suiza': '🇨🇭', 'Italia': '🇮🇹' };
    return map[country] || '';
  }

  // Extrae un dato puntual (p. ej. "Check-in 3:00 PM") de un texto libre
  // de notas, sin requerir campos de datos adicionales. Solo reconoce la
  // etiqueta al inicio de una cláusula (inicio de texto o tras "·") para
  // no confundirla con una mención casual dentro de una oración.
  function extractField(notes, label, requireColon) {
    if (!notes) return null;
    const colonPart = requireColon ? ':' : ':?';
    const re = new RegExp('(?:^|·)\\s*' + label + '\\s*' + colonPart + '\\s*([^·]+)', 'i');
    const m = notes.match(re);
    if (!m) return null;
    return m[1].trim().replace(/\.$/, '');
  }

  function heroGradient(hex) {
    return `radial-gradient(120% 140% at 15% 10%, ${hex}4D, transparent 60%), ` +
           `radial-gradient(140% 160% at 100% 100%, ${hex}26, transparent 55%), ` +
           `linear-gradient(165deg, #1b1f2b 0%, #14161c 100%)`;
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

  // Determina automáticamente la próxima parada pendiente del viaje
  // comparando la fecha actual con el checkout de cada hospedaje.
  // No requiere configuración manual: si el checkout de una ciudad ya
  // pasó, se avanza a la siguiente.
  function computeNextStop() {
    const now = new Date();
    for (let i = 0; i < DATA.cities.length; i++) {
      const city = DATA.cities[i];
      const accommodation = accommodationForCity(city.id);
      const checkout = accommodation ? new Date(accommodation.checkout + 'T23:59:59') : null;
      if (!checkout || now <= checkout) {
        return { city, index: i, accommodation };
      }
    }
    return null;
  }

  function cityQuickLinksHTML(cityId) {
    const tix = DATA.tickets.filter(t => t.city === cityId && t.booking_url);
    if (!tix.length) return '';
    return `
      <div class="stop-expand-block">
        <span class="stop-expand-label">Enlaces rápidos</span>
        <div class="stop-expand-links">
          ${tix.map(t => `<a class="stop-expand-link" href="${t.booking_url}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${t.name} ↗</a>`).join('')}
        </div>
      </div>`;
  }

  // Construye una tarjeta de parada completa (foto + panel de cristal con
  // Llegada / Hospedaje / Salida). La usan tanto el hero de "Próxima
  // parada" como el carrusel de "Todas las paradas", así ambos comparten
  // exactamente el mismo tratamiento visual.
  function buildStopCard(city, index, accommodation, opts) {
    opts = opts || {};
    const hex = cityColorHex(city.id);
    const acc = accommodation || {};
    const isLastCity = index === DATA.cities.length - 1;

    const arrival = arrivalFor(city);
    const departure = departureFor(city);

    const isAccConf = acc.status === 'confirmed';
    const host = extractField(acc.notes, 'Anfitrión', true);
    const checkinTime = extractField(acc.notes, 'Check-in');
    const checkoutTime = extractField(acc.notes, 'Checkout');

    const firstDay = DATA.days.find(d => d.city === city.id);

    const photoLayer = city.photo
      ? `<img src="${city.photo}" alt="${city.name}" class="stop-hero-photo-img" loading="lazy" onerror="this.remove()">`
      : '';

    const rootClasses = ['stop-hero'];
    if (opts.compact) rootClasses.push('stop-hero--compact');
    if (opts.active) rootClasses.push('stop-hero--active');
    if (opts.extraClass) rootClasses.push(opts.extraClass);

    return `
      <div class="${rootClasses.join(' ')}" tabindex="0" role="button" aria-expanded="false"
           onclick="toggleStopHero(this, event)" onkeydown="stopHeroKeydown(event, this)">
        <div class="stop-hero-photo" style="background:${heroGradient(hex)}">
          ${photoLayer}
          <div class="stop-hero-overlay"></div>
          <span class="stop-hero-photo-glyph">${city.emoji || ''}</span>
          <div class="stop-hero-top">
            <span class="stop-hero-badge">Parada ${index + 1} de ${DATA.cities.length}</span>
            ${opts.active ? '<span class="stop-hero-badge stop-hero-badge--active">Próxima</span>' : ''}
          </div>
          <div class="stop-hero-title-wrap">
            <h1 class="stop-hero-title">${city.name}</h1>
            <p class="stop-hero-country">${city.country} ${countryFlag(city.country)}</p>
          </div>
        </div>

        <div class="stop-hero-panel">
          <div class="stop-row">
            <span class="stop-row-icon">${arrival ? transportTypeIcon(arrival.type) : '📍'}</span>
            <div class="stop-row-body">
              <span class="stop-row-title">Llegada</span>
              ${arrival ? `
                <span class="stop-row-time">${arrival.arrival || '—'}</span>
                <span class="stop-row-place">${arrival.to_station || arrival.to || ''}</span>
              ` : `<span class="stop-row-place">${emptyState('Por confirmar')}</span>`}
            </div>
          </div>

          <div class="stop-divider"></div>

          <div class="stop-lodging">
            <div class="stop-row">
              <span class="stop-row-icon">🏨</span>
              <div class="stop-row-body">
                <span class="stop-row-title">Hospedaje</span>
              </div>
            </div>
            <div class="stop-lodging-info">
              <div class="stop-lodging-name ${isAccConf ? '' : 'pending-text'}">${isAccConf ? acc.name : 'Alojamiento por confirmar'}</div>
              ${acc.address ? `<div class="stop-lodging-address">${acc.address}</div>` : ''}
              ${host ? `<div class="stop-lodging-host">Anfitrión · ${host}</div>` : ''}

              <div class="stop-lodging-grid">
                <div class="stop-lodging-cell">
                  <span class="stop-lodging-cell-label">Check-in</span>
                  <span class="stop-lodging-cell-value">${checkinTime || '—'}</span>
                </div>
                <div class="stop-lodging-cell">
                  <span class="stop-lodging-cell-label">Check-out</span>
                  <span class="stop-lodging-cell-value">${checkoutTime || '—'}</span>
                </div>
              </div>

              <div class="stop-lodging-meta">
                <span class="stop-lodging-chip">${formatDate(acc.checkin)} → ${formatDate(acc.checkout)}</span>
                <span class="stop-lodging-chip">${acc.nights} ${acc.nights === 1 ? 'noche' : 'noches'}</span>
                ${badge(acc.status)}
              </div>
            </div>
          </div>

          ${firstDay ? `
            <a class="stop-cta" href="#itinerario" onclick="event.stopPropagation(); goToDay('${firstDay.date}'); return false;">
              Ver itinerario <span class="stop-cta-chevron">›</span>
            </a>
          ` : ''}

          <div class="stop-divider"></div>

          <div class="stop-row">
            <span class="stop-row-icon">${departure ? transportTypeIcon(departure.type) : '📍'}</span>
            <div class="stop-row-body">
              <span class="stop-row-title">Salida</span>
              ${departure ? `
                <span class="stop-row-time">${departure.departure || '—'}</span>
                <span class="stop-row-place">${departure.from_station || departure.from || ''}</span>
              ` : `<span class="stop-row-place">${isLastCity ? emptyState('Fin del viaje') : emptyState('Por confirmar')}</span>`}
            </div>
          </div>

          <div class="stop-expand">
            <div class="stop-expand-inner">
              <div class="stop-expand-grid">
                <div class="stop-expand-block">
                  <span class="stop-expand-label">Clima habitual</span>
                  <span class="stop-expand-value">${city.climate || '—'}</span>
                </div>
                ${acc.address ? `
                  <div class="stop-expand-block">
                    <span class="stop-expand-label">Mapa</span>
                    <a class="stop-expand-link" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(acc.address)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">Abrir en Google Maps ↗</a>
                  </div>` : ''}
              </div>
              ${cityQuickLinksHTML(city.id)}
              ${acc.notes ? `<div class="stop-expand-notes">📝 ${acc.notes}</div>` : ''}
            </div>
          </div>
        </div>
      </div>`;
  }

  // Carrusel con las 6 paradas del viaje, a tamaño completo, para tener
  // visibilidad de todo el recorrido en una sola pantalla.
  function renderStopCarousel() {
    const next = computeNextStop();
    const activeIndex = next ? next.index : -1;

    const itemsHTML = DATA.cities.map((city, i) => {
      const acc = accommodationForCity(city.id);
      return `<div class="stop-carousel-item">${buildStopCard(city, i, acc, { active: i === activeIndex })}</div>`;
    }).join('');

    return `
      <div class="eyebrow mb-16">Todas las paradas</div>
      <div class="stop-carousel mb-32">${itemsHTML}</div>`;
  }

  window.toggleStopHero = function (el, evt) {
    if (evt && evt.target.closest('a, button')) return;
    const expanded = el.classList.toggle('is-expanded');
    el.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  };

  window.stopHeroKeydown = function (evt, el) {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
      window.toggleStopHero(el, evt);
    }
  };

  window.goToDay = function (dateStr) {
    showSection('itinerario');
    setTimeout(() => {
      const card = document.getElementById('day-' + dateStr);
      if (!card) return;
      card.classList.add('open');
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

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

      ${renderStopCarousel()}

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
        ${statusCard('Hospedajes',   confHotels,  DATA.accommodations.length, '#9FD8B0')}
        ${statusCard('Traslados',    confTrans,   DATA.transports.length,     '#8FC7F2')}
        ${statusCard('Entradas',     confTickets, DATA.tickets.length,        '#B7A9F0')}
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
      const iconMod  = isFlight ? 'transport-type-icon--flight' : 'transport-type-icon--train';
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
            <span class="transport-type-icon ${iconMod}">${icon}</span>
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
