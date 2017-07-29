'use strict'
const { Client } = require('pg')
const client = new Client({
  user: 'codefather',
  host: 'codefather.cxjadyyca5ie.ap-southeast-2.rds.amazonaws.com',
  database: 'codefather',
  password: 'codefather',
  port: 5432,
})

client.connect()

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})


export const saveNotificationRequest = async (event, context, callback) => {
  try {

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Success',
      }),
    })
  } catch (e) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({message: e.message}),
    })
  }
}
