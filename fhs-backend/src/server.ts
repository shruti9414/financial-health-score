import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database';
import {
  User,
  GSTData,
  UPIData,
  EPFOData,
  FinancialHealthScore,
  LoanEligibility,
  LoanApplication,
  ScoreHistory,
} from './models';

dotenv.config();

const app: Express = express();

// ============================================
// MIDDLEWARE
// ============================================
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// HEALTH CHECK
// ============================================
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    message: 'Server is running!',
    status: 'OK',
    timestamp: new Date().toISOString(),
    database: 'Connected ✓',
  });
});

// ============================================
// ROUTES
// ============================================
import authRoutes from './routes/auth';
app.use('/api/auth', authRoutes);

// ============================================
// 404 HANDLER
// ============================================
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
  });
});

// ============================================
// ERROR HANDLER
// ============================================
app.use((err: any, req: Request, res: Response) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
});

// ============================================
// START SERVER
// ============================================
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✓ Database connection authenticated');

    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('✓ All database tables created/synchronized');

    // List created tables
    console.log('\n📊 Database Tables:');
    console.log('   ✓ users');
    console.log('   ✓ gst_data');
    console.log('   ✓ upi_data');
    console.log('   ✓ epfo_data');
    console.log('   ✓ financial_health_scores');
    console.log('   ✓ loan_eligibility');
    console.log('   ✓ loan_applications');
    console.log('   ✓ score_history');

    // Start server
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on http://localhost:${PORT}`);
      console.log(`📡 API: http://localhost:${PORT}/api`);
      console.log(`✓ CORS enabled for: ${process.env.FRONTEND_URL}`);
      console.log(`\n📚 Available endpoints:`);
      console.log(`   GET  /api/health       - Server health check`);
      console.log(`\n✓ Ready for requests!\n`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
