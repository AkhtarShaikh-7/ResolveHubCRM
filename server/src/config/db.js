import mongoose from 'mongoose';


const dbConnection = async()=>{
    try {
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully: ",con.connection.host);
        
    } catch (error) {
        console.log("Getting error while connecting db",error.message);
        
    }
}

export default dbConnection;