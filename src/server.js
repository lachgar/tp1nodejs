import express from 'express';
import dotenv from 'dotenv';
import fs from 'node:fs';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './middlewares/error.middleware.js';
import productRoutes from './routes/product.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const swaggerFile = new URL('./docs/swagger-output.json', import.meta.url);

await import('../swagger.js');

const swaggerDocument = JSON.parse(
  fs.readFileSync(swaggerFile, 'utf8')
);

// Middleware pour parser le JSON
app.use(express.json());

// Route de test basique
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API REST Product - LAB 5' });
});

// Enregistrement des routes des produits
app.use('/api/products', productRoutes);

app.get('/api-docs.json', (req, res) => {
  res.json(swaggerDocument);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ success: false, error: { message: 'Route non trouvée' } });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
