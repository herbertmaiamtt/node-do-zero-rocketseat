    // SERVIDOR HTTP NATIVO
    //import { createServer } from 'node:http' // ecmascript modules

    /**
     * request traz informações da requisição sendo feita para a api
     * response é o objeto utilizado para enviar uma resposta para a requisição
     */
    //const server = createServer((request, response) =>{
        //response.write('Hello World')

        //return response.end()
    //})

    //server.listen(3333) // localhost: 3333





// SERVIDOR USANDO FASTIFY (MICRO FRAMEWORK)
import { fastify } from 'fastify'
//import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()
//const database = new DatabaseMemory()
const database = new DatabasePostgres() 

// métodos HTTP
server.post('/videos', async  (request, response) =>{
    const {title, description, duration} = request.body

    // cria objeto com informações do vídeo
    await database.create({
        title,
        description,
        duration,
        /**
         * quando as variáveis do request.body tem o mesmo nome do atributos
         * dos objetos, podemos usar a sintaxe acima, que reduz o texto comumente
         * utilizado no exemplo comentado abaixo
         */
        //title: 'Vídeo 01',
        //description: "Esse é o vídeo 01",
        //duration: 180,
    })

    return response.status(201).send()
})

server.get('/videos', async (request) =>{
    const search = request.query.search

    const videos = await database.list(search) 
    
    return videos
})

// utiliza route parameter
server.put('/videos/:id', async (request, response) =>{
    const videoId = request.params.id
    const { title, description, duration} = request.body

    await database.update(videoId, {
        title,
        description,
        duration,
    })
    /**
     * resposta 204 é uma resposta que obteve sucesso mas
     * não tem conteúdo na resposta
     */
    return response.status(204).send()
})

// utiliza route parameter
server.delete('/videos/:id', async (request, response) =>{
    const videoId = request.params.id

    await database.delete(videoId)

    return response.status(204).send()
})

/**
 * No fastify o método listen pede que seja usado um objeto com a porta do servidor
 * como parâmetro
 */
server.listen({ 
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333, 
})