import React, { useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { 
    LoginContainer,
    LoginInnerContainer,
    Form,
} from "../styles/Login.style"


function Register() {

    const [email, setEmail] = useState(''); //Email
    const [password, setPassword] = useState(''); // Password

      //Register Button
    const handleRegister = () => {
        axios
        .post('http://206.189.91.54//api/v1/auth/',
            {
            "email": email,
            "password": password,
            "password_confirmation": password
            }
        )
        .then(res => {
            console.log(res);
            
        })
        .catch((err) => {
            console.log(err);
            alert(`email taken`); 
        });
    }

    return (
    <LoginContainer>
        <LoginInnerContainer>
            <img
                src="https://logos-world.net/wp-content/uploads/2020/10/Slack-Logo-2019-present.jpg"
                alt="slack logo" 
            />
            <h1>Sign up to Slack</h1>
            <Form>
            <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder='sample@email.com'
                type='email'
                title='email'
                />
            <input 
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
                type='password'
                title='password'
            />
            <input
                onClick={handleRegister}
                type='submit'
                value='Register'
            />
            </Form>
        </LoginInnerContainer>
        <p>
                    Already a user? <Link to="/slack-api" >Login </Link>
        </p>
    </LoginContainer>
)
}


export default Register
