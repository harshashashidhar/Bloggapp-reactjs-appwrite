// src/pages/Login.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import authService from '../appwrite/auth'; 
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const[data,setData]=useState({email:'',
        password:''
    });

    const handleInput=(e)=>{
        const{id,value}=e.target;
        setData((prev)=>({
            ...prev,
            [id]:value,
            
        }))
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); 
        try {
            const session = await authService.login(formData);

            if (session) {

                const userData = await authService.getCurrentUser();
               if (userData) {
                    dispatch(login({ userData }));
                    navigate('/'); 
               }
            }
        } catch (error) {
            if (error.message.includes('401')) {
                setError('Invalid email or password. Please try again.');
            } else {
                setError('Something went wrong. Please try again later.');
            }
        }
    };

    return (
        <div className="py-8">
            <form onSubmit={handleLogin}>
                <Input
                    label="Email"
                    type="email"
                    value={data.email}
                    onChange={handleInput}
                    id="email"
                    required
                    placeholder="Enter your email"
                />
                <Input
                    label="Password"
                    type="password"
                    value={data.password}
                    onChange={handleInput}
                    id="password"
                    required
                    placeholder="Enter your password"
                />
                <Button type="submit">Login</Button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}

export default Login;
