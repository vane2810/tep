// app.js o server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const { sequelize } = require('./config/database'); 
const authRoutes = require('./routes/auth');
const progresoRoutes = require('./routes/progreso'); 
const userRoutes = require('./routes/users');
const relationshipRoutes = require('./routes/relationships');
const topicsRoutes = require('./routes/topics');
const subtopicRoutes = require('./routes/subtopics');
const contentsRoutes = require('./routes/contents');
const stepsRoutes = require('./routes/steps');
const gamesRoutes = require('./routes/games');
const instructionsRoutes = require('./routes/instructions');
const gamRoutes = require('./routes/gamecomponent');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); 
app.use(bodyParser.json());
app.use('/api/auth', authRoutes); // Ruta autenticación
app.use('/api/progreso', progresoRoutes); // Ruta para progreso
app.use('/api/users', userRoutes); // Ruta para los usuarios
app.use('/api/relationships', relationshipRoutes); // Ruta para las relaciones
app.use('/api/topics', topicsRoutes);
app.use('/api/subtopics', subtopicRoutes);
app.use('/api/contents', contentsRoutes);
app.use('/api/steps', stepsRoutes);
app.use('/api/games', gamesRoutes);
app.use('/api/instructions', instructionsRoutes);
app.use('/api/gamecomponent', gamRoutes);


app.get('/', (req, res) => {
  res.send('¡Hola desde Express!');
});

// Sincroniza la base de datos y luego inicia el servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Error al conectarse a la base de datos:', err);
});
