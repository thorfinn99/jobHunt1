import useGetSingleCompany from '@/hooks/useGetSingleCompany';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { Button } from '@material-tailwind/react'
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '../shared/Navbar';

function CompanySetup() {
  const params = useParams()
  
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const {singleCompany} = useSelector(store=>store.company)
  useGetSingleCompany(params.id)

  const [input, setInput] = useState({
    name: "",
    description:"",
    website:"",
    location:"",
    file:null,
  })
  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]:e.target.value})
  }
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0]
    setInput({...input, file})
  }
  const submitHandler = async (e) => {
     e.preventDefault()
     const formData = new FormData();
     formData.append("name",input.name);
     formData.append("description",input.description);
     formData.append("website",input.website);
     formData.append("location",input.location);
     if(input.file) {
      formData.append("file", input.file)
     }
     try {
      setLoading(true)
       const res = await axios.put(`${import.meta.env.VITE_COMPANY_API_END_POINT}/update/${params.id}`, formData, {
          headers:{
            'Content-Type': 'multipart/form-data'
          },
          withCredentials:true
       })
       if(res.data.success){
        toast.success(res.data.message)
        navigate("/admin/companies")
       }
        
     } catch (error) {
       console.log(error);
       toast.error(error.response.data.message)
     } finally {
      setLoading(false)
     }
  }
  useEffect(()=> {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file:null,
    })
  },[singleCompany])

  return (
    <div>
      <Navbar />
      <div className='max-w-xl shadow-lg  mx-auto my-10' >
        <form onSubmit={submitHandler} >
           <div className='flex items-center gap-32  pl-3 py-7' >
              <button onClick={()=> navigate("/admin/companies") } className='flex items-center gap-2 text-gray-500 font-semibold' >
                <IoMdArrowRoundBack />
                <span>Back</span>
              </button>
              <h1 className='font-bold text-xl' >Company Setup</h1>
           </div>
           <div className='grid grid-cols-1 mx-5 gap-4' >
            <div>
            <label className='p-2 font-medium '>Company Name</label>
            <input className='px-2 py-2 w-full border-gray-300 border-[2px] rounded-xl ' type="text" name="name" value={input.name} onChange={changeEventHandler} />
            </div>
            <div>
            <label className='p-2 font-medium '>Description</label>
            <input className='px-2 py-2 w-full border-gray-300 border-[2px] rounded-xl ' type="text" name="description" value={input.description} onChange={changeEventHandler} />
            </div>
            <div>
            <label className='p-2 font-medium '>Website</label>
            <input className='px-2 py-2 w-full border-gray-300 border-[2px] rounded-xl ' type="text" name="website" value={input.website} onChange={changeEventHandler} />
            </div>
            <div>
            <label className='p-2 font-medium '>Location</label>
            <input className='px-2 py-2 w-full border-gray-300 border-[2px] rounded-xl ' type="text" name="location" value={input.location} onChange={changeEventHandler} />
            </div>
            <div>
            <label className='p-2 font-medium '>Logo</label>
            <input className='px-2 py-2 w-full border-gray-300 border-[2px] rounded-xl ' type="file" accept='image/*'  onChange={changeFileHandler} />
            </div>
           </div>
           {
              loading ? <Button className="w-full my-4 flex items-center justify-between bg-gray-400 text-black" > <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait </Button> :  <button type="submit" class="w-full text-white bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update</button>
           }
        </form>
      </div>
    </div>
  )
}

export default CompanySetup
