// caja-sorpresa.js

const btnPlay = document.getElementById('btnPlay');
const letrasDiv = document.getElementById('letras');
const audio = document.getElementById('audio');
const mensajeInteractivo = document.getElementById('mensajeInteractivo');
const textarea = mensajeInteractivo.querySelector('textarea');
const btnGuardar = document.getElementById('btnGuardar');
const mensajeGuardado = document.getElementById('mensajeGuardado');

// Aquí pones la letra que quieres mostrar, línea por línea
const letraSorpresa = [
  "Quiero que sepas que esta sorpresa",
  "viene desde lo más profundo de mi corazón.",
  "Cada nota y cada palabra están dedicadas a ti.",
  "Espero que esta canción te haga sonreír,",
  "y que cada letra te recuerde cuánto te quiero.",
  "",
  "Gracias por estar siempre a mi lado.",
  "Eres mi inspiración, mi alegría y mi paz.",
  "",
  "Ahora, quiero que me cuentes cómo te sientes...",
];

// Función para mostrar la letra con efecto máquina de escribir
function escribirLetra(texto, indice = 0, callback) {
  if (indice < texto.length) {
    let linea = texto[indice];
    let i = 0;
    letrasDiv.textContent = ''; // limpio antes de escribir cada línea

    function escribirCaracter() {
      if (i < linea.length) {
        letrasDiv.textContent += linea.charAt(i);
        i++;
        setTimeout(escribirCaracter, 50);
      } else {
        letrasDiv.textContent += '\n'; // salto de línea
        setTimeout(() => escribirLetra(texto, indice + 1, callback), 300);
      }
    }
    escribirCaracter();
  } else {
    if (callback) callback();
  }
}

// Cuando termine la letra, mostrar el mensaje interactivo
function mostrarMensajeInteractivo() {
  mensajeInteractivo.style.display = 'flex';
  textarea.focus();

  // Mostrar mensaje guardado si existe
  const mensaje = localStorage.getItem('mensajeDeElla');
  if (mensaje) {
    mensajeGuardado.style.display = 'block';
    mensajeGuardado.textContent = `Tu mensaje guardado:\n${mensaje}`;
    textarea.value = mensaje;
  }
}

// Evento botón guardar mensaje
btnGuardar.addEventListener('click', () => {
  const texto = textarea.value.trim();
  if (texto.length > 0) {
    localStorage.setItem('mensajeDeElla', texto);
    mensajeGuardado.style.display = 'block';
    mensajeGuardado.textContent = `Tu mensaje guardado:\n${texto}`;
    alert('Mensaje guardado con éxito ❤️');
  } else {
    alert('Por favor escribe un mensaje antes de guardar.');
  }
});

// Control del botón reproducir
btnPlay.addEventListener('click', () => {
  if (audio.paused) {
    btnPlay.textContent = 'Reproduciendo...';
    audio.play();

    escribirLetra(letraSorpresa, 0, () => {
      btnPlay.textContent = 'Reproducir Sorpresa';
      mostrarMensajeInteractivo();
    });

  } else {
    audio.pause();
    btnPlay.textContent = 'Reproducir Sorpresa';
  }
});

// Si quieres que al terminar el audio se muestre el mensaje también:
audio.addEventListener('ended', () => {
  btnPlay.textContent = 'Reproducir Sorpresa';
  mostrarMensajeInteractivo();
});
