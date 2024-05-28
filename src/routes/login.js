import React, { useState } from 'react';

import Loading from '../components/Loading.component';
import {  useNavigate } from 'react-router-dom';
import { MyConstants } from '../constants/MyConstants';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Login() {
    const navigate = useNavigate(); 
    const [token, setToken] = useLocalStorage('token', '');
    const [user, setUser] = useLocalStorage('user', '');

    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(MyConstants.APP_API_URL+'/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const res = await response.json();

            console.log('response json login', res.code);

            if ( res.code === 200) {
                console.log('redirect to dashboard');
                alert(res.message);
                setUser(res.data.user);
                setToken(res.data.token);

                navigate('/user');
            } else {
                alert(res.message);
            }
            console.log('Login successful');
        } catch (error) {

            console.error('Login error:', error);
        } finally {
            setIsLoading(false);

        }
    };

    if ( isLoading ) {
        return (<Loading />)
    }
    return (
        <div className='bg-white container d-flex justify-content-center align-items-center vh-100'>
            <div className="card p-4">
                <h2 className="text-center mb-4">Login</h2>
                <form>
                    <div className="form-group mb-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                    </div>
                    <div className="form-group mb-4">
                        <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>Submit</button>
                    </div>
                    <div className="form-group ">
                        <label htmlFor="password">Does'nt have an account ? <a href='/register'>Register here</a></label>
                    </div>
                </form>
            </div>
        </div>
    );
}
