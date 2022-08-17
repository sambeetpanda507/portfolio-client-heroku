import mongoose from 'mongoose'

const connectToDb = async () => {
  try {
    const dbURI: string | undefined = process.env.MONGODB_URI

    //if mongodb uri not present
    if (!dbURI) {
      console.log('Database URI not present.')
      return
    }

    //check any existing connection
    if (mongoose.connections[0].readyState) {
      console.log('Already connected to database.')
      return
    }

    //conntect to database
    await mongoose.connect(dbURI)
    console.log('Conntect to database.')
  } catch (e: any) {
    console.log(e.message)
  }
}

export default connectToDb
