import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../templates/firebase-config.js";
import { collection, addDoc } from "firebase/firestore";

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const registerError = document.getElementById("registerError");

    try {
        // Registra al usuario en Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Guarda el usuario en Firestore
        await addDoc(collection(db, "users"), {
            email: user.email,
            userId: user.uid,
            createdAt: new Date()
        });

        
        // Redirecciona al usuario a la página de login
        window.location.href = "/login";
    } catch (error) {
        registerError.textContent = "Error al registrar. Intentar de nuevo.";
    }
});
