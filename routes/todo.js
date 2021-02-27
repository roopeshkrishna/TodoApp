const router = require('express').Router();
const { route } = require('.');
const Todo = require("../models/Todo");

//routes
router.post("/add/todo",(req,res)=>{
    const {todo} = req.body;
    const newTodo = new Todo({todo})


    //save the todo

    newTodo.save()
    .then(()=>{
        console.log("successfully added todo")
        res.redirect("/")
    })
    .catch((err)=>{
        console.log(err)
    });

})

.get("/delete/todo/:_id",(req,res)=>{
    const { _id } = req.params;
    Todo.deleteOne({ _id })
    .then(()=>{
        console.log("Delete Successfull")
        res.redirect("/")
    })
    .catch((err)=>{
        console.log(err)
    });
})


.route("/edit/todo/:id")
.get((req, res) => {
    const id   = req.params.id;
    Todo.find({}, (err, tasks) => {
        console.log("fetch successful");
        res.render("todoEdit.ejs",{ todo:tasks,idTask: id} );
        });
    
    })

.post((req, res) => {
    const id  = req.params.id;
    Todo.findByIdAndUpdate(id, { todo : req.body.content }, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
 });
});






module.exports = router;