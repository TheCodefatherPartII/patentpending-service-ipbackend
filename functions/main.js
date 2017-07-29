'use strict'

import {fetchIP} from  './fetchIP'
import {saveNotificationRequest} from './saveNotificationRequest'

const getIP = async (event, context, callback) => {
  try {
    const returningData = fetchIP(event.queryStringParameters.query);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: returningData,
      }),
    })
  } catch (e) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({message: e.message}),
    })
  }
}

const notifyChangedIP = async (event, context, callback) => {
  try {
    console.log(event.body)
    saveNotificationRequest(event.body  )

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
export {getIP, notifyChangedIP }
