import React, { useEffect } from 'react'
import axios from 'axios'

function Dashboard() {
  const backendUri = import.meta.env.VITE_BACKEND_URI;
  useEffect(
    () => {
      (async () => {
        const response = await axios.get((backendUri + "/room/test"), {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${"sfa"}`
          },
          withCredentials: true
        })
        console.log(response);
      })()
    }
  )
  const f = async () => {
    window.open((backendUri + '/user/Glogout'),"_self")
    console.log(response);
  }
  return (
    <div>Dashboard
      <button onClick={f}>Logout</button>
    </div>
  )
}

export default Dashboard