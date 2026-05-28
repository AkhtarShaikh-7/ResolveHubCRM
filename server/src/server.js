import 'dotenv/config';
import app from './app.js';
import dbConnection from './config/db.js';
 

const PORT = process.env.PORT;



dbConnection()
.then(()=>{
    app.listen(PORT || 5000,()=>{
        console.log(`server is running at port : ${PORT}`);
        
    })
})
.catch((err)=>{
   console.log("Mongo db connection failed !!!",err);
   
});