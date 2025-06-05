// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  const events = document.querySelectorAll(".event");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.3 // Muestra el evento cuando está 30% visible
  });

  events.forEach(event => {
    observer.observe(event);
  });
});
