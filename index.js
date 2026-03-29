import express from 'express';
import cors from 'cors';
import multer from 'multer';
const app = express();
const storage = multer.diskStorage({
   destination:function(req,file,cb){
        cb(null,'upload')
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + '-' + file.originalname)
    }
})

const upload = multer({storage});


app.use(cors());
app.get("/",(req,res)=>{
    res.send(`
        <form action="/upload" method="post" enctype="multipart/form-data">
            <input type="file" name="myfile"/>
           
            <button>Upload file</button>
        </form>
    `)
})

app.post("/upload", upload.single('myfile'), (req, res) => {
    res.send({
        message:'File uploaded successfully',
        info:req.file
    })
})

app.listen(3200)