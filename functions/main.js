'use strict'

import {fetchIP} from  './fetchIP'
///import saveNotificationRequest from './saveNotificationRequest'

const getIP = async (event, context, callback) => {
  try {
    const reutrningData = fetchIP(queryStringParameters.query);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: reutrningData,
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
    //notify
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
