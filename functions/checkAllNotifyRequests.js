/**
 * Created by james on 30/07/2017.
 */
import AWS from 'aws-sdk'
require('dotenv').config()
import conf from './config'



const ses = new AWS.SES({ "accessKeyId": process.env.ACCESS_KEY, "secretAccessKey": process.env.SECRET_KEY, "region": "us-east-1" }
)

export const checkAllNotifyRequests = async ( event, context, callback) => {

  const pgp = require('pg-promise')()
  const client = pgp(conf.dbCon)
  await client.any(`
      SELECT icnr.australian_application_number, email_address
            FROM public.ip_change_notification_requests as icnr
            INNER JOIN public.patents_metadata as pmd
      ON icnr.australian_application_number = pmd.australian_appl_no::character varying
      WHERE last_notified_state::character varying <> metadata::character varying
    `,

  ).then((results)=>{

    console.log(results)
    const manyEmails = results.map(item=>sendOneEmail(item))
    Promise.all(manyEmails)
      .then(callback('success'))
      .catch((err)=> {
      console.log(err)
      throw err
      })

  })

}


const sendOneEmail = (item) => {

  console.log(item)
  new Promise((resolve,reject)=>{

    const to = item.email_address
    const from = 'james.piskorz@terem.com.au'
    const subject = `A Patent you watch has changed state - ${item.australian_application_number}`
    const body = 'METHOD FOR CONSTRUCTING A HOME DENTAL IMPRESSION BOX has changed state.\r\n We can put the whole state here one day. Maybe some pretty diagrams about the flow of a patent and the expected time in states.'
    const replyTo = 'james.piskorz@terem.com.au'

    const params = {
      Destination: {
        ToAddresses: [to]
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: body
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject
        }
      },
      ReplyToAddresses: [replyTo || from],
      Source: from,
    }

    ses.sendEmail(params, (err, data) => {
      if (err) {
        console.log(err)
        reject(null, {
          statusCode: 400, body: JSON.stringify({
            message: err.message,
          })
        })
      } else {
        resolve(null, {
          statusCode: 200,
          body: JSON.stringify({
            message: `Email was successfully send to ${to} from ${from}`,
          }),
        })
      }
    })
  })
}