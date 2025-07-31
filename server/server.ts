import dotenv from 'dotenv'
import express from "express";
import cors from "cors";
import recipeRouter from './routes/recipeRouter'
dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/v1/stream-recipe', recipeRouter)

app.listen(PORT, ()=> console.log(`Server runnning at port: ${PORT}`))
