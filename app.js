const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// routes
app.get('/api', (_, res) => {
  res.json({ message: 'Hello, World!' });
});

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () =>
  console.log(`[⚡Server] is alive on http://localhost:${PORT}`)
);
