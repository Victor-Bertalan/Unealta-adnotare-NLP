const fastify = require('fastify')({ logger: true })

const texts = ['ana are mere', 'ana avea mere', 'ana a mancat merele']
const labels = ['Label 1', 'Label 2', 'Label 3']
let idx = -1
let history = []

fastify.register(require('fastify-cors'), { 
})

fastify.decorate(history)
fastify.decorate(idx)
// Declare a route
fastify.get('/get_next_text', async (request, reply) => {
  idx += 1
  try {
    if (!texts[idx]) {
      throw new Error('No more examples')
    }
    return texts[idx]
  } catch (e) {
    return e.message
  }
})

fastify.get('/get_labels', async (request, reply) => {
  try {
    if (!labels) {
      throw new Error('No labels')
    }
    return labels
  } catch (e) {
    return e.message
  }
})

fastify.post('/send_text', async (request, reply) => {
  const data = await request.body
  history.push(JSON.parse(data))
  return history
})
// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()