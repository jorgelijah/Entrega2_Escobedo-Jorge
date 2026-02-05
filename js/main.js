/* VARIABLES GLOBALES Y SELECTORES */
let listaServicios = [];
let bancoPreguntas = [];
let indicePreguntaActual = 0;
let puntajeTotal = 0;
let eleccionTemporal = 0;

const contenedorTitulo = document.querySelector("#titulo-servicio");
const contenedorDescripcion = document.querySelector("#descripcion-servicio");
const contenedorPuntos = document.querySelector("#lista-puntos");
const botonesOpcion = document.querySelectorAll('[name="service-toggle"]');

const quizProgreso = document.querySelector("#quiz-progreso");
const quizPregunta = document.querySelector("#quiz-pregunta");
const quizOpciones = document.querySelector("#quiz-opciones");
const botonSiguiente = document.querySelector("#btn-siguiente");
const quizContainer = document.querySelector("#quiz-container");

const formulario = document.querySelector("#form-contacto");
const inputNombre = document.querySelector("#form-nombre");
const inputEmail = document.querySelector("#form-email");

async function inicializarApp() {
  try {
    const response = await fetch("./data/data.json"); 
    const data = await response.json();

    listaServicios = data.servicios;
    bancoPreguntas = data.preguntas;

    mostrarPregunta(indicePreguntaActual);
    configurarServicios();
    precargarDatosUsuario();
  } catch (error) {
    console.error("Error al cargar la base de datos de Neuroa:", error);
  }
}

function configurarServicios() {
  botonesOpcion.forEach((boton) =>
    boton.addEventListener("change", (event) => {
      const servicioEncontrado = listaServicios.find(
        (item) => item.id === event.target.value,
      );
      if (servicioEncontrado) {
        contenedorTitulo.innerText = servicioEncontrado.titulo;
        contenedorDescripcion.innerText = servicioEncontrado.descripcion;

        contenedorPuntos.innerHTML = servicioEncontrado.puntos
          .map((punto) => `<li>${punto}</li>`)
          .join("");
      }
    }),
  );
}

function mostrarPregunta(indice) {
  const preguntaActual = bancoPreguntas[indice];
  quizPregunta.innerText = preguntaActual.texto;
  quizProgreso.innerText = `Pregunta ${indice + 1} de ${bancoPreguntas.length}`;

  quizOpciones.innerHTML = preguntaActual.opciones
    .map(
      (opcion) =>
        `<button type="button" data-puntos="${opcion.puntos}"><span>${opcion.texto}</span></button>`,
    )
    .join("");

  botonSiguiente.disabled = true;
}

quizOpciones.addEventListener("click", (event) => {
  const botonPresionado = event.target.closest("button");
  if (botonPresionado) {
    document
      .querySelectorAll("#quiz-opciones button")
      .forEach((b) => b.classList.remove("opcion-seleccionada"));
    botonPresionado.classList.add("opcion-seleccionada");

    eleccionTemporal = Number(botonPresionado.dataset.puntos);
    botonSiguiente.disabled = false;

    Toastify({
      text: "Opción registrada",
      duration: 1500,
      gravity: "bottom",
      position: "right",
      style: { background: "linear-gradient(to right, #2bb99a, #183f88)" },
    }).showToast();
  }
});

botonSiguiente.addEventListener("click", () => {
  puntajeTotal += eleccionTemporal;
  if (indicePreguntaActual < bancoPreguntas.length - 1) {
    indicePreguntaActual++;
    mostrarPregunta(indicePreguntaActual);
  } else {
    finalizarQuiz();
  }
});

function finalizarQuiz() {
  quizContainer.style.display = "none";
  let mensajeFinal = "";
  let icono = "info";

  if (puntajeTotal <= 10) {
    mensajeFinal = "Niveles bajos de saturación. ¡Buen equilibrio!";
    icono = "success";
  } else if (puntajeTotal <= 20) {
    mensajeFinal = "Señales moderadas de fatiga mental. Revisa tus descansos.";
    icono = "warning";
  } else {
    mensajeFinal =
      "Niveles altos de saturación. Tu sistema nervioso está en alerta.";
    icono = "error";
  }

  Swal.fire({
    title: "Resultado del Screening",
    text: `${mensajeFinal} (Puntaje: ${puntajeTotal})`,
    icon: icono,
    confirmButtonText: "Entendido",
    confirmButtonColor: "#2563eb",
  });
}

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const nuevaCita = {
    nombre: inputNombre.value,
    email: inputEmail.value,
    objetivo: document.querySelector("#form-objetivo").value,
    puntajeTest: puntajeTotal,
    fecha: new Date().toLocaleDateString(),
  };

  localStorage.setItem("ultimoRegistroNeuroa", JSON.stringify(nuevaCita));

  Swal.fire({
    title: "¡Solicitud Enviada!",
    text: `Gracias ${nuevaCita.nombre}, nos contactaremos pronto.`,
    icon: "success",
    confirmButtonColor: "#2563eb",
  });

  formulario.reset();
});

function precargarDatosUsuario() {
  const datosGuardados = JSON.parse(
    localStorage.getItem("ultimoRegistroNeuroa"),
  );
  if (datosGuardados) {
    inputNombre.value = datosGuardados.nombre || "";
    inputEmail.value = datosGuardados.email || "";
  }
}

inicializarApp();