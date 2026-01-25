require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const userRoutes = require('./src/routes/users');
const noteRoutes = require('./src/routes/notes');
const categoryRoutes = require('./src/routes/categories');
const characterRoutes = require('./src/routes/characters');
const vocabularyRoutes = require('./src/routes/vocabularies');

const PORT = process.env.PORT;
const CONN = process.env.MONGO_URI;
const F_LINK = process.env.FRONT_END_LINK;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: `http://localhost:5000`,
    credentials: true,
}));

app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/notes', noteRoutes);
app.use('/characters', characterRoutes);
app.use('/vocabularies', vocabularyRoutes);

mongoose.connect(CONN)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log("Hello");
});