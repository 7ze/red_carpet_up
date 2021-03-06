const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// mount routes
app.use('/users', require('./routes/auth'));

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () =>
  console.log(`[⚡Authentication Server] is alive on http://localhost:${PORT}`)
);
