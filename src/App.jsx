import SingleChat from './testing/SingleChat'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

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
    <>
      <Header />
        <Outlet />
      <Footer />
    </>
  )
}

export default App
