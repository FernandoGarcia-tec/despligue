document.addEventListener("DOMContentLoaded", function() {
    // Verificar si el usuario está autenticado
    fetch('/is-authenticated')
        .then(response => response.json())
        .then(data => {
            if (data.authenticated) {
                // Ocultar el botón de login si el usuario está autenticado
                const loginLink = document.getElementById("login-link");
                if (loginLink) {
                    loginLink.style.display = "none";
                    
                }

                const welcomeMessage = document.getElementById("welcome-message");
                const showmen = document.getElementById("showmen");
                if (welcomeMessage) {
                    welcomeMessage.style.display = "block";
                    showmen.style.display = "block";
                    document.getElementById("username").textContent = data.username;

                    // Completar el campo de email con el email del usuario
                    document.getElementById("productEmail").value = data.email; // Cambiado a 'value'
                }
            }
        })
        .catch(error => console.error('Error al verificar autenticación:', error));
});

