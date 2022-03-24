//dependencies required for the itemApp
var express = require("express");
var bodyParser = require("body-parser");
var itemApp = express();
itemApp.use(bodyParser.urlencoded({ extended: true }));
itemApp.set("view engine", "ejs");
itemApp.use(express.static("styles"));
var task = [];
var complete = [];

//post route for adding new task
//res==respond req == request
itemApp.post("/addtask", function (req, res) {
    var newTask = req.body.newtask;

    //add task
    task.push(newTask);
    res.redirect("/");
});
// clear list
app.post("/emptylist", function (req, res) {
    var newTask = req.body.complete;
    complete.pop(newTask);
    res.redirect("/");
});
itemApp.post("/removetask", function (req, res) {
    var completeTask = req.body.check;
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});

//display added task, completed task
itemApp.get("/", function (req, res) {
    res.render("index", { task: task, complete: complete });
});

//itemApps is on port 3000
itemApp.listen(3000, function () {
    console.log("---running on port 3000!-");
});