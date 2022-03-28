import { createPool } from 'mysql2/promise'

  // const pool = createPool({
  //   host: 'localhost',
  //   user: 'diego',
  //   password: 'Psisukvilk97$',
  //   port: 3306,
  //   database: 'proyectos'
  // })
 //const pool = createPool({
 //  host: 'us-cdbr-east-05.cleardb.net',
 //  user: 'bf90f8e2ab99c2',
 //  password: 'ae490b85',
 //  database: 'heroku_fbe71ac25acd3dc'
 //})
 
 const pool = createPool ({
  hsot: 'db5006930211.hosting-data.io',
   user:  'dbu1582628',
   password: 'qKBUmFbi%!se', 
   port: 3306,
   database: 'dbs5721780' 
 })

export { pool }
