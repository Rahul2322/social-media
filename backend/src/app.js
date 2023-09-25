const express = require('express');
const app = express();
const dotenv = require('dotenv');
const {dbConnection} = require('./config/db');
const auth = require('./routes/auth');
const user = require('./routes/user');
const post = require('./routes/post');
const cors = require('cors');
const multer = require('multer');
const path = require('path')
dotenv.config();

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use('/images',express.static(path.join(__dirname,'../public/images')));
console.log(path.join(__dirname,'../public/images'))

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        console.log(file)
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})
const upload = multer({storage});
dbConnection();

//Routes

app.post('/api/upload',upload.single('file'),(req,res)=>{
    try {
        console.log(req.file)
        return res.status(200).json({message:"Uploaded Successfully"})
    } catch (error) {
        console.log(error)
    }
})
app.use('/api/auth',auth);
app.use('/api/user',user);
app.use('/api/post',post);``



app.listen(port,()=>console.log(`Listening on port ${port}`))