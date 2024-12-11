const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const mysql = require('mysql');
const multer = require('multer');

const app = express();
const PORT = 3000;

// Configuración para manejar las imágenes subidas
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes subidas
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nombre único para cada archivo
    }
});
const upload = multer({ storage: storage });

// Crear conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: '', 
    database: 'ruta_sabor' // Cambia el nombre de la base de datos si es necesario
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL como ID ' + connection.threadId);
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'your_secret_key', // Cambia tu clave secreta
    resave: false,
    saveUninitialized: true
}));

// Ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname)));
app.use('/uploads', express.static('uploads')); // Ruta para acceder a las imágenes subidas

// Ruta para obtener productos
app.get('/api/products', (req, res) => {
    const query = 'SELECT * FROM producto'; // Cambia esto al nombre de tu tabla

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los productos:', err);
            return res.status(500).json({ error: 'Error al obtener los productos' });
        }

        res.json(results);
    });
});
//traer productos solo con el nombre del negocio

app.get('/api/productosN', async (req, res) => {
    const nombreNegocio = req.query.nombreNegocio;
    const query = 'SELECT * FROM producto WHERE nombrenegocio = ?';
    connection.query(query, [nombreNegocio], (err, results) => {
        if (err) {
            console.error('Error al obtener los productos:', err);
            return res.status(500).json({ error: 'Error al obtener los productos' });
        }

        res.json(results);
    }
    );
});

// Ruta para obtener negocios
app.get('/api/negocios', (req, res) => {
    
    const query = 'SELECT * FROM negocio'; // Cambia esto al nombre de tu tabla

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los negocios:', err);
            return res.status(500).json({ error: 'Error al obtener los negocios' });
        }

        res.json(results);
    });
});
// Rutas

// Página de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/home.html'));
});
// Página de inicio
app.get('/Experimentacion', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/Experimentacion.html'));
});

// Página de ventas
app.get('/sales', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/sales.html'));
});

// Procesar formulario de publicación de producto
app.post('/upload-product', upload.single('productImage'), (req, res) => {
    const { productName, productDescription, productPrice, nombrenegocio,productEmail, productCategory, productStock, productLocation } = req.body;// Datos del formulario
    const productImage = req.file ? '/uploads/' + req.file.filename : null; // Ruta de la imagen subida

    // Consulta SQL para insertar el producto en la base de datos
    const query = `
        INSERT INTO producto (nombre,nombrenegocio, email, categoria, stock, precio, descripcion, imagen, ubicacion) 
        VALUES (?, ?,?, ?, ?, ?, ?, ?, ?)
    `;
    connection.query(query, [
        productName, 
        nombrenegocio,
        productEmail, 
        productCategory, 
        productStock, 
        productPrice, 
        productDescription, 
        productImage, 
        productLocation
    ], (err, results) => {
        if (err) {
            console.error('Error al insertar producto:', err);
            return res.status(500).send('Error al publicar producto');
        }
        res.send('Producto publicado exitosamente! <a href="/sales">Volver a ventas</a>');
    });
});
//formulario de publicación de negocio
app.post('/upload-negocio', upload.single('productImage'), (req, res) => {
    const { productName, productDescription, productEmail, productCategory, productLocation,productHorarioabierto,productHorarioCerrado } = req.body;// Datos del formulario
    const productImage = req.file ? '/uploads/' + req.file.filename : null; // Ruta de la imagen subida

    // Consulta SQL para insertar el producto en la base de datos
    const query = `
        INSERT INTO negocio (nombre, descripcion, ubicacion, categoria, imagen, horario, horario_cerrado) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
   
    connection.query(query, [
        productName, 
        productDescription,
        productLocation, 
        productEmail, 
        productImage, 
        productHorarioabierto,
        productHorarioCerrado
    ], (err, results) => {
        if (err) {
            console.error('Error al insertar negocio:', err);
            return res.status(500).send('Error al publicar negocio');
        }
        res.send('negocio publicado exitosamente! <a href="/sales">Volver a ventas</a>');
    });
}
);

// Página de Login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/login.html'));
});

// Procesar Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    connection.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error al procesar el login:', err);
            return res.status(500).json({ error: 'Error al procesar el login' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const user = results[0];
        if (user.password !== password) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Establecer la sesión
        req.session.loggedIn = true;
        req.session.username = username;
        res.json({ success: true });
    });
});

// Ruta para verificar si el usuario está autenticado
app.get('/is-authenticated', (req, res) => {
    if (req.session.loggedIn) {
        const query = 'SELECT username FROM users WHERE username = ?';
        connection.query(query, [req.session.username], (err, results) => {
            if (err) {
                console.error('Error al obtener el email:', err);
                return res.status(500).json({ error: 'Error al obtener el email' });
            }

            if (results.length > 0) {
                res.json({ authenticated: true, username: req.session.username, email: results[0].email });
            } else {
                res.json({ authenticated: true, username: req.session.username, email: null });
            }
        });
    } else {
        res.json({ authenticated: false });
    }
});
// Ruta para verificar si el usuario está autenticado
app.get('/is-authenticated2', (req, res) => {
    if (req.session.loggedIn) {
        const query = 'SELECT email FROM users WHERE username = ?';
        connection.query(query, [req.session.username], (err, results) => {
            if (err) {
                console.error('Error al obtener el email:', err);
                return res.status(500).json({ error: 'Error al obtener el email' });
            }
            if (results.length > 0) {
                res.json({ authenticated: true, username: req.session.username, email: results[0].email });
            } else {
                res.json({ authenticated: true, username: req.session.username, email: null });
            }
        });
    } else {
        res.json({ authenticated: false });
    }
});

// Página de registro
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/register.html'));
});


// Página de sales menu
app.get('/salesMenu', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/salesMenu.html'));
});


// Página de sales vendedor
app.get('/salesV', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/salesVendedor.html'));
});
// Procesar Registro
app.post('/register', (req, res) => {
    const { username, password, email } = req.body;

    const checkQuery = 'SELECT * FROM users WHERE username = ?';
    connection.query(checkQuery, [username], (err, results) => {
        if (err) {
            console.error('Error al verificar el usuario:', err);
            return res.status(500).send('Error al verificar el usuario');
        }

        if (results.length > 0) {
            return res.send('El nombre de usuario ya existe. <a href="/register">Intenta de nuevo</a>');
        }

        const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
        connection.query(query, [username, password, email], (err, results) => {
            if (err) {
                console.error('Error al registrar el usuario:', err);
                return res.status(500).send('Error al registrar el usuario');
            }
            res.send('Registro exitoso! <a href="/login">Iniciar sesión</a>');
        });
    });
});
// eliminar negocio
app.delete('/api/delete-negocio/:id', (req, res) => {
    const negocioId = req.params.id; // Extrae el ID del negocio desde la URL
    const query = `DELETE FROM negocio WHERE id = ?`; // Consulta SQL para eliminar

    connection.query(query, [negocioId], (err, results) => {
        if (err) {
            console.error('Error al eliminar negocio:', err);
            return res.status(500).send('Error al eliminar negocio');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Negocio no encontrado');
        }

        res.send('Negocio eliminado exitosamente');
    });
});

// eliminar producto
app.delete('/api/delete-producto/:id', (req, res) => {
    const productoId = req.params.id; // Extrae el ID del producto desde la URL
    const query = `DELETE FROM producto WHERE id = ?`; // Consulta SQL para eliminar

    connection.query(query, [productoId], (err, results) => {
        if (err) {
            console.error('Error al eliminar producto:', err);
            return res.status(500).send('Error al eliminar producto');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Producto no encontrado');
        }

        res.send('Producto eliminado exitosamente');
    });
});




// Cerrar sesión
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
