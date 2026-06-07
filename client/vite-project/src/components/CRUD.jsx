import React, {useEffect,useState} from "react";
import "../css/CRUD.css";
import axios from "axios";
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import imagee from '../assets/img.jpg'
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from "react-router-dom";


function Todo() {

  const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

  const navigate = useNavigate();
  const[todos,setTodos]=useState([]);
  const[text,setText]=useState("");
  const[editId,setEditId]=useState(null);
  const[image,setimage]=useState(null);
  const[username,setUsername] = useState("");
  

useEffect(()=>{
  getTodos();
  const name = localStorage.getItem("username");
  setUsername(name);
},[]);

async function getTodos(){

  const token = localStorage.getItem("token");

  const res = await axios.get(
    "http://todo-app-q5qc.onrender.com/api/todos",
    {
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
  );

  setTodos(res.data);
}

async function addTodo(){
   if(text==="" && !image){
    return;
   }

   const newTodo={
    text:text ,
    image: image ? URL.createObjectURL(image) : ""
   }

   await axios.post("http://todo-app-q5qc.onrender.comapi/todos",newTodo)
   setText("")
   getTodos();
   setimage(null);
}


async function deleteTodo(id){
  await axios.delete(`http://todo-app-q5qc.onrender.com/api/todos/${id}`)
  getTodos()
}

function editTodo(todo) {
    setText(todo.text);
    setEditId(todo._id);
    
  }

 async function updateTodo() {
    const updatedTodo={
      text: text,
    };
    await axios.put(`http://todo-app-q5qc.onrender.com/api/todos/${editId}`,updatedTodo);
    setText("");
    setEditId(null);
    getTodos();
  }

  function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");

  navigate("/signin");
}

  return (
    
    <div className="crud-page">
      <div className="navbar">
  <h2>My Todo App</h2>

  <div className="nav-right">
     <p>Welcome, {username}</p>
    <p>Total Tasks : {todos.length}</p>
      <Button
    variant="contained"
    color="error"
    onClick={logout}
  >
    Logout
  </Button>
  </div>
</div>
    <div className="content">
      <h1>TODO list</h1>
      {image && (
      <img src={URL.createObjectURL(image)} className="pre"/>
      )}
      <input type="text" value={text} onChange={(event) => setText(event.target.value)}/>
        {editId?(<><Button variant="outlined" onClick={()=>updateTodo()} className="update">Update</Button> <Button className="upload"
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    > upload files
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => setimage(event.target.files[0])}
        multiple
      />
    </Button></>)  
        : (
  <>
    <Button
      variant="outlined"
      
      onClick={() => addTodo()}
      className="add"
    >
      Add Task
    </Button>

   <Button className="upload"
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => setimage(event.target.files[0])}
        multiple
      />
    </Button>
    
  </>
)}     

      {todos.map((todo) => (<h1 key={todo._id}>
        <div className="todo-data">
        <input type="checkbox" />

  {todo.image && (
    <img src={todo.image} className="uplima"/>
  )}

  <p className="todo-text">
    {todo.text}
  </p>

  <Button variant="outlined" startIcon={<EditIcon />} onClick={()=>editTodo(todo)} className="e">
  Edit
</Button>
        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={()=>deleteTodo(todo._id)} className="d">
  Delete
</Button>

</div>
      
         
        </h1>
      ))}
    </div>
    </div>
  );
}

export default Todo;