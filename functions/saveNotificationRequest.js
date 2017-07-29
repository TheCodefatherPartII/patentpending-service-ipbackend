'use strict'
const { Client } = require('pg')
const client = new Client({
  user: 'codefather',
  host: 'codefather.cxjadyyca5ie.ap-southeast-2.rds.amazonaws.com',
  database: 'codefather',
  password: 'codefather',
  port: 5432,
})



export const saveNotificationRequest = async (requestToSave) => {
  if(! (requestToSave.tradeMarkNumber || requestToSave.australianApplicationNumber) ) {
    console.log('No IP Primary key present, ya darn fool')
    return {success:false, error: 'No IP Primary key present, ya darn fool'}
  }

  client.connect()
  const query = {
    text: `INSERT INTO public.ip_change_notifcation_requests(
            trade_mark_number, australian_application_number, email_address,
            last_notified_state, device_uuid)
            VALUES ($1, $2, $3, $4, $5);
           `,
    values: [
      requestToSave.tradeMarkNumber,
      requestToSave.australianApplicationNumber,
      requestToSave.emailAddress,
      JSON.stringify(requestToSave.lastNotifiedState),
      requestToSave.deviceUUID
    ],
  }
  let result
  await client.query(query)
    .then(res => {
      result = {success: true}
    })
    .catch(e => {
      result = {success: false, error: e}
      console.log(e)
    })
  return result
}

