import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './components/Pages/Login.jsx'
import Signup from './components/Pages/Signup.jsx'
import Dashboard from './components/Pages/Dashboard.jsx'
import store from './components/store/store.js'
import { Provider } from 'react-redux'
import Home from './components/Home.jsx'
import About from './components/Pages/About.jsx'
import AddContact from './components/Pages/AddContact.jsx'
import CreateRoom from './components/Pages/CreateRoom.jsx'
import AddMember from './components/AddMember.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/dashboard/:param',
        element: <Dashboard />
      },
      {
        path:'/about',
        element: <About/>
      },
      {
        path: '/add-contact',
        element: <AddContact/>
      },
      {
        path: '/create-room',
        element: <CreateRoom/>
      },
      {
        path: '/room/addMember/:rid',
        element: <AddMember/>
      }
    ]
  }]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
