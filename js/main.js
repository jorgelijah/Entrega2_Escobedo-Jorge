/* SERVICIOS */

class Servicios {
  constructor(id, titulo, descripcion, puntos) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.puntos = puntos;
  }
}

const enfoque = new Servicios(
  "Focus",
  "Optimiza tu Rendimiento Cognitivo",
  "Nuestro enfoque basado en neurociencia te ayuda a dominar el enfoque, eliminar distracciones digitales y recalibrar las vías de recompensa de tu cerebro para el trabajo profundo.",
  [
    "Mapeo del lapso de atención",
    "Protocolos de detox de dopamina",
    "Entrenamiento en neuro-eficiencia",
  ],
);

const estres = new Servicios(
  "Stress",
  "Neuro-Resiliencia y Equilibrio",
  "Aprende a regular tu sistema nervioso autónomo. Utilizamos técnicas validadas para reducir el cortisol y mejorar tu respuesta biológica ante situaciones de alta presión.",
  [
    "Biofeedback de variabilidad cardíaca",
    "Regulación del nervio vago",
    "Gestión de carga alostática",
  ],
);

const clinica = new Servicios(
  "Clinical",
  "Psicoterapia Basada en Evidencia",
  "Abordaje clínico profundo para ansiedad, depresión y trauma, integrando neurobiología con terapia cognitivo-conductual de última generación para una recuperación sostenible.",
  [
    "Evaluación diagnóstica integral",
    "Protocolos TCC de vanguardia",
    "Monitoreo de bienestar digital",
  ],
);

const listaServicios = [enfoque, estres, clinica];

let botonesOpcion = document.querySelectorAll('[name="service-toggle"]');
let contenedorTitulo = document.querySelector("#titulo-servicio");
let contenedorDescripcion = document.querySelector("#descripcion-servicio");
let contenedorPuntos = document.querySelector("#lista-puntos");

botonesOpcion.forEach((boton) =>
  boton.addEventListener("change", (event) => {
    let servicioEncontrado = listaServicios.find(
      (item) => item.id === event.target.value,
    );
    contenedorTitulo.innerText = servicioEncontrado.titulo;
    contenedorDescripcion.innerText = servicioEncontrado.descripcion;
    contenedorPuntos.innerHTML = "";
    servicioEncontrado.puntos.forEach(
      (punto) => (contenedorPuntos.innerHTML += `<li>${punto}</li>`),
    );
  }),
);
