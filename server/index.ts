import express, {Request, Response, NextFunction, ErrorRequestHandler} from 'express';
import dotenv from 'dotenv';
import mongoose  from 'mongoose';
import cors from 'cors';
import authRouter from './routes/auth'
import { ResError } from './types/error';

dotenv.config()

const app = express();
const port = 3000;

app.use(express.json())
app.use(cors())

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.cryed.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{
  console.log("Connected!!!")
}).catch(e => {
  console.error('Error while connecting database', e)
}) 



app.use('/auth', authRouter )


app.use((err: ResError ,req: Request,res: Response,next:NextFunction) => {

  const statusCode = err.statusCode || 500
  const error = err.message || "Internal Server Error"

  return res.status(statusCode).json({
    success: false,
    message: error
  })

})


app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});