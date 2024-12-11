document.addEventListener("DOMContentLoaded", function() {// Esperar a que el DOM esté completamente cargado
    // Verificar si el usuario está autenticado
    fetch('/is-authenticated2')
        .then(response => response.json())
        .then(data => {
            if (data.authenticated ) {
                // Ocultar el botón de login si el usuario está autenticado
                const loginLink = document.getElementById("login-link");
                if (loginLink) {
                    loginLink.style.display = "none";
                }

                const welcomeMessage = document.getElementById("welcome-message");
                if (welcomeMessage) {
                    welcomeMessage.style.display = "block";
                    document.getElementById("username").textContent = data.username;

                    // Completar el campo de email con el email del usuario
                    document.getElementById("productEmail").value = data.email; // Cambiado a 'value'
                    console.log('Email del usuario:', data.email);
                }
            }
            else {
                // Mostrar el botón de login si el usuario no está autenticado
                const loginLink = document.getElementById("login-link");
                if (loginLink) {
                    loginLink.style.display = "block";
                    
                    window.location.href = "/login";
                }
            }
        })
        .catch(error => console.error('Error al verificar autenticación:', error));
});
