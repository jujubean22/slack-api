import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import axios from 'axios';



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = () => {
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
        history.push('/home');
      })
      .catch(err => {
        console.log(err);
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
            onClick={handleLogin}
            type='submit'
            value='Submit'
          />
        </Form>
      </LoginInnerContainer>
    </LoginContainer>
  )
}

export default Login;

const LoginContainer = styled.div`
    background-color: #f8f8f8;
    height: 100vh;
    display: grid;
    place-items: center;
`;

const LoginInnerContainer = styled.div`
    padding: 100px;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    > img{
        object-fit: contain;
        height: 100px;
        margin-bottom: 10px;
    }
    > h1{
    object-fit: contain;
    height: 100px;
    margin-bottom: 10px;
    }
`;


const Form = styled.div`
    display: flex;
    flex-direction: column;

>input{
    padding: 1vh;
    margin: 1vh;
    min-width: 25vw;
}
>input[type=submit]{
    padding: 1vh;
    margin: 1vh;
    min-width: 25vw;
    color: white;
    font-weight:100;
    background-color: #5D2D5D;
}
`;