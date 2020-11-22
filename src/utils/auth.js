export const BASE_URL = 'https://api.mgreen.students.nomoreparties.space';

export const register = (email, password ) => fetch(`${BASE_URL}/signup`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
})
.then((response) => {
  try {
    if (response.status === 201){
      return response.json();
    }
  } catch(e){
    return (e)
  }
})
.then((res) => {
  return res;
})
.catch((err) => console.log(err));
; 

  export const authorize = (password, email) => fetch(`${BASE_URL}/signin`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password, email }),
})
  .then(((res) => {
    if (res.status === 400) {
      throw new Error('Не передано одно из полей');
    }
    else if (res.status === 401) {
      throw new Error('Пользователь с таким email не найден');
    }
    return res.json();
  }))
  .then((data) => {
    console.log(data);
    if (data.token) {
      localStorage.setItem('jwt', data.token);
      console.log(data.token + ' data.token есть');
      return data.token;
    } else {
      throw new Error('wrong!');
    }
  })
  .catch((err) => console.log(err));

  export const getContent = (token) => fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((data) => data)
  


