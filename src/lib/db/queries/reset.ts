import {db} from ".."
import {users} from "../schema";
import {  sql } from "drizzle-orm";
import { getTableName } from "drizzle-orm";

export async function resetDb(): Promise<void>{
    // const tableName = getTableName(users)
    // console.log(`name = ${tableName}`)
    // await db.execute(sql.raw(`TRUNCATE TABLE ${tableName}`)) 
    await db.delete(users) 
}