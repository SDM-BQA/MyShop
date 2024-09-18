import express from 'express';
import cors from 'cors';
import huggingfaceRoutes from './routes/routes.js'; // Use the correct path and filename

const app = express();

app.use(cors()); // Enable CORS if necessary
app.use(express.json()); // For parsing application/json

// Use the /api/v1 route prefix for all routes in huggingfaceRoutes
app.use('/api/v1/huggingface', huggingfaceRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
