# ✈️ Zúrich → Roma · Guía de Viaje

Aplicación web personal para el viaje de David · Sep–Oct 2026.

## Estructura

```
travel-guide/
├── index.html     — Shell principal
├── styles.css     — Estilos
├── data.js        ← ✏️ EDITA AQUÍ tus reservas
├── app.js         — Lógica de la app
└── README.md
```

## Cómo actualizar información

Abre `data.js` y edita los campos que tengas confirmados:

- `null` → todavía pendiente
- `"confirmed"` → confirma el status
- Rellena `name`, `confirmation`, `address`, etc. con tus datos reales

## Publicación

Este sitio corre en GitHub Pages: **Settings → Pages → Source: main / root**

## Secciones

| Sección     | Contenido                                       |
|-------------|--------------------------------------------------|
| Resumen     | Vista general, estadísticas, estado de reservas |
| Itinerario  | Día a día, actividades por ciudad               |
| Hospedajes  | Hoteles, fechas, confirmaciones                 |
| Traslados   | Vuelos y trenes con todos los detalles          |
| Entradas    | Tickets a museos, urgencias y links de compra   |
