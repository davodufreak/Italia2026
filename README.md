# ✈️ Zúrich → Roma · Guía de Viaje

Aplicación web personal para el viaje de David · Sep–Oct 2026.

## Estructura

```
travel-guide/
├── index.html     — Shell principal
├── styles.css     — Estilos
├── data.js        ← ✏️ EDITA AQUÍ tus reservas
├── app.js         — Lógica de la app
├── img/           — Fotos de las ciudades
├── scripts/
│   └── bump-cache-version.sh  — Cache busting (correr antes de cada commit)
└── README.md
```

## Cómo actualizar información

Abre `data.js` y edita los campos que tengas confirmados:

- `null` → todavía pendiente
- `"confirmed"` → confirma el status
- Rellena `name`, `confirmation`, `address`, etc. con tus datos reales

## Publicación

Este sitio corre en GitHub Pages: **Settings → Pages → Source: main / root**

GitHub Pages cachea los archivos por ~10 minutos, y Safari/iOS puede
quedarse con esa copia vieja de `styles.css`, `app.js` o `data.js` incluso
después. Para evitarlo, `index.html` carga esos tres archivos con un
parámetro de versión (`app.js?v=YYYYMMDDHHMMSS`) que hay que actualizar en
cada deploy.

**Antes de cada `git commit` / `git push`**, corre:

```bash
./scripts/bump-cache-version.sh
```

Esto reescribe el `?v=` de `styles.css`, `data.js` y `app.js` en
`index.html` con la fecha/hora actual (UTC), forzando a los navegadores a
pedir la versión nueva en vez de servir la cacheada. Después agrega
`index.html` al commit junto con tus demás cambios:

```bash
./scripts/bump-cache-version.sh
git add index.html
git commit -m "..."
git push
```

Si alguna vez el sitio se ve desactualizado en el momento (sin esperar el
próximo deploy), también existe el botón **Actualizar** en la esquina
superior de la app, que limpia cachés y vuelve a pedir todo desde el
navegador.

## Secciones

| Sección     | Contenido                                       |
|-------------|--------------------------------------------------|
| Resumen     | Vista general, estadísticas, estado de reservas |
| Itinerario  | Día a día, actividades por ciudad               |
| Hospedajes  | Hoteles, fechas, confirmaciones                 |
| Traslados   | Vuelos y trenes con todos los detalles          |
| Entradas    | Tickets a museos, urgencias y links de compra   |
