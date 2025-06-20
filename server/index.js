require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const modules = require('./models/model');
const router = require('./routers/index');
const cors = require('cors');
const errorHandler = require('./middleware/errorMiddleware');
const path = require('path');

const PORT = process.env.PORT || 5000

const app = express();

const corsOptions = {
  origin: '*',
  methods: '*',
  allowedHeaders: '*',
  exposedHeaders: '*',
};


app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use(errorHandler)

const start = async () => {
  await sequelize.authenticate();
  await sequelize.sync();

  app.listen(PORT, () => console.log(`Сервер работает на порту: ${PORT}`));
};

start();
