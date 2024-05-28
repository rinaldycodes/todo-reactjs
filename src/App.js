import React from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from '../src/routes/login';
import Register from '../src/routes/register';
import UserRoot from '../src/routes/user-root';
import Dashboard from '../src/routes/dashboard';
import TodoNew from './routes/todo/new';
import TodoEdit from './routes/todo/edit';
import ErrorPage from "../src/pages/error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user",
    element: <UserRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "todo/new",
        element: <TodoNew />,
      },
      {
        path: "todo/edit",
        element: <TodoEdit />,
      },
    ],
  },
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
