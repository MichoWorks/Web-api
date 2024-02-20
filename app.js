require('dotenv').config(); // Load system configuration file
const mongoose = require('mongoose'); // MongoDB connection library
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const morgan = require('morgan');

const arr = ['192.166.1.1', '::1', '1.1.1.1', '62.90.76.236', '192.168.1.216'];
const app = express();

// Middleware for IP filtering
app.use((req, res, next) => {
    if (arr.includes(req.ip)) {
        return next();
    }
    return res.status(403).json({ msg: 'NOT AUTHORIZED' });
});

// MongoDB connection
const ConnStr = process.env.MONGO_CONN; // Get MongoDB connection string from environment variables

const twentyMin = 1000 * 60 * 20; // 20 minutes in milliseconds
app.use(session({
    secret: 'Ben2552001',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: twentyMin },
    store: MongoStore.create({
        mongoUrl: ConnStr + 'SessionDb',
        collectionName: 'sessionsTable'
    })
}));

mongoose.connect(ConnStr + 'ecom')
    .then(() => {
        console.log('Connected To MongoDB ✅');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// MySQL connection
var mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Ben2552001',
    database: 'ecom'
});

mysqlConnection.connect(err => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    console.log('Connected to MySQL ✅');
});

global.db = mysqlConnection; // Assigning the MySQL connection to global.db

module.exports = app;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const productRouter = require('./api/v1/routes/product');
const userRouter = require('./api/v1/routes/user');
const categoryRouter = require('./api/v1/routes/category');

app.use('/product', productRouter);
app.use('/user', userRouter);
app.use('/category', categoryRouter);

// 404 handling
app.all('*', (req, res) => {
    return res.status(404).json({ msg: 'not found' });
});
