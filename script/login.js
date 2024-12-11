import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../templates/firebase-config.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const loginError = document.getElementById("loginError");

    try {
        await signInWithEmailAndPassword(auth, email, password);
        // Redirecciona al usuario a la página principal después del login
        window.location.href = "/sales";
    } catch (error) {
        loginError.textContent = "Error al iniciar sesión. Intentar de nuevo.";
    }
    
});
