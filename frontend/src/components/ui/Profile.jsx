import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { MdEdit } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "../UpdateProfileDialog";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "./button";
import { Loader2 } from "lucide-react";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const isResume = true;

function Profile() {
  useGetAppliedJobs()
  const  [open, setOpen] = useState(false)
  const  [loading, setLoading] = useState(false)
  const {user} = useSelector(store => store.auth)
  
  const [input, setInput] = useState({
    fullName:user?.fullName || "" ,
    email:user?.email || "" ,
    phoneNumber:user?.phoneNumber || "" ,
    bio:user?.profile?.bio || "" ,
    skills:user?.profile?.skills?.map(skill=>skill) || "" ,
    file: user?.profile?.resumeCloudinaryUrl || "" ,
  })
  const dispatch = useDispatch()

  const updateHandler = (e)=> {
      setInput({...input, [e.target.name]: e.target.value })
  }
  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file })
  }

  const submitHandler = async (e)=> {
      e.preventDefault();
      console.log('Input',input);
      
      const formData = new FormData();
      formData.append("fullName", input.fullName)
      formData.append("email", input.email)
      formData.append("phoneNumber", input.phoneNumber)
      formData.append("bio", input.bio)
      formData.append("skills", input.skills)
      if (input.file && input.file.name ) {
        formData.append("file", input.file);
      }

      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      
      try {
        setLoading(true)
        const res = await axios.post(`${import.meta.env.VITE_USER_API_END_POINT}/profile/update`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data' },
            withCredentials:true
        })
        if(res.data.success){
          dispatch(setUser(res.data.user));
          console.log('Dispatched User:', res.data.user);
          toast.success(res.data.message)
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
      } finally {
        setLoading(false)
      }
      setOpen(false)
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-1 lg:mx-auto border border-gray-200 rounded-2xl my-5 p-8 " >
        <div className="flex justify-between" >
        <div className="flex items-center gap-4" >
        <div>
          <img
            className="h-24 w-24 rounded-full "
            src={user?.profile?.profilePhoto}
            alt=""
          />
        </div>
        <div>
          <h1 className="font-semibold" >{user.fullName}</h1>
          <p>{user.profile.bio}</p>
        </div>
        </div>

        <button onClick={()=> {setOpen(true)}} ><MdEdit /></button>
        {open && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    {/* Popup content */}
    <div  className="bg-white p-6  rounded shadow-lg max-w-md w-full relative">
      <h1 className="font-bold pb-4 text-2xl ">Update Profile</h1>
      <button
        onClick={() => setOpen(false)}
        className="absolute top-2 right-4 text-red-500 hover:text-gray-800 text-2xl font-bold"
      >
        &times;
      </button>
      <div className=" mb-5 mt-4">
        {/* Updated form layout */}
      <form action="" onSubmit={submitHandler}  >
        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center">
            <label className="font-medium" htmlFor="name">Name</label>
            <input
              id="name"
              name="fullName"
              value={input.fullName}
              onChange={updateHandler}
              className="border-gray-300 w-full border-2 rounded-lg p-2"
              type="text"
            />
          </div>

          <div className="flex gap-3 items-center">
            <label className="font-medium" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              onChange={updateHandler}
              value={input.email}
              className="border-gray-300 w-full border-2 rounded-lg p-2"
              type="email"
            />
          </div>

          <div className="flex gap-3 items-center">
            <label className="font-medium" htmlFor="number">Number</label>
            <input
              id="number"
              name="phoneNumber"
              onChange={updateHandler}
              value={input.phoneNumber}
              className="border-gray-300 w-full border-2 rounded-lg p-2"
              type="number"
            />
          </div>

          <div className="flex gap-3 items-center">
            <label className="font-medium" htmlFor="bio">Bio</label>
            <input
              id="bio"
              name="bio"
              value={input.bio}
              onChange={updateHandler}
              className="border-gray-300 w-full border-2 rounded-lg p-2"
              type="text"
            />
          </div>

          <div className="flex gap-3 items-center">
            <label className="font-medium" htmlFor="skills">Skills</label>
            <input
              id="skills"
              name="skills"
              value={input.skills}
              onChange={updateHandler}
              className="border-gray-300 w-full border-2 rounded-lg p-2"
              type="text"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium" htmlFor="file">Resume</label>
            {input.file && !input.file.name && (
                 <a href={input.file} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                 View Current Resume
                 </a>
            )}
            <input
            onChange={fileChangeHandler}
              id="file"
              type="file"
              accept="application/pdf"
              name="file"
              className="border-gray-300 w-full mb-5 border-2 rounded-lg p-2"
            />
          </div>
        </div>
        {
          loading ? <Button className="w-full " > <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait </Button> :  <button type="submit" class="w-full text-white bg-orange-600 hover:bg-orange-600 hover:shadow-md focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update Profile</button>
      }
      </form>
      </div>
      
    </div>
  </div>
)}

        </div>
        
        <div className="my-5" >
          <div className="flex items-center my-2 gap-3" >
           <IoMail />
           <span>{user.email}</span>
          </div>
          <div className="flex items-center my-2 gap-3" >
          <FaPhoneAlt />
          <span>{user.phoneNumber}</span>
          </div>
        </div>
        
        <div>
           <div className="my-5" >
            <h1>Skills</h1>
            <div className="flex items-center gap-1" >
              {
                user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item,index) => <button className="text-white bg-black px-3 rounded-lg" key={index} >{item}</button> ) : <span>NA</span> 
              }
            </div>
           </div>
        </div>

        <div className="grid w-full mx-w-sm items-center gap-1.5" >
          <h1 className="text-md font-bold" >Resume</h1>
          {
            isResume ? <a target="blank" className="text-blue-500 w-full hover:underline cursor-pointer " href={user?.profile?.resume}>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
          }
        </div>
      </div>

      
        <div className="max-w-4xl mx-auto rounded-2xl" >
            <h1 className="font-bold text-lg my-5 " >Applied Jobs</h1>
            <AppliedJobTable />
        </div>
    </div>
  )}

export default Profile;
