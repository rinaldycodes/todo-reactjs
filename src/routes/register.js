import React, { useState } from 'react';
import Loading from '../components/Loading.component';
import { MyConstants } from '../constants/MyConstants';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phoneNumber: '',
        name: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(MyConstants.APP_API_URL + '/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const res = await response.json();

            console.log('response json login', res.code);

            if (res.code === 200) {
                alert(res.message);
                setFormData({
                    email: '',
                    password: '',
                    phoneNumber: '',
                    name: '',
                });

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

    if (isLoading) {
        return (<Loading />)
    }


    return (
        <div className='bg-white container d-flex justify-content-center align-items-center vh-100'>
            <div className="card p-4">
                <h2 className="text-center mb-4">Register</h2>
                <form>
                    <div className="form-group mb-2">
                        <label htmlFor="name">Name</label>
                        <input value={formData.name} type="name" className="form-control" id="name" name="name" placeholder="name" onChange={handleChange} />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="email">Email</label>
                        <input value={formData.email} type="email" className="form-control" id="email" name="email" placeholder="email" onChange={handleChange} />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="email">Phone</label>
                        <input value={formData.phoneNumber} type="text" className="form-control" id="phoneNumber" name="phoneNumber" placeholder="Phone number" onChange={handleChange} />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="password">Password</label>
                        <input value={formData.password} type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={handleChange} />
                    </div>
                    <div className="form-group mb-4">
                        <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block">Submit</button>
                    </div>
                    <div className="form-group ">
                        <label htmlFor="password">Have an account ? <a href='/'>Login</a></label>
                    </div>
                </form>
            </div>
        </div>
    );
}
