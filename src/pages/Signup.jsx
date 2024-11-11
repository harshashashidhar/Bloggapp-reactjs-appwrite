//src/pages/Signup.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import authService from '../appwrite/auth'; 
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [formdata, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
   
    useEffect(() => {
        const checkUser = async () => {
            const user = await authService.getCurrentUser();
            if (user) {
                navigate('/');
            }
        };
        checkUser();
    }, [navigate]);

    const handleInput = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userData = await authService.createAccount(formdata);
            if (userData) {
                dispatch(login({ userData }));
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="py-8 min-h-screen overflow-y-auto">
            <form onSubmit={handleSignup}>
                <Input
                    label="Full Name"
                    type="text"
                    value={formdata.name}
                    onChange={handleInput}
                    id="name"
                    required
                    placeholder="Enter your full name"
                />
                <Input
                    label="Email"
                    type="email"
                    value={formdata.email}
                    onChange={handleInput}
                    id="email"
                    required
                    placeholder="Enter your email"
                />
                <Input
                    label="Password"
                    type="password"
                    value={formdata.password}
                    onChange={handleInput}
                    required
                    id="password"
                    placeholder="Enter your password"
                />
                <Button type="submit">Sign Up</Button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}

export default Signup;
