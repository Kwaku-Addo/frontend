import {useState} from 'react';
import Axios from 'axios';
import {useHistory} from 'react-router-dom';


const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState('')
    const [error, setError] = useState('')
    const [loginStatus, setLoginStatus] = useState(false)

    const history = useHistory();


    const login = () => {
        Axios.post('http://localhost:5050/api/signin', {
            email: email,
            password: password,
          }).then((res) => {
              if(!res.data.success){
                setLoginStatus(false);
              }
              else{
                console.log(res);
                console.log(res.data.message.firstname);
                setUserData(res.data.message.firstname);
                setLoginStatus(true);

              }
            //   if(loginStatus){
            //     history.push('/signup')
            //     }
          }).catch(err => {
            console.log(err.response.data.errors[0].error);
            setError(err.response.data.errors[0].error)
            
          });
    }

    return (
        <div>
            <div className='form-control'>
                <h3>Login</h3>
                <label>Email</label>
                <input type='text' placeholder='User Email' onChange={(e) => setEmail(e.target.value)}/>
                <label>Password</label>
                <input type='text' placeholder='User Password' onChange={(e) => setPassword(e.target.value)}/>
                <button className="btn" color="steelblue" onClick={login}>Sign In</button>
            </div>
            <div> 
                <h1>{userData} {error}</h1>
            </div>

            {loginStatus &&  history.push('/signup')}

            <div>
            {/* <Route exact path={["/", "/signup"]} component={Signup} /> */}
          </div>
        </div>
    )
}

export default Signin
