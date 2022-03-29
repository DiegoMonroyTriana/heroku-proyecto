import { createPool } from 'mysql2/promise'

  // const pool = createPool({
  //   host: 'localhost',
  //   user: 'diego',
  //   password: 'Psisukvilk97$',
  //   port: 3306,
  //   database: 'proyectos'
  // })
const pool = createPool({
   host: 'us-cdbr-east-05.cleardb.net',
   user: 'bec17a835af8a2',
   password: 'fadb7b96',
   database: 'heroku_56b8a0b54873098'
 })
 
// const pool = createPool ({
//  hsot: 'db5006930211.hosting-data.io',
//   user:  'dbu1582628',
//   password: 'qKBUmFbi%!se', 
//   port: 3306,
//   database: 'dbs5721780' 
// })

export { pool }
