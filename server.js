require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const corsOptions = require('./config/cors');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/authRoutes');
const learningPathRoutes = require('./routes/learningPathRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');
const jobRoutes = require('./routes/jobRoutes');
const dataViewerRoutes = require('./routes/dataViewerRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Backend is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/learning-paths', learningPathRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/data', dataViewerRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Edssentials Backend API', version: '1.0.0' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});
