

import conf from './config'
export const fetchIP = async (query, limit = 20) => {
  console.log(conf)
  console.log(conf.dbCon)
  const pgp = require('pg-promise')()
  const client = pgp(conf.dbCon)
  let result
  await client.any(`
    SELECT piapi.australian_appl_no, pai.name, pdi.invention_description as title, pmd.metadata
      FROM public.patents_applicant_informations as pai
      inner join
    public.patents_ip_australia_process_informations as piapi
    on piapi.australian_appl_no = pai.australian_appl_no
      inner join public.patents_metadata as pmd
    on pai.australian_appl_no = pmd.australian_appl_no::character varying
      inner join public.patents_descriptive_information as pdi
    on pai.australian_appl_no = pdi.australian_appl_no::character varying
    where  pai.name ilike '%$1#%' or pdi.invention_description ilike '%$1#  %'
    limit $2
    `,
    [
      query,
      limit
    ]
  ).then(res => {
    const mappedReply = res.map(item=>{
      return {
        tradeMarkNumber: null,
        title: item.invention_description,
        australianApplicationNumber:item.australian_appl_no,
        type:'patent',
        applicantName: item.name,
        stages: item.metadata
      }
    })
    console.log('success')
    console.log(res)
    result = mappedReply
    pgp.end()

  })
    .catch(e => {
      console.log('error')
      result = {success: false, error: e}
      console.log(e)
      pgp.end()
    })
  console.log('code after query')
  return result

}
