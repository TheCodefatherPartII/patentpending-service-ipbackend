

import conf from './config'
export const fetchIP = async (query, limit = 20) => {
  console.log(conf)
  console.log(conf.dbCon)
  const pgp = require('pg-promise')()
  const client = pgp(conf.dbCon)
  let result
  await client.any(`
  SELECT australian_appl_no, tm_number, name, title, metadata::json from (
(SELECT piapi.australian_appl_no, null as tm_number, pai.name, pdi.invention_description as title, pmd.metadata::character varying
FROM public.patents_applicant_informations as pai
inner join public.patents_ip_australia_process_informations as piapi
    on piapi.australian_appl_no = pai.australian_appl_no
inner join public.patents_metadata as pmd
    on pai.australian_appl_no = pmd.australian_appl_no::character varying
inner join public.patents_descriptive_information as pdi
    on pai.australian_appl_no = pdi.australian_appl_no::character varying
where  pai.name ilike '%$1#%' or pdi.invention_description ilike '%$1#%'
order by name
limit $2)
union
(SELECT null as australian_appl_no, tm.tm_number, tai.name, tdi.trademark_text as title, tmd.metadata::character varying
FROM public.trade_marks_applicant_informations as tai
inner join public.trade_marks_trade_mark_informations as tm
    on tm.tm_number::character varying = tai.tm_number
inner join public.trade_marks_metadata as tmd
    on tai.tm_number = tmd.tm_number::character varying
inner join public.trade_marks_descriptive_information as tdi
    on tai.tm_number = tdi.tm_number::character varying
where  tai.name ilike '%$1#%' or tdi.trademark_text ilike '%$1#%'
order by name
limit $2)
order by name
limit $2) a`,
    [
      query,
      limit
    ]
  ).then(res => {
    const mappedReply = res.map(item=>{
      return {
        id: 'p'+item.australian_appl_no,
        tradeMarkNumber: null,
        title: item.title,
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
