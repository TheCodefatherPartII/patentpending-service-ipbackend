'use strict'
// import config from './config'

import { data } from './dummyData'
require('dotenv').config()

// decrypt environment variables before calling main function
export default (event, context, callback) => {
  // if (true) {
  //   return main(event, context, callback)
  // } else {
  //   return callback(err)
  // }
  return main(event, context, callback)
}

const main = async (event, context, callback) => {
  try {

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: data,
      }),
    })
  } catch (e) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({message: e.message}),
    })
  }
}
