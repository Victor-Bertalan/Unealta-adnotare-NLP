const fastify = require('fastify')({ logger: true, bodyLimit: 5242880 })
const fs = require('fs');
const { spawn, exec } = require('child_process')

const text_path = '../custom_models_and_datasets/' + process.argv[2] + '/'
let labels = []
let idx = 0
let history = []
let dataset = {}
let texts = []
let model_name = ''
let dataset_name = ''

const files = fs.readdirSync(text_path)

files.forEach(file => {
  if (file.endsWith('.py')) model_name = file
})

const start_server = async () => {
  try {

    await fastify.listen(3000)

  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

const  start_ui = () => {
  const UI = exec('quasar dev', { cwd: '../UI/' }, (err, stdout, stderr) => {
    if (err) {
      console.log(`err: ${err}`)
    }
    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)
  })

  UI.stdout.on('data', function (data) {
    console.log(data);
  });
}

async function run_model() {
  console.log('running '+ model_name) 
  files.forEach(file => {
    if (file.endsWith('.json')) {
      dataset_name = file
      
    }
  })
  model_instance = spawn('python', [text_path+model_name, dataset_name], { capture: ['stdout', 'stderr', 'on'] })
  model_instance.stdout.on('data', (data) => {
    console.log(data)
  })
  
  model_instance.on('close', () => {
    texts = require(text_path + dataset_name)
    start_server()
    start_ui()
    for (let entry of Object.values(texts))
      for (let tag of Object.values(entry[1]))
        if (!labels.includes(tag[1])) labels.push(tag[1])
  })
}

fastify.register(require('fastify-cors'), {
})

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

fastify.get('/save_history', (request, reply) => {
  let history_string = JSON.stringify(history)
  fs.writeFile("adnotation_output.json", history_string, function(err, result) {
    if(err) console.log('error', err);
  })
  return true
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
      initial_text: { type: 'string' },
      text: { type: "object" },
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

run_model()