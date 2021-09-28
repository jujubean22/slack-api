import React, { useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { 
    LoginContainer,
    LoginInnerContainer,
    Form,
} from "../styles/Login.style"
import {useHistory} from 'react-router-dom';


function Register() {

    const [email, setEmail] = useState(''); //Email
    const [password, setPassword] = useState(''); // Password
    const history = useHistory();
    const [loading, setLoading] = useState(false);

      //Register Button
    const handleRegister = (e) => {
        e.preventDefault()
        setLoading(true)
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
            history.push("/slack-api");
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            alert(`email taken`);
            setLoading(false) 
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
                value={loading ? "Loading..." : "Register"}
                disabled={loading}

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
