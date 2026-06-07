import Todo from "../models/todoModels.js";


//GET

export const getTodos=async(req,res)=>{
    try{
        const todos=await Todo.find();

        res.status(200).json(todos);
    }
    catch(err)
    {
        res.status(500).json({
            message:err.message
        })
    }
}


//POST

export const createTodo=async(req,res)=>{
    try{
        const todo=await Todo.create(
            {
                text:req.body.text,
                image:req.body.image
            }
        )
        res.status(201).json(todo)
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

//PUT

export const updateTodo=async(req,res)=>{
    try{
        const updateTodo=await Todo.findByIdAndUpdate(
            req.params.id,
            {
                text:req.body.text,
                image:req.body.image
            },
            {
                new:true,
            }
        );

        res.status(200).json(updateTodo)
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

//DELETE
export const deleteTodo=async(req,res)=>{
    try{
        await Todo.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message:"Todo Deleted Successfully"
        })
    }
     catch(err){
        res.status(500).json({
            message:err.message
        })
     }    
}