import React from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '../../@/components/ui/button.jsx';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Footer from './../Footer/Footer.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function AddMember() {
  const navigate = useNavigate()
  const { rid } = useParams();
  const backendUri = import.meta.env.VITE_BACKEND_URI;
  const accessToken = useSelector((state) => state.auth.accessToken);
  const authGoogle = useSelector((state) => state.auth.authGoogle);
  const con = useSelector((state) => state.auth.contacts.contacts);
  const [roomDetail, setRoomDetail] = useState(null);
  const [contacts, setContacts] = useState(con);
  const setter = () => setContacts(prev => {
    return prev.filter((kl, i) => {
      let a = 0;
      oldMemberList.forEach((ob) => {
        if (ob._id == kl._id) {
          a++;
        }
      })
      return a == 0;
    })
  })
  const [memberList, setMemberList] = useState([]);
  const [oldMemberList, setOldMemberList] = useState([]);
  const [success, setSuccess] = useState(false);
  const [errorM, setErrorM] = useState(false);
  useEffect(() => {
    const gt = async () => {
      const response = await axios.post(backendUri + `/room/detail`, {
        rid: rid,
        page: 1,
        limit: 15
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        withCredentials: true
      })
      console.log(response.data.data[0]);
      setRoomDetail(response?.data?.data[0]);
      setOldMemberList(response?.data?.data[0].memberDetails)
    }
    gt();
  }, [])
  useEffect(() => setter(), [oldMemberList, setOldMemberList]);


  const submitData = async () => {
    console.log("AccessToken here", accessToken);
    try {
      const response = await axios.post(`${backendUri}/room/add`, {
        roomId: roomDetail._id,
        title: roomDetail.title,
        memberList: memberList
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        withCredentials: true,
      });
      console.log(response.status);
      if (response.status >= 200) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate(`/dashboard/${authGoogle}`);
        }, 2500);
      }
    } catch (err) {
      setErrorM(true);
      console.log(errorM, "from error");
      setTimeout(() => { setErrorM(false) }, 2500);
    }
  };

  const memberRemover = (i) => {
    let mrr = [...memberList];
    let arr = [...contacts];
    arr.push(mrr[i]);
    mrr.splice(i, 1)
    setContacts(arr);
    setMemberList(mrr);
  }

  const memberHandler = (i) => {
    console.log(memberList);
    let mrr = [...memberList];
    let arr = [...contacts];
    arr.splice(i, 1)
    mrr.push(contacts[i]);
    setContacts(arr);
    setMemberList(mrr);
  }

  return (
    <>
      {success && (
        <div className="bg-green-600 text-white py-4 px-6 md:px-12 shadow-lg h-14 flex justify-center items-center">
          <h2 className="text-xl font-extrabold text-center">Added</h2>
        </div>
      )}
      {errorM && (
        <div className="bg-red-600 text-white py-4 px-6 md:px-12 shadow-lg h-14 flex justify-center items-center">
          <h2 className="text-xl font-extrabold text-center">Unable to add</h2>
        </div>
      )}
      <div className='bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12 px-6 md:px-12 shadow-lg h-screen flex justify-center items-center'>
        <div className='bg-white rounded-lg shadow-lg p-8 w-5/6 md:w-2/3 lg:w-1/2'>
          <h2 className='m-5 text-3xl font-extrabold text-center mb-8 text-gray-700'>Add Members</h2>

          <div className='text-black'>
            Add Members
            <div className='flex gap-2 w-full'>
              <div className='w-1/2 p-3 bg-yellow-200'>
                Eligible Contacts
                <ul className='flex mt-4  flex-col gap-3'>
                  {contacts.map((m, i) =>
                    <li key={m.fullName} onClick={() => memberHandler(i)} className='w-full text-black bg-cyan-500 hover:bg-green-300 p-5 cursor-pointer'>
                      <div >{m.fullName}</div>
                    </li>)}
                </ul>
              </div>
              <div className='w-1/2 p-3 bg-yellow-200'>
                {memberList &&
                  <>Added Members
                    <ul className=' flex mt-4 w-full flex-col gap-3'>
                      {memberList?.map((m, i) =>
                        <li key={m.fullName} onClick={() => memberRemover(i)}
                          className='text-black bg-cyan-500 hover:bg-green-300 p-5 cursor-pointer'>
                          <div >{m.fullName}</div>
                        </li>)}
                    </ul>
                  </>}
              </div>
            </div>
          </div>
          <div className='flex justify-center'>
            <Button onClick={submitData} className="bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold py-2 px-4 rounded hover:from-blue-700 hover:to-purple-800">
              Add to Room
            </Button>
          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}

export default AddMember