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

/* EVALUACIÓN SCREENING */

class Pregunta {
  constructor(id, texto, opciones) {
    this.id = id;
    this.texto = texto;
    this.opciones = opciones;
  }
}

const pregunta1 = new Pregunta(
  1,
  "¿Con qué frecuencia sientes que no puedes concentrarte en una sola tarea por más de 15 minutos?",
  [
    {
      texto: "Rara vez",
      puntos: 1,
    },
    {
      texto: "A veces",
      puntos: 3,
    },
    {
      texto: "Casi siempre",
      puntos: 5,
    },
  ],
);

const pregunta2 = new Pregunta(
  2,
  "Al terminar tu día laboral, ¿qué tan difícil te resulta desconectar de los pendientes y el uso de pantallas?",
  [
    {
      texto: "Fácil",
      puntos: 1,
    },
    {
      texto: "Me toma tiempo",
      puntos: 3,
    },
    {
      texto: "Imposible",
      puntos: 5,
    },
  ],
);

const pregunta3 = new Pregunta(
  3,
  "¿Sientes fatiga mental o 'niebla cerebral' incluso después de haber dormido?",
  [
    {
      texto: "Nunca",
      puntos: 1,
    },
    {
      texto: "Ocasionalmente",
      puntos: 3,
    },
    {
      texto: "Muy seguido",
      puntos: 5,
    },
  ],
);

const pregunta4 = new Pregunta(
  4,
  "¿Sientes la necesidad de revisar tu teléfono o buscar estímulos digitales apenas tienes un momento libre?",
  [
    {
      texto: "No",
      puntos: 1,
    },
    {
      texto: "A veces",
      puntos: 3,
    },
    {
      texto: "Constantemente",
      puntos: 5,
    },
  ],
);

const pregunta5 = new Pregunta(
  5,
  "¿Has notado tensión física (cuello, mandíbula) relacionada con tu carga mental últimamente?",
  [
    {
      texto: "Nada",
      puntos: 1,
    },
    {
      texto: "Un poco",
      puntos: 3,
    },
    {
      texto: "Mucha tensión",
      puntos: 5,
    },
  ],
);

const bancoPreguntas = [pregunta1, pregunta2, pregunta3, pregunta4, pregunta5];

let quizProgreso = document.querySelector("#quiz-progreso");
let quizPregunta = document.querySelector("#quiz-pregunta");
let quizOpciones = document.querySelector("#quiz-opciones");
let botonSiguiente = document.querySelector("#btn-siguiente");
let quizContainer = document.querySelector("#quiz-container");
let resultadoContainer = document.querySelector("#resultado-container");
let resultadoTexto = document.querySelector("#resultado-texto");

let indicePreguntaActual = 0;
let puntajeTotal = 0;
let eleccionTemporal = 0;

function mostrarPregunta(indice) {
  let preguntaActual = bancoPreguntas[indice];
  quizPregunta.innerText = preguntaActual.texto;
  quizProgreso.innerText = `Pregunta ${indice + 1} de ${bancoPreguntas.length}`;
  quizOpciones.innerHTML = "";
  botonSiguiente.disabled = true;

  /* cambio de opciones */
  preguntaActual.opciones.forEach((opcion) => {
    quizOpciones.innerHTML += `
    <button type="button" data-puntos="${opcion.puntos}">
      <span>${opcion.texto}</span>
    </button>
    `;
  });
}

quizOpciones.addEventListener("click", (event) => {
  let botonPresionado = event.target.closest("button");

  if (botonPresionado) {
    const todosLosBotones = quizOpciones.querySelectorAll("button");
    todosLosBotones.forEach((boton) =>
      boton.classList.remove("opcion-seleccionada"),
    );
    botonPresionado.classList.add("opcion-seleccionada");
    eleccionTemporal = Number(botonPresionado.dataset.puntos);
    botonSiguiente.disabled = false;
    console.log("Visual y lógica actualizados. Valor:", eleccionTemporal);
  }
});

mostrarPregunta(indicePreguntaActual);

botonSiguiente.addEventListener("click", () => {
  puntajeTotal += eleccionTemporal;
  eleccionTemporal = 0;
  if (indicePreguntaActual < bancoPreguntas.length - 1) {
    indicePreguntaActual++;
    mostrarPregunta(indicePreguntaActual);
  } else {
    quizContainer.style.display = "none";
    resultadoContainer.style.display = "block";

    let mensajeFinal = "";
    if (puntajeTotal <= 10) {
      mensajeFinal =
        "Tus niveles de saturación son bajos. ¡Buen trabajo manteniendo el equilibrio!";
    } else if (puntajeTotal <= 20) {
      mensajeFinal =
        "Presentas señales moderadas de fatiga mental. Sería ideal revisar tus protocolos de descanso.";
    } else {
      mensajeFinal =
        "Tus niveles de saturación son altos. Tu sistema nervioso podría estar en alerta constante.";
    }

    resultadoTexto.innerText = `${mensajeFinal} (Puntaje: ${puntajeTotal} puntos)`;
  }
});

/* FORMULARIO */

const formulario = document.querySelector("#form-contacto");
const mensajeExito = document.querySelector("#mensaje-exito");

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const nuevaCita = {
    nombre: document.querySelector("#form-nombre").value,
    email: document.querySelector("#form-email").value,
    objetivo: document.querySelector("#form-objetivo").value,
    mensaje: document.querySelector("#form-mensaje").value,
    puntajeTest: puntajeTotal,
    fecha: new Date().toLocaleDateString()
  };

  const citaEnTextoJSON = JSON.stringify(nuevaCita);

  localStorage.setItem("ultimoRegistroNeuroa", citaEnTextoJSON);
  console.log("Datos guardados en LocalStorage como JSON:", citaEnTextoJSON);
  formulario.style.display = "none";
  mensajeExito.style.display = "block";
});