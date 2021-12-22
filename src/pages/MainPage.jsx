import React, { useState } from "react";
import Header from "../components/Header";
import Container from "../components/Container";
import Swal from "sweetalert2";
import axios from "axios";
//styles
import "sweetalert2/dist/sweetalert2.min.css"
import "../styles/FirstFormStyles.css";

const MainPage = () => {


    //hooks
    const [email, useEmail] = useState("");
    const [password, usePassword] = useState("");

    const OnChangeEmail = e => useEmail(e.target.value);  
    const OnChangePassword = e => usePassword(e.target.value)

    const OnClickSignIn = async () => {
        if( !email || !password ) return Swal.fire("Error", "Uncomplete data", "error");
        if( !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) )
        return Swal.fire("Error", "Invalid email", "error");
        const data = { email, password}
        try{    
            const response = await axios.post("http://localhost:8000/api/users/auth", data);
            Swal.fire("Congratulations", response.data.text, "success").then( () => {
                localStorage.token = response.data.token;
                localStorage.id_user = response.data.id;
                window.location.href = "/text_note";
            });
        }catch(err){
            console.log(err);
            return;
        }
    }
    const OnClickRegister = () => window.location.href = "/register";

    return (
        <>
            <Header
            title = "Log in"
            />
            <Container>
                <h2 
                    className="container-title">
                     Sign in
                </h2>
               
                <input 
                    type="email" 
                    id="email_main" 
                    onChange = {OnChangeEmail} 
                    placeholder="Email" 
                />    
                
                <input 
                    type="password" 
                    id="password_main" 
                    placeholder="Password" 
                    onChange = {OnChangePassword} 
                />

    
                
                <button 
                    className="sign-in"
                    onClick = {OnClickSignIn}
                >
                    Sign in
                </button>
                
                <button 
                    className="register"
                    onClick = {OnClickRegister}
                >
                    Sign up
                </button>
            </Container>
        </>
    );
}

export default MainPage;