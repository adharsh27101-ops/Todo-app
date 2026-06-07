import React, { useState } from "react";
import "../css/Login.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link,useNavigate} from "react-router-dom";
import axios from "axios";

function Login() {
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [signin,setsignin]=useState(true);
      const navigate = useNavigate();


async function handleLogin(){

  if(!email || !password){
    alert("Please fill all fields");
    return;
  }

  try{
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email,
        password
      }
    );
    console.log(res.data);
    localStorage.setItem("token",res.data.token);
    localStorage.setItem("username",res.data.username);
    alert(res.data.message);
    navigate("/crud");
  }
  catch(error){
    alert(error.response?.data?.message || "Login Failed");
  }
}

      async function handleSignup(){

  if(!name || !email || !password || !confirmPassword){
    alert("Please fill all fields");
    return;
  }

  if(password !== confirmPassword){
    alert("Passwords do not match");
    return;
  }

  try{
    const res = await axios.post(
      "http://localhost:5000/api/auth/signup",
      {
        name,
        email,
        password
      }
    );

    alert(res.data.message);
  }
  catch(error){
    alert(error.response.data.message);
  }
}

  return(
    <><div className="login-page">
      {
        signin ? (
            <div className="loginbox">
            <h1>Login</h1>
            
             <TextField className="logem" label="email" variant="standard" value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
             <TextField className="logpass" label="Password" variant="standard" type="password"  value={password} onChange={(e)=>setPassword(e.target.value)}/><br/>
             <Button className="logbtn" variant="contained" onClick={handleLogin}>Login</Button>
              <br/>
              <p className="dont">Don't have an account? <span className="change" onClick={() => setsignin(false)}>Signup</span> </p>
             
            </div>
        ):(
             <div className="loginbox">

    <h1>Sign Up</h1>

    <TextField className="signame" label="Username" variant="standard" value={name} onChange={(e)=>setName(e.target.value)}/><br/>
    <TextField className="signem" label="Email" variant="standard" value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
    <TextField className="sigpass" label="Password" variant="standard" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/><br/>
    <TextField className="sigpass" label="Confirm Password" variant="standard" type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/><br/>
    <Button className="sigbtn" variant="contained"  onClick={handleSignup}>Sign Up</Button>
    <br/>
    <p className="alr"> Already have an account?<span className="change" onClick={() => setsignin(true)}> Login</span></p>

  </div>

        )
      }

      
      </div>

      
    </>
  )
}
export default Login;