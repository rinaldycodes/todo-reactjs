import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyConstants } from '../../constants/MyConstants';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Loading from '../../components/Loading.component';

export default function TaskNew() {
    const navigate = useNavigate();
    const [token, setToken] = useLocalStorage('token');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getCurrentDate()
    }, [])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBack = (e) => {
        navigate('/user/');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(MyConstants.APP_API_URL + '/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify(formData)
            });

            const res = await response.json();

            console.log('response json task', res);

            if (res.code === 200) {
                alert(res.message);
                setFormData({
                    title: '',
                    description: '',
                    startDate: '',
                })

            } else {
                alert(res.message);
            }
        } catch (error) {

            console.error('error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
        const day = String(date.getDate()).padStart(2, '0');

        setFormData({ ...formData, 'startDate': `${year}-${month}-${day}` });

        return `${year}-${month}-${day}`;
    };

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div className='container py-3'>
            <h5>New Todo</h5>
            <div className="form-group mb-2">
                <label className='mb-1' htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" name="title" placeholder="Enter title" value={formData.title} onChange={handleChange} />
            </div>
            <div className="form-group mb-2">
                <label className='mb-1' htmlFor="description">Description</label>
                <input type="text" className="form-control" id="description" name="description" placeholder="Enter description" value={formData.description} onChange={handleChange} />
            </div>
            <div className="form-group mb-4">
                <label className='mb-1' htmlFor="startDate">Status</label>
                <select className='form-control'>
                    <option>- SELECT -</option>
                    <option value={'ON GOING'}>ON GOING</option>
                    <option value={'COMPLETE'}>COMPLETE</option>
                </select>
            </div>
            <div className="form-group mb-4">
                <button type="button" className="btn btn-light text-primary btn-block me-3" onClick={handleBack}>Back</button>
                <button type="submit" className="btn btn-primary bg-primary" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}
