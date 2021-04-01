# Board-Infinity-assignment 
[Link to Heroku app](https://board-inf-avinash11804771.herokuapp.com/)
`https://board-inf-avinash11804771.herokuapp.com/`
##Task Implementation
Create a REST API to add tasks and list them.
<br/>
Run using command: `npm run watch` or `nodemon index.js` or `node index.js`
> Task is to automatically delete the task after a DURATION.
  
  Duration(in Minutes) of task is provided by USER
<br/>
To implement automatic deletion in `MongoDB` used TTL `Time to live`.<br/>

1. we need to create a index in collection using `createIndex` in mongoDB<br/>
    Code
        
        db.tasks.createIndex( { "expireAt": 1 }, { expireAfterSeconds: 0 } )
>Whenever we insert a document and want that document to be deleted automatically we need to pass expireAt value as date and mongoDB will delete after the date-time.
    
        db.tasks.insert( {
           "expireAt": new Date(),
           "logEvent": 2,
           "logMessage": "Success!"
        } )

 There are 2 endpoints `/listTasks` and `/addTasks`
  
1. `/listTasks` returns all the task and we populate the data on frontend.
2. `/addTasks` takes data from front-end and created expireAt date UTC date by adding Duration to current dateTime and insert into Database.

---
**Node Modules Used**<br/>
```
"dependencies": {
    "body-parser": "^1.19.0",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "mongoose": "^5.9.26",
    "nodemon": "^2.0.4"
  },
```

Data fromat to save in DB for `/addTasks`
```
    const task=new tasks({
            taskName:req.body.name,
            taskDesc:req.body.desc,
            creator:req.body.creator,
            duration:duration,
            expireAt:new Date(timeNow.toISOString())
        })
    task.save()
        .then(ans=>{
            return res.json({
                success:true
            })
        })
```
Returning Tasks to front-end `/getTasks`
```
app.get('/listTasks',((req, res) => {
    tasks.find({})
        .then(data=>{
            return res.json(data);
        })
}))
```
##Created by Avinash Kumar 11804771, avinash.11804771@lpu.in
PS: Automatically deletion of task may not take effect instantaneously because mongoDB checks every `60 sec`
 so it might take close to 1 min for task to delete automatically