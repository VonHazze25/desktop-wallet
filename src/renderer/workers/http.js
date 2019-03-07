'use strict'

const axios = require('axios')

process.on('message', async message => {
  if (message.method) {
    try {
      // Sending through processes involves serializing and parsing the data,
      // so i is better to use only the useful parts of the response
      const { data } = await axios(message)
      process.send({ data })
    } catch (error) {
      process.send({ message: error.message })
    }
  } else if (message === 'quit') {
    process.exit()
  }
})
