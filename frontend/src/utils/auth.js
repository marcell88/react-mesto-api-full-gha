export const BASE_URL = 'https://auth.nomoreparties.co';

const makeRequest = (endpoint, method, body, token) => {
    const option = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (body) option.body = JSON.stringify(body) //POST запрос
    if (token) option.headers.Authorization = `Bearer ${token}` //Валидность токена

    return fetch(`${BASE_URL}${endpoint}`, option)
        .then(res => {
            if (res.ok) return res.json();
            throw new Error(`Ошибка, код: ${res.status}`);
        });
}

export const register = (password, email) => {
    return makeRequest('/signup', 'POST', { password, email }, null)
}

export const authorization = (password, email) => {
    return makeRequest('/signin', 'POST', { password, email }, null)
}

export const checkToken = (token) => {
    return makeRequest('/users/me', 'GET', null, token);
}
