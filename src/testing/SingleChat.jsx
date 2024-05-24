import React, { useEffect, useState } from 'react'
import axios from 'axios';
import io from "socket.io-client"
function SingleChat() {
    const Endpoint = "http://localhost:8000";
    let socket, selectedChatCompare;
    const [test, setTest] = useState("");
    useEffect(()=>{
        socket= io(Endpoint);
        
    })
    async function s() {
        const res = await axios.get(Endpoint);
        console.log(res.data.message);
        setTest(res.data.message);
    }
    s()
    return (
        <div>SingleChat {test}</div>
    )
}

export default SingleChat