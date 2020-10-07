/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-else-return */
const BASE_URL = 'https://auth.nomoreparties.co';

const register = (username, password, email) => fetch(`${BASE_URL}/sign-up`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ username, password, email }),
})
  .then((response) => response.json())
  .then((res) => res)
  .catch((err) => console.log(err));

const authorize = (identifier, password) => fetch(`${BASE_URL}/sign-in`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ identifier, password }),
})
  .then(((response) => response.json()))
  .then((data) => {
    if (data.user) {
      localStorage.setItem('jwt', data.jwt);
      return data;
    } else {
      throw new Error('wrong!');
    }
  })
  .catch((err) => console.log(err));

const getContent = (token) => fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((data) => data);

export { register, authorize, getContent };
