import { sql } from './bd.js';

sql`
CREATE TABLE videos(
  id TEXT PRIMARY KEY,
  titulo TEXT,
  descricao TEXT,
  duracao INTEGER
);
`.then(() => {
  console.log('Tabela criada com sucesso...!')
});