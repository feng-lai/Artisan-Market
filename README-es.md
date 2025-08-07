
# 🚦 Visualización de Peligros de Tráfico

Este proyecto es un sistema de visualización de datos de peligros de tráfico desarrollado con **Vue.js**, **ECharts** y **Amap (Mapa Gaode)**. Permite la visualización interactiva de divisiones administrativas multinivel y presenta información de tráfico utilizando gráficos y mapas dinámicos en múltiples dimensiones.

---

## 🌍 Traducciones disponibles

- [English (README.md)](README.md)
- [日本語 (README‑jp.md)](README‑jp.md)
- [العربية (README‑ar.md)](README‑ar.md)
- [Português (README‑pt.md)](README‑pt.md)

---

## 📌 Funcionalidades

- 🌐 **Visualización de divisiones administrativas multinivel**  
  Compatible con vista interactiva a nivel de provincia, ciudad y distrito utilizando Amap y ECharts.

- 📊 **Múltiples tipos de gráficos**  
  Visualización de datos con gráficos de barras, líneas, circulares, mapas de calor y de dispersión.

- 🧭 **Interacción dinámica con el mapa**  
  Incluye desplazamiento con el mouse, zoom, clic para explorar y cambio de región.

- 🧩 **Visualización de datos multidimensional**  
  Presentación de datos desde perspectivas como tiempo, ubicación, gravedad del peligro y tipo de riesgo.

- 🔧 **Arquitectura modular y escalable**  
  Basado en componentes Vue.js para facilitar el desarrollo y la escalabilidad.

---

## 🛠️ Tecnologías Utilizadas

- **Framework Front-end**: [Vue.js](https://vuejs.org/)
- **Visualización de Datos**: [ECharts](https://echarts.apache.org/) + [Amap JS API](https://lbs.amap.com/)
- **Herramientas de Desarrollo**: Vue CLI, Axios, Node.js

---

## 🚀 Primeros Pasos

### Requisitos previos

- Node.js (versión 14 o superior)
- npm o yarn

### Instalar dependencias

```bash
npm install
# o
yarn install
````

### Iniciar el servidor de desarrollo

```bash
npm run serve
# o
yarn serve
```

Luego abre tu navegador en [http://localhost:8080](http://localhost:8080)

---

## 📁 Estructura del Proyecto

```
Visualization-of-Traffic-Hazards/
├── public/
│   └── index.html              # Plantilla HTML
├── src/
│   ├── assets/                 # Archivos estáticos
│   ├── components/             # Componentes Vue (mapas, gráficos, etc.)
│   ├── views/                  # Vistas principales
│   ├── router/                 # Configuración del enrutador
│   ├── App.vue                 # Componente raíz
│   └── main.js                 # Punto de entrada
├── .env                        # Variables de entorno
├── package.json
└── README-es.md
```

---

## 📈 Vista Previa

> Puedes ejecutar el proyecto localmente o desplegarlo en línea para una demostración interactiva.
> Agrega capturas de pantalla o un enlace si está disponible.

---

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT.
Puedes usarlo, modificarlo y redistribuirlo libremente con atribución adecuada.

---

## 🙌 Agradecimientos

* [Vue.js](https://vuejs.org/)
* [Apache ECharts](https://echarts.apache.org/)
* [Amap (Gaode Map) JS API](https://lbs.amap.com/)

