import Express  from "express";
import bodyParser from "body-parser";
import Cors  from "cors";
import mongoose from "mongoose";
import postRoutes from "./Routes/Post.js";
import userRoutes from "./Routes/User.js";
import 'dotenv/config';

const app=Express();
app.use(bodyParser.json({limit:'30mb' , extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb' , extended:true}));
app.use(Cors());

app.use('/posts',postRoutes);
app.use('/users',userRoutes);
const Port=5000 || process.env.PORT;
mongoose.connect(`${process.env.Connection_url}`)
        .then(()=>{
            console.log('Connection Sucessfull');
            app.listen(Port,()=>{
                console.log(`Sever Started on port ${Port}`);
            })
        })
        .catch(err =>{
            console.log('Connection Failed',err);
        })