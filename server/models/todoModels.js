
import mongoose from "mongoose";

const todoSchema=new mongoose.Schema({
    text:{
        type:String,
        default:""
    },
    image: {
    type: String,
    default: ""
  }
})

const Todo=mongoose.model("Todo",todoSchema);

export default Todo;