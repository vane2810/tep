import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    // Ruta del directorio de contenidos
    const directoryPath = path.join(process.cwd(), 'public/assets/materias/lenguaje/nivel1');

    // Leer archivos del directorio
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return res.status(500).json({ error: 'No se pudo listar los archivos.' });
      }

      // Filtrar solo los archivos con extensión válida, por ejemplo, `.json` o `.txt`
      const filteredFiles = files.filter((file) => file.endsWith('.json') || file.endsWith('.txt'));

      res.status(200).json({ archivos: filteredFiles });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al listar archivos.' });
  }
}
