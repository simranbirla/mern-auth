import express from 'express';
import dotenv from 'dotenv';
import mongoose  from 'mongoose';
import signInRouter from './routes/sign-in'

dotenv.config()

const app = express();
const port = 3000;


mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.cryed.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{
  console.log("Connected!!!")
}).catch(e => {
  console.error('Error while connecting database', e)
}) 

app.use('/sign-in', signInRouter )


app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});