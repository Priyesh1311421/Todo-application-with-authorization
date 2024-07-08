import React from 'react'
import { useState } from 'react'
import {Eye, EyeOff} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch} from 'react-redux'
import { authActions } from '../../store';
import './login.css'

const Login = () => {
  
    const dispatch = useDispatch();

    const history = useNavigate();

    const [Inputs, setInputs] = useState({ username: "", password: "" });

    const [pass,setPass] = useState(false);

    const handleClick = ()=>{
        setPass(!pass);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/user/signin`, Inputs, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setInputs({ username: "", password: "" });
            sessionStorage.setItem("id",response.data.others._id);
            dispatch(authActions.login())
            history('/profile');
            
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className='login'>
            <div className='container'>
                <div className='row'>
                    <div className='d-flex card justify-content-center align-items-center'>
                        <div className='d-flex flex-column p-4'>
                            <div className='d-flex justify-content-center align-items-center signup-heading'>
                                <h1>LogIn</h1>
                            </div>
                            <label ><b>Email</b></label>
                            <input 
                                className='p-2 my-3' 
                                type='email' 
                                name='username' 
                                placeholder='Enter Your Email'
                                onChange={handleChange}
                                value={Inputs.username}
                            />
                            <label><b>Password</b></label>
                            <div>
                                <input 
                                    className='p-2 my-3' 
                                    type={pass?'password':'text'} 
                                    name='password' 
                                    placeholder='Enter Your Password'
                                    onChange={handleChange}
                                    value={Inputs.password}
                                />
                                    {
                                        pass?<Eye className='password-toggle-icon' onClick={handleClick}/>:
                                        <EyeOff className='password-toggle-icon' onClick={handleClick}/>
                                    }
                            </div>
                            <button className='signup-btn' onClick={handleSubmit}>LogIn</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login