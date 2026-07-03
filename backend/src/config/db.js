import mongoose from 'mongoose'

const connectDb = async()=>{
    try {
      const  connectionInstance = await mongoose.connect(process.env.MONGO_URI);
      console.log("Mongodb connected HOST DB !!",connectionInstance.connection.host);
    } catch (error) {
        console.log("Mongodb not connected",error);
        process.exit(1);
    }
}

export default connectDb;