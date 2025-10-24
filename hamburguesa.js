/* ===================== HAMBURGUESA ===================== */
const menuToggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('.nav-list');

menuToggle.addEventListener('click', () => {
  navUl.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-list li a').forEach(link => {
  link.addEventListener('click', () => {
    navUl.classList.remove('active');
  });
});

/* ===================== MAPA INTERACTIVO ===================== */
const areas = document.querySelectorAll('area[data-zona]');
const infoZonas = document.querySelectorAll('.infoZona');

areas.forEach(area => {
  area.addEventListener('click', () => {
    const zona = area.dataset.zona;
    infoZonas.forEach(info => {
      if (info.id === zona) {
        info.style.display = info.style.display === 'none' ? 'block' : 'none';
      } else {
        info.style.display = 'none';
      }
    });
  });
});

/* ===================== MODALES ===================== */
function abrirModal(id) {
  const modal = document.getElementById(`modal${id}`);
  if (modal) {
    modal.style.display = "flex";
    setTimeout(() => modal.style.opacity = "1", 50);
  }
}

function cerrarModal(id) {
  const modal = document.getElementById(`modal${id}`);
  if (modal) {
    modal.style.opacity = "0";
    setTimeout(() => modal.style.display = "none", 500);
  }
}

// Cerrar modal al hacer clic fuera
window.addEventListener("click", (e) => {
  const modales = document.querySelectorAll('.modal');
  modales.forEach((modal, i) => {
    if (e.target === modal) cerrarModal(i + 1);
  });
});

// Cerrar modal con ESC
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const modales = document.querySelectorAll('.modal');
    modales.forEach((modal, i) => {
      if (modal.style.display === 'flex') cerrarModal(i + 1);
    });
  }
});

/* ===================== FADE-IN ===================== */
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.2 });

  fadeElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    observer.observe(el);
  });
});

/* ===================== FORMULARIO CONTACTO ===================== */
function nombreValido(nombre) {
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/.test(nombre.trim());
}

function emailValido(email) {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/.test(email.trim());
}

function mensajeValido(mensaje) {
  return mensaje.trim().length >= 10;
}

const form = document.getElementById("contactForm");
const msg = document.getElementById("form-msg");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = form.nombre.value;
    const email = form.correo.value;
    const mensaje = form.mensaje.value;

    if (!nombreValido(nombre)) {
      msg.textContent = "Por favor ingresa un nombre válido.";
      msg.style.color = "red";
      return;
    }

    if (!emailValido(email)) {
      msg.textContent = "Por favor ingresa un correo válido.";
      msg.style.color = "red";
      return;
    }

    if (!mensajeValido(mensaje)) {
      msg.textContent = "Por favor escribe un mensaje más largo (mínimo 10 caracteres).";
      msg.style.color = "red";
      return;
    }

    msg.textContent = "Enviando...";
    msg.style.color = "black";

    setTimeout(() => {
      msg.textContent = "Mensaje enviado correctamente ✅";
      msg.style.color = "green";
      form.reset();
    }, 1200);
  });
}




