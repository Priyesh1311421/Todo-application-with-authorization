import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const history = useNavigate();

    const [pass, setPass] = useState(true);
    const [inputs, setInputs] = useState({ username: "", password: "" });

    const handleClick = () => {
        setPass(!pass);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/user/signup`, inputs, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if(response.data.msg === "User already exists!!"){
                alert(response.data.msg);
            }
            else{
                alert(response.data.msg);
                setInputs({ username: "", password: "" });
                history('/login');
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className='signup'>
            <div className='container'>
                <div className='row'>
                    <div className='d-flex card justify-content-center align-items-center'>
                        <div className='d-flex flex-column p-4'>
                            <div className='d-flex justify-content-center align-items-center signup-heading'>
                                <h1>SignUp</h1>
                            </div>
                            <label><b>Email</b></label>
                            <input
                                className='p-2 my-3'
                                type='email'
                                name='username'
                                placeholder='Enter Your Email'
                                onChange={handleChange}
                                value={inputs.username}
                            />
                            <label><b>Password</b></label>
                            <div>
                                <input
                                    className='p-2 my-3'
                                    type={pass ? 'password' : 'text'}
                                    name='password'
                                    placeholder='Enter Your Password'
                                    onChange={handleChange}
                                    value={inputs.password}
                                />
                                {pass ? <Eye className='password-toggle-icon' onClick={handleClick} /> :
                                    <EyeOff className='password-toggle-icon' onClick={handleClick} />}
                            </div>
                            <button className='signup-btn' onClick={handleSubmit}>SignUp</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Signup);
