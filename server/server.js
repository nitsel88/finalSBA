//node modules
var express = require('express')
var app = express()

//custom modules
const dbObj = require('./database')
var users = require('./users')
var projects = require('./projects')
var parentTasks =  require('./parentTasks')
var tasks =  require('./tasks')
//port config
const port = 3001;

//request config
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

//routing
app.use("/user", users);
app.use("/project", projects);
app.use("/parentask", parentTasks);
app.use("/task", tasks);

try {
//initializing DB and start listening to port
dbObj.initDb(() => {
        app.listen(port, function (err) {
        if (err) {
            throw err; //
        }
        console.log("API Up and running on port: " + port);
    });
});
    
} catch (error) {
    console.log("Error in starting server: ")
    console.log(error)
}
