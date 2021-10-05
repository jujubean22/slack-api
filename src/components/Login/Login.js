import React, { useState } from 'react';
import { LoginContainer, LoginInnerContainer, Form} from "../styles/Login.style"
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { userLogin } from '../../API';

function Login({ handleSetLoginData }) {
  //set up states
  const [email, setEmail] = useState('ayaya@gmail.com');
  const [password, setPassword] = useState('123123');
  //state for loading
  const [loading, setLoading] = useState(false);
  //for history push
  const history = useHistory();
  //user login 

  const handleLogin = (e) => {
    //to prevent refresh
    e.preventDefault()
    setLoading(true)

    const data = {
      email, password 
    }

    //User Login
    userLogin(data)
      .then(res => {
        handleSetLoginData(res);
        history.push('/');
        setLoading(false)
      })
      .catch(err => err);
  }

  return (
    <LoginContainer>
      <LoginInnerContainer handeSetLoginData={handleSetLoginData}>
        <img
          src="https://logos-world.net/wp-content/uploads/2020/10/Slack-Logo-2019-present.jpg"
          alt="slack logo" 
        />
        <h1>Sign in to Slack</h1>
        <Form>
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder='sample@email.com'
            value={email}
            type='email'
            title='email'
            />
          <input 
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
            value={password}
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




