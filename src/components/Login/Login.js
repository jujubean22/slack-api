import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";
import { 
  LoginContainer,
  LoginInnerContainer,
  Form
} from "../styles/Login.style"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    axios
      .post(
        'http://206.189.91.54//api/v1/auth/sign_in',
        {
          "email": email,
          "password": password
        }
      )
      .then(res => {
        //going to homepage
        console.log(res);
        history.push('/');
        setLoading(false)
      })
      .catch(err => {
        console.log(err);
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
        <h1>Sign in to Slack</h1>
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
            onClick={handleLogin}
            type='submit'
            value={loading ? "Loading..." : "Submit"}
            disabled={loading}
          />
        </Form>
      </LoginInnerContainer>
      <p>
        Not an User? <Link to="/Register" >Register </Link>
      </p>
    </LoginContainer>
  )
}

export default Login;




