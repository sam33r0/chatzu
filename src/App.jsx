import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const backendUri = import.meta.env.VITE_BACKEND_URI;
  const f = async () => {
    await axios.post((backendUri + '/user/login'), {
      email: "srkfkfu",
      password: "gfjf"
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${"sfa"}`
      },
      withCredentials: true
    })
  }
  return (
    <div className='h-screen flex flex-col'>
      <Header />
      <>
        <ToastContainer
          stacked
          position="top-center"
          autoClose={4000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition:Bounce
        />
        <Outlet />
      </>
      {/* <Footer /> */}
    </div>
  )
}

export default App
