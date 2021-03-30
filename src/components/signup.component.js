import {useState} from 'react';
import Axios from 'axios';

const Signup = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const register = () => {
        Axios.post('http://localhost:5050/api/signup', {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
          }).then((res) => {
            console.log(res)
          });

    }    


    return (
        <div>
            <div className='form-control'>
                <h3>Sign Up</h3>
                <label>Firstname</label>
                <input type='text' placeholder='Firstname' onChange={(e) => setFirstname(e.target.value)}/>
                <label>Lastname</label>
                <input type='text' placeholder='Lastname' onChange={(e) => setLastname(e.target.value)}/>
                <label>Email</label>
                <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                <label>Password</label>
                <input type='text' placeholder='User Password' onChange={(e) => setPassword(e.target.value)}/>
                <label>Password Confirmation</label>
                <input type='text' placeholder='Password Confirmation' onChange={(e) => setPasswordConfirmation(e.target.value)}/>
            
                <button className="btn" color="steelblue" onClick={register}>Register</button>
            </div>
        </div>
    )
}

export default Signup
