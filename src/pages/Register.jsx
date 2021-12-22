import React,  { useState } from "react";
import Header from "../components/Header";
import Container from "../components/Container";
import Swal from "sweetalert2";
import axios from "axios";
//styles
import "sweetalert2/dist/sweetalert2.min.css";
import "../styles/SecondFormStyle.css";

const Register = () => {
    const [email, useEmail] = useState("");
    const [password, usePassword] = useState("");
    const [name, useName] = useState("");
    const [lastName, useLastName] = useState("");

    const OnChangeName = e => useName(e.target.value);
    const OnChangeLastName = e => useLastName(e.target.value);
    const OnChangeEmail = e => useEmail(e.target.value);
    const OnChangePassword = e => usePassword(e.target.value);
    const OnClickCancel = () => window.location.href = "/";
    const OnClickSignUp = async () => {
        if( !name || !lastName || !email || !password) return Swal.fire("Error", "Uncomplete data", "error");
        if( !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) )
        return Swal.fire("Error", "Invalid email", "error");
        const data = {
            name,
            last_name : lastName,
            email,
            password
        }
        try{
            const response = await axios.post("http://localhost:8000/api/users/register", data);
            Swal.fire("Congratulations", response.data, "success").then(() => window.location.href = "/");
        }catch(err){
            console.log(err)
        
        }
    }

    return(
        <>
            <Header title = "Sign up">
                <button id="cancel" onClick = {OnClickCancel}>Cancel</button>    
            </Header> 
            <Container>
                <h2 
                 className="container-title"
                >
                     Sign up
                </h2>

                <input 
                 type="text" 
                 id="name"
                 placeholder="Name" 
                 onChange = {OnChangeName}
                />               

                <input 
                 type="text" 
                 id="last_name" 
                 placeholder="Last name"
                 onChange = {OnChangeLastName}
                />


                <input 
                 type="email" 
                 id="email_register"
                 placeholder="Email"
                 onChange = {OnChangeEmail}
               />
                
                <input 
                 type="password" 
                 id="password_register" 
                 placeholder="Password"
                 onChange = {OnChangePassword}
                />

                
                <button 
                 className="sign-up"
                 onClick = {OnClickSignUp}
                >
                    Sign up
                </button>
                
            </Container>
        </>
    );
}

export default Register;