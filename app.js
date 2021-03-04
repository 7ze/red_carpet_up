const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mount_routes = require('./routes');

const app = express();

// middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// mount routes
mount_routes(app);

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () =>
  console.log(`[⚡Server] is alive on http://localhost:${PORT}`)
);
