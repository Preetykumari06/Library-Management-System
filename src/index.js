const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { sequelize } = require('./config/db');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
const errorHandler = require('./middlewares/errorHandler');
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrows', borrowRoutes);

app.get("/", (req,res) => {
    res.send("Welcome, Backend of Library Management System (LMS) API")
})


// Start Server
app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to database');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
    console.log(`Server is running on http://localhost:${PORT}`);
});
