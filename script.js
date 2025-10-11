window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  const scrollPosition = window.scrollY;

  if (scrollPosition > 50) {
    header.classList.remove("transparent");
    header.classList.add("solid");
  } else {
    header.classList.remove("solid");
    header.classList.add("transparent");
  }
});

window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  const scrollPosition = window.scrollY;

  if (scrollPosition > 50) {
    header.classList.remove("transparent");
    header.classList.add("solid");
  } else {
    header.classList.remove("solid");
    header.classList.add("transparent");
  }
});

const btn = document.querySelector(".form-submit-btn");

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  // Validación de campos obligatorios
  const nombre = document.getElementById("nombre").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const motivo = document.getElementById("motivo").value;
  const mensaje = document.getElementById("mensaje").value.trim();

  // Comprobación de campos vacíos
  if (!nombre) {
    alert("Por favor, introduce tu nombre");
    return;
  }

  if (!apellidos) {
    alert("Por favor, introduce tus apellidos");
    return;
  }

  if (!email) {
    alert("Por favor, introduce tu email");
    return;
  }

  if (!telefono) {
    alert("Por favor, introduce tu teléfono");
    return;
  }

  if (!motivo) {
    alert("Por favor, selecciona un motivo de consulta");
    return;
  }

  if (!mensaje) {
    alert("Por favor, escribe tu mensaje");
    return;
  }

  // Validación de formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Por favor, introduce un email válido");
    return;
  }

  // Validación de teléfono (mínimo 9 dígitos)
  const telefonoRegex = /^[0-9]{9,}$/;
  if (!telefonoRegex.test(telefono.replace(/\s/g, ""))) {
    alert("Por favor, introduce un teléfono válido (mínimo 9 dígitos)");
    return;
  }

  const originalText = btn.textContent;
  btn.textContent = "Enviando...";
  btn.disabled = true;

  const serviceID = "default_service";
  const templateID = "template_9qb2vyl";

  // Recoger datos para debug o confirmación
  const formData = {
    nombre: nombre,
    apellidos: apellidos,
    email: email,
    telefono: telefono,
    motivo: motivo,
    mensaje: mensaje,
    fecha: new Date().toLocaleString("es-ES"),
  };

  console.log("Datos del formulario:", formData);

  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      btn.textContent = originalText;
      btn.disabled = false;
      alert(
        "¡Mensaje enviado correctamente! Te contactaremos pronto.\n\nResumen:\nNombre: " +
          nombre +
          " " +
          apellidos +
          "\nEmail: " +
          email +
          "\nTeléfono: " +
          telefono +
          "\nMotivo: " +
          document.querySelector("#motivo option:checked").textContent
      );
      document.getElementById("form").reset();
    },
    (err) => {
      btn.textContent = originalText;
      btn.disabled = false;
      alert(
        "Error al enviar el mensaje. Por favor, inténtalo de nuevo.\nCódigo de error: " +
          err.status +
          "\nMensaje: " +
          err.text
      );
    }
  );
});
