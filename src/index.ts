import fastify from 'fastify';

const app = fastify({ logger: true });

app.get('/', async () => {
  return { hello: 'docker' };
});

const port = process.env.PORT ?? 8080;

const start = async () => {
  try {
    await app.listen(port, '0.0.0.0');
  } catch (e) {
    app.log.error(e);
    process.exit(1);
  }
};
start();
