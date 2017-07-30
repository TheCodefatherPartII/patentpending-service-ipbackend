'use strict'

import {fetchIP} from  './functions/fetchIP'
import {saveNotificationRequest} from './functions/saveNotificationRequest'
import {checkAllNotifyRequests} from './functions/checkAllNotifyRequests'
const getIP = async (event, context, callback) => {
  try {
    const returningData = await fetchIP(event.queryStringParameters.query);
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
    console.log('logging event body')
    console.log(event)
    let objectifyTheBody = event.body
    if(!(objectifyTheBody.tradeMarkNumber || objectifyTheBody.emailAddress)) {
      objectifyTheBody = JSON.parse(event.body)
    }
    console.log(objectifyTheBody)
    console.log('objectified')
    console.log(objectifyTheBody.tradeMarkNumber)
    console.log(objectifyTheBody.australianApplicationNumber)

    const returningData = await saveNotificationRequest(objectifyTheBody)
    if(!returningData.success) {
      throw(returningData)
    }
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: returningData.success,
      }),
    })
  } catch (e) {
    console.log(e)
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({message: e}),
    })
  }
}


export {getIP, notifyChangedIP, checkAllNotifyRequests }
