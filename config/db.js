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
   user: 'bf90f8e2ab99c2',
   password: 'ae490b85',
   database: 'heroku_fbe71ac25acd3dc'
 })

export { pool }
