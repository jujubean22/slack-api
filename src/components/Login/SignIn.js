import React, { useState } from 'react'
import styled from "styled-components";



function SignIn() {
  const [email, setEmail] = useState(''); //Email
  const [password, setPassword] = useState(''); //Password

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img src="https://logos-world.net/wp-content/uploads/2020/10/Slack-Logo-2019-present.jpg" 
        alt="" 
        />
        <h1>Sign up to Slack</h1>
        <Form>
          <input 
          placeholder='sample@email.com'
          type='email'
          title='email'
          />
          <input 
          placeholder='password'
          type='password'
          title='password'
          />
          <input 
          type='submit'
          value='Submit'
          />
        </Form>
      </LoginInnerContainer>
    </LoginContainer>
  )
}

export default SignIn

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