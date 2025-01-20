import mongoose from 'mongoose'
import db from '../databases/authmongo.js'

const database = 'correos-pishing'

async function getUser(username) {
   try {
      await db.connect()
      const user = await db.db(database).collection('User').findOne({ username })
      return user

   } catch (err) {
      throw new Error(err)
   }
}

export default {
   getUser
}