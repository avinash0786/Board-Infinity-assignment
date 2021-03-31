const mongoose =require("mongoose")
require("dotenv").config();
const db_url=process.env.DB_URL;

mongoose.connect(process.env.DB_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify:false,
})
mongoose.connect(
    db_url,
    {
        useUnifiedTopology:true,
        useNewUrlParser:true,
        useCreateIndex:true
    },
    function(err,link){
        if (err){
            console.log("ERROR: "+err);
        }
        console.log("DB connect success...")
    }
)