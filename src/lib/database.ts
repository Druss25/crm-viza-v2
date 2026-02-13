// import 'dotenv/config'
// import { drizzle } from 'drizzle-orm/mysql2'
// import * as schema from '../db/schema'
// export const db = drizzle({
//     connection: { uri: process.env.DATABASE_URL! },
//     schema
// })
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'

import * as schema from '../db/schema'

const poolConnection = mysql.createPool(process.env.DATABASE_URL!)

export const db = drizzle(poolConnection, { schema, mode: 'default' })
