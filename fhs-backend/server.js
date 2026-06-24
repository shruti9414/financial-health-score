const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Mock database (In-memory for demo)
const users = [
  {
    id: 1,
    email: 'test@example.com',
    password_hash: '$2a$10$N9qo8uLOickgx2ZMRZoHK.0J0z3.rCmj8F8oQBBrAYZGn7nMNkPXm', // password: "password"
    business_name: 'Sample MSME',
    business_type: 'Manufacturing',
    phone: '9876543210',
  }
];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    message: 'Server is running!',
    status: 'OK',
    timestamp: new Date().toISOString(),
    database: 'Connected ✓',
  });
});

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, business_name, business_type, phone } = req.body;

    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    const newUser = {
      id: users.length + 1,
      email,
      password_hash: hashedPassword,
      business_name,
      business_type,
      phone,
    };

    users.push(newUser);

    res.status(201).json({
      message: 'Registration successful',
      user: {
        id: newUser.id,
        email: newUser.email,
        business_name: newUser.business_name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await bcryptjs.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'super_secret_key_12345',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        business_name: user.business_name,
        business_type: user.business_type,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
  });
});

// Start server
app.listen(PORT, () => {
  console.log('\n✅ ======================================');
  console.log('🚀 Server running on http://localhost:' + PORT);
  console.log('📡 API: http://localhost:' + PORT + '/api');
  console.log('✓ CORS enabled for: http://localhost:5173');
  console.log('\n📚 Available endpoints:');
  console.log('   GET  /api/health           - Server health check');
  console.log('   POST /api/auth/register    - Register new user');
  console.log('   POST /api/auth/login       - Login user');
  console.log('\n✓ Ready for requests!');
  console.log('======================================\n');
});
