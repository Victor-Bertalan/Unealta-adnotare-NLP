const fastify = require('fastify')({ logger: true, bodyLimit: 5242880 })
const fs = require('fs');
const text_path = '../dataset/' + process.argv[2] + '/'

let labels = []
let idx = 0
let history = []
let dataset = {}

let model_name = ''
let dataset_name = ''

const files = fs.readdirSync(text_path)

files.forEach(file => {
  if (file.endsWith('model_output.json')) dataset_name = file
  if (file.endsWith('.py')) model_name = file
})

const texts = require(text_path + dataset_name)
for (let entry of Object.values(texts))
  for(let tag of Object.values(entry))
    if (!labels.includes(tag[3])) labels.push(tag[3])

fastify.register(require('fastify-cors'), {
})

fastify.decorate(dataset)
fastify.decorate(history)
fastify.decorate(idx)
// Declare a route

fastify.get('/get_names', async (request, reply) => {
  return {
    model: model_name.split('.')[0],
    dataset: dataset_name.split('.')[0],
  }
})

fastify.get('/get_dataset', async (request, reply) => {
  return dataset
})

fastify.get('/get_model', async (request, reply) => {
  return model
})

fastify.get('/get_text', async (request, reply) => {
  try {
    if (!Object.entries(texts)[idx]) {
      throw new Error('No more examples')
    }
    return Object.entries(texts)[idx]
  } catch (e) {
    return e.message
  }
})

fastify.get('/get_next_text', async (request, reply) => {
  idx += 1
  try {
    if (!Object.entries(texts)[idx]) {
      throw new Error('No more examples')
    }
    return Object.entries(texts)[idx]
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

const send_text_opts = {
  schema: {
    querystring: {
      text: { type: 'string' },
      answer: { type: 'string' }
    }
  }
}

fastify.post('/send_text', send_text_opts, async (request, reply) => {
  const data = await request.body
  history.push(data)
  return history
})

fastify.get('/get_history', async (request, reply) => {
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