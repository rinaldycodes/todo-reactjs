import React, { useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage';
import no_data from '../assets/no_data.png'
import { useNavigate } from 'react-router-dom';
import { MyConstants } from '../constants/MyConstants';

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser, clearUser] = useLocalStorage('user', '');
    const [token, setToken, clearToken] = useLocalStorage('token', '');
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    var no = 1;

    useEffect(() => {
        getTasks();
    }, []);

    const onClickAddNew = () => {
        navigate('/user/todo/new')
    }

    const onClickIconDeleteTask = (data) => {
        deleteTask(data.id);
    }

    const onClickIconEditTask = (data) => {
        navigate('/user/todo/edit?id=' + data.id);
    }

    const onClickLogout = () => {
        clearToken();
        clearUser();
        navigate('/');
    }

    const getTasks = async (e) => {
        setIsLoading(true);
        setTodos([]);
        try {
            const response = await fetch(MyConstants.APP_API_URL + '/tasks', {
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
                setTodos(res.data);

            } else {
                alert(res.message);
            }
        } catch (error) {

            console.error('error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteTask = async (ID) => {
        setIsLoading(true);
        try {
            const response = await fetch(MyConstants.APP_API_URL + '/tasks/' + ID, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });

            const res = await response.json();

            console.log('response json', res);

            if (res.code === 200) {
                alert(res.message);
                getTasks();

            } else {
                alert(res.message);
            }
        } catch (error) {

            console.error('error:', error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className='container py-3 justify-content-center vh-100'>
            <h5>Halo, <b>{user.name} </b></h5>
            <div>
                <button type='button' onClick={onClickLogout} className='btn btn-light text-primary'>Logout</button>
            </div>

            <div className='p-3 mt-3'>
                {
                    todos.length > 0 &&
                    <button className='btn btn-primary bg-primary mb-2' onClick={onClickAddNew}>Add new</button>
                }

                {
                    todos.length > 0 ?
                        todos.map((v, i) => {
                            return (
                                <div className='d-flex justify-content-between align-item-center border rounded p-3'>
                                    <h5>{no++}. {v.title}</h5>
                                    <div className=''>
                                        <button type="button" onClick={() => {
                                            onClickIconEditTask(v)
                                        }} className='btn btn-sm bg-info me-1'><i className='fa fa-pencil text-white' /></button>
                                        <button type='button' onClick={() => {
                                            onClickIconDeleteTask(v)
                                        }} className='btn btn-sm bg-danger me-1'><i className='fa fa-trash text-white' /></button>
                                    </div>
                                </div>

                            )
                        })
                        :
                        <>
                            <div className='text-center'>
                                <img src={no_data} alt='No data' style={{ width: '200px', height: 'auto' }} />
                                <p>No Todo</p>
                                <button className='btn btn-primary bg-primary' onClick={onClickAddNew}>Add new</button>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}
