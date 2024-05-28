import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function UserRoot() {
    const navigate = useNavigate();
    const [user, setUser] = useLocalStorage('user','');
    // alert('test');
    useEffect( () => {
        if ( !user ) {
            navigate('/')
        }

    }, [])
  return (
    <>
        {/* <div>UserRoot</div> */}
        <Outlet />
    </>
  )
}
