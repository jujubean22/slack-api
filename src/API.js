import axios from 'axios';

//Registration
export const userRegister = ({ email, password, password_confirmation }) => {
  return axios.post('http://206.189.91.54//api/v1/auth/', {
    email, password, password_confirmation
  })
    .then(res => res)
    .catch(err => err)
};

//Login
export const userLogin = ({ email, password }) => {
  return axios.post('http://206.189.91.54//api/v1/auth/sign_in', {
    email, password
  })
    .then(resp => resp)
    .catch(err => err)
};

//Send Message 
export const sendMessage = ({ receiver_id, receiver_class, body, headers: { token, client, expiry, uid }
}) => {
  return axios.post('http://206.189.91.54//api/v1/messages',
    {
      receiver_id,
      receiver_class,
      body
    },
    {
      headers: {
        'access-token': token,
        'client': client,
        'expiry': expiry,
        'uid': uid
      }
    })
    .then(res => res)
    .then(result => result)
    .catch(err => err)
};