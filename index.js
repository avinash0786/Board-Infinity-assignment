require("dotenv").config();
const express=require("express");
const bodyparser= require('body-parser');
const tasks=require("./model/tasks")
const path=require("path")
require("./database");

 //   - /add - POST endpoint which adds the data
 //   - /list - GET endpoint which lists all the data

const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"./scripts")));

app.get("/", (req,res)=>{
    res.send("App running ready for /add and /list API")
})

app.get('/listTasks',((req, res) => {
    tasks.find({})
        .then(data=>{
            return res.json(data);
        })
}))

app.get("/addTask",(req, res) => {
    console.log("Adding new task")
    const timeNow=new Date();
    const duration=1;
    var add=timeNow.getMinutes()+duration;
    timeNow.setMinutes(add);

    const task=new tasks({
        taskID:2,
        taskName:"First Task",
        taskDesc:"This is first task to be deleted within time",
        creator:"Admin",
        duration:2,
        expireAt:new Date(timeNow.toISOString())
    })
    task.save()
        .then(ans=>{
            return res.send("Saved data: "+ans)
        })
})

///  LISITING SERVER  DONT EDIT   //
app.listen(process.env.PORT, function(req,result){
    console.log(" Server up and running:: http://localhost:3000")
})

/*
const myDate = new Date();
undefined
myDate
Thu Apr 01 2021 01:05:37 GMT+0530 (India Standard Time)
var add=myDate.getMinutes()+10;
undefined
myDate.setMinutes(add);
1617219937465
myDate
Thu Apr 01 2021 01:15:37 GMT+0530 (India Standard Time)

const myDate = new Date();
undefined
myDate;
Thu Apr 01 2021 01:08:51 GMT+0530 (India Standard Time)
console.log(myDate.toISOString)
VM597:1 ƒ toISOString() { [native code] }
undefined
console.log(myDate.toISOString())
VM611:1 2021-03-31T19:38:51.801Z
undefined
 */