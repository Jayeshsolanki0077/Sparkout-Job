import axios from 'axios';
import bcrypt from 'bcryptjs';

export const UserRegistration = data => {
    const password = data.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    data["password"] = hash;

    return axios.post('http://localhost:4000/register', data)
        .then(res => res.status);
};

export const EmailValidation = data => (
    axios.post('http://localhost:4000/validateEmail', data)
    .then(exist => exist.status)
)