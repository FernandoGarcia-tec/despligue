// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDgmC8f19bp-Ab_EueWOO5XlLBUJjSWic",
    authDomain: "rutasabor-25dd3.firebaseapp.com",
    projectId: "rutasabor-25dd3",
    storageBucket: "rutasabor-25dd3.appspot.com",
    messagingSenderId: "778820080885",
    appId: "1:778820080885:web:8e8dbe3f0585e55a0d21bc",
    measurementId: "G-M7XZ1L6YTQ"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form para agregar productos
const productForm = document.getElementById('product-form');

productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = productForm['product-name'].value;
    const price = productForm['product-price'].value;
    const image = productForm['product-image'].value;

    try {
        await addDoc(collection(db, 'products'), {
            name: name,
            price: price,
            image: image
        });
        alert("Producto publicado exitosamente!");
        productForm.reset();
        loadProducts(); // Recargar productos después de agregar
    } catch (error) {
        console.error("Error publicando el producto: ", error);
    }
});

// Función para cargar productos
async function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = ''; // Limpiar contenido anterior

    try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const productCard = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button class="add-to-cart">Agregar al carrito</button>
                </div>
            `;
            productsGrid.innerHTML += productCard;
        });
    } catch (error) {
        console.error("Error cargando los productos: ", error);
    }
}


// Cargar productos al iniciar
window.onload = function() {
    loadProducts();
};
