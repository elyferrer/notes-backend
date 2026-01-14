require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const userRoutes = require('./src/routes/users');
const noteRoutes = require('./src/routes/notes');
const categoryRoutes = require('./src/routes/categories');
const characterRoutes = require('./src/routes/characters');

const PORT = process.env.PORT;
const CONN = process.env.MONGO_URI;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/notes', noteRoutes);
app.use('/characters', characterRoutes);

mongoose.connect(CONN)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log("Hello");
});