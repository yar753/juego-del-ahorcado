// Lista de palabras para adivinar
const palabras = ["tierra", "nieve", "florón", "ratón", "selvas", "polaco", "jardín", "clavos", "felino", "calmar", "aguado"];
let palabraAleatoria;
let palabraOculta;
let intentos;
let tiempo;
let temporizador;

// Referencias a elementos del DOM
const letraInput = document.getElementById("letra");
const evaluarLetraBtn = document.getElementById("evaluarLetra");
const palabraOcultaElement = document.getElementById("palabraOculta");
const volverBtn = document.getElementById("volver");
const imagenAhorcado6 = document.getElementById("imagenAhorcado6"); 
const imagenAhorcado5 = document.getElementById("imagenAhorcado5");
const imagenAhorcado4 = document.getElementById("imagenAhorcado4");
const imagenAhorcado3 = document.getElementById("imagenAhorcado3");
const imagenAhorcado2 = document.getElementById("imagenAhorcado2");
const imagenAhorcado1 = document.getElementById("imagenAhorcado1");
const imagenAhorcado01 = document.getElementById("imagenAhorcado01");

// Evento para iniciar el juego
document.getElementById("iniciar").addEventListener("click", iniciarJuego);

// Función para iniciar el juego
function iniciarJuego() {
  palabraAleatoria = palabras[Math.floor(Math.random() * palabras.length)];
  palabraOculta = Array(palabraAleatoria.length).fill("_");
  intentos = 6;
  tiempo = 90;

   // Ocultar el contenedor de inicio (título y botón "Iniciar Juego")
   document.getElementById("inicio").style.display = "none";
   
  // Configurar la interfaz
  document.getElementById("iniciar").style.display = "none"; // Oculta el botón "Iniciar"
  document.querySelector(".contenedor").style.display = "block"; // Muestra el contenedor "Ahorcado"
  document.querySelector(".contenedor-juego").style.display = "block"; // Muestra el área de juego
  document.querySelector(".imagen-ahorcado").style.display = "block"; // Muestra la imagen del ahorcado

  // Mostrar la primera imagen del ahorcado
  if (imagenAhorcado6) {
    imagenAhorcado6.style.display = "block"; // Mostrar la imagen del ahorcado inicial
  }

  letraInput.disabled = false;
  letraInput.value = "";
  mostrarPalabra();
  document.getElementById("intentos").textContent = `Intentos: ${intentos}`;
  document.getElementById("tiempo").textContent = `Tiempo: ${tiempo} segundos`;

  // Iniciar el temporizador
  temporizador = setInterval(() => {
    tiempo--;
    document.getElementById("tiempo").textContent = `Tiempo: ${tiempo} segundos`;
    if (tiempo === 0) {
      terminarJuego(false);
    }
  }, 1000);

  // Evento para evaluar la letra ingresada
  evaluarLetraBtn.addEventListener("click", comprobarLetra);
}

// Función para mostrar la palabra en pantalla
function mostrarPalabra() {
  palabraOcultaElement.textContent = palabraOculta.join(" ");
}

// Función para comprobar la letra ingresada
function comprobarLetra() {
  const letra = letraInput.value.toLowerCase();
  if (letra.length === 1 && letra.match(/[a-zñ]/)) {
    let acierto = false;
    for (let i = 0; i < palabraAleatoria.length; i++) {
      if (palabraAleatoria[i] === letra) {
        palabraOculta[i] = letra;
        acierto = true;
      }
    }
    if (!acierto) {
      intentos--;
      document.getElementById("intentos").textContent = `Intentos: ${intentos}`;
      actualizarImagen(intentos);
    }
    mostrarPalabra();
    if (palabraOculta.join("") === palabraAleatoria) {
      terminarJuego(true);
    } else if (intentos === 0) {
      terminarJuego(false);
    }
    letraInput.value = ""; 
  }
}

// Función para actualizar la imagen según los intentos
function actualizarImagen(intentos) {
  switch (intentos) {
    case 5:
      imagenAhorcado6.style.display = "none";
      imagenAhorcado5.style.display = "block";
      break;
    case 4:
      imagenAhorcado5.style.display = "none";
      imagenAhorcado4.style.display = "block";
      break;
    case 3:
      imagenAhorcado4.style.display = "none";
      imagenAhorcado3.style.display = "block";
      break;
    case 2:
      imagenAhorcado3.style.display = "none";
      imagenAhorcado2.style.display = "block";
      break;
    case 1:
      imagenAhorcado2.style.display = "none";
      imagenAhorcado1.style.display = "block";
      break;
      case 0:
        imagenAhorcado1.style.display = "none";
        imagenAhorcado01.style.display = "block";
        break;
      
    default:
      break;
  }
}




// Función para terminar el juego
function terminarJuego(ganaste) {
    clearInterval(temporizador);
    letraInput.disabled = true;

    imagenAhorcado6.style.display = "none";
    imagenAhorcado5.style.display = "none";
    imagenAhorcado4.style.display = "none";
    imagenAhorcado3.style.display = "none";
    imagenAhorcado2.style.display = "none";
    imagenAhorcado1.style.display = "none";




    if (ganaste) {
      // Crear un contenedor para el mensaje de ganar
      const mensajeGanado = document.createElement("div");
      mensajeGanado.classList.add("mensaje-final"); // Reutiliza el mismo estilo
      mensajeGanado.innerHTML = `<p>¡Felicidades! Ganaste, la palabra es:<strong>${palabraAleatoria}</strong>.</p>`;
  
      // Añadir el mensaje al body
      document.body.appendChild(mensajeGanado);
  } else {
      // Muestra la última imagen
      imagenAhorcado01.style.display = "block"; // Muestra la última imagen
  
      // Crear un contenedor para el mensaje de perder
      const mensajePerdido = document.createElement("div");
      mensajePerdido.innerHTML = `<p>¡Perdiste! La palabra era: <strong>${palabraAleatoria}</strong>.</p>`;
      
      // Añadir la clase CSS para los estilos
      mensajePerdido.classList.add("mensaje-perdido");
      
      // Añadir el mensaje al body
      document.body.appendChild(mensajePerdido);
  }

  volverBtn.style.display = "block"; // Mostrar el botón para volver a jugar
}



// Evento para volver a jugar
volverBtn.addEventListener("click", () => {
  location.reload();
});

  





