const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el middleware cors
const { sequelize } = require('./models'); // Asegúrate de que la ruta sea correcta
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Usa el middleware cors para permitir solicitudes desde cualquier origen
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('¡Hola desde Express!');
});

// Sincroniza la base de datos y luego inicia el servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
