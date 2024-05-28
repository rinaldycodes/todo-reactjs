import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { MyConstants } from '../../constants/MyConstants';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Loading from '../../components/Loading.component';

export default function TaskEdit() {
    const location = useLocation(); 
    const searchParams = new URLSearchParams(location.search); 
    const taskId = searchParams.get('id');

    const navigate = useNavigate();
    const [token, setToken] = useLocalStorage('token');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getTasks();

        return () => {
            setFormData({
                title: '',
                description: '',
                startDate: '',
            })
        }
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
            const response = await fetch(MyConstants.APP_API_URL + '/tasks/'+taskId, {
                method: 'PUT',
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
                handleBack();
               

            } else {
                alert(res.message);
            }
        } catch (error) {

            console.error('error:', error);
        } finally {
            setIsLoading(false);
        }
    };


    const getTasks = async (e) => {
        setIsLoading(true);
        try {
            const response = await fetch(MyConstants.APP_API_URL + '/tasks/'+taskId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });

            const res = await response.json();

            console.log('response json', res);

            if (res.code === 200) {
                // alert(res.message);
                setFormData(res.data)

            } else {
                alert(res.message);
            }
        } catch (error) {

            console.error('error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div className='container py-3'>
            <h5>Edit Todo {taskId}</h5>
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
                <select className='form-control' name='status' value={formData.status} onChange={handleChange}>
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
