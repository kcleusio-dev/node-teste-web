import { fastify } from 'fastify';
// import { DatabaseMemory } from './database-memory.js';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();
// const database = new DatabaseMemory();
const database = new DatabasePostgres();

server.post('/videos', async (request, reply) => {
  const { titulo, descricao, duracao } = request.body;

  await database.create({
    titulo,
    descricao,
    duracao
  })
  return reply.status(201).send();
}
);

server.get('/videos', async (request, reply) => {
  const search = request.query.search;
  // console.log(search);

  const videos = await database.list(search);
  return videos;
});

server.put('/videos/:id', async (request, reply) => {
  const videoId = request.params.id;
  const { titulo, descricao, duracao } = request.body;

  await database.update(videoId, {
    titulo,
    duracao,
    descricao
  });

  return reply.status(204).send();

});

server.delete('/videos/:id', async (request, reply) => {
  const videoId = request.params.id;
  await database.delete(videoId);
  return reply.status(204).send();
}
);

server.listen({
  port: process.env.PORT ?? 7777,
})