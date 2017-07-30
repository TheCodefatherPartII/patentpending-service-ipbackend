'use strict'
import conf from './config'
export const saveNotificationRequest = async (requestToSave) => {

  const pgp = require('pg-promise')()
  const client = pgp(conf.dbCon)

  if(! (requestToSave.tradeMarkNumber || requestToSave.australianApplicationNumber) ) {
    console.log('No IP Primary key present, ya darn fool')
    console.log(requestToSave)
    return {success:false, error: 'No IP Primary key present, ya darn fool'}
  }
  let result
  await client.none( `INSERT INTO public.ip_change_notification_requests(
            trade_mark_number, australian_application_number, email_address,
            last_notified_state, device_uuid)
            VALUES ($1, $2, $3, $4, $5);
           `,
    [
      requestToSave.tradeMarkNumber,
      requestToSave.australianApplicationNumber,
      requestToSave.emailAddress,
      JSON.stringify(requestToSave.lastNotifiedState),
      requestToSave.deviceUUID
    ]
  ).then(res => {
      console.log('success')
      result = {success: true}
      pgp.end()

    })
    .catch(e => {
      result = {success: false, error: e}
      console.log(e)
      pgp.end()
    })
  console.log('code after query')
  return result
}

