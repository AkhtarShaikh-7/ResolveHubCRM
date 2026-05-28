import express from 'express';
import cors from 'cors';
import cookieparser from 'cookie-parser';

const app = express();

app.use(cors({
    
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}))

app.use(express.json({limit:"16kb"}));

app.use(express.urlencoded({
    extended: true,limit: "16kb"
}))



app.use(cookieparser());




import authRoutes from './routes/authRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js'

app.use("/api/auth",authRoutes);
app.use("/api/tickets",ticketRoutes);

export default app;