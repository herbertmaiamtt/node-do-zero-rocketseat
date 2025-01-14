import { sql } from './db.js';

//sql`DROP TABLE IF EXISTS videos;`.then(() => {
// console.log('tabela apagada')
//})

(async () => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS videos (
        id          TEXT PRIMARY KEY,
        title       TEXT,
        description TEXT,
        duration    INTEGER
      );
    `;
    console.log('Tabela criada!');
  } catch (error) {
    console.error('Erro ao criar a tabela:', error.message);
  }
})();
